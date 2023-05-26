import Image from 'next/image';

import styles from './Field.module.css';

const Field = (props) => {
  const { imageSrc, name, value, state } = props;

  const CheckAvatar = (imageSrc) => {
    if (imageSrc) {
      <Image
        src={imageSrc}
        alt="avatar"
        width={20}
        height={20}
        priority
      />
    } else {
      return (
        <AvatarIcon
          width={20}
          height={20}
          color={'#817CFF'}
        />
      );
    };
  };

  return (
    <div className={styles.field_wrapper}>
      <div className={styles.field_icon}>
        {CheckAvatar(imageSrc)}
      </div>
      <div className={styles.field_value}>
        <div>{name}</div>
        <div>{value || state}</div>
      </div>
    </div>
  );
};

export default Field;