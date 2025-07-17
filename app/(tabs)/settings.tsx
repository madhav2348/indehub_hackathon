import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { User } from 'lucide-react-native';
import LottieView from 'lottie-react-native';
import { useStreak } from '@/hooks/streakLogic';

export default function SettingsScreen() {
  const { completedWeeks } = useStreak();


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your Brushie experience</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Profile</Text>
          </View>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarEmoji}>👧</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
  <View style={styles.section}>
      <View style={styles.rowContainer}>
        {completedWeeks.length === 0 ? (
          <Text style={styles.noStreakText}>No completed weeks yet.</Text>
        ) : (
          completedWeeks.map((week, index) => (
            <View key={index} style={styles.streakItem}>
              <LottieView
                style={styles.lottieSection}
                source={require('../../assets/animation/glow_star.json')}
                autoPlay
                loop
              />
              <Text style={styles.completedStreak}>Week {week}</Text>
            </View>
          ))
        )}
      </View>
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
  title: {
    fontSize: 28,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
  },
  section: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    marginLeft: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 28,
  },
 


  completedStreak:{
    fontFamily: 'FredokaOne',
    color: '#FF6B35',
fontSize:16

  }
, 
centeredContent: {
  alignItems: 'center',
  justifyContent: 'center',
},

rowContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

streakItem: {
  alignItems: 'center',
  flex: 1,
},

lottieSection: {
  width: 60,
  height: 60,
  marginBottom: 6,
},
noStreakText: {
  fontSize: 16,
  color: '#888',
  fontStyle: 'italic',
},

});
