// components/WelcomeDialog.tsx
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

interface WelcomeDialogProps {
  visible: boolean;
  onDismiss: () => void;
  duration?: number; 
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ visible, onDismiss, duration = 7000 }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss, duration]);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.dialogBox}>
          <LottieView
            source={require('../assets/animation/dialy_star.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <Text style={styles.dialogText}>Welcome Back! ✨</Text>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  lottie: {
    width: 120,
    height: 120,
  },
  dialogText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeDialog;
