import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useMemo } from 'react';
import Animated, { 
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withRepeat,
  withSequence
} from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;

const createArc = (startAngle: number, endAngle: number, radius: number) => {
  const start = polarToCartesian(0, 0, radius, endAngle * 360);
  const end = polarToCartesian(0, 0, radius, startAngle * 360);
  const largeArcFlag = endAngle - startAngle <= 0.5 ? 0 : 1;
  
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", 0, 0,
    "Z"
  ].join(" ");
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

export default function HomeScreen() {
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  const data = useMemo(() => ({
    savedAmount: '1200Rs',
    averageUsage: '20 units',
    currentUsage: '19 units',
    loadDistribution: {
      heavy: 30,
      special: 30,
      light: 40,
    },
  }), []);

  const chartData = [
    { value: data.loadDistribution.heavy, color: '#4CAF50' },
    { value: data.loadDistribution.special, color: '#81C784' },
    { value: data.loadDistribution.light, color: '#C8E6C9' },
  ];

  let currentAngle = 0;
  const radius = CIRCLE_SIZE / 2;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>IEMS</Text>
      </View>

      <Text style={styles.welcomeText}>Welcome Home</Text>
      <Text style={styles.savedText}>
        You saved <Text style={styles.highlightText}>{data.savedAmount}</Text> this month
      </Text>

      <View style={styles.usageContainer}>
        <View style={styles.usageItem}>
          <Text style={styles.usageLabel}>Average usage per month</Text>
          <Text style={styles.usageValue}>{data.averageUsage}</Text>
        </View>
        <View style={styles.usageItem}>
          <Text style={styles.usageLabel}>Energy usage this month</Text>
          <Text style={styles.usageValue}>{data.currentUsage}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.pieChart}>
          <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} viewBox={`${-radius} ${-radius} ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}>
            {chartData.map((segment, index) => {
              const startAngle = currentAngle;
              const percentage = segment.value / 100;
              currentAngle += percentage;
              
              return (
                <Path
                  key={index}
                  d={createArc(startAngle, currentAngle, radius)}
                  fill={segment.color}
                />
              );
            })}
            <Circle r={radius * 0.7} fill="white" />
          </Svg>
        </View>
        
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]}/>
            <Text style={styles.legendText}>Heavy Load</Text>
            <Text style={styles.legendValue}>{data.loadDistribution.heavy}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#81C784' }]}/>
            <Text style={styles.legendText}>Special Load</Text>
            <Text style={styles.legendValue}>{data.loadDistribution.special}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#C8E6C9' }]}/>
            <Text style={styles.legendText}>Light Load</Text>
            <Text style={styles.legendValue}>{data.loadDistribution.light}%</Text>
          </View>
        </View>
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
    justifyContent: 'center',
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
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 20,
  },
  savedText: {
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  highlightText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  usageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  usageItem: {
    flex: 1,
    marginRight: 10,
  },
  usageLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  usageValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pieChart: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    width: '100%',
    marginTop: 40,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    flex: 1,
    fontSize: 16,
  },
  legendValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});