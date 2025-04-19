// screens/VRJourneyScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const VRJourneyScreen = ({ route, navigation }) => {
  const { destination, transportMode, viewMode, settings } = route.params;
  
  // Animation values
  const [progress, setProgress] = useState(0);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const moveAnim = React.useRef(new Animated.Value(0)).current;
  
  // Journey phases
  const [journeyPhase, setJourneyPhase] = useState('takeoff'); // takeoff, journey, arrival
  const [showControls, setShowControls] = useState(true);
  const [infoMessage, setInfoMessage] = useState(null);
  
  // Mockup journey checkpoints - in a real app, these would be more sophisticated
  const journeyCheckpoints = [
    { name: "Departure", description: "Preparing for departure", time: 5 },
    { name: "Take Off", description: "Leaving the ground", time: 10 },
    { name: "Cruising", description: "Enjoying the journey", time: 18 },
    { name: "Approaching", description: "Getting closer to our destination", time: 25 },
    { name: "Arrival", description: "Welcome to your destination", time: 30 }
  ];
  
  // Get background image based on journey phase and transport mode
  const getBackgroundImage = () => {
    if (transportMode === 'Flight') {
      if (journeyPhase === 'takeoff') return 'https://source.unsplash.com/featured/?airport,runway';
      if (journeyPhase === 'journey') return 'https://source.unsplash.com/featured/?sky,clouds';
      return 'https://source.unsplash.com/featured/?landing,airplane';
    } else if (transportMode === 'Train') {
      if (journeyPhase === 'takeoff') return 'https://source.unsplash.com/featured/?train,station';
      if (journeyPhase === 'journey') return 'https://source.unsplash.com/featured/?railway,tracks';
      return 'https://source.unsplash.com/featured/?train,arrival';
    } else if (transportMode === 'Boat') {
      if (journeyPhase === 'takeoff') return 'https://source.unsplash.com/featured/?harbor,boat';
      if (journeyPhase === 'journey') return 'https://source.unsplash.com/featured/?ocean,sea';
      return 'https://source.unsplash.com/featured/?dock,harbor';
    } else {
      if (journeyPhase === 'takeoff') return 'https://source.unsplash.com/featured/?path,start';
      if (journeyPhase === 'journey') return 'https://source.unsplash.com/featured/?walking,path';
      return 'https://source.unsplash.com/featured/?destination,arrival';
    }
  };
  
  // Simulate journey progression
  useEffect(() => {
    const totalDuration = 30; // seconds for the journey simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (1/totalDuration);
        
        // Check for journey phase changes
        if (newProgress >= 0.15 && journeyPhase === 'takeoff') {
          setJourneyPhase('journey');
          showInfoMessage("Now cruising. Enjoy the journey!");
        } else if (newProgress >= 0.85 && journeyPhase === 'journey') {
          setJourneyPhase('arrival');
          showInfoMessage("Arriving at your destination!");
        } else if (newProgress >= 0.98) {
          // Journey complete
          setTimeout(() => {
            navigation.navigate('VRExploration', { destination });
          }, 2000);
        }
        
        // Check for checkpoints
        journeyCheckpoints.forEach(checkpoint => {
          if (Math.abs((checkpoint.time / totalDuration) - newProgress) < 0.02) {
            showInfoMessage(checkpoint.description);
          }
        });
        
        return Math.min(newProgress, 1);
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [journeyPhase]);
  
  // Show info message with animation
  const showInfoMessage = (message) => {
    setInfoMessage(message);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => setInfoMessage(null));
  };
  
  // Toggle controls visibility
  const toggleControls = () => {
    setShowControls(prev => !prev);
  };
  
  return (
    <View className="flex-1 bg-black">
      {/* VR Background - in a real app, this would be a VR component */}
      <Image
        source={{ uri: getBackgroundImage() }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      
      {/* Journey Overlay - changes based on journey phase */}
      <View className="absolute inset-0">
        {journeyPhase === 'takeoff' && (
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            className="absolute top-0 left-0 right-0 h-40"
          />
        )}
        {journeyPhase === 'arrival' && (
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 left-0 right-0 h-60"
          />
        )}
      </View>
      
      {/* Info Message */}
      {infoMessage && (
        <Animated.View 
          className="absolute top-1/4 left-0 right-0 items-center"
          style={{ opacity: fadeAnim }}
        >
          <View className="bg-black bg-opacity-70 px-6 py-3 rounded-lg">
            <Text className="text-white text-lg font-medium text-center">{infoMessage}</Text>
          </View>
        </Animated.View>
      )}
      
      {/* Controls Overlay - only shown when controls are visible */}
      {showControls && (
        <SafeAreaView className="flex-1">
          {/* Top Bar */}
          <View className="flex-row justify-between items-center p-4">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="bg-black bg-opacity-50 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <View className="bg-black bg-opacity-50 px-4 py-2 rounded-full">
              <Text className="text-white font-medium">{viewMode}</Text>
            </View>
            
            <TouchableOpacity 
              className="bg-black bg-opacity-50 p-2 rounded-full"
              onPress={() => showInfoMessage("Settings can be adjusted during the journey.")}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Destination Info - Only shown at arrival */}
          {journeyPhase === 'arrival' && (
            <View className="absolute bottom-24 left-4 right-4 bg-black bg-opacity-70 p-4 rounded-lg">
              <Text className="text-white text-xl font-bold mb-2">Welcome to {destination}</Text>
              <Text className="text-white mb-4">You have arrived at your destination. Prepare to explore!</Text>
              <TouchableOpacity
                className="bg-indigo-600 py-3 rounded-lg"
                onPress={() => navigation.navigate('VRExploration', { destination })}
              >
                <Text className="text-white text-center font-bold">Begin Tour</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Bottom Controls */}
          <View className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress bar */}
            <View className="bg-gray-700 h-1 rounded-full mb-4 overflow-hidden">
              <View 
                className="bg-indigo-500 h-full rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </View>
            
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white">Departure</Text>
              <Text className="text-white">Arrival</Text>
            </View>
            
            {/* Control buttons */}
            <View className="flex-row justify-around mb-4">
              <TouchableOpacity className="items-center">
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="volume-medium" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Audio</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center">
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="camera" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center" onPress={() => showInfoMessage("View changed!")}>
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="eye" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">View</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center" onPress={() => showInfoMessage("Info about this location")}>
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="information-circle" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
      
      {/* Tap anywhere to toggle controls */}
      <TouchableOpacity 
        className="absolute inset-0 z-10"
        activeOpacity={1}
        onPress={toggleControls}
      />
    </View>
  );
};

export default VRJourneyScreen;