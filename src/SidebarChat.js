import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css';

const SidebarChat = () => {
  return (
    <div className='sidebarchat'>
      <Avatar />
      <div className='sidebarchat_info'>
        <h2>Room Name</h2>
        <p>This is a test message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
