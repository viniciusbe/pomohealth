import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'
import { FaPlay, FaTimes, FaCheckCircle } from 'react-icons/fa';



export function Countdown() {
    const { minutes,
        seconds,
        hasFinished,
        isActive,
        resetCountdown,
        startCountdown,
        time,
        totalTime } = useContext(CountdownContext)

    const percertCurrentTime = Math.round((time * 100) / totalTime);
    console.log(time, totalTime);
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    type="button"
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                    <FaCheckCircle size="1.1rem" className={styles.reactIcons}></FaCheckCircle>
                    <div className={styles.loadedBar}></div>
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button
                                type="button"
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar ciclo
                                <FaTimes size="1.1rem" className={styles.reactIcons}></FaTimes>
                                <div className={styles.loadingBar}></div>
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    className={styles.countdownButton}
                                    onClick={startCountdown}
                                >
                                    Iniciar um ciclo
                                    <FaPlay size="0.8rem" className={styles.reactIcons}></FaPlay>
                                </button>
                            )}
                    </>
                )}

        </div>
    )
}