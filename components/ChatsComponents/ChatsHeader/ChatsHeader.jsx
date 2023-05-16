import AvatarIcon from '../../icons/Avatar.icon';
import SearchIcon from '../../icons/Search.icon';
import AddPhoneIcon from '../../icons/AddPhone.icon';
import PenIcon from '../../icons/Pen.icon';

import { useRouter } from 'next/router'

import css from './ChatsHeader.module.css';

const ChatsHeaderComponent = () => {
  const router = useRouter();

  const Search = () => {
    console.log('SEARCH BTN');
  };

  const AddPhone = () => {
    console.log('ADD Phone BTN');
  };

  const AddChat = () => {
    router.push('/chats/add_chat');
  };

  return (
    <div className={css.header}>
      <div className={css.header_left_avatar}>
        <AvatarIcon
          width={40}
          height={40}
          color='#817CFF'
        />
        {/* <Image 
          src='/avatar.icon.svg'
          alt="avatar"
          width={40}
          height={40}
          priority
        /> */}
      </div>
      <div className={css.text_header}>
        Chats
      </div>
      <div className={css.group_header_right}>
        <button className={css.option_btn} onClick={Search}>
          <SearchIcon
            width={24}
            height={24}
            color='#817CFF'
            className={css.header_icon}
          />
          {/* <Image
            src='/Search.icon.svg'
            alt="avatar"
            className={css.header_icon}
            width={24}
            height={24}
            priority
          /> */}
        </button>
        <button className={css.option_btn} onClick={AddPhone}>
          <AddPhoneIcon
            width={24}
            height={24}
            color='#817CFF'
            className={css.header_icon}
          />
          {/* <Image 
            src='/AddPhone.icon.svg'
            alt="avatar"
            className={css.header_icon}
            width={24}
            height={24}
            priority
          /> */}
        </button>
        <button className={css.option_btn} onClick={AddChat}>
          <PenIcon
            width={24}
            height={24}
            color='#817CFF'
            className={css.header_icon}
          />
          {/* <Image
            src='/Pen.icon.svg'
            alt="avatar"
            className={css.header_icon}
            width={24}
            height={24}
            priority
          /> */}
        </button>
      </div>
    </div>
  );
};

export default ChatsHeaderComponent;