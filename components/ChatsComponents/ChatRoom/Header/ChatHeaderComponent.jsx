import css from './ChatHeaderComponent.module.css';

import Image from 'next/image';
import { useRouter } from 'next/router';

import AvatarIcon from '../../../icons/Avatar.icon';
import GoBackIcon from '../../../icons/GoBack.icon';
import PhoneIcon from '../../../icons/Phone.icon';
import SearchIcon from '../../../icons/Search.icon';



const ChatHeaderComponent = (props) => {
  const {avatar, fullName, state, phone } = props
  const router = useRouter();

  const GoBack = () => { 
    router.back()
  };

  const CheckAvatar = (Avatar) => {
    if (Avatar) {
      <Image
        src={Avatar}
        alt="avatar"
        width={40}
        height={40}
        priority
      />
    } else {
      return <AvatarIcon width={40} height={40} color={'#817CFF'} />
    }
  };
  const Call = () => {
    alert((`Звоним ${fullName}....${phone}...Алло...`))
  }
  return (
    <div className={css.header}>
      <button className={css.btn} onClick={GoBack}>
        <GoBackIcon width={24} height={24} color={'#817CFF'} />
      </button>
      <div className={css.user_info}>
        <button className={css.btn}>
          {CheckAvatar(avatar)}
        </button>
        <div>
          <div>{fullName ? fullName : 'Contact'}</div>
          <div>{state ? 'Online' : 'Offline'}</div>
        </div>
      </div>
      <button className={css.btn} onClick={Call}>
        <PhoneIcon width={24} height={24} color={'#817CFF'} />
      </button>
      <button className={css.btn}>
        <SearchIcon width={24} height={24} color={'#817CFF'} />
      </button>
    </div>
  );
};

export default ChatHeaderComponent;