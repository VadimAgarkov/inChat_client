import Image from 'next/image'
import css from './ChatHeaderComponent.module.css'
import { useRouter } from 'next/router';
import AvatarIcon from '../../../icons/Avatar.icon';
import GoBackIcon from '../../../icons/GoBack.icon';
import PhoneIcon from '../../../icons/Phone.icon';
import SearchIcon from '../../../icons/Search.icon';

const ChatHeaderComponent = (props) => {
  const { Avatar, UserName, State, Phone } = props;
  const router = useRouter();

  const GoBack = () => {

    router.back()
  }

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
    console.log(`Звоним ${UserName}....${Phone}...Алло бля...`)
  }

  return (
    <div className={css.header}>
      <button className={css.btn} onClick={GoBack}>
        <GoBackIcon width={24} height={24} color={'#817CFF'} />
      </button>
      <div className={css.user_info}>
        <button className={css.btn}>
          {CheckAvatar(Avatar)}
        </button>
        <div>
          <div>{UserName ? UserName : 'Contact'}</div>
          <div>{State ? State : 'тут будет состояние'}</div>
        </div>
      </div>
      <button className={css.btn} onClick={Call}>
        <PhoneIcon width={24} height={24} color={'#817CFF'} />
        {/* <Image 
          src='/Phone.icon.svg'
          alt="Search"
          width={24}
          height={24}
          priority
        /> */}
      </button>
      <button className={css.btn}>
        <SearchIcon width={24} height={24} color={'#817CFF'} />
        {/* <Image
          src='/Options.icon.svg'
          alt="Search"
          // className={css.btn_icon}
          width={24}
          height={24}
          priority
        /> */}
      </button>
    </div>
  );
};

export default ChatHeaderComponent;





