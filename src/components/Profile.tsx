import { useSession } from 'next-auth/client'
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext)

    const [session, loading] = useSession()

    return (
        <div className={styles.profileContainer}>
            <img src={!loading ? session.user.image : undefined} alt={!loading ? session.user.name : undefined} />
            <div>
                <strong>
                    {!loading && session.user.name}
                </strong>

                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}