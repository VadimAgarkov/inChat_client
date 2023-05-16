import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Requests from '../components/services/requests.js'
import styles from '../styles/Home.module.css'


export default function Home() {
  const router = useRouter();
  const checkCookie = getCookie('access_token');
  console.log('cookie::', checkCookie)

  const getData = async () => {
    if (checkCookie) {
      console.log('request with cookie')
      const res = await Requests.Authentication('/auth', { 'access_token': checkCookie })
      console.log('res:::', res)
      if (res.data == 'Not authorized') {
        console.log('Not authorized')
        router.push('/login')
      }
      if (res.data) {
        console.log('res:', res)
        router.push(`/user`)
      }
    } else {
      console.log('Not found your Tokens')
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
  )
}
