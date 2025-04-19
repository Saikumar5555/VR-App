// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { FaPlaneDeparture, FaWindowMaximize, FaUserAstronaut, FaMicrophone } from 'react-icons/fa';

// const VRJourney = ({ navigation }) => {
//   const [viewMode, setViewMode] = useState('Pilot View');
//   const [progress, setProgress] = useState(0);
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         const newProgress = prev + 1;
//         if (newProgress >= 100) {
//           clearInterval(interval);
//           setTimeout(() => {
//             navigation.navigate('ArrivalNotification');
//           }, 1000);
//           return 100;
//         }
//         return newProgress;
//       });
//     }, 300);
    
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View className="flex-1 bg-black">
//       <Image 
//         source={{ uri: 'https://via.placeholder.com/400x700' }}
//         className="absolute w-full h-full opacity-80"
//       />
      
//       <View className="flex-1 justify-between">
//         <View className="bg-black bg-opacity-50 p-4 rounded-b-2xl">
//           <View className="flex-row justify-between items-center">
//             <View className="flex-row items-center">
//               <FaPlaneDeparture className="text-white mr-2" />
//               <Text className="text-white text-lg font-bold">Flying to Agra</Text>
//             </View>
//             <View className="bg-blue-500 px-3 py-1 rounded-full">
//               <Text className="text-white">{progress}%</Text>
//             </View>
//           </View>
          
//           <View className="h-1 bg-gray-700 rounded-full mt-3">
//             <View 
//               className="h-1 bg-blue-500 rounded-full" 
//               style={{ width: `${progress}%` }}
//             />
//           </View>
//         </View>
        
//         <View className="flex-1 justify-center items-center">
//           {/* VR content would be here */}
//         </View>
        
//         <View className="bg-black bg-opacity-60 p-4 space-y-4">
//           <View className="flex-row justify-center space-x-4">
//             <TouchableOpacity 
//               className={`px-4 py-2 rounded-lg flex-row items-center ${viewMode === 'Pilot View' ? 'bg-blue-500' : 'bg-gray-700'}`}
//               onPress={() => setViewMode('Pilot View')}
//             >
//               <FaUserAstronaut className="text-white mr-2" />
//               <Text className="text-white">Pilot View</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               className={`px-4 py-2 rounded-lg flex-row items-center ${viewMode === 'Window View' ? 'bg-blue-500' : 'bg-gray-700'}`}
//               onPress={() => setViewMode('Window View')}
//             >
//               <FaWindowMaximize className="text-white mr-2" />
//               <Text className="text-white">Window View</Text>
//             </TouchableOpacity>
//           </View>
          
//           <View className="flex-row justify-center">
//             <View className="bg-gray-800 px-4 py-2 rounded-lg flex-row items-center">
//               <FaMicrophone className="text-green-400 mr-2" />
//               <Text className="text-white">Ambient Sounds On</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default VRJourney;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const VRJourney = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('Pilot View');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigation.navigate('ArrivalNotification');
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: 'https://via.placeholder.com/400x700' }}
        className="absolute w-full h-full opacity-80"
      />

      <View className="flex-1 justify-between">
        <View className="bg-black bg-opacity-50 p-4 rounded-b-2xl">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <FontAwesome5 name="plane-departure" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text className="text-white text-lg font-bold">Flying to Agra</Text>
            </View>
            <View className="bg-blue-500 px-3 py-1 rounded-full">
              <Text className="text-white">{progress}%</Text>
            </View>
          </View>

          <View className="h-1 bg-gray-700 rounded-full mt-3">
            <View
              className="h-1 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>

        <View className="flex-1 justify-center items-center">
          {/* VR content would be here */}
        </View>

        <View className="bg-black bg-opacity-60 p-4 space-y-4">
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg flex-row items-center ${
                viewMode === 'Pilot View' ? 'bg-blue-500' : 'bg-gray-700'
              }`}
              onPress={() => setViewMode('Pilot View')}
            >
              <FontAwesome5 name="user-astronaut" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text className="text-white">Pilot View</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 rounded-lg flex-row items-center ${
                viewMode === 'Window View' ? 'bg-blue-500' : 'bg-gray-700'
              }`}
              onPress={() => setViewMode('Window View')}
            >
              <FontAwesome5 name="window-maximize" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text className="text-white">Window View</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <View className="bg-gray-800 px-4 py-2 rounded-lg flex-row items-center">
              <FontAwesome5 name="microphone" size={18} color="#4ade80" style={{ marginRight: 8 }} />
              <Text className="text-white">Ambient Sounds On</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VRJourney;
