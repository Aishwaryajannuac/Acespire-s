/**
 * ContactModalContext.jsx
 *
 * Place this file at:  src/context/ContactModalContext.jsx
 *
 * Wrap your entire app with <ContactModalProvider> in App.jsx (or index.jsx):
 *
 *   import { ContactModalProvider } from './context/ContactModalContext';
 *   <ContactModalProvider>
 *     <RouterProvider router={router} />   ← or whatever your root is
 *   </ContactModalProvider>
 *
 * Then anywhere in the app:
 *   import { useContactModal } from '../context/ContactModalContext';
 *   const { openModal } = useContactModal();
 *   <button onClick={() => openModal({ enquiryType: 'business' })}>
 *     Let's Talk Business
 *   </button>
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import ContactModal from '../components/ContactModal';

// ─── Context ──────────────────────────────────────────────
const ContactModalContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────
export const ContactModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen:           false,
    enquiryType:      'general',   // 'general' | 'business' | 'service' | 'products' | 'feedback'
    preSelectService: null,        // e.g. 'Supply Chain'
    preSelectProduct: null,        // e.g. 'HireOn AI'
    sourcePage:       null,        // e.g. 'Supply Chain Page'
  });

  /**
   * openModal({ enquiryType, preSelectService, preSelectProduct, sourcePage })
   *
   * enquiryType examples:
   *   'general'  → General Enquiry tab
   *   'business' → Business Enquiry tab
   *   'service'  → Service Enquiry tab  (optionally pass preSelectService)
   *   'products' → Products tab         (optionally pass preSelectProduct)
   *   'feedback' → Feedback tab
   *
   * Usage examples:
   *   openModal({ enquiryType: 'business' })
   *   openModal({ enquiryType: 'service', preSelectService: 'Supply Chain' })
   *   openModal({ enquiryType: 'products', preSelectProduct: 'HireOn AI' })
   */
  const openModal = useCallback((options = {}) => {
    setModalState({
      isOpen:           true,
      enquiryType:      options.enquiryType      || 'general',
      preSelectService: options.preSelectService || null,
      preSelectProduct: options.preSelectProduct || null,
      sourcePage:       options.sourcePage       || null,
    });
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.isOpen && (
        <ContactModal
          enquiryType={modalState.enquiryType}
          preSelectService={modalState.preSelectService}
          preSelectProduct={modalState.preSelectProduct}
          sourcePage={modalState.sourcePage}
          onClose={closeModal}
        />
      )}
    </ContactModalContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────
export const useContactModal = () => {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error('useContactModal must be used inside <ContactModalProvider>');
  }
  return ctx;
};