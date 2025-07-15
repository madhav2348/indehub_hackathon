import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInCalendarDays, parseISO } from 'date-fns';

const STREAK_KEY = 'strict_weekly_streak';

export interface CompletedWeek {
  startDate: string;
}

export interface CurrentWeek {
  startDate: string;
  lastCheckDate: string;
  streak: number;
}

export interface StreakData {
  currentWeek: CurrentWeek | null;
  completedWeeks: CompletedWeek[];
}

export const checkInToday = async (): Promise<StreakData> => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const dataRaw = await AsyncStorage.getItem(STREAK_KEY);
  const data: StreakData = dataRaw
    ? JSON.parse(dataRaw)
    : { currentWeek: null, completedWeeks: [] };

  if (!data.currentWeek) {
    // Start new streak
    data.currentWeek = {
      startDate: todayStr,
      lastCheckDate: todayStr,
      streak: 1
    };
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(data));
    return data;
  }

  const lastDate = parseISO(data.currentWeek.lastCheckDate);
  const diff = differenceInCalendarDays(today, lastDate);

  if (diff === 0) {
    // Already checked in today
    return data;
  }

  if (diff > 1) {
    // Streak broken, reset without saving
    data.currentWeek = null;
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(data));
    return data;
  }

  // Continue streak
  data.currentWeek.streak += 1;
  data.currentWeek.lastCheckDate = todayStr;

  if (data.currentWeek.streak === 7) {
    // Full week completed
    data.completedWeeks.push({
      startDate: data.currentWeek.startDate
    });
    data.currentWeek = null;
  }

  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(data));
  return data;
};

export const getStreakStatus = async (): Promise<StreakData> => {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  return raw
    ? JSON.parse(raw)
    : { currentWeek: null, completedWeeks: [] };
};
