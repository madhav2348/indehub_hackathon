import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Play, ArrowLeft, RotateCcw } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface Germ {
  id: string;
  x: number;
  y: number;
  type: 'cute' | 'devil';
  popped: boolean;
}

export default function GamesScreen() {
  const [currentGame, setCurrentGame] = useState<'menu' | 'germ-game' | 'story'>('menu');
  const [germs, setGerms] = useState<Germ[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft]);

  const generateGerms = () => {
    const newGerms: Germ[] = [];
    for (let i = 0; i < 8; i++) {
      newGerms.push({
        id: Math.random().toString(),
        x: Math.random() * (width - 100),
        y: Math.random() * 400 + 150,
        type: Math.random() > 0.3 ? 'devil' : 'cute',
        popped: false,
      });
    }
    setGerms(newGerms);
  };

  const startGermGame = () => {
    setCurrentGame('germ-game');
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    generateGerms();
  };

  const popGerm = (germId: string) => {
    setGerms(prev => 
      prev.map(germ => {
        if (germ.id === germId && !germ.popped) {
          setScore(prevScore => prevScore + (germ.type === 'devil' ? 10 : 5));
          return { ...germ, popped: true };
        }
        return germ;
      })
    );

    setTimeout(() => {
      setGerms(prev => prev.filter(germ => germ.id !== germId));
    }, 300);

    if (germs.filter(g => !g.popped).length <= 1) {
      generateGerms();
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(false);
    setGerms([]);
  };

  const renderGameMenu = () => (
    <ScrollView contentContainerStyle={styles.menuContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Fun Games</Text>
        <Text style={styles.subtitle}>Learn while you play with Brushie!</Text>
      </View>

      <TouchableOpacity style={styles.gameCard} onPress={startGermGame}>
        <View style={styles.gameCardContent}>
          <Text style={styles.gameEmoji}>🦠</Text>
          <View style={styles.gameTextContainer}>
            <Text style={styles.gameTitle}>Game</Text>
            {/* <Text style={styles.gameDescription}>
              Help Brushie pop the germs! Tap the devil germs to protect your teeth!
            </Text> */}
          </View>
          <Play size={24} color="#4A90E2" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.gameCard} 
        onPress={() => setCurrentGame('story')}
      >
        <View style={styles.gameCardContent}>
          <Text style={styles.gameEmoji}>📚</Text>
          <View style={styles.gameTextContainer}>
            <Text style={styles.gameTitle}>Adventure</Text>
           
          </View>
          <Play size={24} color="#4A90E2" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderGermGame = () => (
    <View style={styles.gameScreen}>
      <View style={styles.gameHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentGame('menu')}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.gameStats}>
          <Text style={styles.gameStatsText}>Score: {score}</Text>
          <Text style={styles.gameStatsText}>Time: {timeLeft}s</Text>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <RotateCcw size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.gameArea}>
        {!gameActive && timeLeft === 30 && (
          <View style={styles.gameStartContainer}>
            <Text style={styles.gameInstructions}>
              Tap the germs to pop them! Devil germs give more points than cute germs.
            </Text>
            <TouchableOpacity style={styles.startGameButton} onPress={startGermGame}>
              <Text style={styles.startGameText}>Tap to Play</Text>
            </TouchableOpacity>
          </View>
        )}

        {!gameActive && timeLeft === 0 && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverEmoji}>🎉</Text>
            <Text style={styles.gameOverTitle}>Game Over!</Text>
            <Text style={styles.gameOverScore}>Final Score: {score}</Text>
            <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {gameActive && germs.map(germ => (
          <TouchableOpacity
            key={germ.id}
            style={[
              styles.germ,
              {
                left: germ.x,
                top: germ.y,
                opacity: germ.popped ? 0.3 : 1,
              }
            ]}
            onPress={() => popGerm(germ.id)}
            disabled={germ.popped}
          >
            <Text style={styles.germEmoji}>
              {germ.type === 'devil' ? '😈' : '😊'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStoryScreen = () => (
    <ScrollView contentContainerStyle={styles.storyContainer}>
      <TouchableOpacity 
        style={styles.storyBackButton}
        onPress={() => setCurrentGame('menu')}
      >
        <ArrowLeft size={24} color="#4A90E2" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.storyContent}>
        <Text style={styles.storyTitle}>Brushie and the Lost Tooth Kingdom</Text>
        
        <View style={styles.storySection}>
          <Text style={styles.storyEmoji}>🏰</Text>
          <Text style={styles.storyText}>
            Once upon a time, in a magical kingdom made entirely of sparkling white teeth, 
            there lived a brave little tooth named Brushie.
          </Text>
        </View>

        <View style={styles.storySection}>
          <Text style={styles.storyEmoji}>😈</Text>
          <Text style={styles.storyText}>
            One dark day, evil sugar germs attacked the kingdom! They wanted to make 
            all the beautiful white teeth turn yellow and weak.
          </Text>
        </View>

        <View style={styles.storySection}>
          <Text style={styles.storyEmoji}>🦷</Text>
          <Text style={styles.storyText}>
            But Brushie was ready! With his magical toothbrush sword and fluoride shield, 
            he fought bravely against the germs.
          </Text>
        </View>

        <View style={styles.storySection}>
          <Text style={styles.storyEmoji}>✨</Text>
          <Text style={styles.storyText}>
            "Remember," Brushie called to all the children in the kingdom, 
            "brush for 2 minutes every morning and night, and the germs can never win!"
          </Text>
        </View>

        <View style={styles.storySection}>
          <Text style={styles.storyEmoji}>🎉</Text>
          <Text style={styles.storyText}>
            And so, with everyone's help, the Lost Tooth Kingdom was saved, 
            and all the teeth lived happily ever after, sparkling clean and strong!
          </Text>
        </View>

        <View style={styles.storyEnd}>
          <Text style={styles.storyEndText}>The End</Text>
          <Text style={styles.storyMoral}>
            Remember: Brushie believes in you! Keep your teeth clean and strong! 🦷✨
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  switch (currentGame) {
    case 'germ-game':
      return <SafeAreaView style={styles.container}>{renderGermGame()}</SafeAreaView>;
    case 'story':
      return <SafeAreaView style={styles.container}>{renderStoryScreen()}</SafeAreaView>;
    default:
      return <SafeAreaView style={styles.container}>{renderGameMenu()}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  menuContainer: {
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
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  gameCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameEmoji: {
    fontSize: 48,
    marginRight: 20,
  },
  gameTextContainer: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 20,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    lineHeight: 20,
  },
  gameScreen: {
    flex: 1,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  gameStats: {
    alignItems: 'center',
  },
  gameStatsText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  resetButton: {
    padding: 8,
  },
  gameArea: {
    flex: 1,
    backgroundColor: '#E8F4FD',
    position: 'relative',
  },
  gameStartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  gameInstructions: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  startGameButton: {
    backgroundColor: '#7ED321',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  startGameText: {
    fontSize: 20,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  gameOverEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  gameOverTitle: {
    fontSize: 28,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    marginBottom: 16,
  },
  gameOverScore: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#4A90E2',
    marginBottom: 30,
  },
  playAgainButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  playAgainText: {
    fontSize: 18,
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
  },
  germ: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  germEmoji: {
    fontSize: 32,
  },
  storyContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  storyBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4A90E2',
    marginLeft: 8,
  },
  storyContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  storyTitle: {
    fontSize: 24,
    fontFamily: 'FredokaOne',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 30,
  },
  storySection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  storyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  storyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 24,
  },
  storyEnd: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
  },
  storyEndText: {
    fontSize: 24,
    fontFamily: 'FredokaOne',
    color: '#4A90E2',
    marginBottom: 16,
  },
  storyMoral: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#7ED321',
    textAlign: 'center',
  },
});