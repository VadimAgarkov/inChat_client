import ChatHeaderComponent from '../Header/ChatHeaderComponent.jsx';
import EmojiIcon from '../../../icons/Emoji.icon.jsx';
import AddFileIcon from '../../../icons/AddFile.icon.jsx';
import VectorUpIcon from '../../../icons/Vector_up.icon.jsx';
import Requests from '../../../services/requests.js';
import MessageField from '../MessageFieldComponent/MessageFieldComponent.jsx'

import {io} from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import css from './ChatListComponent.module.css';

const ChatListComponent = () => {
  const cookie = getCookie("access_token");
  const [messages, setMessages] = useState([]);
  const [idUser, setIdUser] = useState();
  const [TopHasMore, setTopHasMore] = useState(true)
  const [BottomHasMore, setBottomHasMore] = useState(true);
  const socketRef = useRef();
  const router = useRouter();
  const { id } = router.query;
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const getData = async () => {
    const res = await Requests.authenticate('/user/token', { cookie, id });
    return setIdUser(() => res.data.user_id);
  };

  const handleScroll = () => {
    console.log('messages event:', messages)
    const container = containerRef.current;
    const list = listRef.current;
    if (container?.scrollTop == 0) {
      // Доскроллили до самого верха
      loadMorePreviousMessages();
    } else if (container?.scrollTop + container?.clientHeight >= container?.scrollHeight) {
      // Доскроллили до самого низа
      loadMoreNextMessages();
    }
  };

  // Обработчик отправки сообщения
  const handleSendMessage = () => {
    // Отправка сообщения

    // Прокрутка вниз после отправки сообщения
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  const loadMoreNextMessages = () => {
    if(BottomHasMore) {
      console.log('messages event scroll:', messages)
      const lastMessage = messages[messages?.length-1];
      console.log(lastMessage)
      const lastId = lastMessage?.id
      const count = 20;
      console.log('scrollBottom => id:', lastId)
      // Загружаем следующие сообщения с сервера
      socketRef.current.emit('loadMoreNextMessages',{ id }, lastId, count)
    } else {
      return null
    }
  };

  const loadMorePreviousMessages = () => {
    if(TopHasMore) {
      const firstMessage = messages[0]?.id;
      const count = 20;
      console.log('scrollTop => id:',firstMessage)
      // Загружаем предыдущие сообщения с сервера
      socketRef.current.emit('loadMorePreviousMessages',{ id }, firstMessage, count)
    } else {
      return null
    }
  };

  useEffect(() => {
    getData()
    socketRef.current = io.connect("ws://localhost:8081");

    loadInitialMessages();

    const container = containerRef.current;
    const list = listRef.current;

    //обработчик прокрутки
    container.addEventListener('scroll', handleScroll);

    socketRef.current.on('loadMoreNextMessages', ( newMessages, BottomHasMore) => {
      setMessages((messages) => [...messages, ...newMessages]); 
      setBottomHasMore(BottomHasMore);
    });

    socketRef.current.on('loadMorePreviousMessages', (newMessages, TopHasMore) => {
      setMessages(prevMessages => [...newMessages, ...prevMessages]);
      setTopHasMore(TopHasMore);
    });

    //unmounting => 

    return () => {
      container.removeEventListener('scroll', handleScroll);
      socketRef.current.disconnect();
    };
  }, [router.isReady]);

  const loadInitialMessages = () => {
    //начальные сообщения с сервера
    socketRef.current.emit('load_messages_for_pages', { id }, 20);
  };


  return (
    <div className={css.container}>
      <div className={css.header}>
        <ChatHeaderComponent />
      </div>
      <div
        className={css.list}
        onScroll={() => handleScroll}
        ref={containerRef}
      >
        <div className={css.scrollList}>
          {messages.map((msg, index) => (
            <MessageField
              message={msg}
              CN={msg.sender === idUser ? css.left : css.right}
              key={msg.id}
              ref={index === messages.length - 1 ? listRef : null}
            />
          ))}
        </div>
        <div ref={listRef} />
      </div>
      <div className={css.sendField}>
        <div className={css.inputWrapper}>
          <EmojiIcon
            width={20}
            height={20}
            color='#817CFF'
          />
          <input
            className={css.input}
            id='message'
            type='text'
            placeholder='Введите сообщение'
          />
          <AddFileIcon
            width={20}
            height={20}
            color='#817CFF'
          />
        </div>
        <button
          className={css.btn}
         onClick={handleSendMessage} 
        >
          <VectorUpIcon
            width={44}
            height={44}
            color='#817CFF'
            className={css.send}
          />
        </button>
      </div>
    </div>
  );
};

// export default ChatListComponent;