// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// // Sample destination landmarks data
// const LANDMARKS = {
//   'Paris, France': [
//     {
//       id: 1,
//       name: 'Eiffel Tower',
//       image: 'https://source.unsplash.com/featured/?eiffel,tower',
//       description: 'Iconic iron tower on the Champ de Mars, named after engineer Gustave Eiffel.',
//       facts: ['Completed in 1889', '330 meters tall', 'Over 7 million visitors annually']
//     },
//     {
//       id: 2,
//       name: 'Louvre Museum',
//       image: 'https://source.unsplash.com/featured/?louvre,museum',
//       description: 'World\'s largest art museum, home to the Mona Lisa and thousands of historical artifacts.',
//       facts: ['Originally a fortress', 'Contains 380,000 objects', 'World\'s most visited museum']
//     },
//     {
//       id: 3,
//       name: 'Notre-Dame Cathedral',
//       image: 'https://source.unsplash.com/featured/?notre,dame',
//       description: 'Medieval Catholic cathedral known for its French Gothic architecture.',
//       facts: ['Construction began in 1163', 'Features magnificent stained glass', 'UNESCO World Heritage Site']
//     }
//   ],
//   'Tokyo, Japan': [
//     {
//       id: 1,
//       name: 'Tokyo Skytree',
//       image: 'https://source.unsplash.com/featured/?tokyo,skytree',
//       description: 'Tallest tower in Japan and second tallest structure in the world.',
//       facts: ['634 meters tall', 'Opened in 2012', 'Features observation decks']
//     },
//     {
//       id: 2,
//       name: 'Senso-ji Temple',
//       image: 'https://source.unsplash.com/featured/?sensoji,temple',
//       description: 'Ancient Buddhist temple located in Asakusa, Tokyo\'s oldest temple.',
//       facts: ['Founded in 628 CE', 'Dedicated to Kannon Bodhisattva', 'Famous Thunder Gate entrance']
//     },
//     {
//       id: 3,
//       name: 'Shibuya Crossing',
//       image: 'https://source.unsplash.com/featured/?shibuya,crossing',
//       description: 'Famous intersection known as the busiest pedestrian crossing in the world.',
//       facts: ['Up to 3,000 people cross at once', 'Featured in many films', 'Surrounded by shopping districts']
//     }
//   ]
// };

// // Default landmarks for destinations without specific data
// const DEFAULT_LANDMARKS = [
//   {
//     id: 1,
//     name: 'Main Square',
//     image: 'https://source.unsplash.com/featured/?city,square',
//     description: 'The central gathering place in the heart of the city.',
//     facts: ['Historical meeting point', 'Surrounded by cafés', 'Features local architecture']
//   },
//   {
//     id: 2,
//     name: 'Cultural Museum',
//     image: 'https://source.unsplash.com/featured/?museum,culture',
//     description: 'Showcasing the rich heritage and history of the region.',
//     facts: ['Extensive artifact collection', 'Interactive exhibits', 'Regular cultural events']
//   },
//   {
//     id: 3,
//     name: 'Scenic Viewpoint',
//     image: 'https://source.unsplash.com/featured/?panorama,view',
//     description: 'Offering breathtaking views of the entire area.',
//     facts: ['Popular photography spot', 'Accessible viewing platforms', 'Spectacular sunset views']
//   }
// ];

// const VRExplorationScreen = ({ route, navigation }) => {
//   const { destination } = route.params;
//   const destName = typeof destination === 'string' ? destination : destination.name;
  
//   // State variables
//   const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const [showInfo, setShowInfo] = useState(false);
//   const [infoAnimation] = useState(new Animated.Value(0));
  
//   // Get landmarks for the destination
//   const landmarks = LANDMARKS[destName] || DEFAULT_LANDMARKS;
//   const currentLandmark = landmarks[currentLandmarkIndex];
  
//   // Update info panel animation when toggled
//   useEffect(() => {
//     Animated.timing(infoAnimation, {
//       toValue: showInfo ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true
//     }).start();
//   }, [showInfo]);
  
//   // Navigate to next or previous landmark
//   const navigateLandmark = (direction) => {
//     setShowInfo(false);
//     let newIndex;
//     if (direction === 'next') {
//       newIndex = (currentLandmarkIndex + 1) % landmarks.length;
//     } else {
//       newIndex = (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
//     }
//     setCurrentLandmarkIndex(newIndex);
//   };
  
//   // Toggle info panel visibility
//   const toggleInfo = () => {
//     setShowInfo(!showInfo);
//   };
  
//   // Toggle controls visibility
//   const toggleControls = () => {
//     if (showInfo) {
//       setShowInfo(false);
//     } else {
//       setShowControls(!showControls);
//     }
//   };
  
//   // Handle navigation to Marketplace
//   const handleMarketplacePress = () => {
//     navigation.navigate('Marketplace', { destination: destName });
//   };
  
//   // Handle back navigation
//   const handleBackPress = () => {
//     navigation.goBack();
//   };
  
//   // Calculate styles for info panel animation
//   const infoTranslateY = infoAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [300, 0]
//   });
  
//   return (
//     <View className="flex-1 bg-black">
//       {/* VR Background */}
//       <Image
//         source={{ uri: currentLandmark.image }}
//         className="absolute w-full h-full"
//         resizeMode="cover"
//       />
      
//       {/* Landmark Overlay */}
//       <LinearGradient
//         colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
//         className="absolute inset-0"
//       />
      
//       {/* Main Content - only shown when controls are visible */}
//       {showControls && (
//         <SafeAreaView className="flex-1">
//           {/* Top Bar with higher z-index */}
//           <View className="flex-row justify-between items-center p-4 z-50">
//             <TouchableOpacity 
//               onPress={handleBackPress}
//               className="bg-black bg-opacity-50 p-2 rounded-full"
//               activeOpacity={0.7}
//             >
//               <Ionicons name="arrow-back" size={24} color="white" />
//             </TouchableOpacity>
            
//             <View className="bg-black bg-opacity-50 px-4 py-2 rounded-full">
//               <Text className="text-white font-medium">{destName}</Text>
//             </View>
            
//             <TouchableOpacity 
//               className="bg-black bg-opacity-50 p-2 rounded-full"
//               onPress={handleMarketplacePress}
//               activeOpacity={0.7}
//             >
//               <Ionicons name="cart-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
          
//           {/* Bottom Controls */}
//           <View className="absolute bottom-0 left-0 right-0 p-4 z-50">
//             <View className="flex-row justify-between items-center mb-4">
//               <TouchableOpacity 
//                 onPress={() => navigateLandmark('prev')}
//                 className="bg-black bg-opacity-50 p-3 rounded-full"
//                 activeOpacity={0.7}
//               >
//                 <Ionicons name="chevron-back" size={24} color="white" />
//               </TouchableOpacity>
              
//               <View className="bg-black bg-opacity-70 px-6 py-3 rounded-lg">
//                 <Text className="text-white font-bold text-lg">{currentLandmark.name}</Text>
//               </View>
              
//               <TouchableOpacity 
//                 onPress={() => navigateLandmark('next')}
//                 className="bg-black bg-opacity-50 p-3 rounded-full"
//                 activeOpacity={0.7}
//               >
//                 <Ionicons name="chevron-forward" size={24} color="white" />
//               </TouchableOpacity>
//             </View>
            
//             {/* Control buttons */}
//             <View className="flex-row justify-around mb-4">
//               <TouchableOpacity className="items-center" activeOpacity={0.7}>
//                 <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
//                   <Ionicons name="volume-medium" size={24} color="white" />
//                 </View>
//                 <Text className="text-white text-xs">Audio</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity className="items-center" activeOpacity={0.7}>
//                 <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
//                   <Ionicons name="camera" size={24} color="white" />
//                 </View>
//                 <Text className="text-white text-xs">Photo</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 className="items-center" 
//                 onPress={toggleInfo}
//                 activeOpacity={0.7}
//               >
//                 <View className={`p-3 rounded-full mb-1 ${showInfo ? 'bg-indigo-600' : 'bg-black bg-opacity-50'}`}>
//                   <Ionicons name="information-circle" size={24} color="white" />
//                 </View>
//                 <Text className="text-white text-xs">Info</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 className="items-center"
//                 onPress={handleMarketplacePress}
//                 activeOpacity={0.7}
//               >
//                 <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
//                   <Ionicons name="cart" size={24} color="white" />
//                 </View>
//                 <Text className="text-white text-xs">Shop</Text>
//               </TouchableOpacity>
//             </View>
            
//             {/* Landmark Navigation Dots */}
//             <View className="flex-row justify-center">
//               {landmarks.map((_, index) => (
//                 <TouchableOpacity 
//                   key={index} 
//                   onPress={() => setCurrentLandmarkIndex(index)}
//                   className="mx-1"
//                   activeOpacity={0.7}
//                 >
//                   <View 
//                     className={`h-2 w-2 rounded-full ${
//                       index === currentLandmarkIndex ? 'bg-white' : 'bg-gray-500'
//                     }`}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </SafeAreaView>
//       )}
      
//       {/* Information Panel - animated from bottom */}
//       <Animated.View
//         className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 rounded-t-3xl overflow-hidden z-40"
//         style={{
//           transform: [{ translateY: infoTranslateY }],
//           maxHeight: '70%',
//           display: showInfo ? 'flex' : 'none'
//         }}
//       >
//         <ScrollView className="p-6">
//           <View className="items-center mb-2">
//             <View className="w-12 h-1 bg-gray-400 rounded-full" />
//           </View>
          
//           <Text className="text-white text-2xl font-bold mb-3">{currentLandmark.name}</Text>
//           <Text className="text-gray-300 text-base mb-4">{currentLandmark.description}</Text>
          
//           <Text className="text-white font-bold text-lg mb-2">Interesting Facts</Text>
//           {currentLandmark.facts.map((fact, index) => (
//             <View key={index} className="flex-row items-center mb-2">
//               <View className="w-2 h-2 rounded-full bg-indigo-500 mr-2" />
//               <Text className="text-gray-300">{fact}</Text>
//             </View>
//           ))}
          
//           <TouchableOpacity 
//             className="bg-indigo-600 py-3 px-4 rounded-lg mt-4"
//             onPress={handleMarketplacePress}
//             activeOpacity={0.7}
//           >
//             <Text className="text-white text-center font-bold">Visit Local Marketplace</Text>
//           </TouchableOpacity>
          
//           <View className="h-20" />
//         </ScrollView>
//       </Animated.View>
      
//       {/* Tap anywhere to toggle controls - only when controls are hidden */}
//       {!showControls && (
//         <TouchableOpacity 
//           className="absolute inset-0 z-30"
//           activeOpacity={1}
//           onPress={toggleControls}
//         />
//       )}
//     </View>
//   );
// };

// export default VRExplorationScreen;



import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, ScrollView, PanResponder, BackHandler, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

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
  // Debug logging for navigation lifecycle
  console.log('VRExplorationScreen rendering');
  
  const mountedRef = useRef(true);
  const backHandlerRef = useRef(null);
  
  // Safe route params extraction
  const routeParams = route?.params || {};
  const destination = routeParams.destination || 'Default Destination';
  const destName = typeof destination === 'string' ? destination : (destination?.name || 'Unknown Location');
  
  // State variables
  const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [infoAnimation] = useState(new Animated.Value(0));
  const [isScreenMounted, setIsScreenMounted] = useState(false);
  const controlsTimeout = useRef(null);
  
  // Get landmarks for the destination
  const landmarks = (destName && LANDMARKS[destName]) || DEFAULT_LANDMARKS;
  const currentLandmark = landmarks[currentLandmarkIndex] || landmarks[0];

  // Initial mounting flag
  useEffect(() => {
    console.log('VRExplorationScreen mounted');
    setIsScreenMounted(true);
    
    return () => {
      console.log('VRExplorationScreen unmounted');
      mountedRef.current = false;
      setIsScreenMounted(false);
      
      // Clear any timeouts on unmount
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);
  
  // Focus effect to handle back button and maintain component state
  useFocusEffect(
    useCallback(() => {
      console.log('VRExplorationScreen focused');
      
      // Prevent immediate back navigation
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('Hardware back button pressed');
        // Only handle when the component is fully mounted
        if (isScreenMounted) {
          handleBackPress();
          return true; // Prevents default back behavior
        }
        return false;
      });
      
      backHandlerRef.current = backHandler;
      
      return () => {
        console.log('VRExplorationScreen unfocused');
        if (backHandlerRef.current) {
          backHandlerRef.current.remove();
        }
      };
    }, [isScreenMounted])
  );

  // Add navigation event listener
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent accidental navigation away if just mounted
      if (!isScreenMounted) {
        console.log('Preventing navigation - screen not fully mounted');
        e.preventDefault();
      }
    });

    return unsubscribe;
  }, [navigation, isScreenMounted]);

  // The toggleInfo function
  const toggleInfo = () => {
    if (!mountedRef.current) return;
    
    setShowInfo(prevShowInfo => !prevShowInfo);
    
    // If we're showing the info panel, make sure controls stay visible
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
  };

  // Update info panel animation when toggled
  useEffect(() => {
    if (!mountedRef.current) return;
    
    Animated.timing(infoAnimation, {
      toValue: showInfo ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showInfo, infoAnimation]);

  // Navigate to next or previous landmark
  const navigateLandmark = (direction) => {
    if (!mountedRef.current) return;
    
    setShowInfo(false);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentLandmarkIndex + 1) % landmarks.length;
    } else {
      newIndex = (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
    }
    setCurrentLandmarkIndex(newIndex);
  };

  // Handle navigation to Marketplace with safeguards
  const handleMarketplacePress = () => {
    if (!mountedRef.current || !isScreenMounted) return;
    
    try {
      console.log('Navigating to Marketplace');
      // Use a timeout to avoid navigation race conditions
      setTimeout(() => {
        navigation.navigate('Marketplace', { destination: destName });
      }, 300);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  // Handle back navigation with safeguards
  const handleBackPress = () => {
    if (!mountedRef.current || !isScreenMounted) return;
    
    console.log('Handling back press');
    
    // Confirm user wants to leave if they've been viewing the screen
    if (isScreenMounted) {
      try {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } catch (error) {
        console.error('Navigation back error:', error);
      }
    }
  };

  // PanResponder with protections against accidental gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to deliberate movements
        return Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) > 20;
      },
      onPanResponderRelease: () => {
        if (!mountedRef.current) return;
        
        if (!showControls) {
          setShowControls(true);
          // Auto-hide controls after 5 seconds
          if (controlsTimeout.current) {
            clearTimeout(controlsTimeout.current);
          }
          controlsTimeout.current = setTimeout(() => {
            if (mountedRef.current) {
              setShowControls(false);
            }
          }, 5000);
        }
      },
    })
  ).current;

  // Calculate styles for info panel animation
  const infoTranslateY = infoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  // If the component isn't mounted yet, show a loading placeholder
  if (!isScreenMounted) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-lg">Loading VR Experience...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black" {...panResponder.panHandlers}>
      {/* VR Background */}
      <Image
        source={{ uri: currentLandmark.image }}
        className="absolute w-full h-full"
        resizeMode="cover"
        onError={() => console.log('Image failed to load')}
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
          <View className="flex-row justify-between items-center p-4 z-50">
            <TouchableOpacity 
              onPress={handleBackPress}
              className="bg-black bg-opacity-50 p-2 rounded-full"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <View className="bg-black bg-opacity-50 px-4 py-2 rounded-full">
              <Text className="text-white font-medium">{destName}</Text>
            </View>
            
            <TouchableOpacity 
              className="bg-black bg-opacity-50 p-2 rounded-full"
              onPress={handleMarketplacePress}
              activeOpacity={0.7}
            >
              <Ionicons name="cart-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Bottom Controls */}
          <View className="absolute bottom-0 left-0 right-0 p-4 z-50">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity 
                onPress={() => navigateLandmark('prev')}
                className="bg-black bg-opacity-50 p-3 rounded-full"
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              
              <View className="bg-black bg-opacity-70 px-6 py-3 rounded-lg">
                <Text className="text-white font-bold text-lg">{currentLandmark.name}</Text>
              </View>
              
              <TouchableOpacity 
                onPress={() => navigateLandmark('next')}
                className="bg-black bg-opacity-50 p-3 rounded-full"
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            {/* Control buttons */}
            <View className="flex-row justify-around mb-4">
              <TouchableOpacity className="items-center" activeOpacity={0.7}>
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="volume-medium" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Audio</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="items-center" activeOpacity={0.7}>
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="camera" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="items-center" 
                onPress={toggleInfo}
                activeOpacity={0.7}
              >
                <View className={`p-3 rounded-full mb-1 ${showInfo ? 'bg-indigo-600' : 'bg-black bg-opacity-50'}`}>
                  <Ionicons name="information-circle" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Info</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="items-center"
                onPress={handleMarketplacePress}
                activeOpacity={0.7}
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
                  onPress={() => {
                    setCurrentLandmarkIndex(index);
                    setShowInfo(false);
                  }}
                  className="mx-1"
                  activeOpacity={0.7}
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
      
      {/* Information Panel */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 rounded-t-3xl overflow-hidden z-40"
        style={{
          transform: [{ translateY: infoTranslateY }],
          maxHeight: '70%',
          display: showInfo ? 'flex' : 'none',
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
            onPress={handleMarketplacePress}
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-bold">Visit Local Marketplace</Text>
          </TouchableOpacity>
          
          <View className="h-20" />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default VRExplorationScreen;