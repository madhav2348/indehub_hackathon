import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { User, Globe, Bell, Volume2, Palette, Info, CircleHelp as HelpCircle, Heart } from 'lucide-react-native';

export default function SettingsScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'Hindi', 'Kannada'];
  const renderLanguageOption = (language: string) => (
    <TouchableOpacity
      key={language}
      style={[
        styles.languageOption,
        selectedLanguage === language && styles.languageOptionSelected
      ]}
      onPress={() => setSelectedLanguage(language)}
    >
      <Text style={[
        styles.languageText,
        selectedLanguage === language && styles.languageTextSelected
      ]}>
        {language}
      </Text>
      {selectedLanguage === language && (
        <View style={styles.selectedIndicator} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
     
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Customize your Brushie experience
          </Text>
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
          <View style={styles.sectionHeader}>
            <Globe size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Language</Text>
          </View>
          
          <View style={styles.languageContainer}>
            {languages.map(renderLanguageOption)}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>     
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Volume2 size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Sound & Effects</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Palette size={24} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Appearance</Text>
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
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
  },
  languageContainer: {
    gap: 12,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageOptionSelected: {
    backgroundColor: '#E8F4FD',
    borderColor: '#4A90E2',
  },
  languageText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2C3E50',
  },
  languageTextSelected: {
    color: '#4A90E2',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4A90E2',
  },
  settingInfo: {
    flex: 1,
    marginLeft: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4A90E2',
  },
  encouragementContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  encouragementEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  encouragementTitle: {
    fontSize: 20,
    fontFamily: 'FredokaOne',
    color: '#4A90E2',
    marginBottom: 12,
    textAlign: 'center',
  },
  encouragementText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 24,
  },
});