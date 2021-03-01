import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';

import styles from '../styles/pages/SignIn.module.css';
import Home from '.';

function SignIn() {
    const [session, loading] = useSession()

    const router = useRouter()

    function handleGithubSignin() {
        signIn('github', { callbackUrl: 'http://localhost:3000' })
    }

    if (!loading && session) {
        router.push('/')

    }

    return (
        <div className={styles.container}>
            <div>
                <figure></figure>
                <a href="https://storyset.com/work" target="_blank" rel="noopener noreferrer">Illustration by Freepik Storyset</a>
            </div>
            <main>
                <img src="/pomo_logo.svg" alt="" />
                <div>
                    <p>Reach the next level of focus and health</p>
                    <button type="submit" onClick={handleGithubSignin}>
                        Sign In with Github
                        <img src="/icons/github.svg" alt="github" />
                    </button>
                </div>
            </main>
        </div>
    )
}

export default SignIn