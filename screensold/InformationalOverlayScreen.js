import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const InformationalOverlayScreen = ({ navigation, route }) => {
  const historicalInfo = {
    title: "Taj Mahal",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.",
    yearBuilt: "1632-1653",
    architect: "Ustad Ahmad Lahauri",
    image: "https://example.com/taj-mahal-detail.jpg"
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 p-4`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-900 ml-4`}>Historical Information</Text>
      </View>

      <Image
        source={{ uri: historicalInfo.image }}
        style={tw`w-full h-64 rounded-lg mb-6`}
        resizeMode="cover"
      />

      <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>{historicalInfo.title}</Text>
      
      <View style={tw`flex-row items-center mb-4`}>
        <MaterialCommunityIcons name="calendar" size={20} color="#6b7280" />
        <Text style={tw`text-gray-600 ml-2`}>Built: {historicalInfo.yearBuilt}</Text>
      </View>

      <View style={tw`flex-row items-center mb-6`}>
        <MaterialCommunityIcons name="account-hard-hat" size={20} color="#6b7280" />
        <Text style={tw`text-gray-600 ml-2`}>Architect: {historicalInfo.architect}</Text>
      </View>

      <Text style={tw`text-gray-700 leading-6 mb-8`}>{historicalInfo.description}</Text>

      <View style={tw`flex-row mb-8`}>
        <TouchableOpacity style={tw`flex-1 bg-blue-100 py-3 rounded-lg flex-row justify-center items-center mr-2`}>
          <Ionicons name="volume-high" size={20} color="#3b82f6" />
          <Text style={tw`text-blue-600 font-bold ml-2`}>Listen</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('MarketplaceCategories')}
          style={tw`flex-1 bg-blue-600 py-3 rounded-lg flex-row justify-center items-center ml-2`}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text style={tw`text-white font-bold ml-2`}>Shop Local</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InformationalOverlayScreen;