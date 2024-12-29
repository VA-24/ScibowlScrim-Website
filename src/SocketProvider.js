import io from 'socket.io-client';
import { useDispatch } from 'react-redux'
import { createContext, useContext, useEffect, useState } from 'react';

const SocketContext = createContext(null);
export { SocketContext };

const useSocket = () => useContext(SocketContext);
export { useSocket };

function SocketProvider({ children }) {
    const dispatch = useDispatch();
    let [socket, setSocket] = useState(null);
  
    useEffect(() => {
      let socket = io();
  
      socket.on('connected', (msg) => {
        console.log(msg);
      });
  
      socket.on('room/create', (game) => {
        console.log('room/create', game);
        dispatch({ type: 'room/setRoomData', payload: game });
      });
  
      setSocket(socket);
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
  }
  
  export default SocketProvider;