import { useSession } from 'next-auth/client';
import { useContext } from 'react';

import { SideMenu } from '../components/SideMenu';
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import styles from '../styles/pages/Leaderboard.module.css';

export default function Leaderboard() {

    const [session, loading] = useSession()

    const { level, challengesCompleted, currentExperience } = useContext(ChallengesContext)

    console.log(level);
    if (loading) {
        return (
            <h1>LOADING</h1>
        )
    }

    return (
        <div className={styles.container}>
            <SideMenu></SideMenu>
            <div className={styles.leaderboardContainer}>
                <h1>Leaderboard</h1>
                <table className={styles.leaderboard}>
                    <thead>
                        <tr>
                            <th>POSITION</th>
                            <th>USER</th>
                            <th>CHALLENGES</th>
                            <th>XP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>1</td>
                            <td>
                                <img
                                    src={session.user.image}
                                    alt={session.user.name}
                                />
                                <div>
                                    <strong>{session.user.name}</strong>
                                    <div>
                                        <img src="/icons/level.svg" alt="level up arrow" />
                                        <p>Level {level}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{challengesCompleted} completed</td>
                            <td>{currentExperience} xp</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>CHALLENGES</td>
                            <td>XP</td>
                            <td>POSITION</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}