import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import './SideBar.css';
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';

const SideBar = () => {
  const [rooms, setRooms] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unSuscribe = db.collection('rooms').onSnapshot((snapShot) => {
      setRooms(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });

    return () => {
      unSuscribe();
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src={user?.photoURL} />
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
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
