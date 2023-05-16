import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import InfiniteScroll from 'react-infinite-scroll-component';



const socket = io('http://localhost:3000'); // адрес сервера Socket.IO
const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    // Загрузка первой пачки сообщений при монтировании компонента
    loadMessages(0, 10);
  }, []);
  const loadMessages = (startIndex, count) => {
    // Запрос на сервер для загрузки сообщений
    socket.emit('loadMessages', startIndex, count, (newMessages) => {
      if (newMessages.length === 0) {
        // Если больше нет сообщений, установить флаг hasMore в false
        setHasMore(false);
      } else {
        // Добавление новых сообщений в список
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    });
  };
  const fetchMoreData = () => {
    // Загрузка следующей пачки сообщений при скроллинге
    const startIndex = messages.length;
    const count = 10;
    loadMessages(startIndex, count);
  };
  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {messages.map((message, index) => (
        <div key={index} className="message">
          {message}
        </div>
      ))}
    </InfiniteScroll>
  );
};
export default MessageList;