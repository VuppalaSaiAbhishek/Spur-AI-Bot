import React from 'react';

const WelcomeScreen = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5" 
         style={{ minHeight: '60vh' }}>
      
      {/* 1. Subtle Logo - Removed green opacity to match your 'no color' preference */}
      <div className="mb-4">
        <div className="rounded-circle d-flex align-items-center justify-content-center shadow-lg"
             style={{ width: '80px', height: '80px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <img 
            src="/logo.png" 
            alt="Spur Logo" 
            style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
          />
        </div>
      </div>

      {/* 2. Main Heading */}
      <h2 className="fw-bold mb-3 text-white" style={{ fontSize: '1.75rem' }}>
        How can I help  you?
      </h2>

      {/* 3. Sub-text - Updated to reflect real Spur services */}
      <p className="text-secondary mx-auto" style={{ maxWidth: '450px', fontSize: '15px', lineHeight: '1.6' }}>
        I'm the Spur support assistant. I can help you with questions regarding 
        our return policies, shipping updates, or refund status.
      </p>

      <style>{`
        .hover-effect:hover {
          background-color: rgba(255,255,255,0.08) !important;
          color: white !important;
          border-color: rgba(255,255,255,0.5) !important; /* Removed green border */
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;