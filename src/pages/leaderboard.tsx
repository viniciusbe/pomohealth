import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head'
import axios from 'axios';

import { SideMenu } from '../components/SideMenu';
import styles from '../styles/pages/Leaderboard.module.css';

interface User {
    name: string;
    email: string;
    image: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Leaderboard() {

    const [_, loading] = useSession()
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/api/users').then(response => {
            console.log(response.data);
            setUsers(response.data)
        }
        )
    }, [])

    if (loading) {
        return (
            <h1>LOADING</h1>
        )
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Leaderboard | pomohealth</title>
            </Head>
            <SideMenu currentPage="leaderboard"></SideMenu>
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
                        {users.map((user, index) => (
                            <tr key={user.email}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                    />
                                    <div>
                                        <strong>{user.name}</strong>
                                        <div>
                                            <img src="/icons/level.svg" alt="level up arrow" />
                                            <p>Level {user.level}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.challengesCompleted} completed</td>
                                <td>{user.currentExperience} xp</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}