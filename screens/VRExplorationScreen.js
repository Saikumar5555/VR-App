// screens/VRExplorationScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Sample destination landmarks data
const LANDMARKS = {
  'Paris, France': [
    {
      id: 1,
      name: 'Eiffel Tower',
      image: 'https://source.unsplash.com/featured/?eiffel,tower',
      description: 'Iconic iron tower on the Champ de Mars, named after engineer Gustave Eiffel.',
      facts: ['Completed in 1889', '330 meters tall', 'Over 7 million visitors annually']
    },
    {
      id: 2,
      name: 'Louvre Museum',
      image: 'https://source.unsplash.com/featured/?louvre,museum',
      description: 'World\'s largest art museum, home to the Mona Lisa and thousands of historical artifacts.',
      facts: ['Originally a fortress', 'Contains 380,000 objects', 'World\'s most visited museum']
    },
    {
      id: 3,
      name: 'Notre-Dame Cathedral',
      image: 'https://source.unsplash.com/featured/?notre,dame',
      description: 'Medieval Catholic cathedral known for its French Gothic architecture.',
      facts: ['Construction began in 1163', 'Features magnificent stained glass', 'UNESCO World Heritage Site']
    }
  ],
  'Tokyo, Japan': [
    {
      id: 1,
      name: 'Tokyo Skytree',
      image: 'https://source.unsplash.com/featured/?tokyo,skytree',
      description: 'Tallest tower in Japan and second tallest structure in the world.',
      facts: ['634 meters tall', 'Opened in 2012', 'Features observation decks']
    },
    {
      id: 2,
      name: 'Senso-ji Temple',
      image: 'https://source.unsplash.com/featured/?sensoji,temple',
      description: 'Ancient Buddhist temple located in Asakusa, Tokyo\'s oldest temple.',
      facts: ['Founded in 628 CE', 'Dedicated to Kannon Bodhisattva', 'Famous Thunder Gate entrance']
    },
    {
      id: 3,
      name: 'Shibuya Crossing',
      image: 'https://source.unsplash.com/featured/?shibuya,crossing',
      description: 'Famous intersection known as the busiest pedestrian crossing in the world.',
      facts: ['Up to 3,000 people cross at once', 'Featured in many films', 'Surrounded by shopping districts']
    }
  ]
};

// Default landmarks for destinations without specific data
const DEFAULT_LANDMARKS = [
  {
    id: 1,
    name: 'Main Square',
    image: 'https://source.unsplash.com/featured/?city,square',
    description: 'The central gathering place in the heart of the city.',
    facts: ['Historical meeting point', 'Surrounded by cafés', 'Features local architecture']
  },
  {
    id: 2,
    name: 'Cultural Museum',
    image: 'https://source.unsplash.com/featured/?museum,culture',
    description: 'Showcasing the rich heritage and history of the region.',
    facts: ['Extensive artifact collection', 'Interactive exhibits', 'Regular cultural events']
  },
  {
    id: 3,
    name: 'Scenic Viewpoint',
    image: 'https://source.unsplash.com/featured/?panorama,view',
    description: 'Offering breathtaking views of the entire area.',
    facts: ['Popular photography spot', 'Accessible viewing platforms', 'Spectacular sunset views']
  }
];

const VRExplorationScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const destName = typeof destination === 'string' ? destination : destination.name;
  
  // State variables
  const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [infoAnimation] = useState(new Animated.Value(0));
  
  // Get landmarks for the destination
  const landmarks = LANDMARKS[destName] || DEFAULT_LANDMARKS;
  const currentLandmark = landmarks[currentLandmarkIndex];
  
  // Update info panel animation when toggled
  useEffect(() => {
    Animated.timing(infoAnimation, {
      toValue: showInfo ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [showInfo]);
  
  // Navigate to next or previous landmark
  const navigateLandmark = (direction) => {
    setShowInfo(false);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentLandmarkIndex + 1) % landmarks.length;
    } else {
      newIndex = (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
    }
    setCurrentLandmarkIndex(newIndex);
  };
  
  // Toggle info panel visibility
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };
  
  // Toggle controls visibility
  const toggleControls = () => {
    if (showInfo) {
      setShowInfo(false);
    } else {
      setShowControls(!showControls);
    }
  };
  
  // Calculate styles for info panel animation
  const infoTranslateY = infoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  });
  
  return (
    <View className="flex-1 bg-black">
      {/* VR Background - in a real app, this would be a VR component */}
      <Image
        source={{ uri: currentLandmark.image }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      
      {/* Landmark Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
        className="absolute inset-0"
      />
      
      {/* Main Content - only shown when controls are visible */}
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
              <Text className="text-white font-medium">{destName}</Text>
            </View>
            
            <TouchableOpacity 
              className="bg-black bg-opacity-50 p-2 rounded-full"
              onPress={() => navigation.navigate('Marketplace', { destination: destName })}
            >
              <Ionicons name="cart-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Bottom Controls */}
          <View className="absolute bottom-0 left-0 right-0 p-4">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity 
                onPress={() => navigateLandmark('prev')}
                className="bg-black bg-opacity-50 p-3 rounded-full"
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              
              <View className="bg-black bg-opacity-70 px-6 py-3 rounded-lg">
                <Text className="text-white font-bold text-lg">{currentLandmark.name}</Text>
              </View>
              
              <TouchableOpacity 
                onPress={() => navigateLandmark('next')}
                className="bg-black bg-opacity-50 p-3 rounded-full"
              >
                <Ionicons name="chevron-forward" size={24} color="white" />
              </TouchableOpacity>
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
              
              <TouchableOpacity className="items-center" onPress={toggleInfo}>
                <View className={`p-3 rounded-full mb-1 ${showInfo ? 'bg-indigo-600' : 'bg-black bg-opacity-50'}`}>
                  <Ionicons name="information-circle" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Info</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="items-center"
                onPress={() => navigation.navigate('Marketplace', { destination: destName })}
              >
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="cart" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Shop</Text>
              </TouchableOpacity>
            </View>
            
            {/* Landmark Navigation Dots */}
            <View className="flex-row justify-center">
              {landmarks.map((_, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => setCurrentLandmarkIndex(index)}
                  className="mx-1"
                >
                  <View 
                    className={`h-2 w-2 rounded-full ${
                      index === currentLandmarkIndex ? 'bg-white' : 'bg-gray-500'
                    }`}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      )}
      
      {/* Information Panel - animated from bottom */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 rounded-t-3xl overflow-hidden"
        style={{
          transform: [{ translateY: infoTranslateY }],
          maxHeight: '70%',
          display: showInfo ? 'flex' : 'none'
        }}
      >
        <ScrollView className="p-6">
          <View className="items-center mb-2">
            <View className="w-12 h-1 bg-gray-400 rounded-full" />
          </View>
          
          <Text className="text-white text-2xl font-bold mb-3">{currentLandmark.name}</Text>
          <Text className="text-gray-300 text-base mb-4">{currentLandmark.description}</Text>
          
          <Text className="text-white font-bold text-lg mb-2">Interesting Facts</Text>
          {currentLandmark.facts.map((fact, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-indigo-500 mr-2" />
              <Text className="text-gray-300">{fact}</Text>
            </View>
          ))}
          
          <TouchableOpacity 
            className="bg-indigo-600 py-3 px-4 rounded-lg mt-4"
            onPress={() => navigation.navigate('Marketplace', { destination: destName })}
          >
            <Text className="text-white text-center font-bold">Visit Local Marketplace</Text>
          </TouchableOpacity>
          
          <View className="h-20" />
        </ScrollView>
      </Animated.View>
      
      {/* Tap anywhere to toggle controls */}
      <TouchableOpacity 
        className="absolute inset-0 z-10"
        activeOpacity={1}
        onPress={toggleControls}
      />
    </View>
  );
};

export default VRExplorationScreen;