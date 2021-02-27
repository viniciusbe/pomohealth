import styles from '../styles/pages/LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.container}>
      <figure></figure>
      <main>
        <img src="/icons/logo.svg" alt="" />
        <h1>Welcome</h1>
        <p>Reach the next level of focus, production and health</p>
      </main>
    </div>
  )
}

export default LandingPage