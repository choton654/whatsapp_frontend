import axios from 'axios';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import SideBar from './SideBar';
import { useStateValue } from './StateProvider';

function App() {
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

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

  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <div className='app'>
          <div className='app_body'>
            <BrowserRouter>
              <SideBar />
              <Switch>
                <Route
                  exact
                  path='/'
                  render={(props) => <Chat messages={messages} {...props} />}
                />
                <Route
                  exact
                  path='/rooms/:roomId'
                  render={(props) => <Chat messages={messages} {...props} />}
                />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
