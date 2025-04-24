// // screens/DestinationPreviewScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
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
//   ''Goldentemple, Punjab'': {
//     name: ''Goldentemple, Punjab'',
//     tagline: 'Where Tradition Meets Future',
//     description: 'Explore the fascinating contrasts of Goldentemple, from ultramodern skyscrapers to historic temples. Experience the bustling Shibuya Crossing, tranquil gardens, diverse cuisine, and vibrant pop culture. Goldentemple offers an unforgettable blend of ancient traditions and cutting-edge innovation.',
//     rating: 4.7,
//     highlights: [
//       'Shibuya Crossing',
//       'Goldentemple Skytree',
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
//           <Text className="text-lg font-bold text-gray-800 mb-2"></Text>
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





// // screens/DestinationPreviewScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Map of destination images
// const destinationImages = {
//   'Agra, U.P': require('../assets/images/Agra.jpg'),
//   'Goldentemple, Punjab': require('../assets/images/Goldentemple.jpg'),
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

// // Sample destination details (in a real app, this would come from an API)
// const DESTINATION_DETAILS = {
//   'Agra, U.P': {
//     name: 'Agra, U.P',
//     tagline: 'City of Love',
//     description: 'The Taj Mahal, often called the "City of Love," is an exquisite white marble mausoleum built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. It is renowned worldwide for its stunning architecture, intricate carvings, and serene gardens, making it a symbol of eternal love and one of the most visited tourist destinations in India.',
//     rating: 4.8,
//     highlights: [
//       'Taj Mahal',
//       'Agra Fort',
//       'Fatepur Sikri',
//       'Itmad-ud-Daula'
//     ],
//     accessibility: [
//       'Audio descriptions available',
//       'Wheelchair accessible routes',
//       'Sign language options',
//       'Sensory-friendly options'
//     ]
//   },
//   'Goldentemple, Punjab': {
//     name: 'Goldentemple, Punjab',
//     tagline: 'Where Spirituality Meets Serenity',
//     description: 'The Golden Temple, also known as Harmandir Sahib, is a revered spiritual site located in Amritsar, India. It is the holiest Gurdwara for Sikhs, known for its stunning golden architecture and tranquil surroundings. The temple is surrounded by a serene pool, reflecting the temple’s majestic beauty. The Golden Temple is not only a symbol of faith, devotion, and unity but also a place of peace and inclusivity, welcoming people from all walks of life. It stands as a beacon of humility, service, and the Sikh teachings of equality and selflessness, making it one of the most iconic landmarks and a must-visit destination in India.',
//     rating: 4.7,
//     highlights: [
//       'Golden Temple',

//       'Jallianwala Bagh',

//       'Wagah Border',

//       'Durgiana Temple'
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
  'Goldentemple, Punjab': require('../assets/images/Goldentemple.jpg'),
  'charminar, Telangana': require('../assets/images/charminar.jpg'),
  'Indiagate, New Delhi': require('../assets/images/Indiagate.jpg'),
  'Red Fort, New Delhi': require('../assets/images/Redfort.jpg'),
  'Grand Canyon, USA': require('../assets/images/grandcanyon.jpg'),
  'Cairo, Egypt': require('../assets/images/cairo.jpg'),
  'Sydney, Australia': require('../assets/images/sydney.jpg'),
  // Shorter names for when destinations are referred to briefly
  'Agra': require('../assets/images/Agra.jpg'),
  'Goldentemple': require('../assets/images/Goldentemple.jpg'),
  'charminar': require('../assets/images/charminar.jpg'),
  'Indiagate': require('../assets/images/Indiagate.jpg'),
  'Redfort': require('../assets/images/Redfort.jpg')
};

// Default image for destinations without a specific image
const defaultImage = require('../assets/images/Agra.jpg');

// Sample destination details (in a real app, this would come from an API)
const DESTINATION_DETAILS = {
  'Agra, U.P': {
    name: 'Agra, U.P',
    tagline: 'City of Love',
    description: 'The Taj Mahal, often called the "City of Love," is an exquisite white marble mausoleum built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. It is renowned worldwide for its stunning architecture, intricate carvings, and serene gardens, making it a symbol of eternal love and one of the most visited tourist destinations in India.',
    rating: 4.8,
    highlights: [
      'Taj Mahal',
      'Agra Fort',
      'Fatepur Sikri',
      'Itmad-ud-Daula'
    ],
    accessibility: [
      'Audio descriptions available',
      'Wheelchair accessible routes',
      'Sign language options',
      'Sensory-friendly options'
    ]
  },
  'Goldentemple, Punjab': {
    name: 'Goldentemple, Punjab',
    tagline: 'Where Spirituality Meets Serenity',
    description: 'The Golden Temple, also known as Harmandir Sahib, is a revered spiritual site located in Amritsar, India. It is the holiest Gurdwara for Sikhs, known for its stunning golden architecture and tranquil surroundings. The temple is surrounded by a serene pool, reflecting the temples majestic beauty. The Golden Temple is not only a symbol of faith, devotion, and unity but also a place of peace and inclusivity, welcoming people from all walks of life. It stands as a beacon of humility, service, and the Sikh teachings of equality and selflessness, making it one of the most iconic landmarks and a must-visit destination in India.',
    rating: 4.7,
    highlights: [
      'Golden Temple',

      'Jallianwala Bagh',

      'Wagah Border',

      'Durgiana Temple'
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
      
      {/* Fixed Bottom Button - Modified with two buttons */}
      <View className="bg-white p-4 border-t border-gray-200">
        <View className="flex-row justify-between space-x-4 gap-3">
          <TouchableOpacity
            className="bg-indigo-600 py-4 rounded-xl shadow flex-1"
            onPress={() => navigation.navigate('DateModeSelection', { destination: destData , mode: "Schedule Your Tour"})}
          >
            <Text className="text-white font-bold text-center text-lg">Schedule Your Tour</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-600 py-4 rounded-xl shadow flex-1"
            onPress={() => navigation.navigate('DateModeSelection', { destination: destData , mode: 'Instant Tour' })}
          >
            <Text className="text-white font-bold text-center text-lg">Instant Tour</Text>
          </TouchableOpacity>
          
          {/* <TouchableOpacity
            className="bg-green-600 py-4 rounded-xl shadow flex-1"
            onPress={() => navigation.navigate('InstantTour', { destination: destData })}
          >
            <Text className="text-white font-bold text-center text-lg">Instant Tour</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DestinationPreviewScreen;