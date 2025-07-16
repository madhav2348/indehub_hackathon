import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [lastStreakDate, setLastStreakDate] = useState<string | null>(null);

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = async () => {
    try {
      const today = new Date().toDateString();
      const storedDate = await AsyncStorage.getItem('lastStreakDate');
      const storedStreak = parseInt(await AsyncStorage.getItem('streak') || '0');
      const storedWeeks = JSON.parse(await AsyncStorage.getItem('completedWeeks') || '[]');

      setLastStreakDate(storedDate);
      setCompletedWeeks(storedWeeks);

      if (storedDate === today) {
        setStreak(storedStreak);
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (storedDate === yesterday.toDateString()) {
        const newStreak = storedStreak + 1;

        if (newStreak >= 7) {
          const weekNumber = Math.floor(newStreak / 7);
          const updatedWeeks = [...storedWeeks, weekNumber];

          await AsyncStorage.setItem('completedWeeks', JSON.stringify(updatedWeeks));
          await AsyncStorage.setItem('streak', '0');
          setStreak(0);
          setCompletedWeeks(updatedWeeks);
        } else {
          await AsyncStorage.setItem('streak', newStreak.toString());
          setStreak(newStreak);
        }
      } else {
        await AsyncStorage.setItem('streak', '1');
        setStreak(1);
      }

      await AsyncStorage.setItem('lastStreakDate', today);
    } catch (err) {
      console.error('Failed to load streak data', err);
    }
  };

  return {
    streak,
    completedWeeks,
    lastStreakDate,
  };
}
