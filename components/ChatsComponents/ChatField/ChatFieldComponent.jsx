import css from './ChatField.module.css';

import { useEffect, useState } from 'react';

import AvatarIcon from '../../icons/Avatar.icon';
import Request from '../../services/requests.js'

const ChatFieldComponent = (props) => {
  const [data, setData] = useState({});
  // const checkCookie = getCookie("access_token")
  const { id, initiator } = props;
  console.log('ИД чата из поля::', id);

  const getData = async () => {
    const response = await Request.Authentication('/chats/getChat', {
      "chat_id": id,
      "initiator": initiator
    });
    setData((data) => response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={css.field}>
      <div className={css.avatar}>
        <AvatarIcon
          width={40}
          height={40}
          color='#817CFF'
          className={css.header_icon}
        />
      </div>
      <div className={css.groupCenter}>
        {data.fullName}
        <div className={css.message}>
          lastMessage
        </div>
      </div>
      <div className={css.right}>
        state
      </div>
    </div>
  );
};

export default ChatFieldComponent;
