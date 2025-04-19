// screens/ProductDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Sample product descriptions (in a real app, these would come from an API)
const PRODUCT_DESCRIPTIONS = {
  'French Cheese Assortment': {
    description: 'Experience the authentic taste of France with our premium cheese assortment. This collection features four distinct varieties of artisanal French cheese, carefully selected for quality and flavor.',
    details: [
      'Includes Camembert, Brie, Roquefort, and Comté',
      'Sourced from traditional French dairies',
      'Perfect for gatherings or as a special gift',
      'Vacuum-sealed for freshness'
    ],
    origin: 'France',
    delivery: 'Ships internationally with temperature control'
  },
  'Premium Matcha Set': {
    description: 'Our premium matcha set brings the authentic Japanese tea ceremony experience to your home. This high-grade matcha powder is carefully selected from the finest tea leaves in Uji, Japan.',
    details: [
      'Includes 30g of ceremonial grade matcha powder',
      'Traditional bamboo whisk (chasen)',
      'Handcrafted ceramic bowl (chawan)',
      'Detailed instruction booklet'
    ],
    origin: 'Uji, Japan',
    delivery: 'Ships worldwide in protective packaging'
  }
};

// Default product description for products without specific descriptions
const DEFAULT_DESCRIPTION = {
  description: 'This authentic local product represents the culture and craftsmanship of the region. Each item is carefully selected to provide you with a genuine experience of the local traditions.',
  details: [
    'Authentic local product',
    'Excellent quality and craftsmanship',
    'Makes a perfect souvenir or gift',
    'Supports local artisans and businesses'
  ],
  origin: 'Local region',
  delivery: 'International shipping available'
};

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product, addToCart } = route.params;
  const [quantity, setQuantity] = useState(1);
  
  // Get product description data
  const descData = PRODUCT_DESCRIPTIONS[product.name] || DEFAULT_DESCRIPTION;
  
  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Add to cart with selected quantity
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigation.goBack();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1">
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          className="w-full h-64"
        />
        
        {/* Product Details */}
        <View className="p-5">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-bold text-gray-800 flex-1">{product.name}</Text>
            <Text className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row items-center mb-4">
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map(star => (
                <Ionicons
                  key={star}
                  name={star <= 4 ? "star" : "star-outline"}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text className="text-gray-500 ml-2">4.0 (24 reviews)</Text>
          </View>
          
          {/* Description */}
          <View className="mb-6">
            <Text className="text-base text-gray-700 leading-6 mb-4">{descData.description}</Text>
            
            <Text className="font-bold text-gray-800 mb-2">Product Details:</Text>
            {descData.details.map((detail, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
                <Text className="text-gray-700">{detail}</Text>
              </View>
            ))}
          </View>
          
          {/* Additional Info */}
          <View className="bg-gray-50 rounded-lg p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="location-outline" size={20} color="#4F46E5" />
              <Text className="text-gray-700 ml-2 font-medium">Origin: {descData.origin}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="airplane-outline" size={20} color="#4F46E5" />
              <Text className="text-gray-700 ml-2 font-medium">{descData.delivery}</Text>
            </View>
          </View>
          
          {/* Quantity Selector */}
          <View className="mb-6">
            <Text className="font-bold text-gray-800 mb-2">Quantity:</Text>
            <View className="flex-row items-center">
              <TouchableOpacity 
                className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
                onPress={decreaseQuantity}
              >
                <Ionicons name="remove" size={20} color="#4B5563" />
              </TouchableOpacity>
              
              <Text className="mx-4 text-xl font-bold text-gray-800">{quantity}</Text>
              
              <TouchableOpacity 
                className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
                onPress={increaseQuantity}
              >
                <Ionicons name="add" size={20} color="#4B5563" />
              </TouchableOpacity>
              
              <Text className="ml-4 text-gray-500">
                Total: ${(product.price * quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Buttons */}
      <View className="bg-white p-4 border-t border-gray-200 flex-row">
        <TouchableOpacity 
          className="bg-indigo-600 flex-1 py-3 rounded-xl mr-2 flex-row justify-center items-center"
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white border-2 border-indigo-600 py-3 px-4 rounded-xl flex-row justify-center items-center"
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;