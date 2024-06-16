'use client'

import React, { useEffect } from 'react';

const ChatFrame: React.FC = () => {
  useEffect(() => {
    const iframe = document.createElement('iframe');

    const iframeStyles = (styleString: string) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(`
      .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
      }
    `);

    iframe.src = 'http://localhost:3000/chatbot';
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    window.addEventListener('message', (e) => {
      if (e.origin !== 'http://localhost:3000') return null;
      const dimensions = JSON.parse(e.data);
      iframe.width = dimensions.width;
      iframe.height = dimensions.height;
      iframe.contentWindow?.postMessage('aba8cb41-2ba6-424b-94e1-2b58b8bd6a24', 'http://localhost:3000/');
    });

    return () => {
      window.removeEventListener('message', () => null);
      document.body.removeChild(iframe);
    };
  }, []);

  return null;
};

export default ChatFrame;