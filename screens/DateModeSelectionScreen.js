// // screens/DateModeSelectionScreen.js
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// const DateModeSelectionScreen = ({ route, navigation }) => {
//   const { destination } = route.params;
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//   const [travelMode, setTravelMode] = useState('air');
//   const [isPublic, setIsPublic] = useState(true);

//   // Format date for display
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'short', 
//       month: 'short', 
//       day: 'numeric', 
//       year: 'numeric' 
//     });
//   };

//   // Format time for display
//   const formatTime = (time) => {
//     return time.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   // Date picker handlers
//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleDateConfirm = (date) => {
//     setSelectedDate(date);
//     hideDatePicker();
//   };

//   // Time picker handlers
//   const showTimePicker = () => {
//     setTimePickerVisibility(true);
//   };

//   const hideTimePicker = () => {
//     setTimePickerVisibility(false);
//   };

//   const handleTimeConfirm = (time) => {
//     setSelectedTime(time);
//     hideTimePicker();
//   };

//   // Create journey
//   const handleCreateJourney = () => {
//     // In a real app, this would send a request to create the journey
//     // Then navigate to the journey detail or back to home
//     navigation.navigate('JourneySetup', {
//       destination: destination.name,
//       date: selectedDate,
//       time: selectedTime,
//       travelMode,
//       isPublic
//     });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" />
      
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#4F46E5" />
//         </TouchableOpacity>
//         <Text className="text-xl font-bold text-gray-800">Plan Your Journey</Text>
//         <View style={{ width: 24 }} /> {/* For layout balance */}
//       </View>
      
//       <ScrollView className="flex-1 p-5">
//         {/* Destination Info */}
//         <View className="bg-gray-50 p-4 rounded-lg mb-6">
//           <Text className="text-sm text-gray-500">Destination</Text>
//           <Text className="text-xl font-bold text-gray-800">{destination.name}</Text>
//         </View>
        
//         {/* Date Selection */}
//         <Text className="text-lg font-bold text-gray-800 mb-3">When would you like to travel?</Text>
        
//         <TouchableOpacity 
//           className="flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-3"
//           onPress={showDatePicker}
//         >
//           <View className="flex-row items-center">
//             <Ionicons name="calendar-outline" size={22} color="#4F46E5" />
//             <Text className="ml-3 text-gray-700">Date</Text>
//           </View>
//           <Text className="text-gray-800 font-medium">{formatDate(selectedDate)}</Text>
//         </TouchableOpacity>
        
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           onConfirm={handleDateConfirm}
//           onCancel={hideDatePicker}
//           minimumDate={new Date()}
//         />
        
//         <TouchableOpacity 
//           className="flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-6"
//           onPress={showTimePicker}
//         >
//           <View className="flex-row items-center">
//             <Ionicons name="time-outline" size={22} color="#4F46E5" />
//             <Text className="ml-3 text-gray-700">Time</Text>
//           </View>
//           <Text className="text-gray-800 font-medium">{formatTime(selectedTime)}</Text>
//         </TouchableOpacity>
        
//         <DateTimePickerModal
//           isVisible={isTimePickerVisible}
//           mode="time"
//           onConfirm={handleTimeConfirm}
//           onCancel={hideTimePicker}
//         />
        
//         {/* Travel Mode */}
//         <Text className="text-lg font-bold text-gray-800 mb-3">How would you like to travel?</Text>
        
//         <View className="flex-row justify-between mb-6">
//           <TouchableOpacity 
//             className={`w-24 h-24 items-center justify-center rounded-lg ${travelMode === 'air' ? 'bg-indigo-100' : 'bg-gray-50'}`}
//             onPress={() => setTravelMode('air')}
//           >
//             <Ionicons 
//               name="airplane-outline" 
//               size={28} 
//               color={travelMode === 'air' ? "#4F46E5" : "#6B7280"} 
//             />
//             <Text className={`mt-2 font-medium ${travelMode === 'air' ? 'text-indigo-700' : 'text-gray-700'}`}>Air</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             className={`w-24 h-24 items-center justify-center rounded-lg ${travelMode === 'sea' ? 'bg-indigo-100' : 'bg-gray-50'}`}
//             onPress={() => setTravelMode('sea')}
//           >
//             <Ionicons 
//               name="boat-outline" 
//               size={28} 
//               color={travelMode === 'sea' ? "#4F46E5" : "#6B7280"} 
//             />
//             <Text className={`mt-2 font-medium ${travelMode === 'sea' ? 'text-indigo-700' : 'text-gray-700'}`}>Sea</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             className={`w-24 h-24 items-center justify-center rounded-lg ${travelMode === 'land' ? 'bg-indigo-100' : 'bg-gray-50'}`}
//             onPress={() => setTravelMode('land')}
//           >
//             <Ionicons 
//               name="car-outline" 
//               size={28} 
//               color={travelMode === 'land' ? "#4F46E5" : "#6B7280"} 
//             />
//             <Text className={`mt-2 font-medium ${travelMode === 'land' ? 'text-indigo-700' : 'text-gray-700'}`}>Land</Text>
//           </TouchableOpacity>
//         </View>
        
//         {/* Privacy Setting */}
//         <Text className="text-lg font-bold text-gray-800 mb-3">Journey Privacy</Text>
        
//         <View className="flex-row mb-6">
//           <TouchableOpacity 
//             className={`flex-1 p-4 rounded-lg mr-3 ${isPublic ? 'bg-indigo-100' : 'bg-gray-50'}`}
//             onPress={() => setIsPublic(true)}
//           >
//             <Ionicons 
//               name="globe-outline" 
//               size={24} 
//               color={isPublic ? "#4F46E5" : "#6B7280"} 
//             />
//             <Text className={`mt-2 font-medium ${isPublic ? 'text-indigo-700' : 'text-gray-700'}`}>Public</Text>
//             <Text className={`text-xs mt-1 ${isPublic ? 'text-indigo-600' : 'text-gray-500'}`}>
//               Others can join your journey
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             className={`flex-1 p-4 rounded-lg ${!isPublic ? 'bg-indigo-100' : 'bg-gray-50'}`}
//             onPress={() => setIsPublic(false)}
//           >
//             <Ionicons 
//               name="lock-closed-outline" 
//               size={24} 
//               color={!isPublic ? "#4F46E5" : "#6B7280"} 
//             />
//             <Text className={`mt-2 font-medium ${!isPublic ? 'text-indigo-700' : 'text-gray-700'}`}>Private</Text>
//             <Text className={`text-xs mt-1 ${!isPublic ? 'text-indigo-600' : 'text-gray-500'}`}>
//               Only people you invite
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
      
//       {/* Bottom Action Button */}
//       <View className="p-4 border-t border-gray-200">
//         <TouchableOpacity
//           className="bg-indigo-600 py-4 rounded-xl shadow"
//           onPress={handleCreateJourney}
//         >
//           <Text className="text-white font-bold text-center text-lg">
//             Create Journey
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DateModeSelectionScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const DateModeSelectionScreen = ({ route, navigation }) => {
//   const { destination } = route?.params || {};

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//   const [travelMode, setTravelMode] = useState('air');
//   const [isPublic, setIsPublic] = useState(true);

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   const formatTime = (time) => {
//     return time.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const showDatePicker = () => setDatePickerVisibility(true);
//   const hideDatePicker = () => setDatePickerVisibility(false);
//   const handleDateConfirm = (date) => {
//     setSelectedDate(date);
//     hideDatePicker();
//   };

//   const showTimePicker = () => setTimePickerVisibility(true);
//   const hideTimePicker = () => setTimePickerVisibility(false);
//   const handleTimeConfirm = (time) => {
//     setSelectedTime(time);
//     hideTimePicker();
//   };

//   const handleCreateJourney = () => {
//     if (!navigation || typeof navigation.navigate !== 'function') {
//       console.warn('Navigation is not available');
//       return;
//     }

//     navigation.navigate('JourneySetup', {
//       destination: destination?.name,
//       date: selectedDate,
//       time: selectedTime,
//       travelMode,
//       isPublic,
//     });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
//         <TouchableOpacity onPress={() => navigation?.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#4F46E5" />
//         </TouchableOpacity>
//         <Text className="text-xl font-bold text-gray-800">Plan Your Journey</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView className="flex-1 p-5">
//         {/* Destination Info */}
//         <View className="bg-gray-50 p-4 rounded-lg mb-6">
//           <Text className="text-sm text-gray-500">Destination</Text>
//           <Text className="text-xl font-bold text-gray-800">
//             {destination?.name || 'Unknown'}
//           </Text>
//         </View>

//         {/* Date Picker */}
//         <Text className="text-lg font-bold text-gray-800 mb-3">
//           When would you like to travel?
//         </Text>

//         <TouchableOpacity
//           className="flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-3"
//           onPress={showDatePicker}
//         >
//           <View className="flex-row items-center">
//             <Ionicons name="calendar-outline" size={22} color="#4F46E5" />
//             <Text className="ml-3 text-gray-700">Date</Text>
//           </View>
//           <Text className="text-gray-800 font-medium">{formatDate(selectedDate)}</Text>
//         </TouchableOpacity>

//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           onConfirm={handleDateConfirm}
//           onCancel={hideDatePicker}
//           minimumDate={new Date()}
//         />

//         {/* Time Picker */}
//         <TouchableOpacity
//           className="flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-6"
//           onPress={showTimePicker}
//         >
//           <View className="flex-row items-center">
//             <Ionicons name="time-outline" size={22} color="#4F46E5" />
//             <Text className="ml-3 text-gray-700">Time</Text>
//           </View>
//           <Text className="text-gray-800 font-medium">{formatTime(selectedTime)}</Text>
//         </TouchableOpacity>

//         <DateTimePickerModal
//           isVisible={isTimePickerVisible}
//           mode="time"
//           onConfirm={handleTimeConfirm}
//           onCancel={hideTimePicker}
//         />

//         {/* Travel Mode */}
//         <Text className="text-lg font-bold text-gray-800 mb-3">How would you like to travel?</Text>

//         <View className="flex-row justify-between mb-6">
//           {['air', 'sea', 'land'].map((mode) => (
//             <TouchableOpacity
//               key={mode}
//               className={`w-24 h-24 items-center justify-center rounded-lg ${
//                 travelMode === mode ? 'bg-indigo-100' : 'bg-gray-50'
//               }`}
//               onPress={() => setTravelMode(mode)}
//             >
//               <Ionicons
//                 name={
//                   mode === 'air'
//                     ? 'airplane-outline'
//                     : mode === 'sea'
//                     ? 'boat-outline'
//                     : 'car-outline'
//                 }
//                 size={28}
//                 color={travelMode === mode ? '#4F46E5' : '#6B7280'}
//               />
//               <Text
//                 className={`mt-2 font-medium ${
//                   travelMode === mode ? 'text-indigo-700' : 'text-gray-700'
//                 }`}
//               >
//                 {mode.charAt(0).toUpperCase() + mode.slice(1)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Privacy Setting */}
//         <Text className="text-lg font-bold text-gray-800 mb-3">Journey Privacy</Text>

//         <View className="flex-row mb-6">
//           {/* Public Option */}
//           <TouchableOpacity
//             className={`flex-1 p-4 rounded-lg mr-3 ${isPublic ? 'bg-indigo-100' : 'bg-gray-50'}`}
//             onPress={() => setIsPublic(true)}
//           >
//             <Ionicons
//               name="globe-outline"
//               size={24}
//               color={isPublic ? '#4F46E5' : '#6B7280'}
//             />
//             <Text className={`mt-2 font-medium ${isPublic ? 'text-indigo-700' : 'text-gray-700'}`}>
//               Public
//             </Text>
//             <Text className={`text-xs mt-1 ${isPublic ? 'text-indigo-600' : 'text-gray-500'}`}>
//               Others can join your journey
//             </Text>
//           </TouchableOpacity>

//           {/* Private Option */}
//           <TouchableOpacity
//             className={`flex-1 p-4 rounded-lg ${!isPublic ? 'bg-indigo-100' : 'bg-gray-50'}`}
//             onPress={() => setIsPublic(false)}
//           >
//             <Ionicons
//               name="lock-closed-outline"
//               size={24}
//               color={!isPublic ? '#4F46E5' : '#6B7280'}
//             />
//             <Text
//               className={`mt-2 font-medium ${
//                 !isPublic ? 'text-indigo-700' : 'text-gray-700'
//               }`}
//             >
//               Private
//             </Text>
//             <Text className={`text-xs mt-1 ${!isPublic ? 'text-indigo-600' : 'text-gray-500'}`}>
//               Only people you invite
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Bottom Button */}
//       <View className="p-4 border-t border-gray-200">
//         <TouchableOpacity
//           className="bg-indigo-600 py-4 rounded-xl shadow"
//           onPress={handleCreateJourney}
//         >
//           <Text className="text-white font-bold text-center text-lg">Create Journey</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DateModeSelectionScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Share,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


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
const DateModeSelectionScreen = ({ route, navigation }) => {
  const { destination } = route?.params || {};
  const {mode} = route.params
  console.log("destination data:", mode)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [travelMode, setTravelMode] = useState('air');
  const [isPublic, setIsPublic] = useState(true);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };
  
  const destName = typeof destination === 'string' ? destination : destination?.name || 'Unknown';

  const handleShareLink = async () => {
    try {
      const journeyId = Math.random().toString(36).substring(2, 10); // Generate a simple random ID
      const result = await Share.share({
        message: `Join my private journey to ${destination?.name || 'my destination'} on ${formatDate(selectedDate)} at ${formatTime(selectedTime)}. Use this code: ${journeyId}`,
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          Alert.alert('Success', 'Invitation link shared successfully!');
        } else {
          // shared
          Alert.alert('Success', 'Invitation link shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCreateJourney = () => {
    if (!navigation || typeof navigation.navigate !== 'function') {
      console.warn('Navigation is not available');
      return;
    }

    navigation.navigate('JourneySetup', {
      destination: destination?.name,
      date: selectedDate,
      time: selectedTime,
      travelMode: travelMode, // This ensures the selected travel mode is passed correctly
      isPublic,
      mode: route.params.mode,
    });
  };

  // Returns the appropriate icon based on travel mode
  const getTravelModeIcon = (mode) => {
    switch(mode) {
      case 'air':
        return 'airplane-outline';
      case 'sea':
        return 'boat-outline';
      case 'land':
        return 'car-outline';
      case 'train':
        return 'train-outline';
      default:
        return 'help-outline';
    }
  };

  // Returns display name for travel mode
  const getTravelModeName = (mode) => {
    const names = {
      'air': 'Air',
      'sea': 'Sea',
      'land': 'Land',
      'train': 'Train'
    };
    return names[mode] || mode.charAt(0).toUpperCase() + mode.slice(1);
  };

    const getDestinationImage = (name) => {
      if (typeof destination === 'object' && destination.image && typeof destination.image !== 'string') {
        return destination.image;
      }
      return destinationImages[name] || defaultImage;
    };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="w-full p-2  h-48 relative">
        <Image 
            source={getDestinationImage(destName)}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        </View>
      {/* Header */}
      {/* <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4F46E5" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Plan Your Journey</Text>
        <View style={{ width: 24 }} />
      </View> */}

      <ScrollView className="flex-1 p-5">
        {/* Destination Info */}
        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-sm text-gray-500">Destination</Text>
          <Text className="text-xl font-bold text-gray-800">
            {destination?.name || 'Unknown'}
          </Text>
        </View>
        {mode === 'Schedule Your Tour' && (
      <>
        <Text className="text-lg font-bold text-gray-800 mb-3">
          When would you like to travel?
        </Text>

        <TouchableOpacity
          className="flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-3"
          onPress={showDatePicker}
        >
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={22} color="#4F46E5" />
            <Text className="ml-3 text-gray-700">Date</Text>
          </View>
          <Text className="text-gray-800 font-medium">{formatDate(selectedDate)}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
                {/* Time Picker */}
        <TouchableOpacity
          className="flex-row justify-between items-center bg-gray-50 p-4 rounded-lg mb-6"
          onPress={showTimePicker}
        >
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={22} color="#4F46E5" />
            <Text className="ml-3 text-gray-700">Time</Text>
          </View>
          <Text className="text-gray-800 font-medium">{formatTime(selectedTime)}</Text>
        </TouchableOpacity>
      </>
        )}


        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        {/* Travel Mode */}
        <Text className="text-lg font-bold text-gray-800 mb-3">How would you like to travel?</Text>

        <View className="flex-row justify-between flex-wrap mb-6">
          {['air',  'land', 'train'].map((mode) => (
            <TouchableOpacity
              key={mode}
              className={`w-1/4 items-center justify-center rounded-lg py-3 ${
                travelMode === mode ? 'bg-indigo-100' : 'bg-gray-50'
              } ${mode === 'train' || mode === 'land' ? 'mt-3' : ''}`}
              onPress={() => setTravelMode(mode)}
            >
              <Ionicons
                name={getTravelModeIcon(mode)}
                size={28}
                color={travelMode === mode ? '#4F46E5' : '#6B7280'}
              />
              <Text
                className={`mt-2 font-medium ${
                  travelMode === mode ? 'text-indigo-700' : 'text-gray-700'
                }`}
              >
                {getTravelModeName(mode)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Privacy Setting */}
        <Text className="text-lg font-bold text-gray-800 mb-3">Journey Privacy</Text>

        <View className="flex-row mb-6">
          {/* Public Option */}
          <TouchableOpacity
            className={`flex-1 p-4 rounded-lg mr-3 ${isPublic ? 'bg-indigo-100' : 'bg-gray-50'}`}
            onPress={() => setIsPublic(true)}
          >
            <Ionicons
              name="globe-outline"
              size={24}
              color={isPublic ? '#4F46E5' : '#6B7280'}
            />
            <Text className={`mt-2 font-medium ${isPublic ? 'text-indigo-700' : 'text-gray-700'}`}>
              Public
            </Text>
            <Text className={`text-xs mt-1 ${isPublic ? 'text-indigo-600' : 'text-gray-500'}`}>
              Others can join your journey
            </Text>
          </TouchableOpacity>

          {/* Private Option */}
          <TouchableOpacity
            className={`flex-1 p-4 rounded-lg ${!isPublic ? 'bg-indigo-100' : 'bg-gray-50'}`}
            onPress={() => setIsPublic(false)}
          >
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={!isPublic ? '#4F46E5' : '#6B7280'}
            />
            <Text
              className={`mt-2 font-medium ${
                !isPublic ? 'text-indigo-700' : 'text-gray-700'
              }`}
            >
              Private
            </Text>
            <Text className={`text-xs mt-1 ${!isPublic ? 'text-indigo-600' : 'text-gray-500'}`}>
              Only people you invite
            </Text>
          </TouchableOpacity>
        </View>

        {/* Share Link Button (visible only when Private is selected) */}
        {!isPublic && (
          <TouchableOpacity
            className="bg-indigo-100 py-3 px-4 rounded-lg mb-6 flex-row items-center justify-center"
            onPress={handleShareLink}
          >
            <Ionicons name="share-social-outline" size={20} color="#4F46E5" />
            <Text className="text-indigo-700 font-medium ml-2">Share Invitation Link</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-indigo-600 py-4 rounded-xl shadow"
          onPress={handleCreateJourney}
        >
          <Text className="text-white font-bold text-center text-lg">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DateModeSelectionScreen;