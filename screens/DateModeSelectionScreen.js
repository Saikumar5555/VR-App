// screens/DateModeSelectionScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const DateModeSelectionScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const destName = typeof destination === 'string' ? destination : destination.name;
  
  // Current date for minimum selectable date
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // State variables
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTransport, setSelectedTransport] = useState('');
  
  // Available time slots
  const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];
  
  // Transport options
  const transportOptions = [
    { id: 'Flight', name: 'Flight', icon: 'airplane' },
    { id: 'Train', name: 'Train', icon: 'train' },
    { id: 'Boat', name: 'Boat', icon: 'boat' },
    { id: 'Walking', name: 'Walking Tour', icon: 'walk' }
  ];
  
  // Format markedDates for the calendar
  const markedDates = {
    ...(selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#4F46E5' } } : {})
  };
  
  // Check if all selections are made
  const isSelectionComplete = selectedDate && selectedTime && selectedTransport;
  
  // Proceed to next screen
  const handleContinue = () => {
    navigation.navigate('TourCustomization', {
      destination: destName,
      date: selectedDate,
      time: selectedTime,
      transportMode: selectedTransport
    });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-1">Schedule Your Tour</Text>
          <Text className="text-gray-600 mb-6">Select a date, time, and mode of transport for your virtual visit to {destName}.</Text>
          
          {/* Calendar Section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Select a Date</Text>
            <View className="bg-gray-50 rounded-lg overflow-hidden">
              <Calendar
                minDate={formattedToday}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                theme={{
                  selectedDayBackgroundColor: '#4F46E5',
                  todayTextColor: '#4F46E5',
                  arrowColor: '#4F46E5',
                }}
              />
            </View>
          </View>
          
          {/* Time Selection */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Select a Time</Text>
            <View className="flex-row flex-wrap">
              {timeSlots.map((time, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    selectedTime === time ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text className={`${
                    selectedTime === time ? 'text-white' : 'text-gray-700'
                  }`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Transport Mode */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Mode of Transport</Text>
            <View className="bg-gray-50 rounded-lg p-4">
              {transportOptions.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`flex-row items-center mb-3 p-3 rounded-lg border ${
                    selectedTransport === option.id 
                      ? 'bg-indigo-50 border-indigo-600' 
                      : 'bg-white border-gray-200'
                  }`}
                  onPress={() => setSelectedTransport(option.id)}
                >
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${
                    selectedTransport === option.id ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}>
                    <Ionicons 
                      name={option.icon} 
                      size={20} 
                      color={selectedTransport === option.id ? 'white' : '#6B7280'} 
                    />
                  </View>
                  <Text className={`ml-3 font-medium ${
                    selectedTransport === option.id ? 'text-indigo-800' : 'text-gray-700'
                  }`}>
                    {option.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Selection Summary */}
          {isSelectionComplete && (
            <View className="bg-indigo-50 p-4 rounded-lg mb-6">
              <Text className="font-bold text-indigo-800 mb-2">Your Tour Details</Text>
              <View className="flex-row items-center mb-2">
                <Ionicons name="calendar" size={16} color="#4F46E5" />
                <Text className="text-gray-700 ml-2">Date: {selectedDate}</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Ionicons name="time" size={16} color="#4F46E5" />
                <Text className="text-gray-700 ml-2">Time: {selectedTime}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name={transportOptions.find(t => t.id === selectedTransport)?.icon || 'airplane'} size={16} color="#4F46E5" />
                <Text className="text-gray-700 ml-2">Transport: {selectedTransport}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <View className="bg-white p-4 border-t border-gray-200">
        <TouchableOpacity
          className={`py-3 rounded-lg ${isSelectionComplete ? 'bg-indigo-600' : 'bg-gray-300'}`}
          onPress={handleContinue}
          disabled={!isSelectionComplete}
        >
          <Text className="text-white font-bold text-center text-lg">Continue to Customize</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DateModeSelectionScreen;