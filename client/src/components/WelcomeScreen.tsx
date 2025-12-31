import React from 'react';

const WelcomeScreen = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5" 
         style={{ minHeight: '60vh' }}>
      
      {/* 1. Animated or Subtle Logo */}
      <div className="mb-4">
        <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center shadow-lg"
             style={{ width: '80px', height: '80px', border: '1px solid rgba(25, 195, 125, 0.2)' }}>
          <img 
            src="/logo.png" 
            alt="Spur Logo" 
            style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
          />
        </div>
      </div>

      {/* 2. Main Heading */}
      <h2 className="fw-bold mb-3 text-white" style={{ fontSize: '1.75rem' }}>
        How can I help you today?
      </h2>

      {/* 3. Sub-text */}
      <p className="text-secondary mx-auto" style={{ maxWidth: '400px', fontSize: '15px', lineHeight: '1.6' }}>
        I'm Spur, your AI assistant. Ask me anything from writing code to 
        brainstorming ideas. I'm here to help you get more done.
      </p>

      {/* 4. Quick Actions (Founding Engineer Touch) */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mt-4" style={{ maxWidth: '500px' }}>
        {['Explain React Hooks', 'Write a Poem', 'Gift ideas for techies'].map((text) => (
          <div 
            key={text}
            className="px-3 py-2 rounded-4 border border-secondary text-secondary small hover-effect"
            style={{ cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            "{text}"
          </div>
        ))}
      </div>

      <style>{`
        .hover-effect:hover {
          background-color: rgba(255,255,255,0.08) !important;
          color: white !important;
          border-color: #19c37d !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;