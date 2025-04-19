import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FaShoppingBag, FaArrowRight, FaStore } from 'react-icons/fa';

const TourExitMarketplace = ({ navigation }) => {
  return (
    <View className="flex-1 bg-blue-50">
      <View className="bg-blue-600 py-12 px-6 rounded-b-3xl shadow-lg">
        <Text className="text-white text-3xl font-bold">Local Marketplace</Text>
        <Text className="text-blue-100 mt-2">Discover authentic treasures from Agra</Text>
      </View>
      
      <View className="flex-1 justify-center items-center p-6">
        <View className="bg-white rounded-3xl p-6 w-full shadow-xl">
          <View className="items-center mb-6">
            <View className="bg-blue-100 p-4 rounded-full mb-4">
              <FaStore className="text-blue-600 text-4xl" />
            </View>
            
            <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
              Agra's Local Specialties
            </Text>
            
            <Text className="text-gray-600 text-center mb-6">
              Explore and shop authentic products from local artisans and sellers near Taj Mahal
            </Text>
            
            <Image 
              source={{ uri: 'https://via.placeholder.com/300x150' }}
              className="w-full h-40 rounded-xl mb-6"
            />
          </View>
          
          <TouchableOpacity 
            className="bg-blue-600 w-full py-4 rounded-full flex-row justify-center items-center"
            onPress={() => navigation.navigate('MarketplaceCategories')}
          >
            <FaShoppingBag className="text-white mr-2" />
            <Text className="text-white text-lg font-bold mr-2">Explore Marketplace</Text>
            <FaArrowRight className="text-white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TourExitMarketplace;