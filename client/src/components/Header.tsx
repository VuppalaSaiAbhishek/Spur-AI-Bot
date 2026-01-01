import React from 'react';

function Header() {
  const handleNewChat= ()=>{
        localStorage.removeItem('sid');
        localStorage.removeItem('userchats');
        localStorage.clear(); 
        window.location.reload();
  }
  return (
    <header className="sticky top-0 z-50 bg-dark">
      <div className="container mx-auto px-3 " style={{ maxWidth: '600px'}}>
        <div className="d-flex align-items-center justify-content-between py-3 px-4">
          <div className="d-flex align-items-center gap-2">
                  <img 
                    src="/logo.png" 
                    alt="Spur Logo" 
                    className="rounded-circle shadow-sm"
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      objectFit: 'cover',
                      border: '1px solid rgba(255,255,255,0.1)' 
                    }} 
                  />
                  <span className="text-light fw-semibold" style={{ fontSize: '18px', letterSpacing: '0.5px' }}>
                    Spur Chat
                  </span>
          </div>
          <button
            onClick={handleNewChat}
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
          >
            <span>+</span>
            New Chat
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;