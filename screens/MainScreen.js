// screens/MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import UpcomingJourneysScreen from './UpcomingJourneysScreen';

const MainScreen = ({ navigation, route }) => {
  // Check if there's an initialTab param and use it
  const initialTab = route.params?.initialTab || 'home';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update tab if route params change
  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);

  // Navigation hijacking - intercept navigation to make it work with our tab system
  const handleNavigation = (screenName, params) => {
    if (screenName === 'UpcomingJourneys') {
      // Instead of navigating, just switch tabs
      setActiveTab('upcoming');
    } else {
      // For other screens, navigate normally
      navigation.navigate(screenName, params);
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen navigation={{ 
          ...navigation, 
          navigate: handleNavigation 
        }} />;
      case 'upcoming':
        return <UpcomingJourneysScreen navigation={navigation} />;
      default:
        return <HomeScreen navigation={{ 
          ...navigation, 
          navigate: handleNavigation 
        }} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      
      {/* Custom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons 
            name={activeTab === 'home' ? 'home' : 'home-outline'} 
            size={24} 
            color={activeTab === 'home' ? '#4F46E5' : '#6B7280'} 
          />
          <Text style={[
            styles.tabLabel,
            { color: activeTab === 'home' ? '#4F46E5' : '#6B7280' }
          ]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('upcoming')}
        >
          <Ionicons 
            name={activeTab === 'upcoming' ? 'calendar' : 'calendar-outline'} 
            size={24} 
            color={activeTab === 'upcoming' ? '#4F46E5' : '#6B7280'} 
          />
          <Text style={[
            styles.tabLabel,
            { color: activeTab === 'upcoming' ? '#4F46E5' : '#6B7280' }
          ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    height: 60,
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
});

export default MainScreen;