/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import './App.css';
import Header from './components/Header';
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './features/Auth/components/Register';
import Login from './features/Auth/components/Login';

import { useSelector } from 'react-redux';
import UpdateUserProfile from './features/User/components/UpdateUserProfile';
import GroupFeature from './features/Group';
import InviteGroup from './features/InviteGroup';
import PresentationList from './features/Presentation/components/PresentationList';
import PresentationFeature from './features/Presentation';
import FormPlayerMultipleChoice from './features/Presentation/components/FormPlayerMultipleChoice';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import ChatDialog from './features/Presentation/components/Chat';

const a = "https://web2-backend-8wpp.onrender.com";
const b = "http://localhost:5000";

function App() {
  const loggedInUser = useSelector(state => state.user.current)
  const isLoginIn = !!loggedInUser._id;

  const [socket, setSocket] = useState(null);
  useEffect(() => {
      const newSocket = io(a);
      setSocket(newSocket);
      return () => newSocket.close();
  }, [setSocket]);

  if (isLoginIn) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/chat" element={<ChatDialog socket={socket}/>} />
          <Route path="/player" element={<FormPlayerMultipleChoice socket={socket}/>} />
          <Route path="/presentation/*" element={<PresentationFeature socket={socket}/>} />
          <Route path="/groups/*" element={<GroupFeature />} />
          <Route path="/invite/:groupId" element={<InviteGroup />} />
          <Route path="/" element={<Navigate to="/groups" />} />
          <Route path="/profile" element={<UpdateUserProfile />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  if (!isLoginIn) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/player" element={<FormPlayerMultipleChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

}

export default App;
