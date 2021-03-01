import { signOut } from 'next-auth/client';
import Link from 'next/link'
import { FaHome, FaMedal, FaSignOutAlt } from 'react-icons/fa';

import styles from '../styles/components/SideMenu.module.css';

export function SideMenu() {

    function handleSignOut() {
        signOut({ callbackUrl: 'http://localhost:3000/signin' });
    }

    return (
        <nav className={styles.container}>
            <img src="/icons/logo_small.svg" alt="Logo" />
            <div>
                <Link href="/">
                    <a><FaHome size="2rem" color="#fff"></FaHome></a>
                </Link>
                <Link href="/leaderboard">
                    <a><FaMedal size="2rem" color="#fff"></FaMedal></a>
                </Link>
            </div>
            <button onClick={handleSignOut}>
                <FaSignOutAlt size="2rem" color="#fff"></FaSignOutAlt>
            </button>

        </nav >
    )
}