// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

// const ArrivalNotification = ({ navigation }) => {
//   return (
//     <View className="flex-1 bg-blue-50 justify-center items-center p-6">
//       <View className="bg-white rounded-3xl p-6 w-full shadow-xl">
//         <View className="items-center">
//           <View className="bg-blue-100 p-4 rounded-full mb-4">
//             <FaMapMarkerAlt className="text-blue-600 text-4xl" />
//           </View>
          
//           <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
//             Welcome to Agra!
//           </Text>
          
//           <Text className="text-gray-600 text-center mb-6">
//             You have arrived at your destination. Get ready to explore the magnificent Taj Mahal.
//           </Text>
          
//           <Image 
//             source={{ uri: 'https://via.placeholder.com/300x150' }}
//             className="w-full h-40 rounded-xl mb-6"
//           />
          
//           <TouchableOpacity 
//             className="bg-blue-600 w-full py-4 rounded-full flex-row justify-center items-center"
//             onPress={() => navigation.navigate('BeginVRTour')}
//           >
//             <Text className="text-white text-lg font-bold mr-2">Begin Tour</Text>
//             <FaArrowRight className="text-white" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default ArrivalNotification;

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ArrivalNotification = ({ navigation }) => {
  return (
    <View className="flex-1 bg-blue-50 justify-center items-center p-6">
      <View className="bg-white rounded-3xl p-6 w-full shadow-xl">
        <View className="items-center">
          <View className="bg-blue-100 p-4 rounded-full mb-4">
            <FontAwesome name="map-marker" size={32} color="#2563eb" />
          </View>

          <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome to Agra!
          </Text>

          <Text className="text-gray-600 text-center mb-6">
            You have arrived at your destination. Get ready to explore the magnificent Taj Mahal.
          </Text>

          <Image
            source={{ uri: 'https://via.placeholder.com/300x150' }}
            className="w-full h-40 rounded-xl mb-6"
          />

          <TouchableOpacity
            className="bg-blue-600 w-full py-4 rounded-full flex-row justify-center items-center"
            onPress={() => navigation.navigate('BeginVRTour')}
          >
            <Text className="text-white text-lg font-bold mr-2">Begin Tour</Text>
            <FontAwesome name="arrow-right" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ArrivalNotification;
