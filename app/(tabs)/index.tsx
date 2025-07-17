import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Play, Flame, Lightbulb } from 'lucide-react-native';
import Rive from 'rive-react-native'
import LottieView from 'lottie-react-native';
import { useStreak } from '@/hooks/streakLogic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeDialog from '@/components/splash';

export default function HomeScreen() {
  const [showDialog, setShowDialog] = useState(true);
   const { streak } = useStreak();

 useEffect(() => {
    const checkWelcomeDialog = async () => {
      try {
        const lastShown = await AsyncStorage.getItem('lastWelcomeDate');
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        if (lastShown !== today) {
          setShowDialog(true);
          await AsyncStorage.setItem('lastWelcomeDate', today);
        }
      } catch (error) {
        console.error('Error checking welcome dialog:', error);
      }
    };

    checkWelcomeDialog();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Superstar! 🌟</Text>
        </View>
           <WelcomeDialog visible={showDialog} onDismiss={() => setShowDialog(false)} />

        {/* Brushie Mascot */}
        <View style={styles.mascotContainer}>
        
            <Rive   resourceName="mascot" 
        artboardName="Artboard"          
        animationName="State Machine 1"           
        autoplay={true}
        style={styles.riveStyle}

            />

            
           


          <Text style={styles.mascotText}>Hi! I'm Brushie!</Text>
          <Text style={styles.mascotSubtext}>Ready to keep your teeth sparkling clean?</Text>
        </View>

       


        <View style={styles.streakLottieWrapper}>
  <Text style={styles.streakHeading}>Week 1</Text>
  <View style={styles.starRow}>
    {[...Array(7)].map((_, index) => (
      <View key={index} style={styles.starItem}>
        <LottieView
          source={
            index < streak
              ? require('../../assets/animation/glow_star.json')
              : require('../../assets/animation/empty_star.json')
          }
          autoPlay
          loop={false}
          style={styles.starLottie}
        />

      </View>
      
    ))}
  </View>
</View>
      <Text>Debug streak: {streak}</Text>

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

       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
   riveStyle: {
    width: 300,
    height: 300,
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
  // startButton: {
  //   backgroundColor: '#7ED321',
  //   borderRadius: 25,
  //   marginBottom: 30,
  //   shadowColor: '#7ED321',
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 8,
  //   elevation: 8,
  // },
  // startButtonContent: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingVertical: 20,
  //   paddingHorizontal: 30,
  // },
  // startButtonText: {
  //   fontSize: 20,
  //   fontFamily: 'FredokaOne',
  //   color: '#FFFFFF',
  //   marginLeft: 12,
  // },
 streakLottieWrapper: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  marginBottom: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 4,
},
streakHeading: {
  fontSize: 20,
  fontFamily: 'FredokaOne',
  color: '#2C3E50',
  marginBottom: 16,
},
starRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
starItem: {
  width: 40,
  height: 40,
  marginHorizontal: 4,
},
starLottie: {
  width: '100%',
  height: '100%',
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