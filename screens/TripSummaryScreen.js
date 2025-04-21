// screens/TripSummaryScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TripSummaryScreen = ({ route, navigation }) => {
  const { destination, date, time, transportMode, preferences } = route.params;
  
  // Formatting the date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Confirm booking
  const confirmBooking = () => {
    navigation.navigate('JourneySetup', {
      destination,
      transportMode
    });
  };
  
  // Edit booking
  const editBooking = (screen) => {
    navigation.navigate(screen, {
      destination,
      date,
      time,
      transportMode,
      preferences
    });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-indigo-600 p-5">
          <Text className="text-white text-2xl font-bold mb-1">Trip Summary</Text>
          <Text className="text-indigo-200">Review your tour details before confirming</Text>
        </View>
        
        {/* Destination Overview */}
        <View className="p-4 bg-white border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-800 mb-1">{destination}</Text>
          <View className="flex-row items-center">
            <Ionicons name="calendar" size={16} color="#4F46E5" />
            <Text className="text-gray-600 ml-1">{formatDate(date)} at {time}</Text>
          </View>
        </View>
        
        {/* Journey Details */}
        <View className="p-4 bg-white border-b border-gray-200">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="font-bold text-gray-800 mb-1">Journey Mode</Text>
              <View className="flex-row items-center">
                <Ionicons 
                  name={
                    transportMode === 'Flight' ? 'airplane' : 
                    transportMode === 'Train' ? 'train' : 
                    transportMode === 'Boat' ? 'boat' : 'walk'
                  } 
                  size={16} 
                  color="#4F46E5" 
                />
                <Text className="text-gray-700 ml-1">{transportMode}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              className="bg-gray-100 px-3 py-1 rounded-full"
              onPress={() => editBooking('DateModeSelection')}
            >
              <Text className="text-indigo-600 font-medium">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Tour Preferences */}
        <View className="p-4 bg-white border-b border-gray-200">
          <View className="flex-row justify-between items-start mb-3">
            <Text className="font-bold text-gray-800">Tour Preferences</Text>
            <TouchableOpacity 
              className="bg-gray-100 px-3 py-1 rounded-full"
              onPress={() => editBooking('TourCustomization')}
            >
              <Text className="text-indigo-600 font-medium">Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Language</Text>
            <Text className="text-gray-800">{preferences.language}</Text>
          </View>
          
          {/* <View className="mb-3">
            <Text className="text-gray-600 mb-1">Narrator Voice</Text>
            <Text className="text-gray-800">{preferences.narratorVoice}</Text>
          </View> */}
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Tour Pace</Text>
            <Text className="text-gray-800">{preferences.pace}x</Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Subtitles</Text>
            <Text className="text-gray-800">{preferences.subtitles ? 'Enabled' : 'Disabled'}</Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Focus Areas</Text>
            <View className="flex-row flex-wrap mt-1">
              {preferences.focusAreas.map((area, index) => (
                <View 
                  key={index} 
                  className="bg-indigo-100 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  <Text className="text-indigo-700">{area}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Accessibility Features */}
          <View>
            <Text className="text-gray-600 mb-1">Accessibility Features</Text>
            <View className="mt-1">
              {preferences.accessibility.highContrast && (
                <View className="flex-row items-center mb-1">
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text className="text-gray-700 ml-1">High Contrast Mode</Text>
                </View>
              )}
              {preferences.accessibility.audioDescriptions && (
                <View className="flex-row items-center mb-1">
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text className="text-gray-700 ml-1">Enhanced Audio Descriptions</Text>
                </View>
              )}
              {preferences.accessibility.signLanguage && (
                <View className="flex-row items-center mb-1">
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text className="text-gray-700 ml-1">Sign Language</Text>
                </View>
              )}
              {preferences.accessibility.reducedMotion && (
                <View className="flex-row items-center mb-1">
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text className="text-gray-700 ml-1">Reduced Motion</Text>
                </View>
              )}
              {!Object.values(preferences.accessibility).some(value => value) && (
                <Text className="text-gray-700">No special accessibility features enabled</Text>
              )}
            </View>
          </View>
          
          {/* Special Requests */}
          {preferences.specialRequests && (
            <View className="mt-3">
              <Text className="text-gray-600 mb-1">Special Requests</Text>
              <View className="bg-gray-50 p-3 rounded-lg">
                <Text className="text-gray-700">{preferences.specialRequests}</Text>
              </View>
            </View>
          )}
        </View>
        
        {/* What to Expect */}
        <View className="p-4 bg-white">
          <Text className="font-bold text-gray-800 mb-3">What to Expect</Text>
          
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="time-outline" size={20} color="#4F46E5" />
              <Text className="text-gray-800 font-medium ml-2">Tour Duration</Text>
            </View>
            <Text className="text-gray-600 pl-7">Approximately 45-60 minutes</Text>
          </View>
          
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="map-outline" size={20} color="#4F46E5" />
              <Text className="text-gray-800 font-medium ml-2">Highlights</Text>
            </View>
            <Text className="text-gray-600 pl-7">
              Your virtual journey will include main attractions, hidden gems, and local culture insights based on your selected preferences.
            </Text>
          </View>
          
          <View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle-outline" size={20} color="#4F46E5" />
              <Text className="text-gray-800 font-medium ml-2">Important Notes</Text>
            </View>
            <Text className="text-gray-600 pl-7">
              For the best experience, we recommend using headphones and ensuring a stable internet connection. You can pause or exit the tour at any time.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Confirmation Button */}
      <View className="bg-white p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-indigo-600 py-4 rounded-xl"
          onPress={confirmBooking}
        >
          <Text className="text-white font-bold text-center text-lg">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TripSummaryScreen;