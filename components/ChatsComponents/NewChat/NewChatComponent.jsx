import FooterComponent from '../../Footer/Footer.jsx';
import ContactField from '../../ContactsComponent/Contact_field/Contact_field.jsx';
import Requests from '../../services/requests.js';
import GoBackIcon from '../../icons/GoBack.icon.jsx';
import SearchIcon from '../../icons/Search.icon.jsx';

import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import css from './AddChat.module.css';

const AddChatComponent = () => {
  const checkCookie = getCookie('access_token');
  const [data, setData] = useState([]);
  const router = useRouter();

  const getData = async () => {
    const response = await Requests.Authentication('/contacts', { 'access_token': checkCookie });
    setData(response.data);
    return data;
  };
  useEffect(() => {
    getData();
  }, []);
  const GoBack = () => {
    router.back();
  };
  const sortedData = data.sort((a, b) => a.fullName.localeCompare(b.fullName));
  const alphabet = [];
  const groupedData = sortedData.reduce((acc, cur) => {
    const firstLetter = cur.fullName[0].toUpperCase();
    if (alphabet.includes(firstLetter)) {
      alphabet
    } else {
      alphabet.push(firstLetter);
    };
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    };
    acc[firstLetter].push(cur);
    return acc;
  }, {});

  return (
    <section>
      <div className={css.header}>
        <button className={css.btn} onClick={GoBack}>
          <GoBackIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
        </button>
        <h1>New Chat</h1>
        <button className={css.btn}>
          <SearchIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
        </button>
      </div>
      <div className={css.contacts}>
        <div>
          {alphabet.map((letter) => {
            const items = groupedData[letter] || [];
            return (
              <div key={letter} className={css.key}>
                <div className={css.pref}>{letter}</div>
                <hr className={css.hr}></hr>
                <div>
                  {items.map((item) => (
                    <ContactField
                      key={item.id}
                      props={item}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <FooterComponent />
      </div>
    </section>
  );
};

export default AddChatComponent;