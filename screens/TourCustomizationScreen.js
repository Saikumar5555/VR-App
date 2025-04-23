// screens/TourCustomizationScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const TourCustomizationScreen = ({ route, navigation }) => {
  const { destination, date, time, transportMode } = route.params;
  
  // Tour preferences
  const [preferences, setPreferences] = useState({
    language: 'English',
    subtitles: true,
    narratorVoice: 'Standard',
    pace: 1,
    focusAreas: ['Historical', 'Cultural'],
    accessibility: {
      highContrast: false,
      audioDescriptions: true,
      signLanguage: false,
      reducedMotion: false
    },
    specialRequests: ''
  });
  
  // Available languages
  const languages = ['Hindi', 'English', 'Telugu', 'Tamil', 'Malayalam', 'Kannada'];
  
  // Narrator voices
  const narratorVoices = ['Standard', 'Professional', 'Friendly', 'Dramatic'];
  
  // Focus areas
  const allFocusAreas = ['Historical', 'Cultural', 'Architectural', 'Culinary', 'Natural', 'Artistic'];
  
  // Toggle a focus area
  const toggleFocusArea = (area) => {
    if (preferences.focusAreas.includes(area)) {
      setPreferences({
        ...preferences,
        focusAreas: preferences.focusAreas.filter(a => a !== area)
      });
    } else {
      setPreferences({
        ...preferences,
        focusAreas: [...preferences.focusAreas, area]
      });
    }
  };
  
  // Update accessibility setting
  const updateAccessibility = (setting, value) => {
    setPreferences({
      ...preferences,
      accessibility: {
        ...preferences.accessibility,
        [setting]: value
      }
    });
  };
  
  // Continue to summary
  const continueToSummary = () => {
    navigation.navigate('TripSummary', {
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
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-1">Customize Your Tour</Text>
          <Text className="text-gray-600 mb-6">Personalize your virtual experience of {destination}.</Text>
          
          {/* Language Selection */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Language</Text>
            <View className="flex-row flex-wrap">
              {languages.map((lang, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    preferences.language === lang ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setPreferences({...preferences, language: lang})}
                >
                  <Text className={`${
                    preferences.language === lang ? 'text-white' : 'text-gray-700'
                  }`}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Narrator Voice */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Narrator Voice</Text>
            <View className="flex-row flex-wrap">
              {narratorVoices.map((voice, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    preferences.narratorVoice === voice ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setPreferences({...preferences, narratorVoice: voice})}
                >
                  <Text className={`${
                    preferences.narratorVoice === voice ? 'text-white' : 'text-gray-700'
                  }`}>
                    {voice}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Tour Pace */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-bold text-gray-800">Tour Pace</Text>
              <Text className="text-gray-600">{preferences.pace}x</Text>
            </View>
            <Slider
              minimumValue={0.5}
              maximumValue={2}
              step={0.25}
              value={preferences.pace}
              onValueChange={(value) => setPreferences({...preferences, pace: value})}
              minimumTrackTintColor="#4F46E5"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#4F46E5"
            />
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Relaxed</Text>
              <Text className="text-gray-500">Standard</Text>
              <Text className="text-gray-500">Brisk</Text>
            </View>
          </View>
          
          {/* Focus Areas */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Tour Focus Areas</Text>
            <Text className="text-gray-600 mb-3">Select the aspects of {destination} you're most interested in exploring.</Text>
            <View className="flex-row flex-wrap">
              {allFocusAreas.map((area, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    preferences.focusAreas.includes(area) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => toggleFocusArea(area)}
                >
                  <Text className={`${
                    preferences.focusAreas.includes(area) ? 'text-white' : 'text-gray-700'
                  }`}>
                    {area}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Subtitle Option */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="text" size={20} color="#4F46E5" />
                <Text className="text-gray-700 ml-3">Show Subtitles</Text>
              </View>
              <Switch
                value={preferences.subtitles}
                onValueChange={(value) => setPreferences({...preferences, subtitles: value})}
                trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
                thumbColor={preferences.subtitles ? "#4F46E5" : "#f4f3f4"}
              />
            </View>
          </View>
          
          {/* Accessibility Options */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Accessibility Options</Text>
            <View className="bg-indigo-50 rounded-lg p-4">
              <View className="flex-row justify-between items-center py-3 border-b border-indigo-100">
                <View className="flex-row items-center">
                  <Ionicons name="contrast" size={20} color="#4F46E5" />
                  <Text className="text-gray-700 ml-3">High Contrast Mode</Text>
                </View>
                <Switch
                  value={preferences.accessibility.highContrast}
                  onValueChange={(value) => updateAccessibility('highContrast', value)}
                  trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
                  thumbColor={preferences.accessibility.highContrast ? "#4F46E5" : "#f4f3f4"}
                />
              </View>
              
              <View className="flex-row justify-between items-center py-3 border-b border-indigo-100">
                <View className="flex-row items-center">
                  <Ionicons name="volume-high" size={20} color="#4F46E5" />
                  <Text className="text-gray-700 ml-3">Enhanced Audio Descriptions</Text>
                </View>
                <Switch
                  value={preferences.accessibility.audioDescriptions}
                  onValueChange={(value) => updateAccessibility('audioDescriptions', value)}
                  trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
                  thumbColor={preferences.accessibility.audioDescriptions ? "#4F46E5" : "#f4f3f4"}
                />
              </View>
              
              <View className="flex-row justify-between items-center py-3 border-b border-indigo-100">
                <View className="flex-row items-center">
                  <Ionicons name="hand-left" size={20} color="#4F46E5" />
                  <Text className="text-gray-700 ml-3">Sign Language</Text>
                </View>
                <Switch
                  value={preferences.accessibility.signLanguage}
                  onValueChange={(value) => updateAccessibility('signLanguage', value)}
                  trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
                  thumbColor={preferences.accessibility.signLanguage ? "#4F46E5" : "#f4f3f4"}
                />
              </View>
              
              <View className="flex-row justify-between items-center py-3">
                <View className="flex-row items-center">
                  <Ionicons name="eye" size={20} color="#4F46E5" />
                  <Text className="text-gray-700 ml-3">Reduced Motion</Text>
                </View>
                <Switch
                  value={preferences.accessibility.reducedMotion}
                  onValueChange={(value) => updateAccessibility('reducedMotion', value)}
                  trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
                  thumbColor={preferences.accessibility.reducedMotion ? "#4F46E5" : "#f4f3f4"}
                />
              </View>
            </View>
          </View>
          
          {/* Special Requests */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Special Requests</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800 min-h-24"
              placeholder="Any specific needs or requests for your tour?"
              multiline={true}
              value={preferences.specialRequests}
              onChangeText={(text) => setPreferences({...preferences, specialRequests: text})}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <View className="bg-white p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-indigo-600 py-3 rounded-lg"
          onPress={continueToSummary}
        >
          <Text className="text-white font-bold text-center text-lg">View Trip Summary</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TourCustomizationScreen;