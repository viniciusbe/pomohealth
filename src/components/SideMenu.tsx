import Link from 'next/link'
import { FaHome, FaMedal } from 'react-icons/fa';

import styles from '../styles/components/SideMenu.module.css';

export function SideMenu() {
    return (
        <nav className={styles.container}>
            <h1>Logo</h1>
            <div>
                <Link href="/">
                    <a><FaHome size="2rem" color="#927fbf"></FaHome></a>
                </Link>
                <Link href="/leaderboard">
                    <a><FaMedal size="2rem" color="#927fbf"></FaMedal></a>
                </Link>
            </div>
        </nav >
    )
}