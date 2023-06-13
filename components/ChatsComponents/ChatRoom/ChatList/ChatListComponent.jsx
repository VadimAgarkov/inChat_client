import ChatHeaderComponent from '../Header/ChatHeaderComponent.jsx';
import EmojiIcon from '../../../icons/Emoji.icon.jsx';
import AddFileIcon from '../../../icons/AddFile.icon.jsx';
import VectorUpIcon from '../../../icons/Vector_up.icon.jsx';
import Requests from '../../../services/requests.js';
import MessageField from '../MessageFieldComponent/MessageFieldComponent.jsx'
import { loadInitialMessages, loadMoreNextMessages, loadMorePreviousMessages, setTopHasMore, setBottomHasMore } from '../../../../Redux/actions/messageActions.js';

import css from './ChatListComponent.module.css';

import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';

const ChatListComponent = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const TopHasMore = useSelector((state) => state.topHasMore);
  const BottomHasMore = useSelector((state) => state.bottomHasMore);
  const cookie = getCookie("access_token");
  const userId = getCookie('inchatId')
  const [idSocket, setIdSocket] = useState(null)
  const [messagesForRender, setMessagesForRender] = useState([]);
  const socketRef = useRef();       
  const router = useRouter();
  const { id } = router?.query;
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const [discriber, setDiscriber] = useState();

  const getDataChats = async () => {
    if (id) {
      const res = await Requests.authenticate('/chats/get_data_for_chat', { cookie, id });
      setDiscriber(res?.data)
    }
  }

  // Обработчик отправки сообщения
  const handleSendMessage = () => {
    dispatch(setBottomHasMore(true));
    // Отправка сообщения
    let msg = document?.getElementById("message");
    if (msg?.value) {
      socketRef?.current.emit('send message', { chat_id: id, content: msg?.value, sender: cookie, })
      msg.value = '';
    };
    // Прокрутка вниз после отправки сообщения
  };

  const getLoadInitialMessages = () => {
    //начальные сообщения с сервера
    socketRef?.current?.emit('load_messages_for_pages', { id }, 20, userId, idSocket);
  };

  const getLoadMoreNextMessages = () => {
    if (BottomHasMore) {
      const lastMessage = messages[messages?.length - 1];
      const lastId = lastMessage?.id
      const count = 20;
      // Загружаем следующие сообщения с сервера
      socketRef?.current?.emit('loadMoreNextMessages', { id }, lastId, count, idSocket)
    } else {
      return BottomHasMore
    }
  };

  const getLoadMorePreviousMessages = () => {
    if (TopHasMore) {
      const firstMessage = messages[0]?.id;
      const count = 20;
      // Загружаем предыдущие сообщения с сервера
      socketRef?.current.emit('loadMorePreviousMessages', { id }, firstMessage, count, idSocket)
    } else {
      return TopHasMore
    }
  };

  useEffect(() => {
    getLoadInitialMessages();
  }, [idSocket]);

  useEffect(() => {
    socketRef.current = io.connect("ws://localhost:8081");
    socketRef.current.on('connect', function () {
      setIdSocket(() => socketRef.current.id)
    });

    getDataChats()

    socketRef.current.emit('online', +userId);

    socketRef?.current?.on('add messages', (msg) => {
      dispatch(loadInitialMessages(msg.msg))
      dispatch(setTopHasMore(msg.TopHasMore))
      dispatch(setBottomHasMore(msg.BottomHasMore))
    })
    //обработчик прокрутки
    socketRef.current.on('loadMoreNextMessages', (newMessages, bottomHasMore) => {
      dispatch(loadMoreNextMessages(newMessages))
      dispatch(setBottomHasMore(bottomHasMore))
    });

    socketRef.current.on('loadMorePreviousMessages', (newMessages, TopHasMore) => {
      if (newMessages) {
        dispatch(loadMorePreviousMessages(newMessages));
        dispatch(setTopHasMore(TopHasMore));
      } else {
        dispatch(setTopHasMore(TopHasMore));
      };
    });
    const container = containerRef?.current;
    container.addEventListener('scroll', handleScroll);
    //unmounting => 

    return () => {
      socketRef?.current.emit('offline', +userId)
      container?.removeEventListener('scroll', handleScroll);
      socketRef?.current.disconnect();
      dispatch(setBottomHasMore(true));
      dispatch(setTopHasMore(true));
      dispatch(loadInitialMessages([]))
    };
  }, [id, router?.isReady]);

  const handleScroll = () => {
    const container = containerRef?.current;
    // Дополнительная логика обработки прокрутки, если необходимо
    if (container?.scrollTop == 0) {
      // Доскроллили до самого верха
      getLoadMorePreviousMessages();
    } else if (container?.scrollTop + container?.clientHeight >= container?.scrollHeight) {
      // Доскроллили до самого низа
      getLoadMoreNextMessages();
    }
  };

  useEffect(() => {
    socketRef?.current.on('newMessage', (msg) => {
      dispatch(loadMoreNextMessages([msg?.msg]));
    });
    checkMessages()
  }, [messages]);

  const [prevHeight, setPrevHeight] = useState()

  const container = containerRef?.current;
  useEffect(() => {
    if (container?.scrollHeight) {
      setPrevHeight(container?.scrollHeight)
    }
  }, [container?.scrollHeight])

  useEffect(() => {
    const container = containerRef?.current;
    container.scrollTop = container?.scrollHeight - prevHeight
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messagesForRender]);

  const checkMessages = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const currentId = messages[i]?.id;
      for (let j = i - 1; j >= 0; j--) {
        if (messages[j]?.id === currentId) {
          messages.splice(j, 1);
        }
      }
    }
    return setMessagesForRender(messages)
  }

  const handleKeyPress = (e) => {
    e.key === 'Enter' ? handleSendMessage() : null
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <ChatHeaderComponent avatar ={discriber?.avatar || null} fullName={discriber?.fullName} state={discriber?.online} phone={discriber?.phone} />
      </div>
      <div
        className={css.list}
        onScroll={handleScroll}
        ref={containerRef}
      >
        <div className={css.scrollList}>
          {messagesForRender.map((msg, index) => {
            const currentDate = new Date(msg.date);
            const options = { day: 'numeric', month: 'long' };
            const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(
              currentDate
            );
            const prevMessage = messagesForRender[index - 1];
            const prevDate =
              prevMessage && new Date(prevMessage.date);

            return (
              <>
                {currentDate.getMonth() !== prevDate?.getMonth() && (
                  <div className={css.date} key={index}>
                    <div className={css.line} />
                    <div className={css.value}>{formattedDate}</div>
                    <div className={css.line} />
                  </div>
                )}
                <MessageField
                  message={msg}
                  key={msg.id}
                  CN={msg.sender === +userId ? css.left : css.right}
                  ref={index === messagesForRender.length - 1 ? listRef : null}
                />
              </>
            );
          })}
          <div ref={listRef} />
        </div>
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
            onKeyDown={handleKeyPress}
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
          <div className={css.send}>
            <VectorUpIcon
              width={33}
              height={30}
              color='#817CFF'
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChatListComponent;