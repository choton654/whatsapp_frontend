import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';

const SidebarChat = ({ id, name, addNewChat }) => {
  const [msgs, setmsgs] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snap) => setmsgs(snap.docs.map((doc) => doc.data())));
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt('Enter a room name');

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link
      to={`/rooms/${id}`}
      style={{
        textDecoration: 'none',
      }}>
      <div className='sidebarchat'>
        <Avatar />
        <div className='sidebarchat_info'>
          <h2>{name}</h2>
          <p>{msgs[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarchat'>
      <h1>Add New Chat</h1>
    </div>
  );
};

export default SidebarChat;
