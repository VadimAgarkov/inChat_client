import FooterComponent from "../../Footer/Footer.jsx";
import ChatsHeaderComponent from '../ChatsHeader/ChatsHeader.jsx';
import ChatFieldComponent from '../ChatField/ChatFieldComponent.jsx';
import Request from '../../services/requests.js';

import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';

import css from './Chats.module.css';
import { useRouter } from "next/router.js";

const ChatsComponent = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const checkCookie = getCookie('access_token');
  const userId = getCookie('inchatId')
  const getData = async () => {
    const response = await Request.authenticate('/user/chats', { 'access_token': checkCookie });
    // if(response.data == null) {
    //   router.push('/')
    // }
    setData(() => response.data);
  };

useEffect(() => {
    const socket = io.connect("ws://localhost:8081");
    socket.emit('online', +userId);
    return () => {
      socket.emit('offline', +userId)
      socket.disconnect()
    }
  }, [userId])

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={css.container}>
      <ChatsHeaderComponent />
      <div className={css.main}>
        {data?.map((item) => (
          <Link href={'/chats/' + item.chat_id} key={item.chat_id} >
            <ChatFieldComponent
              key={item.chat_id}
              id={item.chat_id}
              initiator={item.initiator}
            />
          </Link>
        ))}
      </div>
      <FooterComponent />
    </div>
  );
};

export default ChatsComponent;