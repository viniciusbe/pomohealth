import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import axios from 'axios';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { SideMenu } from '../components/SideMenu';
import SignIn from './signin';
import { useEffect, useState } from 'react';


interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

function Home(props: HomeProps) {

  const [session, loading] = useSession()
  if (!loading && !session) {
    return <SignIn></SignIn>
  }

  return (
    <div className={styles.container}>
      <SideMenu ></SideMenu>
      <div className={styles.contentContainer}>
        <Head>
          <title>Início | pomohealth</title>
        </Head>

        <ExperienceBar></ExperienceBar>

        <CountdownProvider>
          <section>
            <div>
              <Profile></Profile>
              <CompletedChallenges></CompletedChallenges>
              <Countdown></Countdown>
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </div>
  )
}

export default Home;