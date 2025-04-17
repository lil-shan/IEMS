import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TimePicker } from '@/components/TimePicker';
import { Power, Zap, Settings2 } from 'lucide-react-native';

const rooms = [
  {
    id: 'bed2',
    name: 'Bedroom',
    contribution: 17,
    loads: {
      heavy: { value: 20, timer: false },
      special: { value: 50, timer: false },
      light: { value: 30, timer: false },
    },
  },
  {
    id: 'living',
    name: 'Living Room',
    contribution: 15,
    loads: {
      heavy: { value: 25, timer: false },
      special: { value: 45, timer: false },
      light: { value: 30, timer: false },
    },
  },
];

export default function ControlScreen() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [loadStates, setLoadStates] = useState(
    rooms.reduce((acc, room) => ({
      ...acc,
      [room.id]: {
        heavy: false,
        special: false,
        light: false,
        power: true,
      },
    }), {})
  );
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));

  const handleLoadToggle = (roomId: string, loadType: string) => {
    setLoadStates(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [loadType]: !prev[roomId][loadType],
      },
    }));
  };

  const handlePowerToggle = (roomId: string) => {
    setLoadStates(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        power: !prev[roomId].power,
        heavy: false,
        special: false,
        light: false,
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Control Panel</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.roomsGrid}>
          {rooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={[
                styles.roomCard,
                selectedRoom.id === room.id && styles.selectedRoom,
              ]}
              onPress={() => setSelectedRoom(room)}
              activeOpacity={0.8}>
              <View style={styles.roomCardHeader}>
                <Text style={[
                  styles.roomName,
                  selectedRoom.id === room.id && styles.selectedRoomText
                ]}>
                  {room.name}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.powerButton,
                    loadStates[room.id].power && styles.powerButtonActive
                  ]}
                  onPress={() => handlePowerToggle(room.id)}>
                  <Power size={20} color={loadStates[room.id].power ? '#fff' : '#666'} />
                </TouchableOpacity>
              </View>
              <View style={styles.roomStats}>
                <Zap size={16} color="#666" />
                <Text style={[
                  styles.roomContribution,
                  selectedRoom.id === room.id && styles.selectedRoomText
                ]}>
                  {room.contribution}% usage
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Animated.View style={[styles.controlPanel, animatedStyles]}>
          {loadStates[selectedRoom.id].power ? (
            <>
              <View style={styles.controlHeader}>
                <Settings2 size={24} color="#4CAF50" />
                <Text style={styles.controlTitle}>Load Controls</Text>
              </View>
              {Object.entries(selectedRoom.loads).map(([type, load]) => (
                <View key={type} style={styles.loadControl}>
                  <View style={styles.loadHeader}>
                    <Text style={styles.loadType}>
                      {type.charAt(0).toUpperCase() + type.slice(1)} Load
                    </Text>
                    <View style={styles.loadValueContainer}>
                      <Zap size={16} color="#4CAF50" />
                      <Text style={styles.loadValue}>{load.value}%</Text>
                    </View>
                  </View>

                  <View style={styles.controlRow}>
                    <View style={styles.timePickerContainer}>
                      <TimePicker
                        label="Start"
                        value={startTime}
                        onChange={setStartTime}
                      />
                      <TimePicker
                        label="End"
                        value={endTime}
                        onChange={setEndTime}
                      />
                    </View>
                    <View style={styles.switchContainer}>
                      <Switch
                        value={loadStates[selectedRoom.id][type]}
                        onValueChange={() => handleLoadToggle(selectedRoom.id, type)}
                        trackColor={{ false: '#E0E0E0', true: '#81C784' }}
                        thumbColor={loadStates[selectedRoom.id][type] ? '#4CAF50' : '#f4f4f4'}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <View style={styles.powerOffMessage}>
              <Power size={48} color="#666" />
              <Text style={styles.powerOffText}>Room is powered off</Text>
              <Text style={styles.powerOffSubtext}>Turn on the power to control loads</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  roomCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roomCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedRoom: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedRoomText: {
    color: '#1B5E20',
  },
  roomStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomContribution: {
    fontSize: 14,
    color: '#666',
  },
  powerButton: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 8,
  },
  powerButtonActive: {
    backgroundColor: '#4CAF50',
  },
  controlPanel: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  controlTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  loadControl: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  loadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  loadValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  loadValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timePickerContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  switchContainer: {
    paddingLeft: 20,
    justifyContent: 'center',
    minWidth: 70,
    height: 40,
    alignItems: 'center',
  },
  powerOffMessage: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
  },
  powerOffText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    marginTop: 16,
  },
  powerOffSubtext: {
    fontSize: 14,
    color: '#999',
  },
});