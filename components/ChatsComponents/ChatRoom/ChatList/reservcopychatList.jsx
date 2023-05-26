import ChatHeaderComponent from '../Header/ChatHeaderComponent.jsx';
import EmojiIcon from '../../../icons/Emoji.icon.jsx';
import AddFileIcon from '../../../icons/AddFile.icon.jsx';
import VectorUpIcon from '../../../icons/Vector_up.icon.jsx';
import Requests from '../../../services/requests.js'

import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import InfiniteScroll from 'react-infinite-scroll-component';

import css from './ChatListComponent.module.css';

const ChatListComponent = () => {
  const cookie = getCookie("access_token")
  const [messages, setMessages] = useState([]);
  const [idUser, setIdUser] = useState();
  const [hasMore, setHasMore] = useState(true);
  const socketRef = useRef();
  const router = useRouter();
  const { id } = router.query;

  const getData = async () => {
    const res = await Requests.authenticate('/user/token', { cookie, id })
    return setIdUser(() => res.data.user_id)
  };

  const loadMessages = (startIndex, count) => {
    if (router.isReady) {
      socketRef.current.emit('get_messages', { id }, startIndex, count, (newMessages) => {
        if (newMessages.length === 0) {
          // Если больше нет сообщений, установить флаг hasMore в false
          setHasMore(false);
        } else {
          // Добавление новых сообщений в список
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }
      });
    };
  };

  useEffect(() => {
    getData()
    socketRef.current = io.connect("ws://localhost:8081");
    loadMessages(0, 20);

    socketRef.current.on('messages', (msg) => {
      setMessages((messages) => msg);
    });

    socketRef.current.on('add message', (data) => {
      setMessages((messages) => [...messages, data.msg]);
      return messages
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [router.isReady]);

  const Send = () => {
    let msg = document.getElementById("message");
    if (msg.value) {
      socketRef.current.emit('send message', { chat_id: id, content: msg.value, sender: cookie })
      msg.value = ''
    };
  };

  const fetchMoreData = () => {
    // Загрузка следующей пачки сообщений при скроллинге
    console.log('pogination, hasMore:', hasMore)
    const startIndex = messages.length;
    const count = 20;
    loadMessages(startIndex, count);
  };

  const listRef = useRef(null);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <ChatHeaderComponent />
      </div>
      <div className={css.list}>
        <InfiniteScroll
          className={css.scrollList}
          dataLength={messages.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {messages.map((msg, index) => (
            <div
              ref={index === messages.length - 1 ? listRef : null}
              key={msg.id}
              className={msg.sender === idUser ? css.left : css.right}
            >
              {msg.content}
            </div>
          ))}
        </InfiniteScroll>
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
        <button className={css.btn} onClick={Send} >
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