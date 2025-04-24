// // navigation/AppNavigator.js
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';

// // Import screens
// import HomeScreen from '../screens/HomeScreen';
// import UpcomingJourneysScreen from '../screens/UpcomingJourneysScreen';
// import DestinationSearchScreen from '../screens/DestinationSearchScreen';
// import DestinationPreviewScreen from '../screens/DestinationPreviewScreen';
// import JourneySetupScreen from '../screens/JourneySetupScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Stack for Home-related screens
// const HomeStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="HomeMain" component={HomeScreen} />
//       <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} />
//       <Stack.Screen name="DestinationPreview" component={DestinationPreviewScreen} />
//       <Stack.Screen name="JourneySetup" component={JourneySetupScreen} />
//     </Stack.Navigator>
//   );
// };

// // Stack for Upcoming Journeys-related screens
// const UpcomingStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="UpcomingMain" component={UpcomingJourneysScreen} />
//       <Stack.Screen name="JourneySetup" component={JourneySetupScreen} />
//       <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} />
//     </Stack.Navigator>
//   );
// };

// // Main Tab Navigator
// const AppNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Upcoming') {
//             iconName = focused ? 'calendar' : 'calendar-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#4F46E5',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           paddingBottom: 5,
//           paddingTop: 5,
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '500',
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Upcoming" component={UpcomingStack} />
//     </Tab.Navigator>
//   );
// };

// export default AppNavigator;

// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import UpcomingJourneysScreen from '../screens/UpcomingJourneysScreen';
import DestinationSearchScreen from '../screens/DestinationSearchScreen';
import JourneySetupScreen from '../screens/JourneySetupScreen';

const Stack = createStackNavigator();

// Stack for Upcoming Journeys-related screens
const UpcomingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Upcoming" component={UpcomingJourneysScreen} />
      <Stack.Screen name="JourneySetup" component={JourneySetupScreen} />
      <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} />
    </Stack.Navigator>
  );
};

// Main App Navigator with Upcoming as default
const AppNavigator = () => {
  return <UpcomingStack />;
};

export default AppNavigator;
