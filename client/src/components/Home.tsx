import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import { sendMessage } from '../services/chatService';
import Header from './Header';
import './Home.css';
interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

function Home() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);
  useEffect(() => {
     textareaRef.current?.focus();
  }, []);
  useEffect(() => {
    const savedChats = localStorage.getItem('userchats');
    if (savedChats) {
      try {
        setChatHistory(JSON.parse(savedChats));
      } catch {
        localStorage.removeItem('userchats');
      }
    }
  }, []);
  useEffect(() => {
    if (!loading) {
      textareaRef.current?.focus();
    }
  }, [loading])

  const handleAction = async () => {
    if (!message.trim() || loading) return;

    try {
      setLoading(true);
      const sid = localStorage.getItem('sid');
      
      const userText = message;
      setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
      setMessage('');
      let response = await sendMessage(userText, sid) as any;
      response = response.data;
      console.log(response);
      if (response.success) {
        if(response.sessionId){
          localStorage.setItem('sid', response.sessionId);
        }
         setChatHistory((prev: ChatMessage[]) => {
            const updated: ChatMessage[] = [
              ...prev,
            { role: 'ai', text: response.data }
            ];
          localStorage.setItem('userchats', JSON.stringify(updated));
          return updated; 
          });
      }
    }
    catch (error:any) {
      console.error("Chat Error:", error);
      let userFriendlyError = "Spur is having a small glitch. Please try again later.";
      if (error.message.includes("429") || error.message === "LIMIT_EXCEEDED") {
      userFriendlyError = "Daily limits reached! Spur needs some rest. Let's talk again tomorrow.";
    } else if (error.message.includes("401")) {
      userFriendlyError = "Authentication failed. System maintenance in progress.";
    } else if (!navigator.onLine) {
      userFriendlyError = "It looks like you're offline. Please check your internet.";
    }
      setChatHistory(prev => [...prev, { role: 'ai', text: userFriendlyError }]);
    } finally {
      setLoading(false);
    }

  };

  const formatMessage = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
  };

return (
    <div className="d-flex flex-column vh-100 bg-dark text-light">
      <Header />
      <main className="flex-grow-1 overflow-auto" style={{ backgroundColor: '#0b141a', paddingBottom: '140px' }}>
        {chatHistory.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <MessageList 
            chatHistory={chatHistory} 
            loading={loading} 
            formatMessage={formatMessage} 
            scrollRef={scrollRef} 
          />
        )}
      </main>
      <ChatInput 
        message={message} 
        setMessage={setMessage} 
        loading={loading} 
        handleAction={handleAction} 
        textareaRef={textareaRef} 
      />
    </div>
  );
}

export default Home;