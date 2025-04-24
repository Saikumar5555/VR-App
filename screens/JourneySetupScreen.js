// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, Switch,} from 'react-native';
// import Slider from '@react-native-community/slider';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Map of destination images
// const destinationImages = {
//   'Agra, U.P': require('../assets/images/Agra.jpg'),
//   ''Goldentemple, Punjab'': require('../assets/images/Goldentemple.jpg'),
//   'charminar, Telangana': require('../assets/images/charminar.jpg'),
//   'Indiagate, New Delhi': require('../assets/images/Indiagate.jpg'),
//   'Red Fort, New Delhi': require('../assets/images/Redfort.jpg'),
//   'Grand Canyon, USA': require('../assets/images/grandcanyon.jpg'),
//   'Cairo, Egypt': require('../assets/images/cairo.jpg'),
//   'Sydney, Australia': require('../assets/images/sydney.jpg'),
//   // Shorter names for when destinations are referred to briefly
//   'Agra': require('../assets/images/Agra.jpg'),
//   'Goldentemple': require('../assets/images/Goldentemple.jpg'),
//   'charminar': require('../assets/images/charminar.jpg'),
//   'Indiagate': require('../assets/images/Indiagate.jpg'),
//   'Redfort': require('../assets/images/Redfort.jpg')
// };

// // Default image for destinations without a specific image
// const defaultImage = require('../assets/images/Agra.jpg');

// // Reusable SettingSwitch component
// const SettingSwitch = ({ icon, label, value, onValueChange }) => (
//   <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
//     <View className="flex-row items-center">
//       <Ionicons name={icon} size={20} color="#4F46E5" />
//       <Text className="text-gray-700 ml-3">{label}</Text>
//     </View>
//     <Switch
//       value={value}
//       onValueChange={onValueChange}
//       trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
//       thumbColor={value ? "#4F46E5" : "#f4f3f4"}
//     />
//   </View>
// );

// const JourneySetupScreen = ({ route, navigation }) => {
//   const { destination, transportMode = 'Flight' } = route.params;

//   // Journey settings
//   const [settings, setSettings] = useState({
//     language: 'English',
//     narration: true,
//     speed: 1,
//     accessibilityMode: true,
//     highContrast: false,
//     subtitles: true
//   });

//   // Available view modes based on transport
//   const viewModes = {
//     'Flight': ['Pilot View', 'Window View', 'Bird\'s Eye View'],
//     'Train': ['Front View', 'Window View', 'Scenic View'],
//     'Boat': ['Captain View', 'Deck View', 'Underwater View'],
//     'Walking': ['First Person', 'Tour Guide', 'Drone View']
//   };

//   const [selectedViewMode, setSelectedViewMode] = useState(viewModes[transportMode][0]);

//   // Language options
//   const languages = ['English', 'Spanish', 'French', 'Japanese', 'German', 'Italian', 'Hindi'];

//   // Format destination name for display
//   const destName = typeof destination === 'string' ? destination : destination.name;

//   // Get the appropriate image for the destination
//   const getDestinationImage = (name) => {
//     // If destination is an object and already has an image property that's a local reference
//     if (typeof destination === 'object' && destination.image && typeof destination.image !== 'string') {
//       return destination.image;
//     }
    
//     // Otherwise, look up in our image map
//     return destinationImages[name] || defaultImage;
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView className="flex-1">
//         {/* Destination Banner */}
//         <View className="w-full h-48 relative">
//           <Image 
//             source={getDestinationImage(destName)}
//             className="w-full h-full"
//             resizeMode="cover"
//           />
//           <View className="absolute inset-0 bg-black opacity-40" />
//           <View className="absolute bottom-0 left-0 right-0 p-4">
//             <Text className="text-white text-2xl font-bold">{destName}</Text>
//             <View className="flex-row items-center mt-1">
//               <Ionicons name="airplane" size={16} color="white" />
//               <Text className="text-white ml-1">{transportMode} Journey</Text>
//             </View>
//           </View>
//         </View>

//         {/* Settings Section */}
//         <View className="p-5">
//           <Text className="text-xl font-bold text-gray-800 mb-4">Journey Settings</Text>

//           {/* View Mode Selection */}
//           <View className="mb-6">
//             <Text className="text-base font-semibold text-gray-700 mb-3">Select View Mode</Text>
//             <View className="flex-row flex-wrap">
//               {viewModes[transportMode].map((mode, index) => (
//                 <TouchableOpacity 
//                   key={index}
//                   className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
//                     selectedViewMode === mode ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
//                   }`}
//                   onPress={() => setSelectedViewMode(mode)}
//                 >
//                   <Text className={`${selectedViewMode === mode ? 'text-white' : 'text-gray-700'}`}>
//                     {mode}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           {/* Language Selection */}
//           <View className="mb-6">
//             <Text className="text-base font-semibold text-gray-700 mb-3">Audio Language</Text>
//             <View className="flex-row flex-wrap">
//               {languages.map((lang, index) => (
//                 <TouchableOpacity 
//                   key={index}
//                   className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
//                     settings.language === lang ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
//                   }`}
//                   onPress={() => setSettings({...settings, language: lang})}
//                 >
//                   <Text className={`${settings.language === lang ? 'text-white' : 'text-gray-700'}`}>
//                     {lang}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           {/* Additional Settings */}
//           <View className="mb-6">
//             <Text className="text-base font-semibold text-gray-700 mb-3">Tour Experience</Text>

//             {/* Narration Toggle */}
//             <SettingSwitch 
//               icon="mic" 
//               label="Audio Narration" 
//               value={settings.narration} 
//               onValueChange={(value) => setSettings({...settings, narration: value})}
//             />

//             {/* Subtitles Toggle */}
//             <SettingSwitch 
//               icon="text" 
//               label="Show Subtitles" 
//               value={settings.subtitles} 
//               onValueChange={(value) => setSettings({...settings, subtitles: value})}
//             />

//             {/* High Contrast Mode */}
//             <SettingSwitch 
//               icon="contrast" 
//               label="High Contrast Mode" 
//               value={settings.highContrast} 
//               onValueChange={(value) => setSettings({...settings, highContrast: value})}
//             />

//             {/* Journey Speed */}
//             <View className="py-3 border-b border-gray-100">
//               <View className="flex-row items-center mb-2">
//                 <Ionicons name="speedometer" size={20} color="#4F46E5" />
//                 <Text className="text-gray-700 ml-3">Journey Speed</Text>
//                 <Text className="text-gray-500 ml-auto">{settings.speed}x</Text>
//               </View>
//               <Slider
//                 value={settings.speed}
//                 onValueChange={(value) => setSettings({...settings, speed: value})}
//                 minimumValue={0.5}
//                 maximumValue={2}
//                 step={0.25}
//                 minimumTrackTintColor="#4F46E5"
//                 maximumTrackTintColor="#D1D5DB"
//                 thumbTintColor="#4F46E5"
//               />
//               <View className="flex-row justify-between">
//                 <Text className="text-xs text-gray-500">Slower</Text>
//                 <Text className="text-xs text-gray-500">Faster</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Accessibility Settings */}
//         <View className="p-5 pt-0">
//           <Text className="text-xl font-bold text-gray-800 mb-4">Accessibility Options</Text>

//           <View className="bg-indigo-50 rounded-lg p-4 mb-6">
//             <View className="flex-row justify-between items-center mb-4">
//               <View className="flex-row items-center">
//                 <Ionicons name="accessibility" size={20} color="#4F46E5" />
//                 <Text className="font-semibold text-gray-700 ml-2">Accessibility Mode</Text>
//               </View>
//               <Switch
//                 value={settings.accessibilityMode}
//                 onValueChange={(value) => setSettings({...settings, accessibilityMode: value})}
//                 trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
//                 thumbColor={settings.accessibilityMode ? "#4F46E5" : "#f4f3f4"}
//               />
//             </View>

//             <Text className="text-gray-600 text-sm mb-3">
//               Accessibility mode provides enhanced features for users with disabilities:
//             </Text>

//             <View className="flex-row items-center mb-2">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Enhanced audio descriptions</Text>
//             </View>
//             <View className="flex-row items-center mb-2">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Motion sensitivity adjustments</Text>
//             </View>
//             <View className="flex-row items-center mb-2">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Enhanced visual cues</Text>
//             </View>
//             <View className="flex-row items-center">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Alternative navigation controls</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Start Journey Button */}
//       <View className="bg-white p-4 border-t border-gray-200">
//         <TouchableOpacity
//           className="bg-indigo-600 py-4 rounded-xl shadow"
//           onPress={() => navigation.navigate('VRJourney', { 
//             destination: destName, 
//             transportMode, 
//             viewMode: selectedViewMode,
//             settings
//           })}
//         >
//           <Text className="text-white font-bold text-center text-lg">Start Journey</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default JourneySetupScreen;





// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// const destinationImages = {
//   'Agra, U.P': require('../assets/images/Agra.jpg'),
//   'Goldentemple, Punjab': require('../assets/images/Goldentemple.jpg'),
//   'charminar, Telangana': require('../assets/images/charminar.jpg'),
//   'Indiagate, New Delhi': require('../assets/images/Indiagate.jpg'),
//   'Red Fort, New Delhi': require('../assets/images/Redfort.jpg'),
//   'Grand Canyon, USA': require('../assets/images/grandcanyon.jpg'),
//   'Cairo, Egypt': require('../assets/images/cairo.jpg'),
//   'Sydney, Australia': require('../assets/images/sydney.jpg'),
//   'Agra': require('../assets/images/Agra.jpg'),
//   'Goldentemple': require('../assets/images/Goldentemple.jpg'),
//   'charminar': require('../assets/images/charminar.jpg'),
//   'Indiagate': require('../assets/images/Indiagate.jpg'),
//   'Redfort': require('../assets/images/Redfort.jpg')
// };

// const defaultImage = require('../assets/images/Agra.jpg');

// const SettingSwitch = ({ icon, label, value, onValueChange }) => (
//   <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
//     <View className="flex-row items-center">
//       <Ionicons name={icon} size={20} color="#4F46E5" />
//       <Text className="text-gray-700 ml-3">{label}</Text>
//     </View>
//     <Switch
//       value={value}
//       onValueChange={onValueChange}
//       trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
//       thumbColor={value ? "#4F46E5" : "#f4f3f4"}
//     />
//   </View>
// );

// const JourneySetupScreen = ({ route, navigation }) => {
//   const { destination, transportMode = 'Flight' } = route.params;

//   const [settings, setSettings] = useState({
//     language: 'English',
//     narration: true,
//     speed: 1,
//     accessibilityMode: true,
//     highContrast: false,
//     subtitles: true
//   });

//   const viewModes = {
//     'Flight': ['Pilot View', 'Window View', 'Bird\'s Eye View'],
//     'Train': ['Front View', 'Window View', 'Scenic View'],
//     'Boat': ['Captain View', 'Deck View', 'Underwater View'],
//     'Walking': ['First Person', 'Tour Guide', 'Drone View']
//   };

//   const [selectedViewMode, setSelectedViewMode] = useState(viewModes[transportMode][0]);
//   const languages = ['English', 'Spanish', 'French', 'Japanese', 'German', 'Italian', 'Hindi'];
//   const destName = typeof destination === 'string' ? destination : destination.name;

//   const getDestinationImage = (name) => {
//     if (typeof destination === 'object' && destination.image && typeof destination.image !== 'string') {
//       return destination.image;
//     }
//     return destinationImages[name] || defaultImage;
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView className="flex-1">
//         <View className="w-full h-48 relative">
//           <Image 
//             source={getDestinationImage(destName)}
//             className="w-full h-full"
//             resizeMode="cover"
//           />
//           <View className="absolute inset-0 bg-black opacity-40" />
//           <View className="absolute bottom-0 left-0 right-0 p-4">
//             <Text className="text-white text-2xl font-bold">{destName}</Text>
//             <View className="flex-row items-center mt-1">
//               <Ionicons name="airplane" size={16} color="white" />
//               <Text className="text-white ml-1">{transportMode} Journey</Text>
//             </View>
//           </View>
//         </View>

//         <View className="p-5">
//           <Text className="text-xl font-bold text-gray-800 mb-4">Journey Settings</Text>

//           <View className="mb-6">
//             <Text className="text-base font-semibold text-gray-700 mb-3">Select View Mode</Text>
//             <View className="flex-row flex-wrap">
//               {viewModes[transportMode].map((mode, index) => (
//                 <TouchableOpacity 
//                   key={index}
//                   className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
//                     selectedViewMode === mode ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
//                   }`}
//                   onPress={() => setSelectedViewMode(mode)}
//                 >
//                   <Text className={`${selectedViewMode === mode ? 'text-white' : 'text-gray-700'}`}>
//                     {mode}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           <View className="mb-6">
//             <Text className="text-base font-semibold text-gray-700 mb-3">Audio Language</Text>
//             <View className="flex-row flex-wrap">
//               {languages.map((lang, index) => (
//                 <TouchableOpacity 
//                   key={index}
//                   className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
//                     settings.language === lang ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
//                   }`}
//                   onPress={() => setSettings({...settings, language: lang})}
//                 >
//                   <Text className={`${settings.language === lang ? 'text-white' : 'text-gray-700'}`}>
//                     {lang}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           <View className="mb-6">
//             <Text className="text-base font-semibold text-gray-700 mb-3">Tour Experience</Text>
//             <SettingSwitch 
//               icon="mic" 
//               label="Audio Narration" 
//               value={settings.narration} 
//               onValueChange={(value) => setSettings({...settings, narration: value})}
//             />
//             <SettingSwitch 
//               icon="text" 
//               label="Show Subtitles" 
//               value={settings.subtitles} 
//               onValueChange={(value) => setSettings({...settings, subtitles: value})}
//             />
//             <SettingSwitch 
//               icon="contrast" 
//               label="High Contrast Mode" 
//               value={settings.highContrast} 
//               onValueChange={(value) => setSettings({...settings, highContrast: value})}
//             />
//             <View className="py-3 border-b border-gray-100">
//               <View className="flex-row items-center mb-2">
//                 <Ionicons name="speedometer" size={20} color="#4F46E5" />
//                 <Text className="text-gray-700 ml-3">Journey Speed</Text>
//                 <Text className="text-gray-500 ml-auto">{settings.speed}x</Text>
//               </View>
//               <Slider
//                 value={settings.speed}
//                 onValueChange={(value) => setSettings({...settings, speed: value})}
//                 minimumValue={0.5}
//                 maximumValue={2}
//                 step={0.25}
//                 minimumTrackTintColor="#4F46E5"
//                 maximumTrackTintColor="#D1D5DB"
//                 thumbTintColor="#4F46E5"
//               />
//               <View className="flex-row justify-between">
//                 <Text className="text-xs text-gray-500">Slower</Text>
//                 <Text className="text-xs text-gray-500">Faster</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View className="p-5 pt-0">
//           <Text className="text-xl font-bold text-gray-800 mb-4">Accessibility Options</Text>
//           <View className="bg-indigo-50 rounded-lg p-4 mb-6">
//             <View className="flex-row justify-between items-center mb-4">
//               <View className="flex-row items-center">
//                 <Ionicons name="accessibility" size={20} color="#4F46E5" />
//                 <Text className="font-semibold text-gray-700 ml-2">Accessibility Mode</Text>
//               </View>
//               <Switch
//                 value={settings.accessibilityMode}
//                 onValueChange={(value) => setSettings({...settings, accessibilityMode: value})}
//                 trackColor={{ false: "#D1D5DB", true: "#818CF8" }}
//                 thumbColor={settings.accessibilityMode ? "#4F46E5" : "#f4f3f4"}
//               />
//             </View>
//             <Text className="text-gray-600 text-sm mb-3">
//               Accessibility mode provides enhanced features for users with disabilities:
//             </Text>
//             <View className="flex-row items-center mb-2">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Enhanced audio descriptions</Text>
//             </View>
//             <View className="flex-row items-center mb-2">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Motion sensitivity adjustments</Text>
//             </View>
//             <View className="flex-row items-center mb-2">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Enhanced visual cues</Text>
//             </View>
//             <View className="flex-row items-center">
//               <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//               <Text className="text-gray-700 text-sm">Alternative navigation controls</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <View className="bg-white p-4 border-t border-gray-200">
//         <TouchableOpacity
//           className="bg-indigo-600 py-4 rounded-xl shadow"
//           onPress={() => navigation.navigate('VRJourney', { 
//             destination: destName, 
//             transportMode, 
//             viewMode: selectedViewMode,
//             settings
//           })}
//         >
//           <Text className="text-white font-bold text-center text-lg">Start Journey</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default JourneySetupScreen;



import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const destinationImages = {
  'Agra, U.P': require('../assets/images/Agra.jpg'),
  'Goldentemple, Punjab': require('../assets/images/Goldentemple.jpg'),
  'charminar, Telangana': require('../assets/images/charminar.jpg'),
  'Indiagate, New Delhi': require('../assets/images/Indiagate.jpg'),
  'Red Fort, New Delhi': require('../assets/images/Redfort.jpg'),
  'Grand Canyon, USA': require('../assets/images/grandcanyon.jpg'),
  'Cairo, Egypt': require('../assets/images/cairo.jpg'),
  'Sydney, Australia': require('../assets/images/sydney.jpg'),
  'Agra': require('../assets/images/Agra.jpg'),
  'Goldentemple': require('../assets/images/Goldentemple.jpg'),
  'charminar': require('../assets/images/charminar.jpg'),
  'Indiagate': require('../assets/images/Indiagate.jpg'),
  'Redfort': require('../assets/images/Redfort.jpg')
};

const defaultImage = require('../assets/images/Agra.jpg');

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
  // Make sure route.params is defined before trying to destructure
  const params = route?.params || {};
  const {mode} = route.params
  console.log("journey data:", mode)
  // Log the raw received route object for debugging
  console.log('Full route object:', route);
  console.log('Route params object:', params);
  
  // Get parameters with strict defaults
  const destination = params.destination || 'Unknown';
  const date = params.date || new Date();
  const time = params.time || new Date();
  
  // ⚠️ Make sure to extract transportMode correctly - this might be the issue
  const transportMode = params.transportMode;
  console.log('Raw transportMode from params:', params.transportMode);
  
  // Apply the default ONLY if transportMode is undefined or null
  const finalTransportMode = transportMode || 'Flight';
  console.log('Final transportMode to be used:', finalTransportMode);
  
  const isPublic = params.isPublic ?? true;

  const [settings, setSettings] = useState({
    language: 'English',
    narration: true,
    speed: 1,
    accessibilityMode: true,
    highContrast: false,
    subtitles: true
  });

  // Define all view modes for each transport type
  const viewModes = {
    'Flight': ['Pilot View', 'Window View', 'Bird\'s Eye View'],
    'Train': ['Front View', 'Window View', 'Scenic View'],
    'Boat': ['Captain View', 'Deck View', 'Underwater View'],
    'Car': ['Driver View', 'Passenger View', 'Aerial View'],
    'Walking': ['First Person', 'Tour Guide', 'Drone View']
  };

  // Get the correct view modes or default to Flight
  const currentViewModes = viewModes[finalTransportMode] || viewModes['Flight'];
  
  // Set the default selected view mode
  const [selectedViewMode, setSelectedViewMode] = useState(currentViewModes[0]);
  
  // Make sure view mode is valid when transport mode changes
  useEffect(() => {
    // Reset the selected view mode when transport mode changes
    setSelectedViewMode(currentViewModes[0]);
    console.log('View modes updated for transport mode:', finalTransportMode);
    console.log('Available view modes:', currentViewModes);
  }, [finalTransportMode, currentViewModes]);

  const languages = ['Hindi', 'English', 'Telugu', 'Tamil', 'Malayalam', 'Kannada'];
  const destName = typeof destination === 'string' ? destination : destination?.name || 'Unknown';

  // Get the appropriate transport icon
  const getTransportIcon = () => {
    switch(finalTransportMode) {
      case 'Flight': return 'airplane';
      case 'Train': return 'train';
      case 'Boat': return 'boat';
      case 'Car': return 'car';
      default: 
        console.log('Unknown transport mode for icon:', finalTransportMode);
        return 'airplane';
    }
  };

  const getDestinationImage = (name) => {
    if (typeof destination === 'object' && destination.image && typeof destination.image !== 'string') {
      return destination.image;
    }
    return destinationImages[name] || defaultImage;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
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
              <Ionicons name={getTransportIcon()} size={16} color="white" />
              <Text className="text-white ml-1 font-bold">{finalTransportMode} Journey</Text>
              {!isPublic && (
                <View className="flex-row items-center ml-3">
                  <Ionicons name="lock-closed" size={14} color="white" />
                  <Text className="text-white ml-1 text-xs">Private</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View className="p-5">
          <Text className="text-xl font-bold text-gray-800 mb-4">Journey Settings</Text>

          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-700 mb-3">Select View Mode</Text>
            <View className="flex-row flex-wrap">
              {currentViewModes.map((mode, index) => (
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

          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-700 mb-3">Tour Experience</Text>
            <SettingSwitch 
              icon="mic" 
              label="Audio Narration" 
              value={settings.narration} 
              onValueChange={(value) => setSettings({...settings, narration: value})}
            />
            <SettingSwitch 
              icon="text" 
              label="Show Subtitles" 
              value={settings.subtitles} 
              onValueChange={(value) => setSettings({...settings, subtitles: value})}
            />
            <SettingSwitch 
              icon="contrast" 
              label="High Contrast Mode" 
              value={settings.highContrast} 
              onValueChange={(value) => setSettings({...settings, highContrast: value})}
            />
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

      <View className="bg-white p-4 border-t border-gray-200">
      <TouchableOpacity
      className="bg-indigo-600 py-4 rounded-xl shadow"
      onPress={() => {
        if (mode === 'Schedule Your Tour') {
          navigation.navigate('HomeScreen'); // or any screen you want
        } else {
          navigation.navigate('VRJourney', {
            destination: destName,
            transportMode: finalTransportMode,
            viewMode: selectedViewMode,
            settings,
          });
        }
      }}
    >
      <Text className="text-white font-bold text-center text-lg">
        {mode === 'Schedule Your Tour' ? 'Schedule Journey' : 'Start Instant Journey'}
      </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JourneySetupScreen;