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
  const Phone = () => {
    console.log('PhoneBTN:', phone);
  };
  const Message = async () => {
    const checkCookie = getCookie('access_token');
    const res = await Requests.authenticate('/chats/add_chat', { user_1: checkCookie, subscriber: id });
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
    <div className={css.container}>
      <div className={css.wrap_avatar_name}>
        {CheckAvatar(imageSrc)}
        <div className={css.fullName}>
          {fullName}
        </div>
      </div>
      <div className={css.phone_message}>
        <button className={css.btn} onClick={Phone}>
          <PhoneIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
        </button>
        <button className={css.btn} onClick={Message}>
          <MailIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
        </button>
      </div>
    </div>
  );
};

export default ContactField;