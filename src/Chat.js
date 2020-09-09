import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Axios from 'axios';
import React, { useState } from 'react';
import './Chat.css';

const Chat = ({ messages }) => {
  const [msg, setmsg] = useState('');

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />

        <div className='chat_headerinfo'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className='chat_headerright'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='chat_body'>
        {messages.map((message) => (
          <>
            <p
              className={`chat_message ${message.received && 'chat_reciver'}`}
              key={message._id}>
              <span className='chat_name'>{message.name}</span>
              {message.message}
              <span className='chat_timestamp'>{message.createdAt}</span>
            </p>
            {/* <span className='chat_timestamp'>{new Date().toUTCString()}</span> */}
          </>
        ))}
      </div>

      <div className='chat_footer'>
        <InsertEmoticonIcon />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // console.log( msg );
            Axios.post('http://localhost:5000/messege/new', {
              message: msg,
              name: 'Roy',
              received: true,
            }).then((res) => console.log(res.data));
          }}>
          <input
            type='text'
            placeholder='Type a message'
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
          />
          <button type='submit'>Send message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
