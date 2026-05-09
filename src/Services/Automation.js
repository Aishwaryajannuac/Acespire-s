import React from 'react';
import Footer from '../components/Footer';
import Chatbot from '../Home/Chatbot';

const Automation = () => (
  <div className="min-h-screen bg-primary">
    <div className="pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display font-extrabold text-4xl text-white mb-4">Automation</h1>
      <p className="text-muted font-body">Coming soon — page under construction.</p>
    </div>
    <Chatbot />
    <Footer />
  </div>
);

export default Automation;
