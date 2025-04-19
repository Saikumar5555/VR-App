import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 bg-gray-50 p-6`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <MaterialCommunityIcons name="virtual-reality" size={80} color="#3b82f6" />
        <Text style={tw`text-3xl font-bold text-gray-900 mt-4`}>VR Travel & Shop</Text>
        <Text style={tw`text-gray-600 mt-2 text-center`}>
          Explore world heritage sites in VR and shop local specialties
        </Text>
      </View>

      <View style={tw`mb-8`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('JourneySetup')}
          style={tw`bg-blue-600 py-4 rounded-full mb-4 flex-row justify-center items-center`}
        >
          <Ionicons name="airplane" size={24} color="white" />
          <Text style={tw`text-white font-bold text-lg ml-2`}>Start VR Journey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('MarketplaceCategories')}
          style={tw`bg-green-600 py-4 rounded-full flex-row justify-center items-center`}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text style={tw`text-white font-bold text-lg ml-2`}>Browse Marketplace</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;