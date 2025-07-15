import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react-native';


interface BrushingScreenProps {
  visible: boolean;
  onClose: () => void;
}

export default function BrushingScreen({ visible, onClose }: BrushingScreenProps) {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('English');

  const brushingSteps = {
    English: [
      { area: 'Front Teeth', duration: 30, instruction: 'Brush the front of your teeth gently' },
      { area: 'Back Teeth', duration: 30, instruction: 'Now brush the back of your teeth' },
      { area: 'Top of Teeth', duration: 30, instruction: 'Don\'t forget the top surfaces!' },
      { area: 'Molars', duration: 30, instruction: 'Brush your molars for 30 seconds' },
    ],
    Hindi: [
      { area: 'आगे के दांत', duration: 30, instruction: 'अपने आगे के दांतों को धीरे से ब्रश करें' },
      { area: 'पीछे के दांत', duration: 30, instruction: 'अब अपने पीछे के दांतों को ब्रश करें' },
      { area: 'दांतों का ऊपरी हिस्सा', duration: 30, instruction: 'ऊपरी सतह को मत भूलिए!' },
      { area: 'मोलर्स', duration: 30, instruction: 'अपने मोलर्स को 30 सेकंड तक ब्रश करें' },
    ],
    Kannada: [
      { area: 'ಮುಂಭಾಗದ ಹಲ್ಲುಗಳು', duration: 30, instruction: 'ನಿಮ್ಮ ಮುಂಭಾಗದ ಹಲ್ಲುಗಳನ್ನು ನಿಧಾನವಾಗಿ ಬ್ರಷ್ ಮಾಡಿ' },
      { area: 'ಹಿಂಭಾಗದ ಹಲ್ಲುಗಳು', duration: 30, instruction: 'ಈಗ ನಿಮ್ಮ ಹಿಂಭಾಗದ ಹಲ್ಲುಗಳನ್ನು ಬ್ರಷ್ ಮಾಡಿ' },
      { area: 'ಹಲ್ಲುಗಳ ಮೇಲಿನ ಭಾಗ', duration: 30, instruction: 'ಮೇಲಿನ ಮೇಲ್ಮೈಗಳನ್ನು ಮರೆಯಬೇಡಿ!' },
      { area: 'ಮೋಲಾರ್‌ಗಳು', duration: 30, instruction: 'ನಿಮ್ಮ ಮೋಲಾರ್‌ಗಳನ್ನು 30 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಬ್ರಷ್ ಮಾಡಿ' },
    ],
  };

  const steps = brushingSteps[language as keyof typeof brushingSteps] || brushingSteps.English;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const stepDuration = 30;
    const elapsed = 120 - timeLeft;
    const newStep = Math.floor(elapsed / stepDuration);
    if (newStep < steps.length && newStep !== currentStep) {
      setCurrentStep(newStep);
    }
  }, [timeLeft, steps.length, currentStep]);

  const resetTimer = () => {
    setTimeLeft(120);
    setIsRunning(false);
    setCurrentStep(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((120 - timeLeft) / 120) * 100;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Brushing Time</Text>
          <View style={styles.languageSelector}>
            <TouchableOpacity 
              style={[styles.langButton, language === 'English' && styles.langButtonActive]}
              onPress={() => setLanguage('English')}
            >
              <Text style={[styles.langText, language === 'English' && styles.langTextActive]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.langButton, language === 'Hindi' && styles.langButtonActive]}
              onPress={() => setLanguage('Hindi')}
            >
              <Text style={[styles.langText, language === 'Hindi' && styles.langTextActive]}>HI</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.langButton, language === 'Kannada' && styles.langButtonActive]}
              onPress={() => setLanguage('Kannada')}
            >
              <Text style={[styles.langText, language === 'Kannada' && styles.langTextActive]}>KN</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Brushie Mascot */}
        <View style={styles.mascotContainer}>
          <View style={styles.mascotCircle}>
            <Text style={styles.mascotEmoji}>🦷</Text>
          </View>
          <Text style={styles.mascotText}>
            {timeLeft === 0 ? "Great job! Your teeth are sparkling clean! ✨" : 
             currentStep < steps.length ? steps[currentStep].instruction : "Keep brushing!"}
          </Text>
        </View>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
        </View>

        {/* Current Step */}
        {currentStep < steps.length && timeLeft > 0 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Current Focus:</Text>
            <Text style={styles.stepArea}>{steps[currentStep].area}</Text>
          </View>
        )}

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setIsRunning(!isRunning)}
            disabled={timeLeft === 0}
          >
            {isRunning ? (
              <Pause size={32} color="#FFFFFF" />
            ) : (
              <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
            <RotateCcw size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Completion Message */}
        {timeLeft === 0 && (
          <View style={styles.completionContainer}>
            <Text style={styles.completionEmoji}>🎉</Text>
            <Text style={styles.completionTitle}>Amazing work!</Text>
            <Text style={styles.completionText}>
              You've completed your 2-minute brushing routine. Brushie is so proud!
            </Text>
            <TouchableOpacity style={styles.doneButton} onPress={onClose}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
  },
  languageSelector: {
    flexDirection: 'row',
  },
  langButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 4,
  },
  langButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  langText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  langTextActive: {
    color: '#4A90E2',
  },
  mascotContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  mascotCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mascotEmoji: {
    fontSize: 40,
  },
  mascotText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 72,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '80%',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7ED321',
    borderRadius: 4,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 40,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  stepArea: {
    fontSize: 24,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7ED321',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 40,
    alignItems: 'center',
  },
  completionEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  completionTitle: {
    fontSize: 28,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    marginBottom: 16,
  },
  completionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  doneButton: {
    backgroundColor: '#7ED321',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
  },
});