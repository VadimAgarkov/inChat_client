import FooterComponent from "../../Footer/Footer.jsx";
import ChatsHeaderComponent from '../ChatsHeader/ChatsHeader.jsx';
import ChatFieldComponent from '../ChatField/ChatFieldComponent.jsx';
import Request from '../../services/requests.js';

import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import css from './Chats.module.css';

const ChatsComponent = () => {
  const [data, setData] = useState([]);
  const checkCookie = getCookie('access_token');
  const getData = async () => {
    const response = await Request.Authentication('/user/chats', { 'access_token': checkCookie });
    setData(() => response.data);
  };

  console.log('data chats::', data);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={css.container}>
      <ChatsHeaderComponent />
      <div className={css.main}>
        {data?.map((item) => (
          <Link href={'/chats/' + item.chat_id}>
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