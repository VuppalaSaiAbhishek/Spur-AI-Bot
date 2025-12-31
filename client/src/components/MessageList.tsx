import React from 'react';

const MessageList = ({ chatHistory, loading, formatMessage, scrollRef }: any) => {
  return (
    <div className="container py-1 mx-auto" style={{ maxWidth: '600px' }}>
      {chatHistory.map((chat: any, index: number) => (
        <div key={index} className={`d-flex mb-4 ${chat.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
          <div className={`d-flex ${chat.role === 'user' ? 'flex-row-reverse' : 'flex-row'} align-items-start`} style={{ maxWidth: '85%' }}>
            {chat.role === 'ai' && (
              <img src="/chat-bot.png" alt="AI" className="me-2" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', marginTop: '4px' }} />
            )}
            <div className="px-3 py-2 shadow-sm" style={{ backgroundColor: chat.role === 'user' ? '#202c33' : '#394242ff', color: '#ffffff', borderRadius: '16px', borderTopRightRadius: chat.role === 'ai' ? '16px' : '2px', borderTopLeftRadius: chat.role === 'user' ? '16px' : '2px' }}>
              <div className="text-break lh-base whitespace-pre-wrap" style={{ fontSize: '15px' }}>
                {formatMessage(chat.text)}
              </div>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="d-flex mb-4 justify-content-start">
          <div className="typing-bubble shadow-sm">
            <div className="dot" style={{ animationDelay: '0s' }}></div>
            <div className="dot" style={{ animationDelay: '0.2s' }}></div>
            <div className="dot" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageList;