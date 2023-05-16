import css from './Contact_field.module.css';

import Image from 'next/image';
import Requests from '../../services/requests';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import AvatarIcon from '../../icons/Avatar.icon';
import PhoneIcon from '../../icons/Phone.icon';
import MailIcon from '../../icons/Mail.icon';


const ContactField = (props) => {
  const router = useRouter()
  const { imageSrc, fullName, phone, id } = props.props;
  console.log('ContactsField::: FullName, ID::',fullName, id)

  const Phone = () => {
    console.log('PhoneBTN:', phone);
  };

  const Message = async () => {
    const checkCookie = getCookie('access_token');
    const res = await Requests.Authentication('/chats/add_chat', { user_1: checkCookie, subscriber: id });
    
    console.log('response ID chat', res.data.chat.id)
    router.push(`/chats/${res.data.chat.id}`);
  };

  const CheckAvatar = (imageSrc) => {
    if (imageSrc) {
      <Image
        src={imageSrc}
        alt="avatar"
        width={44}
        height={44}
        priority
      />
    } else {
      return (
        <AvatarIcon
          width={44}
          height={44}
          color={'#817CFF'}
        />
      );
    };
  };

  return (
    <div className={css.container}>  {/* container */}
      <div className={css.wrap_avatar_name}>
        {CheckAvatar(imageSrc)}
        {/* <Image
          src={imageSrc ?? '/avatar.icon.svg'}
          alt="icon"
          width={44}
          height={44}
          priority
        /> */}
        <div className={css.fullName}>  {/* fullName */}
          {fullName}
        </div>
      </div>
      <div className={css.phone_message}> {/* phone&message */}
        <button className={css.btn} onClick={Phone}>
          <PhoneIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
          {/* <Image
            src='/Phone.icon.svg'
            alt="Phone"
            className={css.btn_icon}
            width={24}
            height={24}
            priority
          /> */}
        </button>
        <button className={css.btn} onClick={Message}>
          <MailIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
          {/* <Image
            src='/Mail.icon.svg'
            alt="Message"
            className={css.btn_icon}
            width={24}
            height={24}
            priority
          /> */}
        </button>
      </div>
    </div>
  );
};

export default ContactField;

