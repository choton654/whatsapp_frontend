import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';
import { useStateValue } from './StateProvider';

const Chat = ({ messages }) => {
  const { roomId } = useParams();
  const [msg, setmsg] = useState('');
  const [room, setroom] = useState('');
  const [msgs, setmsgs] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapShot) => {
          setroom(snapShot.data().name);
        });

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snap) => setmsgs(snap.docs.map((doc) => doc.data())));
    }
  }, [roomId]);

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />

        <div className='chat_headerinfo'>
          <h3>{room}</h3>
          <p>
            {new Date(msgs[msgs.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
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
        {msgs.map((message) => (
          <>
            {/* <p
              className={`chat_message ${message.received && 'chat_reciver'}`}
              key={message._id}>
              <span className='chat_name'>{message.name}</span>
              {message.message}
              <span className='chat_timestamp'>{message.createdAt}</span>
            </p> */}
            <p
              className={`chat_message ${
                message.name === user.displayName && 'chat_reciver'
              }`}
              key={message.timestamp}>
              <span className='chat_name'>{message.name}</span>
              {message.message}
              <span className='chat_timestamp'>
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </>
        ))}
      </div>

      <div className='chat_footer'>
        <InsertEmoticonIcon />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Axios.post('http://localhost:5000/messege/new', {
            //   message: msg,
            //   name: 'Roy',
            //   received: true,
            // } ).then( ( res ) => console.log( res.data ) );

            db.collection('rooms').doc(roomId).collection('messages').add({
              name: user.displayName,
              message: msg,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setmsg('');
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
