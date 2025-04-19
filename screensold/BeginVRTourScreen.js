import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const BeginVRTourScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 bg-gray-900 justify-center items-center`}>
      <Image 
        source={{ uri: 'https://example.com/taj-mahal-preview.jpg' }} 
        style={tw`absolute w-full h-full opacity-50`}
        blurRadius={5}
      />
      
      <View style={tw`items-center z-10 p-6`}>
        <MaterialCommunityIcons name="virtual-reality" size={80} color="#3b82f6" />
        <Text style={tw`text-3xl font-bold text-white mt-6 text-center`}>Taj Mahal VR Tour</Text>
        <Text style={tw`text-gray-300 mt-2 text-center`}>
          Experience one of the wonders of the world in immersive virtual reality
        </Text>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('VRExploration')}
          style={tw`bg-blue-600 py-4 px-8 rounded-full mt-10 flex-row items-center`}
        >
          <Text style={tw`text-white font-bold text-lg`}>Begin Exploration</Text>
          <Ionicons name="arrow-forward" size={24} color="white" style={tw`ml-2`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};