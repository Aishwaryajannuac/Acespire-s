import React, { useState, useRef, useEffect } from 'react';
import { Send, X} from 'lucide-react';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import TimeDisplay from './TimeDisplay';
import { useTheme } from '../hooks/useTheme';

const Chatbot = () => {
  const [fontSize, setFontSize] = useState('10px');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(new Audio('/pop.mp3'));
  const messagesContainerRef = useRef(null);
  const isUserScrollingRef = useRef(false);
  const inputRef = useRef(null);
  const chatbotRef = useRef(null);
  const [menuButtonBottom, setMenuButtonBottom] = useState('60px');
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
  const { theme } = useTheme();
const isDark = theme === 'dark';

  // Function to make links, emails, and phone numbers clickable
  const makeLinksClickable = (text) => {
    // URL regex
    const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/gi;
    // Email regex
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
    // Phone regex (supports various formats)
    const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/gi;

    let processedText = text;

    // Replace URLs with clickable links
    processedText = processedText.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #195CA2; text-decoration: underline; word-break: break-all;">${url}</a>`;
    });

    // Replace emails with clickable mailto links
    processedText = processedText.replace(emailRegex, (email) => {
      return `<a href="mailto:${email}" style="color: #195CA2; text-decoration: underline; word-break: break-all;">${email}</a>`;
    });

    // Replace phone numbers with clickable tel links
    processedText = processedText.replace(phoneRegex, (phone) => {
      // Clean phone number for tel: protocol (remove spaces, dots, parentheses, hyphens)
      const cleanPhone = phone.replace(/[\s\-\.\(\)]/g, '');
      return `<a href="tel:${cleanPhone}" style="color: #195CA2; text-decoration: underline;">${phone}</a>`;
    });

    return processedText;
  };

  // Enhanced function to format Flowise responses with proper line breaks
  const formatFlowiseResponse = (text) => {
  // First, handle escaped characters and clean the text
  let formattedText = text
    // Remove surrounding quotes if they exist
    .replace(/^["']|["']$/g, '')
    // Convert escaped newlines to actual newlines
    .replace(/\\n/g, '\n')
    // Convert escaped quotes to regular quotes
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    // Convert escaped backslashes
    .replace(/\\\\/g, '\\')
    // Remove any other escaped characters that might cause issues
    .replace(/\\r/g, '')
    .replace(/\\t/g, ' ')
    // Trim whitespace
    .trim();
  
  // Now format the content for better display
  formattedText = formattedText
    // Handle bullet points with •
    .replace(/([^\n])•\s*/g, '$1\n• ')
    // Handle bullet points with -
    .replace(/([^\n])-\s+/g, '$1\n- ')
    // Handle bullet points with *
    .replace(/([^\n])\*\s+/g, '$1\n* ')
    // Handle numbered points
    .replace(/([^\n])(\d+\.)\s+/g, '$1\n$2 ')
    // Handle points that start with capital letters after periods (likely new points)
    .replace(/\.\s+([A-Z])/g, '.\n\n$1')
    // Clean up multiple consecutive line breaks
    .replace(/\n{3,}/g, '\n\n')
    // Ensure bullet points start on new lines
    .replace(/^•/, '• ')
    .replace(/^-/, '- ')
    .replace(/^\*/, '* ')
    // Handle cases where sentences end and new points begin
    .replace(/\.\s*([•\-\*])/g, '.\n$1')
    // Handle numbered lists that might not have proper spacing
    .replace(/(\d+\.)\s*([A-Z])/g, '$1 $2')
    // Clean up any remaining double spaces
    .replace(/\s{2,}/g, ' ')
    // Clean up spaces before line breaks
    .replace(/\s+\n/g, '\n')
    // Clean up line breaks at the start
    .replace(/^\n+/, '')
    // Clean up line breaks at the end
    .replace(/\n+$/, '');

  return formattedText;
};

  // Enhanced Flowise API function with timeout
  const queryFlowise = async (data, timeoutMs = 30000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    

    try {
      const payload = {
        chatInput: data,        // The message content
        sessionId: sessionId    // Session identifier
      };
      console.log('Payload:', JSON.stringify(payload, null, 2));
      console.log('Session ID:', sessionId);
      const response = await fetch(
        "https://n8n.acespireconsulting.com/webhook/029e4b23-8d61-4ab6-840b-7080746dac60/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        }
      );
      console.log('Response Status:', response.text);
      
      clearTimeout(timeoutId);
      
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      console.error('Flowise API error:', error);
      throw error;
    }
  };

  // Initial messages for the chatbot
  const initialMessages = [
    {
      text: "👋 Hi there! I'm Acy, your virtual assistant at Acespire Consulting.",
      isUser: false,
      showFeedback: true
    },
    {
      text: "In order to know more about our services kindly click below.",
      isUser: false,
      showFeedback: true,
      showButton: true,
      buttonText: "Click Here"
    },
    {
      text: "Would you like to explore more?",
      isUser: false,
      showFeedback: true,
      showYesButton: true
    }
  ];
  // useEffect(() => {
  //   const handleResize = () => {
  //     const element = document.querySelector(".island");
  //     if (!element) return;

  //     const width = window.innerWidth;
  //     const height = window.innerHeight;

  //     if (width <= 1265 && height <= 698) {
  //       element.style.top = "84px"; // or any value you want
  //     } else {
  //       element.style.top = "52px"; // fallback/default value
  //     }
  //   };

  //   handleResize(); // Run on mount
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  useEffect(() => {
  const preloadImages = [
    '/devicebaba.svg',
    '/devicebaba-dark.svg',
    '/Island.png',
    '/menu.svg',
    '/Acespire-logo.png',
    '/service-btn.svg',
    '/msg-btn.svg',
    '/close-btn.svg',
    '/contact-btn.svg',
    '/aboutus-btn.svg',
    '/chat-background.png'
  ];

  preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  }, []);


  
  // useEffect(() => {
  //   // Check if this is a new session
  //   const isNewSession = !sessionStorage.getItem('chatbotShown');
    
  //   if (isNewSession) {
  //     // Set a small delay to ensure smooth transition after page load
  //     setTimeout(() => {
  //       setIsOpen(true);
  //       // Play sound when auto-opening
  //       audioRef.current.currentTime = 0;
  //       audioRef.current.play().catch(e => console.log('Audio play failed:', e));
  //       // Set initial messages
  //       setMessages(initialMessages);
  //     }, 1000);
      
  //     // Mark that we've shown the chatbot in this session
  //     sessionStorage.setItem('chatbotShown', 'true');
  //   }
  // }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && !isUserScrollingRef.current) {
      const { scrollHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = container;
      // If user is near bottom, allow auto-scrolling again
      if (scrollHeight - (scrollTop + clientHeight) < 50) {
        isUserScrollingRef.current = false;
      } else {
        isUserScrollingRef.current = true;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Check if it matches your specific media query conditions
    const isSpecificMediaQuery = width <= 1265 && height <= 698 && height >= 300;
    
    // Set font size based on your media query or general desktop/mobile logic
    if (isSpecificMediaQuery) {
      setFontSize('10px'); // Same as mobile/other devices
    } else {
      const isDesktop = width >= 768;
      setFontSize(isDesktop ? '12px' : '13px');
    }
  };

  handleResize(); // Initial check
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width <= 1265 && height <= 698) {
        setMenuButtonBottom('12px'); // Slightly up for your media query
      } else if (width >= 768) {
        setMenuButtonBottom('60px'); // Desktop
      } else {
        setMenuButtonBottom('62px'); // Mobile
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure the chatbot is positioned properly relative to the viewport
  useEffect(() => {
    const handleResize = () => {
      if (chatbotRef.current) {
        const viewportHeight = window.innerHeight;
        const chatbotHeight = chatbotRef.current.offsetHeight;
        const chatbotBottom = 20; // Bottom margin in px
        
        // Ensure chatbot doesn't overflow viewport
        if (chatbotHeight + chatbotBottom > viewportHeight) {
          chatbotRef.current.style.height = `${viewportHeight - chatbotBottom * 2}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    if (isOpen) {
      setTimeout(handleResize, 100); // Give time for the chatbot to render
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = { text: newMessage, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsLoading(true);
    isUserScrollingRef.current = false; // Reset user scrolling when sending new message

    try {
      // Call Flowise API with 30-second timeout
      const response = await queryFlowise(currentMessage, 30000);

      // Extract the response text - adjust this based on your Flowise response structure
      let responseText = '';
      
      if (response.text) {
        responseText = response.text;
      } else if (response.answer) {
        responseText = response.answer;
      } else if (response.response) {
        responseText = response.response;
      } else {
        // Fallback if the response structure is different
        responseText = JSON.stringify(response.output);
      }

      // Format the response to ensure proper line breaks and bullet points
      const formattedResponse = formatFlowiseResponse(responseText);

      // Make links, emails, and phone numbers clickable
      const clickableResponse = makeLinksClickable(formattedResponse);

      const botResponse = { 
        text: clickableResponse, 
        isUser: false,
        showFeedback: true,
        isMarkdown: true, // Flag to indicate this should be rendered as markdown
        hasClickableContent: true, // Flag to indicate this has clickable content
        isFlowiseResponse: true // Flag to indicate this is from Flowise
      };
      setMessages((prev) => [...prev, botResponse]);
      setTimeout(scrollToBottom, 100); // Ensure scroll after message is rendered
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = "Sorry, something went wrong. Please try again.";
      
      // Provide specific error messages
      if (error.message.includes('timed out')) {
        errorMessage = "The request is taking longer than expected. Please try again or rephrase your question.";
      } else if (error.message.includes('HTTP error')) {
        errorMessage = "There seems to be a connection issue. Please check your internet connection and try again.";
      }
      
      setMessages((prev) => [...prev, { 
        text: errorMessage, 
        isUser: false,
        showFeedback: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageIndex, positive) => {
    // Here you can implement feedback handling logic
    console.log(`Feedback for message ${messageIndex}: ${positive ? 'positive' : 'negative'}`);
    // You might want to send this feedback to your server
  };

  const handleButtonClick = (buttonText) => {
  // Handle button clicks based on their text
  if (buttonText === "Click Here") {
    // Add logic for services information with clickable links
    setMessages(prev => [...prev, {
      text: `Our services include <a href="/services/supply-chain" style="color:rgb(10, 10, 10); text-decoration: underline; font-weight: regular;">Supply Chain</a>, <a href="/services/digital-transformation" style="color:rgb(10, 10, 10); text-decoration: underline; font-weight: regular;">Digital Transformation</a>, <a href="/services/data-integration" style="color:rgb(10, 10, 10); text-decoration: underline; font-weight: regular;">Data Integration</a> and <a href="/services/cloud-services" style="color:rgb(10, 10, 10); text-decoration: underline; font-weight: regular;">Cloud Services</a>. Would you like more details on any specific service?`,
      isUser: false,
      showFeedback: true,
      hasClickableContent: true, // Add this flag to indicate this message has clickable content
      isFlowiseResponse: true // Add this to ensure it uses the dangerouslySetInnerHTML rendering
    }]);
  }
};

  const handleRedirectClick = (path) => {
    // Handle redirect button clicks
    window.open(path, '_blank');
    window.scrollTo(0, 0);
  };

  const handleYesButtonClick = () => {
    // Handle "Yes" button click
    setMessages(prev => [...prev, {
      text: "Great! What aspect of our services would you like to explore? We offer supply chain optimization, digital transformation, and strategic business consulting.",
      isUser: false,
      showFeedback: true
    }]);
  };

  const toggleChat = () => {
    if (!isOpen) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      setMessages(initialMessages);
    }
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // New menu option handlers
  const handleServicesClick = () => {
    setMenuOpen(false);
    setMessages(prev => [...prev, {
      text: "Our services include Supply Chain Consulting, Digital Transformation, and Business Strategy. We help businesses optimize their operations and drive growth.",
      isUser: false,
      showFeedback: true,
      showRedirectButton: true,
      redirectButtonText: "Click Here",
      redirectPath: "/services/supply-chain"
    }]);
  };

  const handleFAQClick = () => {
  setMenuOpen(false);
  const faqText = makeLinksClickable("For any queries, concerns, or to report issues, feel free to reach out to us at: <strong>info@acespireconsulting.com</strong>.");
  setMessages(prev => [...prev, {
    text: faqText,
    isUser: false,
    showFeedback: true,
    hasClickableContent: true
  }]);
};


  const handleCloseMenuClick = () => {
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    setMenuOpen(false);
    const contactText = makeLinksClickable("You can reach us at <strong>info@acespireconsulting.com</strong> or call <strong>+91 9416115310</strong>.");
    setMessages(prev => [...prev, {
      text: contactText,
      isUser: false,
      showFeedback: true,
      showRedirectButton: true,
      redirectButtonText: "Click Here",
      redirectPath: "/contact",
      hasClickableContent: true
    }]);
  };

  const handleAboutUsClick = () => {
    setMenuOpen(false);
    setMessages(prev => [...prev, {
      text: "Acespire Consulting helps businesses optimize operations and achieve strategic goals. Learn more about our team and mission.",
      isUser: false,
      showFeedback: true,
      showRedirectButton: true,
      redirectButtonText: "Click Here",
      redirectPath: "/about"
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle redirection based on path
  const handleRedirectPath = (path) => {
    if (path === "faq") {
      // Display FAQ message
      const contactText = makeLinksClickable("You can reach us at <strong>support@acespireconsulting.com</strong> or call <strong>(123) 456-7890</strong>. Our office hours are Monday-Friday, 9 AM - 5 PM EST.");
      setMessages(prev => [...prev, {
        text: contactText,
        isUser: false,
        showFeedback: true,
        hasClickableContent: true
      }]);
    } 
    else if (path === "contact") {
      // Display contact information
      const contactText = makeLinksClickable("You can reach us at <strong>support@acespireconsulting.com</strong> or call <strong>(123) 456-7890</strong>. Our office hours are Monday-Friday, 9 AM - 5 PM EST.");
      setMessages(prev => [...prev, {
        text: contactText,
        isUser: false,
        showFeedback: true,
        hasClickableContent: true
      }]);
    }
    else {
      // Open external links in new tab
      window.open(path, '_blank');
      window.scrollTo(0, 0);
    }
  };

  // CSS for hiding scrollbar but maintaining scrollability
  const hideScrollbarStyle = {
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none', /* IE and Edge */
    '&::-webkit-scrollbar': {
      display: 'none' /* Chrome, Safari and Opera */
    }
  };

 
// Add this useEffect to handle viewport changes
useEffect(() => {
  const handleResize = () => {
    // Force a re-render when viewport changes (e.g., bookmarks bar toggle)
    setNewMessage(prev => prev); // Trigger re-render without changing state
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

return (
    <>
      {/* Chat button fixed to bottom right, above all content */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-6 flex items-center bg-[#195CA2] text-always-white rounded-lg shadow-lg hover:bg-[#154b87] transition-colors duration-200 px-4 py-3 z-50"
      >
        <img
          src="/Acespire-logo.png"
          alt="Chat Icon"
          className="w-6 h-6"
        />
        <span className="ml-2 hidden md:inline">Chat</span>
      </button>

      
{isOpen && (
        <div
  ref={chatbotRef}
  className={`fixed bottom-12 right-0 w-[340px] h-[599px] flex flex-col z-50 overflow-hidden chatbot-container${isDark ? ' chatbot-dark' : ''}`}
  style={{
    backgroundImage: isDark ? "url('/devicebaba-dark.svg')" : "url('/devicebaba.svg')",
   backgroundSize: isDark ? '106% auto' : 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '10px',
  }}
>
          
          <div 
            className="absolute left-[28px] right-0 bottom-0 flex flex-col w-[284px] h-[600px] chatbot-inner" 
            style={{ 
              padding: '20px 17px', 
              paddingTop: '46px',
              top: '-10px'
            }}
          >
           
            
           <div className="flex items-center justify-between px-2 pb-1 h-[27px] rounded-t-full white-top"
  style={{ background: isDark ? '#0f0f0f' : '#ffffff' }}>
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 islandd" 
                style={{ 
                  top: '52px' // Keep this consistent
                }}
              >
                <img src="/Island.png" alt="Dynamic Island" className="h-5 island" />
              </div>
            <div className="text-[12px] ml-[10px] font-bold time-display"
  style={{ color: isDark ? '#ffffff' : '#000000' }}><TimeDisplay /></div>
              <div className="flex items-center gap-1 justify-end">
                <div className="text-[10px] font-bold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C7.58 2 3.58 3.79 0.59 6.59" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.41 6.59C20.42 3.79 16.42 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.35 9.45C5.69 7.21 8.75 5.97 12 5.97C15.25 5.97 18.31 7.21 20.65 9.45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.17 12.33C7.95 10.64 9.95 9.75 12 9.75C14.05 9.75 16.05 10.64 17.83 12.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15.13C10.1 14.12 11.05 13.65 12 13.65C12.95 13.65 13.9 14.12 15 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="18" r="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[10px] font-bold" style={{ color: isDark ? '#ffffff' : '#000000' }}>100%</div>
              </div>
            </div>
            
            {/* Chat header */}
           <div className="px-4 py-3 h-[44px] flex items-center justify-between chat-header"
  style={{ background: isDark ? '#195CA2' : '#195CA2' }}>
              <div className="flex items-center">
                <div className="p-1 rounded-full mr-2">
                  <img src="/Acespire-logo.png" alt="Acy" className="h-6 w-6" />
                </div>
                <span className="dark-section text-always-white text-[16px]">Acy</span>
              </div>
              <button onClick={toggleChat} className="text-always-white">
                <X size={18} />
              </button>
            </div>
            
            {/* Messages container - MODIFIED TO HIDE SCROLLBAR */}
           <div 
  ref={messagesContainerRef}
  className="flex-1 overflow-y-auto hide-scrollbar"
  style={{
    backgroundImage: isDark ? "url('/Chat-background-dark.png')" : "url('/chat-background.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    backgroundColor: isDark ? '#1a1a2e' : '#f9fafb',
  }}
>
              <div className="message-space p-2 space-y-2" style={{ paddingBottom: '60px' }}>
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.isUser ? '' : 'break-words'}`}>
                      <div
  className={`${
    msg.isUser 
      ? 'bg-[#195CA2] text-always-white' 
      : ''
  } p-1 rounded-lg shadow-sm text-left`}
  style={{
    fontSize: fontSize,
    background: msg.isUser
      ? '#195CA2'
      : isDark ? '#2d2d3d' : '#ffffff',
    color: msg.isUser
      ? '#ffffff'
      : isDark ? '#e2e8f0' : '#111827',
    border: msg.isUser
      ? 'none'
      : isDark ? '1px solid #3d3d5c' : '1px solid #e5e7eb',
  }}
>
                        <div>
                          {msg.isFlowiseResponse ? (
                            <div style={{ fontSize: fontSize, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                              {msg.hasClickableContent ? (
                                <div 
                                  dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(msg.text, {
                                      ALLOWED_TAGS: ['a', 'strong', 'em', 'p', 'br', 'ul', 'li', 'ol'],
                                      ALLOWED_ATTR: ['href', 'target', 'rel', 'style']
                                    })
                                  }} 
                                  style={{ fontSize: fontSize, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}
                                />
                              ) : (
                                <div style={{ fontSize: fontSize, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                  {msg.text}
                                </div>
                              )}
                            </div>
                          ) : msg.isMarkdown ? (
                            <div style={{ fontSize: fontSize, lineHeight: '1.5' }}>
                              <ReactMarkdown
                                components={{
                                  p: ({children}) => <p style={{ marginBottom: '8px', fontSize: fontSize }}>{children}</p>,
                                  ul: ({children}) => <ul style={{ listStyleType: 'disc', paddingLeft: '16px', marginBottom: '8px', fontSize: '10px' }}>{children}</ul>,
                                  li: ({children}) => <li style={{ fontSize: fontSize, marginBottom: '4px' }}>{children}</li>,
                                  strong: ({children}) => <strong style={{ fontWeight: '600', fontSize: fontSize }}>{children}</strong>,
                                  em: ({children}) => <em style={{ fontStyle: 'italic', fontSize: fontSize }}>{children}</em>,
                                }}
                              >
                                {msg.hasClickableContent ? '' : msg.text}
                              </ReactMarkdown>
                              {msg.hasClickableContent && (
                                <div 
                                  dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(msg.text, {
                                      ALLOWED_TAGS: ['a', 'strong', 'em', 'p', 'br', 'ul', 'li', 'ol'],
                                      ALLOWED_ATTR: ['href', 'target', 'rel', 'style']
                                    })
                                  }} 
                                  style={{ fontSize: fontSize, lineHeight: '1.5' }}
                                />
                              )}
                            </div>
                          ) : (
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: DOMPurify.sanitize(
                                  msg.hasClickableContent ? msg.text : msg.text.replace(
                                    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
                                    '<span style="word-break: break-all;">$1</span>'
                                  ),
                                  {
                                    ALLOWED_TAGS: ['a', 'strong', 'em', 'span', 'p', 'br'],
                                    ALLOWED_ATTR: ['href', 'target', 'rel', 'style']
                                  }
                                )
                              }} 
                            />
                          )}
                        </div>
                        
                        {msg.showButton && (
                          <button 
                            onClick={() => handleButtonClick(msg.buttonText)}
                            className="mt-2 text-[#195CA2] font-medium text-center block w-full"
                          >
                            {msg.buttonText}
                          </button>
                        )}
                        
                        {msg.showYesButton && (
                          <div className="mt-2 flex justify-center">
                            <button 
                              onClick={handleYesButtonClick}
                              className="bg-[#195CA2] text-always-white py-1 px-4 rounded-md"
                            >
                              Yes
                            </button>
                          </div>
                        )}

                        {msg.showRedirectButton && (
                          <div className="mt-2 flex justify-center">
                            <button 
                              onClick={() => handleRedirectPath(msg.redirectPath)}
                              className="bg-[#195CA2] text-always-white py-1 px-4 rounded-md text-[10px]"
                            >
                              {msg.redirectButtonText}
                            </button>
                          </div>
                        )}
                      </div>
                      
                      
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-xs text-left" style={{ color: isDark ? '#94a3b8' : '#6b7280' }}>Typing...</div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Menu options */}
            <div className={`all-menu absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-transparent px-2 py-1 flex items-center justify-center ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
              <div className="flex items-center justify-center gap-3 menu-options">
                {/* Services Button */}
                <button
                  onClick={handleServicesClick}
                  className={`flex flex-col items-center justify-center absolute ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transition: "all 0.3s ease-in-out",
                      transform: menuOpen ? "translateX(-75px)" : "translateX(0)",
                    }}
                >
                  <div className="w-8 h-8 flex items-center justify-center services-button">
                    <img 
                      src="service-btn.svg" 
                      alt="service" 
                      className="w-[40px] h-[40px]"
                    />
                  </div>
                </button>
                
                {/* FAQ/Message Button */}
                <button
                  onClick={handleFAQClick}
                  className={`flex flex-col items-center justify-center absolute ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transition: "all 0.3s ease-in-out",
                      transform: menuOpen ? "translateX(-35px)" : "translateX(0)",
                      transitionDelay: "0.05s",
                    }}
                >
                  <div className="w-8 h-8 flex items-center justify-center faq-button">
                    <img 
                      src="msg-btn.svg" 
                      alt="faq" 
                      className="w-[40px] h-[40px]"
                    />
                  </div>
                </button>
                
                {/* Close Menu Button */}
                <button
                  onClick={handleCloseMenuClick}
                  className={`flex flex-col items-center justify-center transform transition-all duration-300 ${menuOpen ? 'scale-100' : 'scale-0'}`}
                  style={{ transitionDelay: '150ms' }}
                >
                  <div className="w-8 h-8 flex items-center justify-center close-button">
                    <img 
                      src="close-btn.svg" 
                      alt="close" 
                      className="w-[23px] h-[23px]"
                    />
                  </div>
                </button>
      
                
                {/* Contact Button */}
                <button
                  onClick={handleContactClick}
                 className={`flex flex-col items-center justify-center absolute ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transition: "all 0.3s ease-in-out",
                      transform: menuOpen ? "translateX(35px)" : "translateX(0)",
                      transitionDelay: "0.05s",
                    }}
                >
                  <div className="w-8 h-8 flex items-center justify-center contact-button">
                    <img 
                      src="contact-btn.svg" 
                      alt="contactbutton" 
                      className="w-[39px] h-[39px]"
                    />
                  </div>
                </button>
                
                {/* About Us Button */}
                <button
                  onClick={handleAboutUsClick}
                  className={`flex flex-col items-center justify-center absolute ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transition: "all 0.3s ease-in-out",
                      transform: menuOpen ? "translateX(75px)" : "translateX(0)",
                      transitionDelay: "0.1s",
                    }}
                >
                  <div className="w-8 h-8 flex items-center justify-center about-us">
                    <img 
                      src="aboutus-btn.svg" 
                      alt="About Us" 
                      className="w-[40px] h-[40px]"
                    />
                  </div>
                </button>
              </div>
            </div>
            
            {/* Input area */}
            <div className="flex items-center p-3 rounded-b-full h-[44px] chatbot-input-area"
  style={{
    background: isDark ? '#0f0f0f' : '#ffffff',
    borderTop: isDark ? '1px solid #2d2d3d' : '1px solid #e5e7eb',
  }}>                
              <input                   
                ref={inputRef}                   
                type="text"                   
                placeholder="Type your message..."                   
                value={newMessage}                   
                onChange={(e) => setNewMessage(e.target.value)}                   
                onKeyDown={handleKeyPress}                   
                className="flex-1 px-3 rounded-full focus:outline-none bg-transparent text-xs type-message"
style={{ color: isDark ? '#e2e8f0' : '#111827' }}
              />                 
              <button                   
                onClick={handleSendMessage}                   
                disabled={isLoading}                   
                className={`p-2 ${isLoading ? 'bg-gray-400' : 'bg-[#195CA2] hover:bg-blue-700'} rounded-full flex items-center justify-center send-button transition-colors duration-200`}                   
                aria-label="Send message"                 
              >                   
                <Send className="w-4 h-4 text-always-white" />                 
              </button>             
            </div>
    
            {/* Menu button positioned at the bottom */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 menu-button ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} menu-button`} 
              style={{ bottom: menuButtonBottom }}
            >
              <button 
                onClick={toggleMenu}
                className="rounded-full p-2 transition-transform hover:scale-110 duration-200"
              >
                <img src="/menu.svg" alt="Menu" className="w-[36px] h-[36px] menu-button" />
              </button>
            </div>
            
          </div>
          
        </div>
      )}
    
      {/* Add global styles to hide scrollbar and add responsive fixes */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
          .type-message::placeholder {
  color: #9ca3af;
}
        @media screen and (max-width: 1265px) and (max-height: 698px) and (min-height: 551px){
          .chatbot-container {
            height: 450px !important;
            bottom: 52px !important;
            width: 273px !important;
          }
          
          .chatbot-inner {
            height: 468px !important;
            width: 220px !important;
            top: -20px !important;
            left: 26px !important;
          }

          .chatbot-input-area {
            height: 30px !important;
            padding: 8px !important;
            margin: 0 !important;
          }
           .chatbot-input-area input {
              font-size: 10px !important;
              padding: 4px 8px !important;
              flex: 1 !important;
              min-width: 0 !important;
            }
            

          .send-button {
            width: 28px !important;
            height: 28px !important;
            padding: 6px !important; 
            margin-left: 4px !important;
          }
           .send-button .w-4 {
              width: 14px !important;
              height: 14px !important;
            }
  

          .message-space {
            padding-bottom: 60px !important; /* Ensure space for input area */
          }  
          
          .chat-header {
            height: 30px !important;
          }
          
          .menu-button {
            bottom: 62px !important;
          }   
          
          .type-message {
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          
          .island {
            height: 14px !important;
          }
          .islandd{
            top: 10% !important;
          }  
          
          .services-button img,
          .faq-button img,
          .contact-button img,
          .about-us img {
            width: 30px !important;
            height: 30px !important;
          }
          
          .time-display{
            margin-left: 1px !important;
          }  
          
          .services-button,
          .faq-button,
          .contact-button,
          .about-us {
            width: 24px;
            height: 24px;
          }
          
          .close-button img {
            width: 24px !important;   
            height: 24px !important;
          }  
          
          .close-button {
            width: 20px;
            height: 20px;
          }

          .menu-button img {
            width: 48px !important;
            height: 48px !important;
          }  
          
          .menu-button {
            width: 42px;
            height: 42px;
          }
          
          .white-top{
            height: 19px !important;
          }  
        }

        /* For very small heights (less than 550px) */
        @media screen and (max-height: 551px) and (max-width: 1265px) {
          .chatbot-container {
            width: 280px !important;
            height: calc(100vh - 60px) !important;
            max-height: calc(100vh - 60px) !important;
            bottom: 10% !important;
            right: 5px !important;
          }
          
          .chatbot-inner {
            width: 72% !important;
            height: 90% !important;
            max-height: 90% !important;
            padding: 0 !important;
            padding-top: 0 !important;
            left: 14% !important;
            top: 5% !important;
          }

          .white-top {
            height: 23px !important;
          }

          .chat-header {
            height: 36px !important;
            padding: 8px 12px !important;
          }

          .chatbot-input-area {
            height: 32px !important;
            padding: 8px !important;
          }

          .send-button {
            width: 28px !important;
            height: 28px !important;
            padding: 6px !important;
          }
          
          .message-space {
            padding-bottom: 60px !important; /* Ensure space for input area */
          }

          .menu-button {
            bottom: 8% !important;
          }
          .all-menu {
            bottom: 8% !important;
          }  

          .type-message {
            font-size: 10px !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }

          .island {
            height: 16px !important;
          }
          
          .islandd{
            top: 1% !important;
          }

          .time-display {
            font-size: 10px !important;
            margin-left: 2px !important;
          }

          .services-button img,
          .faq-button img,
          .contact-button img,
          .about-us img {
            width: 28px !important;
            height: 28px !important;
          }

          .close-button img {
            width: 18px !important;
            height: 18px !important;
          }

          .menu-button img {
            width: 30px !important;
            height: 30px !important;
          }
        }

        /* For extremely small heights (less than 450px) */
        @media screen and (max-height: 449px) {
          .chatbot-container {
            width: 260px !important;
            height: calc(100vh - 40px) !important;
            bottom: 10% !important;
            right: 2px !important;
          }
          
          .chatbot-inner {
            width: 62% !important;
            height: 90% !important;
            max-height: 90% !important;
            padding: 0 !important;
            padding-top: 0 !important;
            left: 19% !important;
            top: 5% !important;
          }

          .white-top {
            height: 24px !important;
          }

          .chat-header {
            height: 28px !important;
            padding: 6px 10px !important;
          }

          .chat-header span {
            font-size: 14px !important;
          }

          .chatbot-input-area {
            height: 30px !important;
            padding: 6px !important;
          }

          .send-button {
            width: 24px !important;
            height: 24px !important;
            padding: 4px !important;
          }

          .menu-button {
            bottom: 8% !important;
          }
          .all-menu {
            bottom: 8% !important;
          }
          .message-space {
            padding-bottom: 60px !important; /* Ensure space for input area */
          }  

          .type-message {
            font-size: 9px !important;
            padding-left: 10px !important;
          }

          .island {
            height: 10px !important;
          }

          .islandd{
            top: 1% !important;
          }
          .time-display {
            font-size: 4px !important;
          }

          .services-button img,
          .faq-button img,
          .contact-button img,
          .about-us img {
            width: 20px !important;
            height: 20px !important;
          }

          .close-button img {
            width: 12px !important;
            height: 12px !important;
          }

          .menu-button img {
            width: 26px !important;
            height: 26px !important;
          }

          /* Reduce message padding for very small screens */
          .hide-scrollbar > div {
            padding: 4px !important;
          }
        }

        /* Medium screen adjustments (530px - 446px height) */
        @media screen and (max-height: 530px) and (min-height: 450px) {
          .chatbot-container {
            width: 260px !important;
            height: calc(100vh - 40px) !important;
            bottom: 10% !important;
            right: 2px !important;
          }
          
          .chatbot-inner {
            width: 194px !important;
            height: 90% !important;
            max-height: 90% !important;
            padding: 0 !important;
            padding-top: 0 !important;
            left: 13% !important;
            top: 5% !important;
          }

          .white-top {
            height: 24px !important;
          }

          .chat-header {
            height: 28px !important;
            padding: 6px 10px !important;
          }

          .chat-header span {
            font-size: 14px !important;
          }

          .chatbot-input-area {
            height: 30px !important;
            padding: 6px !important;
          }

          .send-button {
            width: 24px !important;
            height: 24px !important;
            padding: 4px !important;
          }

          .menu-button {
            bottom: 8% !important;
          }
          .all-menu {
            bottom: 8% !important;
          }
          .message-space {
            padding-bottom: 60px !important; /* Ensure space for input area */
          }  

          .type-message {
            font-size: 9px !important;
            padding-left: 10px !important;
          }

          .island {
            height: 10px !important;
          }

          .islandd{
            top: 1% !important;
          }
          .time-display {
            font-size: 4px !important;
          }

          .services-button img,
          .faq-button img,
          .contact-button img,
          .about-us img {
            width: 20px !important;
            height: 20px !important;
          }

          .close-button img {
            width: 12px !important;
            height: 12px !important;
          }

          .menu-button img {
            width: 26px !important;
            height: 26px !important;
          }

          /* Reduce message padding for very small screens */
          .hide-scrollbar > div {
            padding: 4px !important;
          }
        }
        

        /* For 1440px screens at 110% zoom (viewport becomes ~1309px) */
        @media screen and (max-width: 1400px) and (min-width: 1280px) {
          .chatbot-container {
            height: 550px !important;
            // bottom: 52px !important;
            width: 283px !important;
          }
          .chatbot-inner {
            left: 3% !important;
            width: 264px !important;
            height: 560px !important;
            top: -16px !important;
          }
          .chatbot-input-area {
            height: 38px !important;
            padding: 6px !important;
          }  
        } 

         /* =============================================
   DARK MODE ONLY — background-size corrections
   per breakpoint (light mode untouched)
   ============================================= */

/* 1280–1400px (laptop 110% zoom): container 283×550 → needs 117% */
@media screen and (max-width: 1400px) and (min-width: 1280px) {
  .chatbot-dark {
    background-size: 117% auto !important;
  }
}

/* Mobile portrait ≤698px height, ≥551px: container 273×450 → needs 99% */
@media screen and (max-width: 1265px) and (max-height: 698px) and (min-height: 551px) {
  .chatbot-dark {
    background-size: 99% auto !important;
  }
}

/* Mobile ≤551px height: container 280×calc(100vh-60) → needs 108% */
@media screen and (max-height: 551px) and (max-width: 1265px) {
  .chatbot-dark {
    background-size: 108% auto !important;
  }
}

/* Small mobile 530–450px height: container 260×calc(100vh-40) → needs 107% */
@media screen and (max-height: 530px) and (min-height: 450px) {
  .chatbot-dark {
    background-size: 107% auto !important;
  }
}

/* Very small mobile ≤449px height: container 260×calc(100vh-40) → needs 107% */
@media screen and (max-height: 449px) {
  .chatbot-dark {
    background-size: 107% auto !important;
  }
}
      `}</style>
    </>
  );
};

export default Chatbot;