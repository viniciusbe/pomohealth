import { createContext, useState, ReactNode, useEffect, useRef } from 'react';
import axios from 'axios';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

import { useSession } from 'next-auth/client';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface challengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: challengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const [session, loading] = useSession()

    const canUpdate = useRef(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        if (!loading && session) {
            axios.get('/api/user', {
                params: {
                    name: session.user.name,
                    email: session.user.email,
                    image: session.user.image
                }
            }).then(response => {
                setLevel(response.data.level)
                setCurrentExperience(response.data.currentExperience)
                setChallengesCompleted(response.data.challengesCompleted)
            })
        }
    }, [loading])

    useEffect(() => {

        if (!canUpdate.current) {
            return;
        }

        async function saveStats() {
            await axios.post('/api/user', {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                level,
                currentExperience,
                challengesCompleted
            })
        }
        saveStats()
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('./notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🏋️‍♂️🏋️‍♀️', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        canUpdate.current = true;
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal></LevelUpModal>}
        </ChallengesContext.Provider>
    )
}