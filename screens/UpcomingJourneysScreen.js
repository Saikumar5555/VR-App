// screens/UpcomingJourneysScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock data for upcoming journeys (in a real app, this would come from API/database)
const mockUpcomingJourneys = [
  {
    id: '1',
    title: 'Agra Exploration',
    destination: 'Agra, U.P',
    image: require('../assets/images/Agra.jpg'),
    date: 'Apr 25, 2025',
    time: '3:00 PM',
    hostName: 'You',
    participants: 3,
    isCreatedByUser: true
  },
  {
    id: '2',
    title: 'Goldentemple Adventure',
    destination: 'Goldentemple, Punjab',
    image: require('../assets/images/Goldentemple.jpg'),
    date: 'Apr 28, 2025',
    time: '5:30 PM',
    hostName: 'Sarah Chen',
    participants: 5,
    isCreatedByUser: false
  },
  {
    id: '3',
    title: 'charminar Canal Tour',
    destination: 'charminar, Telangana',
    image: require('../assets/images/charminar.jpg'),
    date: 'May 2, 2025',
    time: '10:00 AM',
    hostName: 'Marco Rossi',
    participants: 4,
    isCreatedByUser: false
  }
];

const UpcomingJourneysScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'myJourneys', 'available'

  const filteredJourneys = mockUpcomingJourneys.filter(journey => {
    if (activeTab === 'all') return true;
    if (activeTab === 'myJourneys') return journey.isCreatedByUser;
    if (activeTab === 'available') return !journey.isCreatedByUser;
    return true;
  });

  const renderJourneyItem = ({ item }) => (
    <TouchableOpacity 
      className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm"
      onPress={() => navigation.navigate('JourneySetup', { 
        destination: item.destination,
        journeyId: item.id,
        isJoining: !item.isCreatedByUser
      })}
    >
      <View className="relative">
        <Image 
          source={item.image}
          className="w-full h-36"
          resizeMode="cover"
        />
        <View className="absolute top-0 left-0 w-full h-full bg-black opacity-20" />
        <View className="absolute bottom-0 left-0 p-4">
          <Text className="text-white text-xl font-bold">{item.title}</Text>
          <Text className="text-white opacity-90">{item.destination}</Text>
        </View>
      </View>
      
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#4F46E5" />
            <Text className="ml-2 text-gray-700">{item.date}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#4F46E5" />
            <Text className="ml-2 text-gray-700">{item.time}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={16} color="#4F46E5" />
            <Text className="ml-2 text-gray-700">Host: {item.hostName}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#4F46E5" />
            <Text className="ml-2 text-gray-700">{item.participants} participants</Text>
          </View>
        </View>
        
        {!item.isCreatedByUser ? (
          <TouchableOpacity 
            className="bg-indigo-600 py-2 rounded-lg mt-3"
            onPress={() => navigation.navigate('JourneySetup', { 
              destination: item.destination,
              journeyId: item.id,
              isJoining: true
            })}
          >
            <Text className="text-white font-bold text-center">Join Journey</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            className="bg-indigo-100 py-2 rounded-lg mt-3"
            onPress={() => navigation.navigate('JourneySetup', { 
              destination: item.destination,
              journeyId: item.id,
              isJoining: false
            })}
          >
            <Text className="text-indigo-600 font-bold text-center">Manage Journey</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <View className="px-6 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-800">Upcoming Journeys</Text>
        <Text className="text-base text-gray-600 mt-1">
          Join virtual journeys or manage your scheduled tours
        </Text>
      </View>
      
      {/* Filter Tabs */}
      <View className="flex-row px-6 mt-2 mb-4">
        <TouchableOpacity 
          className={`py-2 px-4 rounded-full mr-2 ${activeTab === 'all' ? 'bg-indigo-600' : 'bg-gray-200'}`}
          onPress={() => setActiveTab('all')}
        >
          <Text className={`font-medium ${activeTab === 'all' ? 'text-white' : 'text-gray-700'}`}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`py-2 px-4 rounded-full mr-2 ${activeTab === 'myJourneys' ? 'bg-indigo-600' : 'bg-gray-200'}`}
          onPress={() => setActiveTab('myJourneys')}
        >
          <Text className={`font-medium ${activeTab === 'myJourneys' ? 'text-white' : 'text-gray-700'}`}>My Journeys</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`py-2 px-4 rounded-full ${activeTab === 'available' ? 'bg-indigo-600' : 'bg-gray-200'}`}
          onPress={() => setActiveTab('available')}
        >
          <Text className={`font-medium ${activeTab === 'available' ? 'text-white' : 'text-gray-700'}`}>Available</Text>
        </TouchableOpacity>
      </View>
      
      {/* Journey List */}
      <FlatList
        data={filteredJourneys}
        renderItem={renderJourneyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Ionicons name="calendar-outline" size={48} color="#CBD5E1" />
            <Text className="text-gray-400 mt-4 text-center">No journeys found</Text>
            <TouchableOpacity 
              className="bg-indigo-600 py-3 px-6 rounded-lg mt-4"
              onPress={() => navigation.navigate('DestinationSearch')}
            >
              <Text className="text-white font-bold">Create Journey</Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      {/* Create Journey Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => navigation.navigate('DestinationSearch')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UpcomingJourneysScreen;