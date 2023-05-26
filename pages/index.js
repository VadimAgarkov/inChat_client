import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Requests from '../components/services/requests.js'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  const checkCookie = getCookie('access_token');
  const getData = async () => {
    if (checkCookie) {
      const res = await Requests.Authentication('/auth', { 'access_token': checkCookie })
      if (res.data == 'Not authorized') {
        router.push('/login')
      }
      if (res.data) {
        router.push(`/user`)
      }
    } else {
      router.push('/login')
    }
  };
  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <Head>
        <title>InChat</title>
        <meta name="description" content="content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Image
            src="/logo.svg"
            alt="InChat Logo"
            width={254}
            height={91}
            priority
          />
        </div>
      </main>
    </>
  );
};
