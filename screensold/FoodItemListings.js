import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FaStar, FaArrowLeft, FaClock } from 'react-icons/fa';

const FoodItemListings = ({ navigation }) => {
  const foodItems = [
    { 
      id: 1, 
      name: 'Petha', 
      description: 'Famous Agra sweet made from ash gourd',
      price: '₹250',
      rating: 4.8,
      deliveryTime: '30 min'
    },
    { 
      id: 2, 
      name: 'Dalmoth', 
      description: 'Popular savory snack made from lentils',
      price: '₹180',
      rating: 4.5,
      deliveryTime: '25 min'
    },
    { 
      id: 3, 
      name: 'Tandoori Chicken', 
      description: 'Delicious North Indian specialty',
      price: '₹350',
      rating: 4.7,
      deliveryTime: '40 min'
    }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white py-8 px-6 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <FaArrowLeft className="text-gray-800" />
          </TouchableOpacity>
          <Text className="text-gray-800 text-2xl font-bold">Food Items</Text>
        </View>
        <Text className="text-gray-500 mt-1">Famous delicacies from Agra</Text>
      </View>
      
      <ScrollView className="flex-1 p-6">
        <View className="space-y-4">
          {foodItems.map(item => (
            <TouchableOpacity
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              onPress={() => navigation.navigate('ProductDetails', { item })}
            >
              <Image
                source={{ uri: 'https://via.placeholder.com/400x200' }}
                className="w-full h-48"
              />
              <View className="p-4">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <Text className="font-bold text-blue-600">{item.price}</Text>
                </View>
                <Text className="text-gray-600 mb-3">{item.description}</Text>
                
                <View className="flex-row justify-between">
                  <View className="flex-row items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <Text className="text-gray-700">{item.rating}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <Text className="text-gray-500">{item.deliveryTime}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FoodItemListings;