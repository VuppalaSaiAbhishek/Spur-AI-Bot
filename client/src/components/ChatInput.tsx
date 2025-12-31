import React from 'react';

const ChatInput = ({ message, setMessage, loading, handleAction, textareaRef }: any) => {
  return (
    <footer className="bg-dark position-sticky bottom-0 p-3">
      <div className="container mx-auto" style={{ maxWidth: "600px" }}>
        <div className="d-flex align-items-center rounded-5 bg-secondary bg-opacity-25 p-2 shadow-sm">
          <textarea
            ref={textareaRef}
            className="form-control border-0 bg-transparent flex-grow-1 text-white shadow-none focus:ring-0 focus:outline-none py-2 px-3 text-[15px]"
            placeholder={loading ? "Wait for a Response..." : "Message Spur Chat..."}
            value={message}
            disabled={loading}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAction(); } }}
            rows={1}
            style={{ maxHeight: '200px', overflow: 'auto', scrollbarWidth: 'none', resize: 'none' }}
          />
          <style>{`
            textarea::placeholder {
              color: ${loading ? '#71717a !important' : '#ffffff !important'};
              opacity: ${loading ? '1 !important' : '0.6 !important'};
            }
          `}</style>
          <button 
            onClick={handleAction} 
            disabled={loading || !message.trim()} 
            className={`border-0 rounded-3 d-flex align-items-center justify-content-center ms-2 w-12 h-12 bg-transparent 
              ${message.trim() && !loading ? "text-white" : "text-secondary opacity-50"}`}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-center text-secondary mt-2 mb-0 small">Spur Chat can make mistakes.</p>
      </div>
    </footer>
  );
};

export default ChatInput;