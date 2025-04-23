// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { View, Text, Image, TouchableOpacity, Animated, ScrollView, PanResponder, BackHandler } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import * as ScreenOrientation from 'expo-screen-orientation';
// // Sample landmarks data
// const LANDMARKS = {
//   'Agra, France': [
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
//   ''Goldentemple, Punjab'': [
//     {
//       id: 1,
//       name: 'Goldentemple Skytree',
//       image: 'https://source.unsplash.com/featured/?Goldentemple,skytree',
//       description: 'Tallest tower in Japan and second tallest structure in the world.',
//       facts: ['634 meters tall', 'Opened in 2012', 'Features observation decks']
//     },
//     {
//       id: 2,
//       name: 'Senso-ji Temple',
//       image: 'https://source.unsplash.com/featured/?sensoji,temple',
//       description: 'Ancient Buddhist temple located in Asakusa, Goldentemple\'s oldest temple.',
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

// const DEFAULT_LANDMARKS = [
//   {
//     id: 1,
//     name: 'Main Square',
//     image: 'https://source.unsplash.com/featured/?city,square',
//     description: 'The central gathering place in the heart of the city.',
//     facts: ['Historical meeting point', 'Surrounded by cafÃ©s', 'Features local architecture']
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

// const VRExplorationScreen = ({ route, navigation ,hasNavigated}) => {
//   console.log('VRExplorationScreen rendering');

//   const mountedRef = useRef(false);
//   const controlsTimeout = useRef(null);

//   const destination = route?.params?.destination || 'Default Destination';
//   const destName = typeof destination === 'string' ? destination : (destination?.name || 'Unknown Location');
//   const landmarks = LANDMARKS[destName] || DEFAULT_LANDMARKS;

//   const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const [showInfo, setShowInfo] = useState(false);
//   const [infoAnimation] = useState(new Animated.Value(0));
//   const currentLandmark = landmarks[currentLandmarkIndex];

//   useFocusEffect(
//     React.useCallback(() => {
//       const checkAndLockLandscape = async () => {
//         const orientation = await ScreenOrientation.getOrientationAsync();

//         // If the orientation is portrait, change it to landscape
//         if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP || orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN) {
//           await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//         }
//       };

//       // Check the orientation and lock to landscape if necessary
//       checkAndLockLandscape();

//       return () => {
//         // Revert to portrait when leaving the screen
//         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
//       };
//     }, [])
//   );

//   // Mount and unmount
//   useEffect(() => {
//     mountedRef.current = true;
//     console.log('VRExplorationScreen mounted');

//     return () => {
//       mountedRef.current = false;
//       console.log('VRExplorationScreen unmounted');

//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//     };
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       console.log('VRExplorationScreen focused');

//       const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//         if (mountedRef.current) {
//           handleBackPress();
//           return true;
//         }
//         return false;
//       });

//       return () => {
//         console.log('VRExplorationScreen unfocused');
//         backHandler.remove();
//       };
//     }, [hasNavigated])
//   );

//   const toggleInfo = () => {
//     if (!mountedRef.current) return;
//     setShowInfo(prev => !prev);
//     setShowControls(true);

//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }
//   };

//   useEffect(() => {
//     if (!mountedRef.current) return;

//     Animated.timing(infoAnimation, {
//       toValue: showInfo ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [showInfo]);

//   const navigateLandmark = (direction) => {
//     if (!mountedRef.current) return;

//     setShowInfo(false);
//     const newIndex = direction === 'next'
//       ? (currentLandmarkIndex + 1) % landmarks.length
//       : (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
//     setCurrentLandmarkIndex(newIndex);
//   };

//   const handleMarketplacePress = () => {
//     if (!mountedRef.current) return;

//     console.log('Navigating to Marketplace');
//     setTimeout(() => {
//       navigation.navigate('Marketplace', { destination: destName });
//     }, 300);
//   };

//   const handleBackPress = () => {
//     if (!mountedRef.current) return;
//     console.log('Handling back press');

//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     }
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: (_, gesture) =>
//         Math.abs(gesture.dx) > 20 || Math.abs(gesture.dy) > 20,
//       onPanResponderRelease: () => {
//         if (!showControls) {
//           setShowControls(true);
//           if (controlsTimeout.current) {
//             clearTimeout(controlsTimeout.current);
//           }
//           controlsTimeout.current = setTimeout(() => {
//             if (mountedRef.current) {
//               setShowControls(false);
//             }
//           }, 5000);
//         }
//       }
//     })
//   ).current;

//   const infoTranslateY = infoAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [300, 0],
//   });

//   return (
//     <View className="flex-1 bg-black" {...panResponder.panHandlers}>
//       <Image
//         source={{ uri: currentLandmark.image }}
//         className="absolute w-full h-full"
//         resizeMode="cover"
//         onError={() => console.log('Image failed to load')}
//       />

//       <LinearGradient
//         colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
//         className="absolute inset-0"
//       />

//       {showControls && (
//         <SafeAreaView className="flex-1">
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
//               onPress={handleMarketplacePress}
//               className="bg-black bg-opacity-50 p-2 rounded-full"
//               activeOpacity={0.7}
//             >
//               <Ionicons name="cart-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>

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

//             <View className="flex-row justify-center">
//               {landmarks.map((_, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     setCurrentLandmarkIndex(index);
//                     setShowInfo(false);
//                   }}
//                   className="mx-1"
//                   activeOpacity={0.7}
//                 >
//                   <View className={`h-2 w-2 rounded-full ${index === currentLandmarkIndex ? 'bg-white' : 'bg-gray-500'}`} />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </SafeAreaView>
//       )}

//       <Animated.View
//         className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 rounded-t-3xl overflow-hidden z-40"
//         style={{
//           transform: [{ translateY: infoTranslateY }],
//           maxHeight: '70%',
//           display: showInfo ? 'flex' : 'none',
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
//     </View>
//   );
// };

// export default VRExplorationScreen;





// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { View, Text, Image, TouchableOpacity, Animated, ScrollView, PanResponder, BackHandler } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import * as ScreenOrientation from 'expo-screen-orientation';

// // Sample landmarks data remains the same...
// const LANDMARKS = {
//   'Agra, France': [
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
//   ''Goldentemple, Punjab'': [
//     {
//       id: 1,
//       name: 'Goldentemple Skytree',
//       image: 'https://source.unsplash.com/featured/?Goldentemple,skytree',
//       description: 'Tallest tower in Japan and second tallest structure in the world.',
//       facts: ['634 meters tall', 'Opened in 2012', 'Features observation decks']
//     },
//     {
//       id: 2,
//       name: 'Senso-ji Temple',
//       image: 'https://source.unsplash.com/featured/?sensoji,temple',
//       description: 'Ancient Buddhist temple located in Asakusa, Goldentemple\'s oldest temple.',
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

// const VRExplorationScreen = ({ route, navigation, hasNavigated }) => {
//   console.log('VRExplorationScreen rendering');

//   const mountedRef = useRef(false);
//   const controlsTimeout = useRef(null);
//   const orientationChangeHandled = useRef(false);
//   const initialRenderRef = useRef(true);
  
//   // Force immediate orientation change on initial render
//   if (initialRenderRef.current) {
//     console.log('Initial render - forcing orientation change synchronously');
//     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
//     initialRenderRef.current = false;
//   }

//   const destination = route?.params?.destination || 'Default Destination';
//   const destName = typeof destination === 'string' ? destination : (destination?.name || 'Unknown Location');
//   const landmarks = LANDMARKS[destName] || DEFAULT_LANDMARKS;

//   const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const [showInfo, setShowInfo] = useState(false);
//   const [infoAnimation] = useState(new Animated.Value(0));
//   const currentLandmark = landmarks[currentLandmarkIndex];

//   // Lock to landscape as soon as component mounts - with navigation detection
//   useEffect(() => {
//     // Immediately execute in non-async context to avoid timing issues
//     console.log('VR Screen mounted - forcing immediate orientation change');
    
//     // Force synchronous execution in the main UI thread if possible
//     const lockLandscapeImmediate = () => {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//         .then(() => {
//           console.log('Successfully locked to landscape');
//           orientationChangeHandled.current = true;
//         })
//         .catch(error => {
//           console.error('Failed to lock orientation:', error);
//           // Try again with a slight delay as fallback
//           setTimeout(() => {
//             ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//               .catch(err => console.error('Retry failed:', err));
//           }, 100);
//         });
//     };
    
//     // Execute immediately
//     lockLandscapeImmediate();
    
//     // Also set a short timeout as a backup to catch any race conditions
//     const timeoutId = setTimeout(() => {
//       if (!orientationChangeHandled.current) {
//         console.log('Backup orientation lock triggered');
//         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//           .catch(error => console.error('Backup orientation lock failed:', error));
//       }
//     }, 300);
    
//     return () => {
//       // Clean up timeout
//       clearTimeout(timeoutId);
      
//       // Clean up function to reset orientation when component unmounts
//       console.log('VR Screen unmounting - resetting orientation');
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
//         .catch(error => console.error('Error resetting orientation:', error));
//     };
//   }, []);

//   // Enhanced useFocusEffect to handle navigation focus events reliably
//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('VR Screen focused - applying orientation lock');
      
//       // Force landscape immediately when focused - this helps with initial navigation
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//         .then(() => {
//           console.log('Landscape applied on focus');
//           orientationChangeHandled.current = true;
//         })
//         .catch(error => {
//           console.error('Focus orientation change failed:', error);
//         });
      
//       // Handle Android back button
//       const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//         if (mountedRef.current) {
//           handleBackPress();
//           return true;
//         }
//         return false;
//       });
      
//       return () => {
//         console.log('Screen lost focus');
//         backHandler.remove();
        
//         // Don't reset orientation here as it could interfere with navigation
//         // Let the component unmount handler or specific navigation methods handle this
//       };
//     }, [])
//   );

//   // Mount and unmount
//   useEffect(() => {
//     mountedRef.current = true;
//     console.log('VRExplorationScreen mounted');

//     // Additional force orientation change with a slight delay to catch any race conditions
//     // This helps when navigating from another screen
//     const orientationTimeoutId = setTimeout(() => {
//       console.log('Delayed orientation check');
//       ScreenOrientation.getOrientationAsync().then(currentOrientation => {
//         if (currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_RIGHT && 
//             currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
//           console.log('Still not in landscape, forcing again');
//           ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
//         }
//       });
//     }, 500);

//     // Auto-hide controls after 5 seconds
//     controlsTimeout.current = setTimeout(() => {
//       if (mountedRef.current) {
//         setShowControls(false);
//       }
//     }, 5000);

//     return () => {
//       mountedRef.current = false;
//       console.log('VRExplorationScreen unmounted');

//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
      
//       clearTimeout(orientationTimeoutId);
//     };
//   }, []);

//   // Remove this duplicate useFocusEffect since we've enhanced the primary one above

//   const toggleInfo = () => {
//     if (!mountedRef.current) return;
//     setShowInfo(prev => !prev);
//     setShowControls(true);

//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }
    
//     // Reset the auto-hide timer
//     controlsTimeout.current = setTimeout(() => {
//       if (mountedRef.current && !showInfo) {
//         setShowControls(false);
//       }
//     }, 5000);
//   };

//   useEffect(() => {
//     if (!mountedRef.current) return;

//     Animated.timing(infoAnimation, {
//       toValue: showInfo ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [showInfo]);

//   const navigateLandmark = (direction) => {
//     if (!mountedRef.current) return;

//     setShowInfo(false);
//     const newIndex = direction === 'next'
//       ? (currentLandmarkIndex + 1) % landmarks.length
//       : (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
//     setCurrentLandmarkIndex(newIndex);
    
//     // Reset controls timeout
//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }
    
//     controlsTimeout.current = setTimeout(() => {
//       if (mountedRef.current) {
//         setShowControls(false);
//       }
//     }, 5000);
//   };

//   const handleMarketplacePress = () => {
//     if (!mountedRef.current) return;

//     console.log('Navigating to Marketplace');
    
//     // Reset orientation before navigating away
//     const resetOrientation = async () => {
//       try {
//         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
//       } catch (error) {
//         console.error('Error resetting orientation:', error);
//       }
//     };
    
//     resetOrientation().then(() => {
//       setTimeout(() => {
//         navigation.navigate('Marketplace', { destination: destName });
//       }, 300);
//     });
//   };

//   const handleBackPress = () => {
//     if (!mountedRef.current) return;
//     console.log('Handling back press');

//     // Reset orientation before going back
//     const resetOrientation = async () => {
//       try {
//         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
//       } catch (error) {
//         console.error('Error resetting orientation:', error);
//       }
//     };
    
//     resetOrientation().then(() => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       }
//     });
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: (_, gesture) =>
//         Math.abs(gesture.dx) > 20 || Math.abs(gesture.dy) > 20,
//       onPanResponderRelease: () => {
//         if (!showControls) {
//           setShowControls(true);
//           if (controlsTimeout.current) {
//             clearTimeout(controlsTimeout.current);
//           }
//           controlsTimeout.current = setTimeout(() => {
//             if (mountedRef.current && !showInfo) {
//               setShowControls(false);
//             }
//           }, 5000);
//         }
//       }
//     })
//   ).current;

//   const infoTranslateY = infoAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [300, 0],
//   });

//   return (
//     <View className="flex-1 bg-black" {...panResponder.panHandlers}>
//       <Image
//         source={{ uri: currentLandmark.image }}
//         className="absolute w-full h-full"
//         resizeMode="cover"
//         onError={() => console.log('Image failed to load')}
//       />

//       <LinearGradient
//         colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
//         className="absolute inset-0"
//       />

//       {showControls && (
//         <SafeAreaView className="flex-1">
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
//               onPress={handleMarketplacePress}
//               className="bg-black bg-opacity-50 p-2 rounded-full"
//               activeOpacity={0.7}
//             >
//               <Ionicons name="cart-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>

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

//             <View className="flex-row justify-center">
//               {landmarks.map((_, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     setCurrentLandmarkIndex(index);
//                     setShowInfo(false);
//                   }}
//                   className="mx-1"
//                   activeOpacity={0.7}
//                 >
//                   <View className={`h-2 w-2 rounded-full ${index === currentLandmarkIndex ? 'bg-white' : 'bg-gray-500'}`} />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </SafeAreaView>
//       )}

//       <Animated.View
//         className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 rounded-t-3xl overflow-hidden z-40"
//         style={{
//           transform: [{ translateY: infoTranslateY }],
//           maxHeight: '70%',
//           display: showInfo ? 'flex' : 'none',
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
//     </View>
//   );
// };

// export default VRExplorationScreen;



// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { View, Text, TouchableOpacity, Animated, ScrollView, PanResponder, BackHandler } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import * as ScreenOrientation from 'expo-screen-orientation';
// import { Video } from 'expo-av'; // Import Video component from expo-av

// // Sample landmarks data with local video files
// const LANDMARKS = {
//   'Agra, France': [
//     {
//       id: 1,
//       name: 'Eiffel Tower',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Iconic iron tower on the Champ de Mars, named after engineer Gustave Eiffel.',
//       facts: ['Completed in 1889', '330 meters tall', 'Over 7 million visitors annually']
//     },
//     {
//       id: 2,
//       name: 'Louvre Museum',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'World\'s largest art museum, home to the Mona Lisa and thousands of historical artifacts.',
//       facts: ['Originally a fortress', 'Contains 380,000 objects', 'World\'s most visited museum']
//     },
//     {
//       id: 3,
//       name: 'Notre-Dame Cathedral',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Medieval Catholic cathedral known for its French Gothic architecture.',
//       facts: ['Construction began in 1163', 'Features magnificent stained glass', 'UNESCO World Heritage Site']
//     }
//   ],
//   ''Goldentemple, Punjab'': [
//     {
//       id: 1,
//       name: 'Goldentemple Skytree',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Tallest tower in Japan and second tallest structure in the world.',
//       facts: ['634 meters tall', 'Opened in 2012', 'Features observation decks']
//     },
//     {
//       id: 2,
//       name: 'Senso-ji Temple',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Ancient Buddhist temple located in Asakusa, Goldentemple\'s oldest temple.',
//       facts: ['Founded in 628 CE', 'Dedicated to Kannon Bodhisattva', 'Famous Thunder Gate entrance']
//     },
//     {
//       id: 3,
//       name: 'Shibuya Crossing',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Famous intersection known as the busiest pedestrian crossing in the world.',
//       facts: ['Up to 3,000 people cross at once', 'Featured in many films', 'Surrounded by shopping districts']
//     }
//   ]
// };

// const DEFAULT_LANDMARKS = [
//   {
//     id: 1,
//     name: 'Main Square',
//     video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//     description: 'The central gathering place in the heart of the city.',
//     facts: ['Historical meeting point', 'Surrounded by cafés', 'Features local architecture']
//   },
//   {
//     id: 2,
//     name: 'Cultural Museum',
//     video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//     description: 'Showcasing the rich heritage and history of the region.',
//     facts: ['Extensive artifact collection', 'Interactive exhibits', 'Regular cultural events']
//   },
//   {
//     id: 3,
//     name: 'Scenic Viewpoint',
//     video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//     description: 'Offering breathtaking views of the entire area.',
//     facts: ['Popular photography spot', 'Accessible viewing platforms', 'Spectacular sunset views']
//   }
// ];

// const VRExplorationScreen = ({ route, navigation, hasNavigated }) => {
//   console.log('VRExplorationScreen rendering');

//   const mountedRef = useRef(false);
//   const controlsTimeout = useRef(null);
//   const orientationChangeHandled = useRef(false);
//   const initialRenderRef = useRef(true);
//   const videoRef = useRef(null);
  
//   // Force immediate orientation change on initial render
//   if (initialRenderRef.current) {
//     console.log('Initial render - forcing orientation change synchronously');
//     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
//     initialRenderRef.current = false;
//   }

//   const destination = route?.params?.destination || 'Default Destination';
//   const destName = typeof destination === 'string' ? destination : (destination?.name || 'Unknown Location');
//   const landmarks = LANDMARKS[destName] || DEFAULT_LANDMARKS;

//   const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const [showInfo, setShowInfo] = useState(false);
//   const [infoAnimation] = useState(new Animated.Value(0));
//   const [isVideoMuted, setIsVideoMuted] = useState(true);
//   const currentLandmark = landmarks[currentLandmarkIndex];

//   // Lock to landscape as soon as component mounts - with navigation detection
//   useEffect(() => {
//     // Immediately execute in non-async context to avoid timing issues
//     console.log('VR Screen mounted - forcing immediate orientation change');
    
//     // Force synchronous execution in the main UI thread if possible
//     const lockLandscapeImmediate = () => {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//         .then(() => {
//           console.log('Successfully locked to landscape');
//           orientationChangeHandled.current = true;
//         })
//         .catch(error => {
//           console.error('Failed to lock orientation:', error);
//           // Try again with a slight delay as fallback
//           setTimeout(() => {
//             ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//               .catch(err => console.error('Retry failed:', err));
//           }, 100);
//         });
//     };
    
//     // Execute immediately
//     lockLandscapeImmediate();
    
//     // Also set a short timeout as a backup to catch any race conditions
//     const timeoutId = setTimeout(() => {
//       if (!orientationChangeHandled.current) {
//         console.log('Backup orientation lock triggered');
//         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//           .catch(error => console.error('Backup orientation lock failed:', error));
//       }
//     }, 300);
    
//     return () => {
//       // Clean up timeout
//       clearTimeout(timeoutId);
      
//       // Clean up function to reset orientation when component unmounts
//       console.log('VR Screen unmounting - resetting orientation');
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
//         .catch(error => console.error('Error resetting orientation:', error));
//     };
//   }, []);

//   // Enhanced useFocusEffect to handle navigation focus events reliably
//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('VR Screen focused - applying orientation lock');
      
//       // Force landscape immediately when focused - this helps with initial navigation
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//         .then(() => {
//           console.log('Landscape applied on focus');
//           orientationChangeHandled.current = true;
          
//           // Play video when focused
//           if (videoRef.current) {
//             videoRef.current.playAsync();
//           }
//         })
//         .catch(error => {
//           console.error('Focus orientation change failed:', error);
//         });
      
//       // Handle Android back button
//       const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//         if (mountedRef.current) {
//           handleBackPress();
//           return true;
//         }
//         return false;
//       });
      
//       return () => {
//         console.log('Screen lost focus');
//         backHandler.remove();
        
//         // Pause video when losing focus
//         if (videoRef.current) {
//           videoRef.current.pauseAsync();
//         }
//       };
//     }, [])
//   );

//   // Mount and unmount
//   useEffect(() => {
//     mountedRef.current = true;
//     console.log('VRExplorationScreen mounted');

//     // Additional force orientation change with a slight delay to catch any race conditions
//     // This helps when navigating from another screen
//     const orientationTimeoutId = setTimeout(() => {
//       console.log('Delayed orientation check');
//       ScreenOrientation.getOrientationAsync().then(currentOrientation => {
//         if (currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_RIGHT && 
//             currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
//           console.log('Still not in landscape, forcing again');
//           ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
//         }
//       });
//     }, 500);

//     // Auto-hide controls after 5 seconds
//     controlsTimeout.current = setTimeout(() => {
//       if (mountedRef.current) {
//         setShowControls(false);
//       }
//     }, 5000);

//     return () => {
//       mountedRef.current = false;
//       console.log('VRExplorationScreen unmounted');

//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
      
//       clearTimeout(orientationTimeoutId);
      
//       // Stop video playback when unmounting
//       if (videoRef.current) {
//         videoRef.current.stopAsync();
//       }
//     };
//   }, []);

//   // Effect to handle video changes when landmark changes
//   useEffect(() => {
//     if (videoRef.current) {
//       // Reset and play the video when landmark changes
//       videoRef.current.stopAsync().then(() => {
//         videoRef.current.playAsync();
//       });
//     }
//   }, [currentLandmarkIndex]);

//   const toggleInfo = () => {
//     if (!mountedRef.current) return;
//     setShowInfo(prev => !prev);
//     setShowControls(true);

//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }
    
//     // Reset the auto-hide timer
//     controlsTimeout.current = setTimeout(() => {
//       if (mountedRef.current && !showInfo) {
//         setShowControls(false);
//       }
//     }, 5000);
//   };

//   const toggleAudio = () => {
//     setIsVideoMuted(prev => !prev);
//     setShowControls(true);
    
//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }
    
//     controlsTimeout.current = setTimeout(() => {
//       if (mountedRef.current && !showInfo) {
//         setShowControls(false);
//       }
//     }, 5000);
//   };

//   useEffect(() => {
//     if (!mountedRef.current) return;

//     Animated.timing(infoAnimation, {
//       toValue: showInfo ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [showInfo]);

//   const navigateLandmark = (direction) => {
//     if (!mountedRef.current) return;

//     setShowInfo(false);
//     const newIndex = direction === 'next'
//       ? (currentLandmarkIndex + 1) % landmarks.length
//       : (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
//     setCurrentLandmarkIndex(newIndex);
    
//     // Reset controls timeout
//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }
    
//     controlsTimeout.current = setTimeout(() => {
//       if (mountedRef.current) {
//         setShowControls(false);
//       }
//     }, 5000);
//   };

//   const handleMarketplacePress = () => {
//     if (!mountedRef.current) return;

//     console.log('Navigating to Marketplace');
    
//     // Reset orientation before navigating away
//     const resetOrientation = async () => {
//       try {
//         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
//       } catch (error) {
//         console.error('Error resetting orientation:', error);
//       }
//     };
    
//     resetOrientation().then(() => {
//       setTimeout(() => {
//         navigation.navigate('Marketplace', { destination: destName });
//       }, 300);
//     });
//   };

//   const handleBackPress = () => {
//     if (!mountedRef.current) return;
//     console.log('Handling back press');

//     // Reset orientation before going back
//     const resetOrientation = async () => {
//       try {
//         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
//       } catch (error) {
//         console.error('Error resetting orientation:', error);
//       }
//     };
    
//     resetOrientation().then(() => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       }
//     });
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: (_, gesture) =>
//         Math.abs(gesture.dx) > 20 || Math.abs(gesture.dy) > 20,
//       onPanResponderRelease: () => {
//         if (!showControls) {
//           setShowControls(true);
//           if (controlsTimeout.current) {
//             clearTimeout(controlsTimeout.current);
//           }
//           controlsTimeout.current = setTimeout(() => {
//             if (mountedRef.current && !showInfo) {
//               setShowControls(false);
//             }
//           }, 5000);
//         }
//       }
//     })
//   ).current;

//   const infoTranslateY = infoAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [300, 0],
//   });

//   return (
//     <View className="flex-1 bg-black" {...panResponder.panHandlers}>
//       {/* Replace Image with Video component */}
//       <Video
//         ref={videoRef}
//         source={currentLandmark.video}
//         className="absolute w-full h-full"
//         resizeMode="cover"
//         shouldPlay={true}
//         isLooping={true}
//         isMuted={isVideoMuted}
//         onError={(error) => console.log('Video failed to load:', error)}
//         style={{ width: '100%', height: '100%' }}
//       />

//       <LinearGradient
//         colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
//         className="absolute inset-0"
//       />

//       {showControls && (
//         <SafeAreaView className="flex-1">
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
//               onPress={handleMarketplacePress}
//               className="bg-black bg-opacity-50 p-2 rounded-full"
//               activeOpacity={0.7}
//             >
//               <Ionicons name="cart-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>

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

//             <View className="flex-row justify-around mb-4">
//               <TouchableOpacity 
//                 className="items-center" 
//                 activeOpacity={0.7}
//                 onPress={toggleAudio}
//               >
//                 <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
//                   <Ionicons 
//                     name={isVideoMuted ? "volume-mute" : "volume-medium"} 
//                     size={24} 
//                     color="white" 
//                   />
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

//             <View className="flex-row justify-center">
//               {landmarks.map((_, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     setCurrentLandmarkIndex(index);
//                     setShowInfo(false);
//                   }}
//                   className="mx-1"
//                   activeOpacity={0.7}
//                 >
//                   <View className={`h-2 w-2 rounded-full ${index === currentLandmarkIndex ? 'bg-white' : 'bg-gray-500'}`} />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </SafeAreaView>
//       )}

//       <Animated.View
//         className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 rounded-t-3xl overflow-hidden z-40"
//         style={{
//           transform: [{ translateY: infoTranslateY }],
//           maxHeight: '70%',
//           display: showInfo ? 'flex' : 'none',
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
//     </View>
//   );
// };

// export default VRExplorationScreen;

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { View, Text, TouchableOpacity, Animated, ScrollView, PanResponder, BackHandler } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import * as ScreenOrientation from 'expo-screen-orientation';
// import { Video } from 'expo-av'; // Import Video component from expo-av

// // Sample landmarks data with local video files
// const LANDMARKS = {
//   'Agra, France': [
//     {
//       id: 1,
//       name: 'Taj Mahal',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Iconic iron tower on the Champ de Mars, named after engineer Gustave Eiffel.',
//       facts: ['Completed in 1889', '330 meters tall', 'Over 7 million visitors annually']
//     },
//     {
//       id: 2,
//       name: 'Agra fort',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'World\'s largest art museum, home to the Mona Lisa and thousands of historical artifacts.',
//       facts: ['Originally a fortress', 'Contains 380,000 objects', 'World\'s most visited museum']
//     },
//     {
//       id: 3,
//       name: 'Fatehpur Sikri',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Medieval Catholic cathedral known for its French Gothic architecture.',
//       facts: ['Construction began in 1163', 'Features magnificent stained glass', 'UNESCO World Heritage Site']
//     }
//   ],
//   'Goldentemple, Punjab': [
//     {
//       id: 1,
//       name: 'Goldentemple',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Tallest tower in Japan and second tallest structure in the world.',
//       facts: ['634 meters tall', 'Opened in 2012', 'Features observation decks']
//     },
//     {
//       id: 2,
//       name: 'Jallianwala Bagh',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Ancient Buddhist temple located in Asakusa, Goldentemple\'s oldest temple.',
//       facts: ['Founded in 628 CE', 'Dedicated to Kannon Bodhisattva', 'Famous Thunder Gate entrance']
//     },
//     {
//       id: 3,
//       name: 'Wagah Border',
//       video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//       description: 'Famous intersection known as the busiest pedestrian crossing in the world.',
//       facts: ['Up to 3,000 people cross at once', 'Featured in many films', 'Surrounded by shopping districts']
//     }
//   ]
// };

// const DEFAULT_LANDMARKS = [
//   {
//     id: 1,
//     name: 'Main Square',
//     video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//     description: 'The central gathering place in the heart of the city.',
//     facts: ['Historical meeting point', 'Surrounded by cafés', 'Features local architecture']
//   },
//   {
//     id: 2,
//     name: 'Cultural Museum',
//     video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//     description: 'Showcasing the rich heritage and history of the region.',
//     facts: ['Extensive artifact collection', 'Interactive exhibits', 'Regular cultural events']
//   },
//   {
//     id: 3,
//     name: 'Scenic Viewpoint',
//     video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
//     description: 'Offering breathtaking views of the entire area.',
//     facts: ['Popular photography spot', 'Accessible viewing platforms', 'Spectacular sunset views']
//   }
// ];

// const VRExplorationScreen = ({ route, navigation, hasNavigated }) => {
//   console.log('VRExplorationScreen rendering');

//   const mountedRef = useRef(false);
//   const controlsTimeout = useRef(null);
//   const orientationChangeHandled = useRef(false);
//   const initialRenderRef = useRef(true);
//   const videoRef = useRef(null);
  
//   // Force immediate orientation change on initial render
//   if (initialRenderRef.current) {
//     console.log('Initial render - forcing orientation change synchronously');
//     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
//     initialRenderRef.current = false;
//   }

//   const destination = route?.params?.destination || 'Default Destination';
//   const destName = typeof destination === 'string' ? destination : (destination?.name || 'Unknown Location');
//   const landmarks = LANDMARKS[destName] || DEFAULT_LANDMARKS;

//   const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
//   // Controls are always visible now
//   const [showControls] = useState(true);
//   const [showInfo, setShowInfo] = useState(false);
//   const [infoAnimation] = useState(new Animated.Value(0));
//   const [isVideoMuted, setIsVideoMuted] = useState(true);
//   const currentLandmark = landmarks[currentLandmarkIndex];

//   // Lock to landscape as soon as component mounts - with navigation detection
//   useEffect(() => {
//     // Immediately execute in non-async context to avoid timing issues
//     console.log('VR Screen mounted - forcing immediate orientation change');
    
//     // Force synchronous execution in the main UI thread if possible
//     const lockLandscapeImmediate = () => {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//         .then(() => {
//           console.log('Successfully locked to landscape');
//           orientationChangeHandled.current = true;
//         })
//         .catch(error => {
//           console.error('Failed to lock orientation:', error);
//           // Try again with a slight delay as fallback
//           setTimeout(() => {
//             ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//               .catch(err => console.error('Retry failed:', err));
//           }, 100);
//         });
//     };
    
//     // Execute immediately
//     lockLandscapeImmediate();
    
//     // Also set a short timeout as a backup to catch any race conditions
//     const timeoutId = setTimeout(() => {
//       if (!orientationChangeHandled.current) {
//         console.log('Backup orientation lock triggered');
//         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//           .catch(error => console.error('Backup orientation lock failed:', error));
//       }
//     }, 300);
    
//     return () => {
//       // Clean up timeout
//       clearTimeout(timeoutId);
      
//       // Clean up function to reset orientation when component unmounts
//       console.log('VR Screen unmounting - resetting orientation');
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
//         .catch(error => console.error('Error resetting orientation:', error));
//     };
//   }, []);

//   // Enhanced useFocusEffect to handle navigation focus events reliably
//   useFocusEffect(
//     React.useCallback(() => {
//       console.log('VR Screen focused - applying orientation lock');
      
//       // Force landscape immediately when focused - this helps with initial navigation
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
//         .then(() => {
//           console.log('Landscape applied on focus');
//           orientationChangeHandled.current = true;
          
//           // Play video when focused
//           if (videoRef.current) {
//             videoRef.current.playAsync();
//           }
//         })
//         .catch(error => {
//           console.error('Focus orientation change failed:', error);
//         });
      
//       // Handle Android back button
//       const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//         if (mountedRef.current) {
//           handleBackPress();
//           return true;
//         }
//         return false;
//       });
      
//       return () => {
//         console.log('Screen lost focus');
//         backHandler.remove();
        
//         // Pause video when losing focus
//         if (videoRef.current) {
//           videoRef.current.pauseAsync();
//         }
//       };
//     }, [])
//   );

//   // Mount and unmount
//   useEffect(() => {
//     mountedRef.current = true;
//     console.log('VRExplorationScreen mounted');

//     // Additional force orientation change with a slight delay to catch any race conditions
//     // This helps when navigating from another screen
//     const orientationTimeoutId = setTimeout(() => {
//       console.log('Delayed orientation check');
//       ScreenOrientation.getOrientationAsync().then(currentOrientation => {
//         if (currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_RIGHT && 
//             currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
//           console.log('Still not in landscape, forcing again');
//           ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
//         }
//       });
//     }, 500);

//     // Keep controls visible by default
//   // We're removing the auto-hide timeout to keep controls visible

//     return () => {
//       mountedRef.current = false;
//       console.log('VRExplorationScreen unmounted');

//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
      
//       clearTimeout(orientationTimeoutId);
      
//       // Stop video playback when unmounting
//       if (videoRef.current) {
//         videoRef.current.stopAsync();
//       }
//     };
//   }, []);

//   // Effect to handle video changes when landmark changes
//   useEffect(() => {
//     if (videoRef.current) {
//       // Reset and play the video when landmark changes
//       videoRef.current.stopAsync().then(() => {
//         videoRef.current.playAsync();
//       });
//     }
//   }, [currentLandmarkIndex]);

//   const toggleInfo = () => {
//     if (!mountedRef.current) return;
//     setShowInfo(prev => !prev);
//     setShowControls(true);

//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }
    
//     // We're no longer using auto-hide timers
//   };

//   const toggleAudio = () => {
//     setIsVideoMuted(prev => !prev);
//     setShowControls(true);
    
//     // Controls remain visible at all times
//   };

//   useEffect(() => {
//     if (!mountedRef.current) return;

//     Animated.timing(infoAnimation, {
//       toValue: showInfo ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [showInfo]);

//   const navigateLandmark = (direction) => {
//     if (!mountedRef.current) return;

//     setShowInfo(false);
//     const newIndex = direction === 'next'
//       ? (currentLandmarkIndex + 1) % landmarks.length
//       : (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
//     setCurrentLandmarkIndex(newIndex);
    
//     // No longer using auto-hide timeout for controls
//   };

//   const handleMarketplacePress = () => {
//     if (!mountedRef.current) return;

//     console.log('Navigating to Marketplace');
    
//     // Reset orientation before navigating away
//     const resetOrientation = async () => {
//       try {
//         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
//       } catch (error) {
//         console.error('Error resetting orientation:', error);
//       }
//     };
    
//     resetOrientation().then(() => {
//       setTimeout(() => {
//         navigation.navigate('Marketplace', { destination: destName });
//       }, 300);
//     });
//   };

//   const handleBackPress = () => {
//     if (!mountedRef.current) return;
//     console.log('Handling back press');

//     // Reset orientation before going back
//     const resetOrientation = async () => {
//       try {
//         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
//       } catch (error) {
//         console.error('Error resetting orientation:', error);
//       }
//     };
    
//     resetOrientation().then(() => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       }
//     });
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: (_, gesture) =>
//         Math.abs(gesture.dx) > 20 || Math.abs(gesture.dy) > 20,
//       onPanResponderRelease: () => {
//         if (!showControls) {
//           setShowControls(true);
//           // Controls now stay visible at all times
//         }
//       }
//     })
//   ).current;

//   const infoTranslateY = infoAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [300, 0],
//   });

//   return (
//     <View className="flex-1 bg-black" {...panResponder.panHandlers}>
//       {/* Replace Image with Video component */}
//       <Video
//         ref={videoRef}
//         source={currentLandmark.video}
//         className="absolute w-full h-full"
//         resizeMode="cover"
//         shouldPlay={true}
//         isLooping={true}
//         isMuted={isVideoMuted}
//         onError={(error) => console.log('Video failed to load:', error)}
//         style={{ width: '100%', height: '100%' }}
//       />

//       <LinearGradient
//         colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
//         className="absolute inset-0"
//       />

//       {showControls && (
//         <SafeAreaView className="flex-1">
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
//               onPress={handleMarketplacePress}
//               className="bg-black bg-opacity-50 p-2 rounded-full"
//               activeOpacity={0.7}
//             >
//               <Ionicons name="cart-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>

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

//             <View className="flex-row justify-around mb-4">
//               <TouchableOpacity 
//                 className="items-center" 
//                 activeOpacity={0.7}
//                 onPress={toggleAudio}
//               >
//                 <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
//                   <Ionicons 
//                     name={isVideoMuted ? "volume-mute" : "volume-medium"} 
//                     size={24} 
//                     color="white" 
//                   />
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

//             <View className="flex-row justify-center">
//               {landmarks.map((_, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     setCurrentLandmarkIndex(index);
//                     setShowInfo(false);
//                   }}
//                   className="mx-1"
//                   activeOpacity={0.7}
//                 >
//                   <View className={`h-2 w-2 rounded-full ${index === currentLandmarkIndex ? 'bg-white' : 'bg-gray-500'}`} />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </SafeAreaView>
//       )}

//       <Animated.View
//         className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 rounded-t-3xl overflow-hidden z-40"
//         style={{
//           transform: [{ translateY: infoTranslateY }],
//           maxHeight: '70%',
//           display: showInfo ? 'flex' : 'none',
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
//     </View>
//   );
// };

// export default VRExplorationScreen;





import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView, PanResponder, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video } from 'expo-av'; // Import Video component from expo-av

// Sample landmarks data with local video files
const LANDMARKS = {
  'Agra, France': [
    {
      id: 1,
      name: 'Eiffel Tower',
      video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
      description: 'Iconic iron tower on the Champ de Mars, named after engineer Gustave Eiffel.',
      facts: ['Completed in 1889', '330 meters tall', 'Over 7 million visitors annually']
    },
    {
      id: 2,
      name: 'Louvre Museum',
      video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
      description: 'World\'s largest art museum, home to the Mona Lisa and thousands of historical artifacts.',
      facts: ['Originally a fortress', 'Contains 380,000 objects', 'World\'s most visited museum']
    },
    {
      id: 3,
      name: 'Notre-Dame Cathedral',
      video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
      description: 'Medieval Catholic cathedral known for its French Gothic architecture.',
      facts: ['Construction began in 1163', 'Features magnificent stained glass', 'UNESCO World Heritage Site']
    }
  ],
  'Tokyo, Japan': [
    {
      id: 1,
      name: 'Tokyo Skytree',
      video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
      description: 'Tallest tower in Japan and second tallest structure in the world.',
      facts: ['634 meters tall', 'Opened in 2012', 'Features observation decks']
    },
    {
      id: 2,
      name: 'Senso-ji Temple',
      video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
      description: 'Ancient Buddhist temple located in Asakusa, Tokyo\'s oldest temple.',
      facts: ['Founded in 628 CE', 'Dedicated to Kannon Bodhisattva', 'Famous Thunder Gate entrance']
    },
    {
      id: 3,
      name: 'Shibuya Crossing',
      video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
      description: 'Famous intersection known as the busiest pedestrian crossing in the world.',
      facts: ['Up to 3,000 people cross at once', 'Featured in many films', 'Surrounded by shopping districts']
    }
  ]
};

const DEFAULT_LANDMARKS = [
  {
    id: 1,
    name: 'Main Square',
    video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
    description: 'The central gathering place in the heart of the city.',
    facts: ['Historical meeting point', 'Surrounded by cafÃ©s', 'Features local architecture']
  },
  {
    id: 2,
    name: 'Cultural Museum',
    video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
    description: 'Showcasing the rich heritage and history of the region.',
    facts: ['Extensive artifact collection', 'Interactive exhibits', 'Regular cultural events']
  },
  {
    id: 3,
    name: 'Scenic Viewpoint',
    video: require('../assets/videos/tajmahal.mp4'), // Path to local video file
    description: 'Offering breathtaking views of the entire area.',
    facts: ['Popular photography spot', 'Accessible viewing platforms', 'Spectacular sunset views']
  }
];

const VRExplorationScreen = ({ route, navigation, hasNavigated }) => {
  console.log('VRExplorationScreen rendering');

  const mountedRef = useRef(false);
  const controlsTimeout = useRef(null);
  const orientationChangeHandled = useRef(false);
  const initialRenderRef = useRef(true);
  const videoRef = useRef(null);
  
  // Force immediate orientation change on initial render
  if (initialRenderRef.current) {
    console.log('Initial render - forcing orientation change synchronously');
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    initialRenderRef.current = false;
  }

  const destination = route?.params?.destination || 'Default Destination';
  const destName = typeof destination === 'string' ? destination : (destination?.name || 'Unknown Location');
  const landmarks = LANDMARKS[destName] || DEFAULT_LANDMARKS;

  const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
  // Controls are always visible now
 
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoAnimation] = useState(new Animated.Value(0));
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const currentLandmark = landmarks[currentLandmarkIndex];

  // Lock to landscape as soon as component mounts - with navigation detection
  useEffect(() => {
    // Immediately execute in non-async context to avoid timing issues
    console.log('VR Screen mounted - forcing immediate orientation change');
    
    // Force synchronous execution in the main UI thread if possible
    const lockLandscapeImmediate = () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
        .then(() => {
          console.log('Successfully locked to landscape');
          orientationChangeHandled.current = true;
        })
        .catch(error => {
          console.error('Failed to lock orientation:', error);
          // Try again with a slight delay as fallback
          setTimeout(() => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
              .catch(err => console.error('Retry failed:', err));
          }, 100);
        });
    };
    
    // Execute immediately
    lockLandscapeImmediate();
    
    // Also set a short timeout as a backup to catch any race conditions
    const timeoutId = setTimeout(() => {
      if (!orientationChangeHandled.current) {
        console.log('Backup orientation lock triggered');
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
          .catch(error => console.error('Backup orientation lock failed:', error));
      }
    }, 300);
    
    return () => {
      // Clean up timeout
      clearTimeout(timeoutId);
      
      // Clean up function to reset orientation when component unmounts
      console.log('VR Screen unmounting - resetting orientation');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
        .catch(error => console.error('Error resetting orientation:', error));
    };
  }, []);

  // Enhanced useFocusEffect to handle navigation focus events reliably
  useFocusEffect(
    React.useCallback(() => {
      console.log('VR Screen focused - applying orientation lock');
      
      // Force landscape immediately when focused - this helps with initial navigation
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
        .then(() => {
          console.log('Landscape applied on focus');
          orientationChangeHandled.current = true;
          
          // Play video when focused
          if (videoRef.current) {
            videoRef.current.playAsync();
          }
        })
        .catch(error => {
          console.error('Focus orientation change failed:', error);
        });
      
      // Handle Android back button
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (mountedRef.current) {
          handleBackPress();
          return true;
        }
        return false;
      });
      
      return () => {
        console.log('Screen lost focus');
        backHandler.remove();
        
        // Pause video when losing focus
        if (videoRef.current) {
          videoRef.current.pauseAsync();
        }
      };
    }, [])
  );

  // Mount and unmount
  useEffect(() => {
    mountedRef.current = true;
    console.log('VRExplorationScreen mounted');

    // Additional force orientation change with a slight delay to catch any race conditions
    // This helps when navigating from another screen
    const orientationTimeoutId = setTimeout(() => {
      console.log('Delayed orientation check');
      ScreenOrientation.getOrientationAsync().then(currentOrientation => {
        if (currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_RIGHT && 
            currentOrientation !== ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
          console.log('Still not in landscape, forcing again');
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        }
      });
    }, 500);

    // Keep controls visible by default
  // We're removing the auto-hide timeout to keep controls visible

    return () => {
      mountedRef.current = false;
      console.log('VRExplorationScreen unmounted');

      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      clearTimeout(orientationTimeoutId);
      
      // Stop video playback when unmounting
      if (videoRef.current) {
        videoRef.current.stopAsync();
      }
    };
  }, []);

  // Effect to handle video changes when landmark changes
  useEffect(() => {
    if (videoRef.current) {
      // Reset and play the video when landmark changes
      videoRef.current.stopAsync().then(() => {
        videoRef.current.playAsync();
      });
    }
  }, [currentLandmarkIndex]);

  const toggleInfo = () => {
    if (!mountedRef.current) return;
    setShowInfo(prev => !prev);
    setShowControls(true);

    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    
    // We're no longer using auto-hide timers
  };

  const toggleAudio = () => {
    setIsVideoMuted(prev => !prev);
    setShowControls(true);
    
    // Controls remain visible at all times
  };

  useEffect(() => {
    if (!mountedRef.current) return;

    Animated.timing(infoAnimation, {
      toValue: showInfo ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showInfo]);

  const navigateLandmark = (direction) => {
    if (!mountedRef.current) return;

    setShowInfo(false);
    const newIndex = direction === 'next'
      ? (currentLandmarkIndex + 1) % landmarks.length
      : (currentLandmarkIndex - 1 + landmarks.length) % landmarks.length;
    setCurrentLandmarkIndex(newIndex);
    
    // No longer using auto-hide timeout for controls
  };

  const handleMarketplacePress = () => {
    if (!mountedRef.current) return;

    console.log('Navigating to Marketplace');
    
    // Reset orientation before navigating away
    const resetOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      } catch (error) {
        console.error('Error resetting orientation:', error);
      }
    };
    
    resetOrientation().then(() => {
      setTimeout(() => {
        navigation.navigate('Marketplace', { destination: destName });
      }, 300);
    });
  };

  const handleBackPress = () => {
    if (!mountedRef.current) return;
    console.log('Handling back press');

    // Reset orientation before going back
    const resetOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      } catch (error) {
        console.error('Error resetting orientation:', error);
      }
    };
    
    resetOrientation().then(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 20 || Math.abs(gesture.dy) > 20,
      onPanResponderRelease: () => {
        if (!showControls) {
          setShowControls(true);
          // Controls now stay visible at all times
        }
      }
    })
  ).current;

  const infoTranslateY = infoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const toggleControls = useCallback(() => {
    setShowControls(prev => !prev);
  }, []);

  
  return (
    <View className="flex-1 bg-black" {...panResponder.panHandlers}>
      {/* Replace Image with Video component */}
      <Video
        ref={videoRef}
        source={currentLandmark.video}
        className="absolute w-full h-full"
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        isMuted={isVideoMuted}
        onError={(error) => console.log('Video failed to load:', error)}
        style={{ width: '100%', height: '100%' }}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
        className="absolute inset-0"
      />

      {showControls && (
        <SafeAreaView className="flex-1">
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
              onPress={handleMarketplacePress}
              className="bg-black bg-opacity-50 p-2 rounded-full"
              activeOpacity={0.7}
            >
              <Ionicons name="cart-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

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

            <View className="flex-row justify-around mb-4">
              <TouchableOpacity 
                className="items-center" 
                activeOpacity={0.7}
                onPress={toggleAudio}
              >
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons 
                    name={isVideoMuted ? "volume-mute" : "volume-medium"} 
                    size={24} 
                    color="white" 
                  />
                </View>
                <Text className="text-white text-xs">Audio</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center" activeOpacity={0.7}>
                <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
                  <Ionicons name="camera" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Photo</Text>
              </TouchableOpacity>
{/* 
              <TouchableOpacity
                className="items-center"
                onPress={toggleInfo}
                activeOpacity={0.7}
              >
                <View className={`p-3 rounded-full mb-1 ${showInfo ? 'bg-indigo-600' : 'bg-black bg-opacity-50'}`}>
                  <Ionicons name="information-circle" size={24} color="white" />
                </View>
                <Text className="text-white text-xs">Info</Text>
              </TouchableOpacity> */}

<TouchableOpacity
  className="items-center"
  onPress={(e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    handleMarketplacePress();
  }}
  activeOpacity={0.7}
>
  <View className="bg-black bg-opacity-50 p-3 rounded-full mb-1">
    <Ionicons name="cart" size={24} color="white" />
  </View>
  <Text className="text-white text-xs">Shop</Text>
</TouchableOpacity>
            </View>

            <View className="flex-row justify-center">
              {landmarks.map((_, index) => (
               <TouchableOpacity
               key={index}
               onPress={(e) => {
                 e.stopPropagation();
                 setCurrentLandmarkIndex(index);
                 setShowInfo(false);
               }}
               className="mx-1"
               activeOpacity={0.7}
             >
               <View className={`h-2 w-2 rounded-full ${index === currentLandmarkIndex ? 'bg-white' : 'bg-gray-500'}`} />
             </TouchableOpacity>
             
              ))}
            </View>
          </View>
        </SafeAreaView>
      )}
     

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

      {/* Replace the existing TouchableOpacity at the bottom with this */}
{!showInfo && (
  <TouchableOpacity
    className="absolute inset-0 z-40"
    activeOpacity={1}
    onPress={toggleControls}
    style={{
      top: 50, // Avoid the top controls area
      bottom: 150, // Avoid the bottom controls area
      left: 50, // Avoid the left controls area
      right: 50, // Avoid the right controls area
    }}
  />
)}

    </View>
  );
};

export default VRExplorationScreen;