import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🦷</Text>
        <Text style={styles.title}>Oops! Page not found</Text>
        <Text style={styles.text}>Brushie couldn't find this page!</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go back home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    marginBottom: 30,
    textAlign: 'center',
  },
  link: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
  },
});