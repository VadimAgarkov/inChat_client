import ChatHeaderComponent from '../Header/ChatHeaderComponent.jsx';
import EmojiIcon from '../../../icons/Emoji.icon.jsx';
import AddFileIcon from '../../../icons/AddFile.icon.jsx';
import VectorUpIcon from '../../../icons/Vector_up.icon.jsx';
import Requests from '../../../services/requests.js';
import MessageField from '../MessageFieldComponent/MessageFieldComponent.jsx'
import { loadInitialMessages, loadMoreNextMessages, loadMorePreviousMessages, setTopHasMore, setBottomHasMore } from '../../../../Redux/actions/messageActions.js';


import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';

import css from './ChatListComponent.module.css';

const ChatListComponent = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const TopHasMore = useSelector((state) => state.topHasMore);
  const BottomHasMore = useSelector((state) => state.bottomHasMore);

  const cookie = getCookie("access_token");
  // const [messages, setMessages] = useState([]);
  const [idUser, setIdUser] = useState();
  // const [stateTopHasMore, setStateTopHasMore] = useState(true)
  // const [stateBottomHasMore, setStateBottomHasMore] = useState(true);
  const socketRef = useRef();
  const router = useRouter();
  const { id } = router.query;
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const getData = async () => {
    const res = await Requests.authenticate('/user/token', { cookie, id });
    return setIdUser(() => res.data.user_id);
  };

  // Обработчик отправки сообщения
  const handleSendMessage = () => {
    dispatch(setBottomHasMore(false));
    console.log('Handle send message => Has More:', BottomHasMore)
    // Отправка сообщения
    let msg = document.getElementById("message");
    if (msg.value) {
      socketRef.current.emit('send message', { chat_id: id, content: msg.value, sender: cookie })
      msg.value = ''
    };
    // Прокрутка вниз после отправки сообщения
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  const getLoadInitialMessages = () => {
    //начальные сообщения с сервера
    socketRef.current.emit('load_messages_for_pages', { id }, 20);
  };

  const getLoadMoreNextMessages = () => {
    console.log('getLoadMoreNextMessages::next ')
    if (BottomHasMore) {
      const lastMessage = messages[messages?.length - 1];
      const lastId = lastMessage?.id
      const count = 20;
      // Загружаем следующие сообщения с сервера
      socketRef.current.emit('loadMoreNextMessages', { id }, lastId, count)
    } else {
      // console.log('loadMoreNextMessages => messages:::', messages)
      console.log('loadMoreNextMessages => BottomHasMore:::', BottomHasMore)
      return BottomHasMore
    }
  };

  const getLoadMorePreviousMessages = () => {
    if (TopHasMore) {
      const firstMessage = messages[0]?.id;
      const count = 20;
      // Загружаем предыдущие сообщения с сервера
      socketRef.current.emit('loadMorePreviousMessages', { id }, firstMessage, count)
    } else {
      // console.log('loadMorePrevMessages => messages:::', messages)
      console.log('loadMorePrevMessages => topHasMore:::', TopHasMore)
      return TopHasMore
    }
  };

  useEffect(() => {
    getData()
    socketRef.current = io.connect("ws://localhost:8081");

    socketRef.current.on('add messages', (msg) => {
      dispatch(loadInitialMessages(msg.msg))
    })

    socketRef.current.on('newMessage', (msg) => {
      console.log('event newMessage => HasMore :', BottomHasMore)
      if (BottomHasMore===false) {
        return console.log('newMessage:: message was got', msg.msg),
          dispatch(loadMoreNextMessages([msg.msg]));
      }
    });

    getLoadInitialMessages();

    const container = containerRef.current;
    const list = listRef.current;

    //обработчик прокрутки

    socketRef.current.on('loadMoreNextMessages', (newMessages, bottomHasMore) => {
      console.log('ON.loadMoreNextMessages => messages:::', newMessages, bottomHasMore)
      return dispatch(loadMoreNextMessages(newMessages)),
        dispatch(setBottomHasMore(bottomHasMore)),
        console.log('emit MoreNext messages = > BottomHasMore:', BottomHasMore, 'event bottonHasMoer:', bottomHasMore )
    });

    socketRef.current.on('loadMorePreviousMessages', (newMessages, TopHasMore) => {
      console.log(newMessages, TopHasMore)
      switch (newMessages) {
        case null:
          return dispatch(setTopHasMore(TopHasMore));
        case !null:
          return dispatch(loadMorePreviousMessages(newMessages)), dispatch(setTopHasMore(TopHasMore));
      }
    });

    container.addEventListener('scroll', handleScroll);

    //unmounting => 

    return () => {
      container.removeEventListener('scroll', handleScroll);
      socketRef.current.disconnect();
      dispatch(setBottomHasMore(true));
      dispatch(setTopHasMore(true));
      dispatch(loadInitialMessages([]))
    };
  }, [router.isReady]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container?.scrollTop == 0) {
      // Доскроллили до самого верха
      getLoadMorePreviousMessages();
    } else if (container?.scrollTop + container?.clientHeight >= container?.scrollHeight) {
      // Доскроллили до самого низа
      getLoadMoreNextMessages();
    }
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(()=>{
    console.log('useEffect BottomHasMore:',BottomHasMore)
    setBottomHasMore(BottomHasMore)
  },[BottomHasMore])

  return (
    <div className={css.container}>
      <div className={css.header}>
        <ChatHeaderComponent />
      </div>
      <div
        className={css.list}
        onScroll={handleScroll}
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

export default ChatListComponent;