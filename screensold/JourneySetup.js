
// // screens/JourneySetup.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { FaLocationArrow, FaLanguage, FaVolumeUp, FaPlay } from 'react-icons/fa';

// const JourneySetup = ({ navigation }) => {
//   const [language, setLanguage] = useState('English');
//   const [narrationSpeed, setNarrationSpeed] = useState('Normal');
  
//   return (
//     <View className="flex-1 bg-blue-50">
//       <View className="bg-blue-600 py-12 px-6 rounded-b-3xl shadow-lg">
//         <Text className="text-white text-3xl font-bold">Journey Setup</Text>
//         <View className="flex-row items-center mt-4">
//           <FaLocationArrow className="text-white mr-2" />
//           <Text className="text-white text-xl">Taj Mahal, Agra</Text>
//         </View>
//       </View>
      
//       <ScrollView className="flex-1 px-6 pt-8">
//         <Image 
//           source={{ uri: 'https://via.placeholder.com/350x200' }} 
//           className="w-full h-48 rounded-lg mb-8"
//         />
        
//         <View className="bg-white p-4 rounded-xl shadow-md mb-4">
//           <View className="flex-row justify-between items-center mb-2">
//             <Text className="font-semibold text-gray-700 text-lg">Language</Text>
//             <View className="flex-row items-center">
//               <FaLanguage className="text-blue-500 mr-2" />
//               <Text className="text-blue-600">{language}</Text>
//             </View>
//           </View>
//           <View className="flex-row space-x-2 mt-2">
//             {['English', 'Hindi', 'Spanish'].map(lang => (
//               <TouchableOpacity 
//                 key={lang}
//                 className={`px-4 py-2 rounded-full ${language === lang ? 'bg-blue-500' : 'bg-gray-200'}`}
//                 onPress={() => setLanguage(lang)}
//               >
//                 <Text className={language === lang ? 'text-white' : 'text-gray-700'}>{lang}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
        
//         <View className="bg-white p-4 rounded-xl shadow-md mb-8">
//           <View className="flex-row justify-between items-center mb-2">
//             <Text className="font-semibold text-gray-700 text-lg">Narration Speed</Text>
//             <View className="flex-row items-center">
//               <FaVolumeUp className="text-blue-500 mr-2" />
//               <Text className="text-blue-600">{narrationSpeed}</Text>
//             </View>
//           </View>
//           <View className="flex-row space-x-2 mt-2">
//             {['Slow', 'Normal', 'Fast'].map(speed => (
//               <TouchableOpacity 
//                 key={speed}
//                 className={`px-4 py-2 rounded-full ${narrationSpeed === speed ? 'bg-blue-500' : 'bg-gray-200'}`}
//                 onPress={() => setNarrationSpeed(speed)}
//               >
//                 <Text className={narrationSpeed === speed ? 'text-white' : 'text-gray-700'}>{speed}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
      
//       <View className="p-6">
//         <TouchableOpacity 
//           className="bg-blue-600 py-4 rounded-full flex-row justify-center items-center shadow-lg"
//           onPress={() => navigation.navigate('VRJourney')}
//         >
//           <FaPlay className="text-white mr-2" />
//           <Text className="text-white text-lg font-bold">Start Journey</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default JourneySetup;

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const JourneySetup = ({ navigation }) => {
  const [language, setLanguage] = useState('English');
  const [narrationSpeed, setNarrationSpeed] = useState('Normal');
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Journey Setup</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-arrow" size={20} color="white" style={styles.icon} />
          <Text style={styles.locationText}>Taj Mahal, Agra</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/350x200' }} 
          style={styles.image}
        />
        
        <View style={styles.optionContainer}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>Language</Text>
            <View style={styles.languageContainer}>
              <Icon name="language" size={20} color="#3B82F6" style={styles.icon} />
              <Text style={styles.languageText}>{language}</Text>
            </View>
          </View>
          <View style={styles.optionButtons}>
            {['English', 'Hindi', 'Spanish'].map(lang => (
              <TouchableOpacity 
                key={lang}
                style={[styles.optionButton, language === lang && styles.activeButton]}
                onPress={() => setLanguage(lang)}
              >
                <Text style={language === lang ? styles.activeText : styles.inactiveText}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.optionContainer}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>Narration Speed</Text>
            <View style={styles.languageContainer}>
              <Icon name="volume-up" size={20} color="#3B82F6" style={styles.icon} />
              <Text style={styles.languageText}>{narrationSpeed}</Text>
            </View>
          </View>
          <View style={styles.optionButtons}>
            {['Slow', 'Normal', 'Fast'].map(speed => (
              <TouchableOpacity 
                key={speed}
                style={[styles.optionButton, narrationSpeed === speed && styles.activeButton]}
                onPress={() => setNarrationSpeed(speed)}
              >
                <Text style={narrationSpeed === speed ? styles.activeText : styles.inactiveText}>{speed}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('VRJourney')}
        >
          <Icon name="play" size={20} color="white" style={styles.icon} />
          <Text style={styles.startButtonText}>Start Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eff6ff' },
  header: { backgroundColor: '#3B82F6', paddingVertical: 12, paddingHorizontal: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  headerText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  icon: { marginRight: 8 },
  locationText: { color: 'white', fontSize: 18 },
  scrollContainer: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  optionContainer: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  optionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionTitle: { fontSize: 18, fontWeight: 'bold' },
  languageContainer: { flexDirection: 'row', alignItems: 'center' },
  languageText: { color: '#3B82F6', fontSize: 16 },
  optionButtons: { flexDirection: 'row', marginTop: 8 },
  optionButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#E5E7EB', borderRadius: 20, marginRight: 8 },
  activeButton: { backgroundColor: '#3B82F6' },
  activeText: { color: 'white' },
  inactiveText: { color: '#374151' },
  footer: { paddingHorizontal: 24, paddingBottom: 24 },
  startButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#3B82F6', paddingVertical: 12, borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  startButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
});

export default JourneySetup;
