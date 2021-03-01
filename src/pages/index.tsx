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

  const [data, setData] = useState({})

  useEffect(() => {
    async function dataFetch() {
      const { data } = await axios.get('/api/user', {
        params: {
          email: session?.user.email
        }
      })

      setData(data)
    }
    console.log(data);


    dataFetch()
  }, [])

  if (loading) {
    return <h1>LOADING</h1>
  }

  if (!loading && !session) {
    return <SignIn></SignIn>
  }


  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <SideMenu></SideMenu>
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

    </ChallengesProvider>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}

export default Home;