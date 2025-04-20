import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch,} from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Map of destination images
const destinationImages = {
  'Paris, France': require('../assets/images/paris.jpg'),
  'Tokyo, Japan': require('../assets/images/tokyo.jpg'),
  'Venice, Italy': require('../assets/images/venice.jpg'),
  'Bali, Indonesia': require('../assets/images/bali.jpg'),
  'New York City, USA': require('../assets/images/newyork.jpg'),
  'Grand Canyon, USA': require('../assets/images/grandcanyon.jpg'),
  'Cairo, Egypt': require('../assets/images/cairo.jpg'),
  'Sydney, Australia': require('../assets/images/sydney.jpg'),
  // Shorter names for when destinations are referred to briefly
  'Paris': require('../assets/images/paris.jpg'),
  'Tokyo': require('../assets/images/tokyo.jpg'),
  'Venice': require('../assets/images/venice.jpg'),
  'Bali': require('../assets/images/bali.jpg'),
  'New York': require('../assets/images/newyork.jpg')
};

// Default image for destinations without a specific image
const defaultImage = require('../assets/images/paris.jpg');

// Reusable SettingSwitch component
const SettingSwitch = ({ icon, label, value, onValueChange }) => (
  <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
    <View className="flex-row items-center">
      <Ionicons name={icon} size={20} color="#4F46E5" />
      <Text className="text-gray-700 ml-3">{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
      thumbColor={value ? "#4F46E5" : "#f4f3f4"}
    />
  </View>
);

const JourneySetupScreen = ({ route, navigation }) => {
  const { destination, transportMode = 'Flight' } = route.params;

  // Journey settings
  const [settings, setSettings] = useState({
    language: 'English',
    narration: true,
    speed: 1,
    accessibilityMode: true,
    highContrast: false,
    subtitles: true
  });

  // Available view modes based on transport
  const viewModes = {
    'Flight': ['Pilot View', 'Window View', 'Bird\'s Eye View'],
    'Train': ['Front View', 'Window View', 'Scenic View'],
    'Boat': ['Captain View', 'Deck View', 'Underwater View'],
    'Walking': ['First Person', 'Tour Guide', 'Drone View']
  };

  const [selectedViewMode, setSelectedViewMode] = useState(viewModes[transportMode][0]);

  // Language options
  const languages = ['English', 'Spanish', 'French', 'Japanese', 'German', 'Italian', 'Chinese'];

  // Format destination name for display
  const destName = typeof destination === 'string' ? destination : destination.name;

  // Get the appropriate image for the destination
  const getDestinationImage = (name) => {
    // If destination is an object and already has an image property that's a local reference
    if (typeof destination === 'object' && destination.image && typeof destination.image !== 'string') {
      return destination.image;
    }
    
    // Otherwise, look up in our image map
    return destinationImages[name] || defaultImage;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Destination Banner */}
        <View className="w-full h-48 relative">
          <Image 
            source={getDestinationImage(destName)}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black opacity-40" />
          <View className="absolute bottom-0 left-0 right-0 p-4">
            <Text className="text-white text-2xl font-bold">{destName}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="airplane" size={16} color="white" />
              <Text className="text-white ml-1">{transportMode} Journey</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View className="p-5">
          <Text className="text-xl font-bold text-gray-800 mb-4">Journey Settings</Text>

          {/* View Mode Selection */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-700 mb-3">Select View Mode</Text>
            <View className="flex-row flex-wrap">
              {viewModes[transportMode].map((mode, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    selectedViewMode === mode ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setSelectedViewMode(mode)}
                >
                  <Text className={`${selectedViewMode === mode ? 'text-white' : 'text-gray-700'}`}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Language Selection */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-700 mb-3">Audio Language</Text>
            <View className="flex-row flex-wrap">
              {languages.map((lang, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    settings.language === lang ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setSettings({...settings, language: lang})}
                >
                  <Text className={`${settings.language === lang ? 'text-white' : 'text-gray-700'}`}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Additional Settings */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-700 mb-3">Tour Experience</Text>

            {/* Narration Toggle */}
            <SettingSwitch 
              icon="mic" 
              label="Audio Narration" 
              value={settings.narration} 
              onValueChange={(value) => setSettings({...settings, narration: value})}
            />

            {/* Subtitles Toggle */}
            <SettingSwitch 
              icon="text" 
              label="Show Subtitles" 
              value={settings.subtitles} 
              onValueChange={(value) => setSettings({...settings, subtitles: value})}
            />

            {/* High Contrast Mode */}
            <SettingSwitch 
              icon="contrast" 
              label="High Contrast Mode" 
              value={settings.highContrast} 
              onValueChange={(value) => setSettings({...settings, highContrast: value})}
            />

            {/* Journey Speed */}
            <View className="py-3 border-b border-gray-100">
              <View className="flex-row items-center mb-2">
                <Ionicons name="speedometer" size={20} color="#4F46E5" />
                <Text className="text-gray-700 ml-3">Journey Speed</Text>
                <Text className="text-gray-500 ml-auto">{settings.speed}x</Text>
              </View>
              <Slider
                value={settings.speed}
                onValueChange={(value) => setSettings({...settings, speed: value})}
                minimumValue={0.5}
                maximumValue={2}
                step={0.25}
                minimumTrackTintColor="#4F46E5"
                maximumTrackTintColor="#D1D5DB"
                thumbTintColor="#4F46E5"
              />
              <View className="flex-row justify-between">
                <Text className="text-xs text-gray-500">Slower</Text>
                <Text className="text-xs text-gray-500">Faster</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Accessibility Settings */}
        <View className="p-5 pt-0">
          <Text className="text-xl font-bold text-gray-800 mb-4">Accessibility Options</Text>

          <View className="bg-indigo-50 rounded-lg p-4 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="accessibility" size={20} color="#4F46E5" />
                <Text className="font-semibold text-gray-700 ml-2">Accessibility Mode</Text>
              </View>
              <Switch
                value={settings.accessibilityMode}
                onValueChange={(value) => setSettings({...settings, accessibilityMode: value})}
                trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
                thumbColor={settings.accessibilityMode ? "#4F46E5" : "#f4f3f4"}
              />
            </View>

            <Text className="text-gray-600 text-sm mb-3">
              Accessibility mode provides enhanced features for users with disabilities:
            </Text>

            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
              <Text className="text-gray-700 text-sm">Enhanced audio descriptions</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
              <Text className="text-gray-700 text-sm">Motion sensitivity adjustments</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
              <Text className="text-gray-700 text-sm">Enhanced visual cues</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
              <Text className="text-gray-700 text-sm">Alternative navigation controls</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Journey Button */}
      <View className="bg-white p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-indigo-600 py-4 rounded-xl shadow"
          onPress={() => navigation.navigate('VRJourney', { 
            destination: destName, 
            transportMode, 
            viewMode: selectedViewMode,
            settings
          })}
        >
          <Text className="text-white font-bold text-center text-lg">Start Journey</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JourneySetupScreen;