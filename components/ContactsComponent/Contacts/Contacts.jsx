import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import io from 'socket.io-client';

import css from './Contacts.module.css';

import FooterComponent from '../../Footer/Footer.jsx';
import ContactField from '../Contact_field/Contact_field.jsx';
import Requests from '../../services/requests';
import GoBackIcon from '../../icons/GoBack.icon';
import SearchIcon from '../../icons/Search.icon';

const ContactsComponent = () => {

  const checkCookie = getCookie('access_token');
  const userId = getCookie('inchatId')
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await Requests.authenticate('/contacts', { 'access_token': checkCookie });
    setData(response.data);
    return data;
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const socket = io.connect("ws://localhost:8081");
    socket.emit('online', +userId);
    return () => {
      socket.emit('offline', +userId)
      socket.disconnect()
    }
  }, [userId])

  const sortedData = data.sort((a, b) => a.fullName.localeCompare(b.fullName));
  const groupedData = useMemo(() => sortedData.reduce((acc, cur) => {
    const firstLetter = cur.fullName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    };
    acc[firstLetter].push(cur);
    return acc;
  }, {}), [sortedData]);
  const router = useRouter();
  const GoBack = () => {
    router.back();
  };

  /////////////////////




  /////////////////////

  return (
    <div>
      <div className={css.header}>
        <button className={css.btn} onClick={GoBack}>
          <GoBackIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
        </button>
        <h1>
          Contacts
        </h1>
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
          {Object.keys(groupedData).map((letter) => {
            const items = groupedData[letter] || [];
            return (
              <div key={letter} className={css.key}>
                <div className={css.pref}>{letter}</div>
                <hr className={css.hr} />
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
    </div>
  );
};

export default ContactsComponent;