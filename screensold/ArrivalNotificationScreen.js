import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const ArrivalNotificationScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 bg-blue-50 justify-center items-center p-6`}>
      <View style={tw`bg-white p-8 rounded-xl shadow-sm items-center w-full max-w-md`}>
        <View style={tw`bg-green-100 p-4 rounded-full mb-6`}>
          <Ionicons name="location" size={48} color="#10b981" />
        </View>
        
        <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>Welcome to Agra!</Text>
        <Text style={tw`text-gray-600 text-center mb-6`}>
          You've arrived at your destination. Ready to explore the Taj Mahal?
        </Text>
        
        <Image
          source={{ uri: 'https://example.com/taj-mahal-thumbnail.jpg' }}
          style={tw`w-full h-40 rounded-lg mb-6`}
          resizeMode="cover"
        />
        
        <TouchableOpacity
          onPress={() => navigation.navigate('BeginVRTour')}
          style={tw`bg-blue-600 py-3 px-6 rounded-full flex-row items-center`}
        >
          <Text style={tw`text-white font-bold ml-2`}>Begin VR Tour</Text>
          <Ionicons name="arrow-forward" size={20} color="white" style={tw`ml-2`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArrivalNotificationScreen;