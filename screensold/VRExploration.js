// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { FaSearch, FaVolumeUp, FaMicrophone, FaCompass, FaBullseye, FaEye } from 'react-icons/fa';

// const VRExploration = ({ navigation }) => {
//   const [viewMode, setViewMode] = useState('Normal');
  
//   return (
//     <View className="flex-1 bg-black">
//       <Image 
//         source={{ uri: 'https://via.placeholder.com/400x700' }}
//         className="absolute w-full h-full"
//       />
      
//       {/* VR Overlay Controls */}
//       <View className="flex-1 justify-between">
//         <View className="p-4 flex-row justify-end">
//           <TouchableOpacity 
//             className="bg-black bg-opacity-70 p-3 rounded-full"
//             onPress={() => navigation.navigate('InformationalOverlay')}
//           >
//             <FaSearch className="text-white" />
//           </TouchableOpacity>
//         </View>
        
//         <View className="p-4">
//           <View className="bg-black bg-opacity-70 rounded-2xl p-4">
//             <Text className="text-white text-lg font-bold mb-4">View Controls</Text>
            
//             <View className="flex-row justify-between mb-4">
//               <TouchableOpacity 
//                 className={`px-3 py-2 rounded-lg flex-row items-center ${viewMode === 'Normal' ? 'bg-blue-500' : 'bg-gray-700'}`}
//                 onPress={() => setViewMode('Normal')}
//               >
//                 <FaEye className="text-white mr-1" />
//                 <Text className="text-white">Normal</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 className={`px-3 py-2 rounded-lg flex-row items-center ${viewMode === 'Bird\'s-eye' ? 'bg-blue-500' : 'bg-gray-700'}`}
//                 onPress={() => setViewMode('Bird\'s-eye')}
//               >
//                 <FaCompass className="text-white mr-1" />
//                 <Text className="text-white">Bird's-eye</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 className={`px-3 py-2 rounded-lg flex-row items-center ${viewMode === 'Ant-eye' ? 'bg-blue-500' : 'bg-gray-700'}`}
//                 onPress={() => setViewMode('Ant-eye')}
//               >
//                 <FaBullseye className="text-white mr-1" />
//                 <Text className="text-white">Ant-eye</Text>
//               </TouchableOpacity>
//             </View>
            
//             <View className="flex-row justify-between">
//               <TouchableOpacity className="bg-gray-700 px-4 py-2 rounded-lg flex-row items-center">
//                 <FaVolumeUp className="text-white mr-2" />
//                 <Text className="text-white">Narration</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity className="bg-gray-700 px-4 py-2 rounded-lg flex-row items-center">
//                 <FaMicrophone className="text-white mr-2" />
//                 <Text className="text-white">Voice Command</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default VRExploration;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome icons

const VRExploration = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('Normal');

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/400x700' }}
        style={styles.backgroundImage}
      />
      
      {/* VR Overlay Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.searchButtonContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('InformationalOverlay')}
          >
            <Icon name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.viewControlsContainer}>
          <View style={styles.controlCard}>
            <Text style={styles.controlCardTitle}>View Controls</Text>
            
            <View style={styles.controlsRow}>
              <TouchableOpacity 
                style={[styles.viewButton, viewMode === 'Normal' && styles.activeButton]}
                onPress={() => setViewMode('Normal')}
              >
                <Icon name="eye" size={20} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Normal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.viewButton, viewMode === 'Bird\'s-eye' && styles.activeButton]}
                onPress={() => setViewMode('Bird\'s-eye')}
              >
                <Icon name="compass" size={20} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Bird's-eye</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.viewButton, viewMode === 'Ant-eye' && styles.activeButton]}
                onPress={() => setViewMode('Ant-eye')}
              >
                <Icon name="bullseye" size={20} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Ant-eye</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.controlsRow}>
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="volume-up" size={20} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Narration</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="microphone" size={20} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Voice Command</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  searchButtonContainer: {
    padding: 16,
    alignItems: 'flex-end',
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 50,
  },
  viewControlsContainer: {
    padding: 16,
  },
  controlCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 16,
  },
  controlCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: '#3b82f6',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
  },
});

export default VRExploration;
