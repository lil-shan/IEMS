import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Clock } from 'lucide-react-native';

type TimePickerProps = {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
};

export function TimePicker({ value, onChange, label }: TimePickerProps) {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date: Date) => {
    onChange(date);
    hidePicker();
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={showPicker}
        activeOpacity={0.7}>
        <Clock size={20} color="#4CAF50" style={styles.icon} />
        <Text style={styles.timeText}>
          {value ? format(value, 'hh:mm a') : 'Select Time'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        date={value || new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  icon: {
    marginRight: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
});