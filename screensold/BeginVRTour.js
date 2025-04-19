// import React, { useEffect } from 'react';
// import { View, Text, Image, ActivityIndicator } from 'react-native';
// import { Fa3, FaDoorOpen } from 'react-icons/fa';

// const BeginVRTour = ({ navigation }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('VRExploration');
//     }, 3000);
    
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View className="flex-1 bg-gray-900 justify-center items-center p-6">
//       <View className="items-center">
//         <View className="bg-blue-500 p-5 rounded-full mb-6">
//           <Fa3 className="text-white text-5xl" />
//           <FaDoorOpen className="text-white text-5xl" />
//         </View>
        
//         <Text className="text-4xl font-bold text-center text-white mb-4">
//           Entering VR Tour
//         </Text>
        
//         <Text className="text-gray-300 text-center mb-8 text-lg">
//           Prepare for an immersive exploration of the Taj Mahal
//         </Text>
        
//         <ActivityIndicator size="large" color="#3B82F6" />
//       </View>
      
//       <Image 
//         source={{ uri: 'https://via.placeholder.com/400x200' }}
//         className="absolute w-full h-full opacity-20"
//       />
//     </View>
//   );
// };

// export default BeginVRTour;


import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';  // Importing FontAwesome icons

const BeginVRTour = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('VRExploration');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="magic" size={60} color="white" style={styles.icon} />
          <Icon name="door-open" size={60} color="white" style={styles.icon} />
        </View>
        
        <Text style={styles.title}>
          Entering VR Tour
        </Text>
        
        <Text style={styles.subtitle}>
          Prepare for an immersive exploration of the Taj Mahal
        </Text>
        
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
      
      <Image 
        source={{ uri: 'https://via.placeholder.com/400x200' }}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#3B82F6',
    padding: 20,
    borderRadius: 50,
    marginBottom: 24,
  },
  icon: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 24,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
});

export default BeginVRTour;
