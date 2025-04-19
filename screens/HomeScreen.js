// screens/HomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1">
        {/* Hero Section */}
        <LinearGradient
          colors={['#4F46E5', '#818CF8']}
          className="w-full h-64 justify-center items-center rounded-b-3xl px-6"
        >
          <Image
            source={require('../assets/images/sclarion.png')}
            className="w-24 h-24 mb-4"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-white mb-2">ExploreEase</Text>
          <Text className="text-white text-center text-base">
            Virtual reality travel experiences for everyone
          </Text>
        </LinearGradient>

        {/* Welcome Message */}
        <View className="px-6 pt-6">
          <Text className="text-2xl font-bold text-gray-800 mb-3">Welcome to ExploreEase</Text>
          <Text className="text-base text-gray-600 mb-6">
            Experience the world without limitations. Discover beautiful destinations, 
            immerse yourself in virtual journeys, and explore local cultures.
          </Text>
        </View>

        {/* Main Actions */}
        <View className="px-6 mb-8">
          <TouchableOpacity 
            className="bg-indigo-600 py-4 rounded-xl mb-4 shadow-md"
            onPress={() => navigation.navigate('DestinationSearch')}
          >
            <Text className="text-white font-bold text-center text-lg">Plan a New Tour</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-white border-2 border-indigo-600 py-4 rounded-xl mb-4 shadow-sm"
            onPress={() => navigation.navigate('JourneySetup', { destination: 'Paris, France' })}
          >
            <Text className="text-indigo-600 font-bold text-center text-lg">Demo Journey</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Destinations */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Popular Destinations</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4">
            {['Paris', 'Tokyo', 'New York', 'Venice', 'Bali'].map((city, index) => (
              <TouchableOpacity 
                key={index}
                className="mr-4"
                onPress={() => navigation.navigate('DestinationPreview', { destination: city })}
              >
                <View className="bg-gray-200 w-40 h-28 rounded-lg overflow-hidden shadow-sm">
                  <Image 
                    source={{ uri: `https://source.unsplash.com/featured/?${city},landmark` }}
                    className="w-full h-full"
                  />
                </View>
                <Text className="text-gray-800 font-medium mt-2">{city}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* How It Works */}
        <View className="px-6 mb-12">
          <Text className="text-xl font-bold text-gray-800 mb-4">How ExploreEase Works</Text>
          
          {[
            { title: 'Plan Your Tour', description: 'Select destinations and customize your experience' },
            { title: 'Experience Travel', description: 'Immerse yourself in VR journeys by air, sea, or land' },
            { title: 'Explore Locations', description: 'Visit landmarks and learn about local culture' },
            { title: 'Shop Local Markets', description: 'Discover and purchase authentic local products' }
          ].map((item, index) => (
            <View key={index} className="flex-row mb-4 items-start">
              <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-3">
                <Text className="text-indigo-600 font-bold">{index + 1}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-bold mb-1">{item.title}</Text>
                <Text className="text-gray-600">{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;