// // screens/DestinationPreviewScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Map of destination images
// const destinationImages = {
//   'Agra, U.P': require('../assets/images/Agra.jpg'),
//   'Tokyo, Japan': require('../assets/images/tokyo.jpg'),
//   'Venice, Italy': require('../assets/images/venice.jpg'),
//   'Bali, Indonesia': require('../assets/images/bali.jpg'),
//   'New York City, USA': require('../assets/images/newyork.jpg'),
//   'Grand Canyon, USA': require('../assets/images/grandcanyon.jpg'),
//   'Cairo, Egypt': require('../assets/images/cairo.jpg'),
//   'Sydney, Australia': require('../assets/images/sydney.jpg'),
//   // Shorter names for when destinations are referred to briefly
//   'Agra': require('../assets/images/Agra.jpg'),
//   'Tokyo': require('../assets/images/tokyo.jpg'),
//   'Venice': require('../assets/images/venice.jpg'),
//   'Bali': require('../assets/images/bali.jpg'),
//   'New York': require('../assets/images/newyork.jpg')
// };

// // Default image for destinations without a specific image
// const defaultImage = require('../assets/images/Agra.jpg');

// // Sample destination details (in a real app, this would come from an API)
// const DESTINATION_DETAILS = {
//   'Agra, U.P': {
//     name: 'Agra, U.P',
//     tagline: 'City of Lights',
//     description: 'Discover the romance and elegance of Agra, with its iconic Eiffel Tower, historic Notre Dame Cathedral, world-class museums like the Louvre, and charming café culture. Experience the magic of strolling along the Seine River and exploring the artistic districts of Montmartre.',
//     rating: 4.8,
//     highlights: [
//       'Eiffel Tower',
//       'Louvre Museum',
//       'Notre Dame Cathedral',
//       'Champs-Élysées',
//       'Montmartre'
//     ],
//     accessibility: [
//       'Audio descriptions available',
//       'Wheelchair accessible routes',
//       'Sign language options',
//       'Sensory-friendly options'
//     ]
//   },
//   'Tokyo, Japan': {
//     name: 'Tokyo, Japan',
//     tagline: 'Where Tradition Meets Future',
//     description: 'Explore the fascinating contrasts of Tokyo, from ultramodern skyscrapers to historic temples. Experience the bustling Shibuya Crossing, tranquil gardens, diverse cuisine, and vibrant pop culture. Tokyo offers an unforgettable blend of ancient traditions and cutting-edge innovation.',
//     rating: 4.7,
//     highlights: [
//       'Shibuya Crossing',
//       'Tokyo Skytree',
//       'Senso-ji Temple',
//       'Shinjuku Gyoen',
//       'Akihabara'
//     ],
//     accessibility: [
//       'Audio descriptions available',
//       'Wheelchair accessible routes',
//       'Sign language options',
//       'Sensory-friendly options'
//     ]
//   }
// };

// // For any destination not specifically defined above
// const DEFAULT_DESTINATION = {
//   tagline: 'Discover Something New',
//   description: 'Explore the wonders of this amazing destination with our virtual reality tour. Experience the culture, landmarks, and local life from the comfort of your home.',
//   rating: 4.5,
//   highlights: [
//     'Famous Landmarks',
//     'Local Culture',
//     'Hidden Gems',
//     'Historical Sites',
//     'Natural Beauty'
//   ],
//   accessibility: [
//     'Audio descriptions available',
//     'Wheelchair accessible routes',
//     'Sign language options',
//     'Sensory-friendly options'
//   ]
// };

// const DestinationPreviewScreen = ({ route, navigation }) => {
//   const { destination } = route.params;
//   const [imageLoaded, setImageLoaded] = useState(true);
  
//   // Handle both string-based and object-based navigation params
//   const destName = typeof destination === 'string' ? destination : destination.name;
  
//   // Create destination data with local image reference
//   const destData = {
//     ...(DESTINATION_DETAILS[destName] || { ...DEFAULT_DESTINATION, name: destName }),
//     // Use the image from the map, or from the destination object if it's already a local reference
//     image: typeof destination === 'object' && destination.image ? 
//       destination.image : 
//       destinationImages[destName] || defaultImage
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="light-content" />
      
//       {/* Hero Image */}
//       <View className="w-full h-72 relative">
//         <Image
//           source={destData.image}
//           className="w-full h-full"
//           resizeMode="cover"
//           onLoad={() => setImageLoaded(true)}
//         />
//         <View className="absolute inset-0 bg-black opacity-30" />
        
//         <View className="absolute bottom-0 left-0 right-0 p-6">
//           <Text className="text-white text-3xl font-bold">{destData.name}</Text>
//           <Text className="text-white text-lg">{destData.tagline}</Text>
          
//           <View className="flex-row items-center mt-2">
//             <View className="flex-row">
//               {[1, 2, 3, 4, 5].map(star => (
//                 <Ionicons
//                   key={star}
//                   name={star <= Math.floor(destData.rating) ? "star" : star <= destData.rating ? "star-half" : "star-outline"}
//                   size={16}
//                   color="#FFD700"
//                 />
//               ))}
//             </View>
//             <Text className="text-white ml-2">{destData.rating}/5</Text>
//           </View>
//         </View>
//       </View>
      
//       <ScrollView className="flex-1 p-5">
//         {/* Description */}
//         <View className="mb-6">
//           <Text className="text-lg font-bold text-gray-800 mb-2">About this Destination</Text>
//           <Text className="text-gray-600 leading-6">{destData.description}</Text>
//         </View>
        
//         {/* Highlights */}
//         <View className="mb-6">
//           <Text className="text-lg font-bold text-gray-800 mb-2">Top Highlights</Text>
//           <View className="bg-gray-50 rounded-lg p-4">
//             {destData.highlights.map((highlight, idx) => (
//               <View key={idx} className="flex-row items-center mb-2">
//                 <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//                 <Text className="text-gray-700">{highlight}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
        
//         {/* Accessibility */}  
//         <View className="mb-6">
//           <Text className="text-lg font-bold text-gray-800 mb-2">Accessibility Features</Text>
//           <View className="bg-gray-50 rounded-lg p-4">
//             {destData.accessibility.map((feature, idx) => (
//               <View key={idx} className="flex-row items-center mb-2">
//                 <Ionicons name="checkmark-circle" size={18} color="#4F46E5" className="mr-2" />
//                 <Text className="text-gray-700">{feature}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
      
//       {/* Fixed Bottom Button */}
//       <View className="bg-white p-4 border-t border-gray-200">
//         <TouchableOpacity
//           className="bg-indigo-600 py-4 rounded-xl shadow"
//           onPress={() => navigation.navigate('DateModeSelection', { destination: destData })}
//         >
//           <Text className="text-white font-bold text-center text-lg">Schedule Your Tour</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DestinationPreviewScreen;





// screens/DestinationPreviewScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Map of destination images
const destinationImages = {
  'Agra, U.P': require('../assets/images/Agra.jpg'),
  'Tokyo, Japan': require('../assets/images/tokyo.jpg'),
  'Venice, Italy': require('../assets/images/venice.jpg'),
  'Bali, Indonesia': require('../assets/images/bali.jpg'),
  'New York City, USA': require('../assets/images/newyork.jpg'),
  'Grand Canyon, USA': require('../assets/images/grandcanyon.jpg'),
  'Cairo, Egypt': require('../assets/images/cairo.jpg'),
  'Sydney, Australia': require('../assets/images/sydney.jpg'),
  // Shorter names for when destinations are referred to briefly
  'Agra': require('../assets/images/Agra.jpg'),
  'Tokyo': require('../assets/images/tokyo.jpg'),
  'Venice': require('../assets/images/venice.jpg'),
  'Bali': require('../assets/images/bali.jpg'),
  'New York': require('../assets/images/newyork.jpg')
};

// Default image for destinations without a specific image
const defaultImage = require('../assets/images/Agra.jpg');

// Sample destination details (in a real app, this would come from an API)
const DESTINATION_DETAILS = {
  'Agra, U.P': {
    name: 'Agra, U.P',
    tagline: 'City of Lights',
    description: 'Discover the romance and elegance of Agra, with its iconic Eiffel Tower, historic Notre Dame Cathedral, world-class museums like the Louvre, and charming café culture. Experience the magic of strolling along the Seine River and exploring the artistic districts of Montmartre.',
    rating: 4.8,
    highlights: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre Dame Cathedral',
      'Champs-Élysées',
      'Montmartre'
    ],
    accessibility: [
      'Audio descriptions available',
      'Wheelchair accessible routes',
      'Sign language options',
      'Sensory-friendly options'
    ]
  },
  'Tokyo, Japan': {
    name: 'Tokyo, Japan',
    tagline: 'Where Tradition Meets Future',
    description: 'Explore the fascinating contrasts of Tokyo, from ultramodern skyscrapers to historic temples. Experience the bustling Shibuya Crossing, tranquil gardens, diverse cuisine, and vibrant pop culture. Tokyo offers an unforgettable blend of ancient traditions and cutting-edge innovation.',
    rating: 4.7,
    highlights: [
      'Shibuya Crossing',
      'Tokyo Skytree',
      'Senso-ji Temple',
      'Shinjuku Gyoen',
      'Akihabara'
    ],
    accessibility: [
      'Audio descriptions available',
      'Wheelchair accessible routes',
      'Sign language options',
      'Sensory-friendly options'
    ]
  }
};

// For any destination not specifically defined above
const DEFAULT_DESTINATION = {
  tagline: 'Discover Something New',
  description: 'Explore the wonders of this amazing destination with our virtual reality tour. Experience the culture, landmarks, and local life from the comfort of your home.',
  rating: 4.5,
  highlights: [
    'Famous Landmarks',
    'Local Culture',
    'Hidden Gems',
    'Historical Sites',
    'Natural Beauty'
  ],
  accessibility: [
    'Audio descriptions available',
    'Wheelchair accessible routes',
    'Sign language options',
    'Sensory-friendly options'
  ]
};

const DestinationPreviewScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const [imageLoaded, setImageLoaded] = useState(true);
  
  // Handle both string-based and object-based navigation params
  const destName = typeof destination === 'string' ? destination : destination.name;
  
  // Create destination data with local image reference
  const destData = {
    ...(DESTINATION_DETAILS[destName] || { ...DEFAULT_DESTINATION, name: destName }),
    // Use the image from the map, or from the destination object if it's already a local reference
    image: typeof destination === 'object' && destination.image ? 
      destination.image : 
      destinationImages[destName] || defaultImage
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      
      {/* Hero Image */}
      <View className="w-full h-72 relative">
        <Image
          source={destData.image}
          className="w-full h-full"
          resizeMode="cover"
          onLoad={() => setImageLoaded(true)}
        />
        <View className="absolute inset-0 bg-black opacity-30" />
        
        <View className="absolute bottom-0 left-0 right-0 p-6">
          <Text className="text-white text-3xl font-bold">{destData.name}</Text>
          <Text className="text-white text-lg">{destData.tagline}</Text>
          
          <View className="flex-row items-center mt-2">
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map(star => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(destData.rating) ? "star" : star <= destData.rating ? "star-half" : "star-outline"}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text className="text-white ml-2">{destData.rating}/5</Text>
          </View>
        </View>
      </View>
      
      <ScrollView className="flex-1 p-5">
        {/* Description */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">About this Destination</Text>
          <Text className="text-gray-600 leading-6">{destData.description}</Text>
        </View>
        
        {/* Highlights */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Top Highlights</Text>
          <View className="bg-gray-50 rounded-lg p-4">
            {destData.highlights.map((highlight, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
                <Text className="text-gray-700">{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Accessibility */}  
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Accessibility Features</Text>
          <View className="bg-gray-50 rounded-lg p-4">
            {destData.accessibility.map((feature, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle" size={18} color="#4F46E5" className="mr-2" />
                <Text className="text-gray-700">{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Fixed Bottom Button */}
      <View className="bg-white p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-indigo-600 py-4 rounded-xl shadow"
          onPress={() => navigation.navigate('DateModeSelection', { destination: destData })}
        >
          <Text className="text-white font-bold text-center text-lg">Schedule Your Tour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DestinationPreviewScreen;