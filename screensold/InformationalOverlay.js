// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { FaVolumeUp, FaTimes, FaShoppingBag } from 'react-icons/fa';

// const InformationalOverlay = ({ navigation }) => {
//   return (
//     <View className="flex-1 bg-black bg-opacity-80">
//       <Image 
//         source={{ uri: 'https://via.placeholder.com/400x700' }}
//         className="absolute w-full h-full opacity-30"
//       />
      
//       <View className="flex-1">
//         <View className="flex-row justify-end p-4">
//           <TouchableOpacity 
//             className="bg-red-500 p-2 rounded-full"
//             onPress={() => navigation.navigate('VRExploration')}
//           >
//             <FaTimes className="text-white" />
//           </TouchableOpacity>
//         </View>
        
//         <ScrollView className="flex-1 p-4">
//           <View className="bg-white bg-opacity-90 rounded-2xl p-6 mb-6">
//             <Text className="text-3xl font-bold text-gray-800 mb-4">Taj Mahal</Text>
            
//             <Image 
//               source={{ uri: 'https://via.placeholder.com/350x200' }}
//               className="w-full h-48 rounded-lg mb-4"
//             />
            
//             <Text className="text-gray-700 mb-4 leading-6">
//               The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.
//             </Text>
            
//             <Text className="text-gray-700 mb-4 leading-6">
//               The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being "the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage".
//             </Text>
            
//             <TouchableOpacity className="flex-row items-center">
//               <FaVolumeUp className="text-blue-600 mr-2" />
//               <Text className="text-blue-600">Listen to Narration</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
        
//         <View className="p-6">
//           <View className="flex-row space-x-4">
//             <TouchableOpacity 
//               className="bg-gray-700 flex-1 py-3 rounded-xl flex-row justify-center items-center"
//               onPress={() => navigation.navigate('VRExploration')}
//             >
//               <Text className="text-white font-bold">End Tour</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               className="bg-blue-600 flex-1 py-3 rounded-xl flex-row justify-center items-center"
//               onPress={() => navigation.navigate('TourExitMarketplace')}
//             >
//               <FaShoppingBag className="text-white mr-2" />
//               <Text className="text-white font-bold">Marketplace</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default InformationalOverlay;


import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons

const InformationalOverlay = ({ navigation }) => {
  return (
    <View style={styles.overlayContainer}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/400x700' }}
        style={styles.backgroundImage}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => navigation.navigate('VRExploration')}
          >
            <Icon name="times" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Taj Mahal</Text>
            
            <Image 
              source={{ uri: 'https://via.placeholder.com/350x200' }}
              style={styles.image}
            />
            
            <Text style={styles.text}>
              The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.
            </Text>
            
            <Text style={styles.text}>
              The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being "the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage".
            </Text>
            
            <TouchableOpacity style={styles.narrationButton}>
              <Icon name="volume-up" size={20} color="#3B82F6" style={styles.icon} />
              <Text style={styles.narrationText}>Listen to Narration</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <View style={styles.footerButtonRow}>
            <TouchableOpacity 
              style={styles.endTourButton}
              onPress={() => navigation.navigate('VRExploration')}
            >
              <Text style={styles.footerButtonText}>End Tour</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.marketplaceButton}
              onPress={() => navigation.navigate('TourExitMarketplace')}
            >
              <Icon name="shopping-bag" size={20} color="white" style={styles.icon} />
              <Text style={styles.footerButtonText}>Marketplace</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black overlay with opacity
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 50,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  text: {
    color: '#555',
    marginBottom: 12,
    lineHeight: 24,
  },
  narrationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  icon: {
    marginRight: 8,
  },
  narrationText: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  footer: {
    paddingBottom: 16,
  },
  footerButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endTourButton: {
    backgroundColor: '#4B4B4B',
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketplaceButton: {
    backgroundColor: '#3B82F6',
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 12,
  },
  footerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default InformationalOverlay;
