import axios from 'axios';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import SideBar from './SideBar';

function App() {
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/messege/all')
      .then((res) => setmessages(res.data));
  }, []);

  useEffect(() => {
    const pusher = new Pusher('786af382185166632e6c', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', function (data) {
      alert(JSON.stringify(data));
      setmessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className='app'>
      <div className='app_body'>
        <SideBar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
