// screens/OrderConfirmationScreen.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderNumber, totalAmount } = route.params;
  
  // Reset cart when navigating back to home
  const returnToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };
  
  // Continue exploring the current destination
  const continueExploring = () => {
    navigation.navigate('VRExploration', { destination: 'Destination' });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <View className="flex-1 justify-center items-center p-6">
        {/* Success Animation */}
        <View className="w-32 h-32 bg-green-100 rounded-full items-center justify-center mb-6">
          <Ionicons name="checkmark" size={80} color="#10B981" />
        </View>
        
        <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">Order Confirmed!</Text>
        <Text className="text-gray-600 text-center mb-6">
          Your order has been placed successfully and is being processed.
        </Text>
        
        {/* Order Details */}
        <View className="bg-gray-50 w-full rounded-lg p-4 mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-4">Order Details</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Order Number</Text>
            <Text className="text-gray-800 font-medium">{orderNumber}</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Order Date</Text>
            <Text className="text-gray-800 font-medium">
              {new Date().toLocaleDateString()}
            </Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Total Amount</Text>
            <Text className="text-gray-800 font-medium">${totalAmount}</Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Estimated Delivery</Text>
            <Text className="text-gray-800 font-medium">
              {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        <Text className="text-gray-600 text-center mb-6">
          A confirmation email has been sent to your registered email address.
        </Text>
        
        {/* Action Buttons */}
        <TouchableOpacity
          className="bg-indigo-600 w-full py-3 rounded-xl mb-3"
          onPress={continueExploring}
        >
          <Text className="text-white font-bold text-center text-lg">Continue Exploring</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-white border-2 border-indigo-600 w-full py-3 rounded-xl"
          onPress={returnToHome}
        >
          <Text className="text-indigo-600 font-bold text-center text-lg">Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;