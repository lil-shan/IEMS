import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useState, useCallback } from 'react';
import Slider from '@react-native-community/slider';
import { Settings } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function MeasureScreen() {
  const [billLimit, setBillLimit] = useState(10000);
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [autoShutoff, setAutoShutoff] = useState(false);

  const scale = useSharedValue(1);
  const settingsRotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const settingsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${settingsRotation.value}deg` }],
  }));

  const handleOptimizePress = useCallback(() => {
    scale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );
  }, []);

  const handleSettingsPress = useCallback(() => {
    settingsRotation.value = withSequence(
      withTiming(360, { duration: 1000 }),
      withTiming(0, { duration: 0 })
    );
  }, []);

  const estimatedBill = 12966;
  const dailyRate = 754;
  const isOverLimit = estimatedBill > billLimit;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Animated.View style={settingsAnimatedStyle}>
            <Settings color="#FFFFFF" size={24} />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.title}>IEMS</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for symmetry */}
      </View>
      
      <View style={styles.billContainer}>
        <Text style={styles.billLabel}>Your estimated bill amount is</Text>
        <Animated.Text style={[styles.billAmount, animatedStyles]}>
          {estimatedBill} Rs
        </Animated.Text>
        <Text style={styles.rateText}>
          You are going at {dailyRate} rupees/day which is{' '}
          <Text style={[styles.limitStatus, isOverLimit && styles.overLimit]}>
            {isOverLimit ? 'Over' : 'Under'} the limit by 20%
          </Text>
        </Text>
      </View>

      <View style={styles.limitContainer}>
        <Text style={styles.sectionTitle}>Set bill limit</Text>
        <Slider
          style={styles.slider}
          minimumValue={5000}
          maximumValue={20000}
          value={billLimit}
          onValueChange={setBillLimit}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor="#4CAF50"
        />
        <Text style={styles.limitValue}>{Math.round(billLimit)} Rs</Text>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity 
          style={styles.settingRow}
          onPress={() => setAlertEnabled(!alertEnabled)}
          activeOpacity={0.7}
        >
          <Text style={styles.settingText}>Issue alerts when the limit is reached</Text>
          <View style={[styles.toggle, alertEnabled && styles.toggleActive]}>
            <Animated.View style={[styles.toggleThumb, alertEnabled && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingRow}
          onPress={() => setAutoShutoff(!autoShutoff)}
          activeOpacity={0.7}
        >
          <Text style={styles.settingText}>Cut-Off automatically if the limit is reached</Text>
          <View style={[styles.toggle, autoShutoff && styles.toggleActive]}>
            <Animated.View style={[styles.toggleThumb, autoShutoff && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.suggestionsContainer}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <AnimatedPressable 
          style={styles.suggestionRow}
          onPress={handleOptimizePress}
        >
          <Text style={styles.suggestionText}>Reduce bed 2 heavy load usage</Text>
          <Text style={styles.optimizeButton}>Optimize</Text>
        </AnimatedPressable>
        <AnimatedPressable 
          style={styles.suggestionRow}
          onPress={handleOptimizePress}
        >
          <Text style={styles.suggestionText}>Reduce living room special load usage</Text>
          <Text style={styles.optimizeButton}>Optimize</Text>
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  billContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
  },
  billLabel: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
  },
  billAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  rateText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
  limitStatus: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  overLimit: {
    color: '#F44336',
  },
  limitContainer: {
    marginBottom: 30,
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  limitValue: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  settingsContainer: {
    marginBottom: 30,
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: '#333333',
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    backgroundColor: 'white',
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  suggestionsContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  optimizeButton: {
    color: '#4CAF50',
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    overflow: 'hidden',
  },
});