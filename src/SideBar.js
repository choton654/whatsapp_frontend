import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import './SideBar.css';
import SidebarChat from './SidebarChat';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src='https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' />
        <div className='sidebar_headerright'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='sideBar_search'>
        <div className='sideBar_searchontainer'>
          <SearchIcon />
          <input type='text' placeholder='search or start new chat' />
        </div>
      </div>

      <div className='sidebar_chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default SideBar;
