import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (url = 'http://127.0.0.1:5000') => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);

  return socketRef.current;
};