import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Play, Flame, Lightbulb } from 'lucide-react-native';

export default function HomeScreen() {
  const [waveAnimation] = useState(new Animated.Value(0));
  const [streak, setStreak] = useState(5);

  useEffect(() => {
    const animateWave = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    
    animateWave();
  }, []);

  const waveRotation = waveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Superstar! 🌟</Text>
        </View>

        {/* Brushie Mascot */}
        <View style={styles.mascotContainer}>
          <View style={styles.mascotCircle}>
            <Text style={styles.mascotEmoji}>🦷</Text>
            <Animated.Text 
              style={[
                styles.waveEmoji,
                { transform: [{ rotate: waveRotation }] }
              ]}
            >
              👋
            </Animated.Text>
          </View>
          <Text style={styles.mascotText}>Hi! I'm Brushie!</Text>
          <Text style={styles.mascotSubtext}>Ready to keep your teeth sparkling clean?</Text>
        </View>

        {/* Start Brushing Button */}
        <TouchableOpacity style={styles.startButton}>
          <View style={styles.startButtonContent}>
            <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Brushing</Text>
          </View>
        </TouchableOpacity>

        {/* Streak Counter */}
        <View style={styles.streakContainer}>
          <View style={styles.streakIcon}>
            <Flame size={24} color="#FF6B35" />
          </View>
          <View style={styles.streakTextContainer}>
            <Text style={styles.streakNumber}>{streak} Day</Text>
            <Text style={styles.streakLabel}>Streak!</Text>
          </View>
        </View>

        {/* Tip of the Day */}
        <View style={styles.tipContainer}>
          <View style={styles.tipHeader}>
            <Lightbulb size={20} color="#F5A623" />
            <Text style={styles.tipTitle}>Tip of the Day</Text>
          </View>
          <Text style={styles.tipText}>
            Brush for 2 minutes! Cover the front, back, and top of your teeth for a super clean smile! ✨
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionEmoji}>🛁</Text>
              <Text style={styles.actionText}>Bath Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionEmoji}>🥗</Text>
              <Text style={styles.actionText}>Healthy Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionEmoji}>💤</Text>
              <Text style={styles.actionText}>Good Sleep</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionEmoji}>🏃</Text>
              <Text style={styles.actionText}>Exercise</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    textAlign: 'center',
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mascotCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  mascotEmoji: {
    fontSize: 48,
  },
  waveEmoji: {
    fontSize: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  mascotText: {
    fontSize: 20,
    fontFamily: 'FredokaOne',
    color: '#4A90E2',
    marginBottom: 8,
  },
  mascotSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
    maxWidth: 250,
  },
  startButton: {
    backgroundColor: '#7ED321',
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#7ED321',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  startButtonText: {
    fontSize: 20,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  streakIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  streakTextContainer: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 24,
    fontFamily: 'FredokaOne',
    color: '#FF6B35',
  },
  streakLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#7F8C8D',
  },
  tipContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontFamily: 'FredokaOne',
    color: '#F5A623',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2C3E50',
    lineHeight: 24,
  },
  quickActions: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2C3E50',
    textAlign: 'center',
  },
});