import { useState } from 'react';
import { signIn } from 'next-auth/client'

import styles from '../styles/pages/LandingPage.module.css';

function LandingPage() {

  function handleGithubSignin() {
    signIn('github', { callbackUrl: 'http://localhost:3000/home' })
  }


  return (
    <div className={styles.container}>
      <figure></figure>
      <main>
        <img src="/icons/logo.svg" alt="" />
        <div>
          <h1>Welcome</h1>
          <button type="submit" onClick={handleGithubSignin}>Entrar</button>

        </div>
      </main>
    </div>
  )
}

export default LandingPage