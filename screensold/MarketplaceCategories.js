import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { FaSearch, FaUtensils, FaTshirt, FaPaintBrush } from 'react-icons/fa';

const MarketplaceCategories = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'Food', icon: <FaUtensils className="text-orange-500 text-3xl" />, color: 'bg-orange-100' },
    { id: 2, name: 'Fashion', icon: <FaTshirt className="text-purple-500 text-3xl" />, color: 'bg-purple-100' },
    { id: 3, name: 'Crafts', icon: <FaPaintBrush className="text-green-500 text-3xl" />, color: 'bg-green-100' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white py-8 px-6 shadow-sm">
        <Text className="text-gray-800 text-2xl font-bold">Marketplace</Text>
        <Text className="text-gray-500">Explore local specialties from Agra</Text>
        
        <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mt-4">
          <FaSearch className="text-gray-400 mr-2" />
          <TextInput
            placeholder="Search famous items..."
            className="flex-1 text-gray-800"
          />
        </View>
      </View>
      
      <ScrollView className="flex-1 p-6">
        <Text className="text-lg font-bold text-gray-700 mb-4">Categories</Text>
        
        <View className="space-y-4">
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              className="bg-white p-4 rounded-xl shadow-sm flex-row items-center"
              onPress={() => {
                if (category.name === 'Food') {
                  navigation.navigate('FoodItemListings');
                }
              }}
            >
              <View className={`${category.color} p-3 rounded-full mr-4`}>
                {category.icon}
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">{category.name}</Text>
                <Text className="text-gray-500">Explore local {category.name.toLowerCase()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text className="text-lg font-bold text-gray-700 my-6">Featured Items</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {[1, 2, 3].map(item => (
            <View key={item} className="mr-4 w-40">
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                className="w-full h-40 rounded-lg mb-2"
              />
              <Text className="font-medium text-gray-800">Featured Item {item}</Text>
              <Text className="text-gray-500">₹499</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default MarketplaceCategories;