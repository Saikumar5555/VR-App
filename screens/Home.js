// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { auth } from '../firebase';

// const Home = ({ navigation }) => {
//   const handleSignOut = () => {
//     auth.signOut();
//     navigation.navigate('SignIn');
//   };

//   return (
//     <View className="flex-1 items-center justify-center bg-white px-8">
//       <Text className="text-2xl font-bold text-gray-900 mb-4">
//         Welcome {auth.currentUser?.phoneNumber}!
//       </Text>
//       <TouchableOpacity
//         className="bg-indigo-600 py-3 px-6 rounded-lg"
//         onPress={handleSignOut}
//       >
//         <Text className="text-white font-medium">Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Home;








// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Import all internal screens
// import HomeScreen from './HomeScreen';
// import DestinationSearchScreen from './DestinationSearchScreen';
// import DestinationPreviewScreen from './DestinationPreviewScreen';
// import DateModeSelectionScreen from './DateModeSelectionScreen';
// import TourCustomizationScreen from './TourCustomizationScreen';
// import TripSummaryScreen from './TripSummaryScreen';
// import JourneySetupScreen from './JourneySetupScreen';
// import VRJourneyScreen from './VRJourneyScreen';
// import VRExplorationScreen from './VRExplorationScreen';
// import MarketplaceScreen from './MarketplaceScreen';
// import ProductDetailsScreen from './ProductDetailsScreen';
// import CartScreen from './CartScreen';
// import PaymentScreen from './PaymentScreen';
// import OrderConfirmationScreen from './OrderConfirmationScreen';
// import AppNavigator from './AppNavigator';

// const Stack = createNativeStackNavigator();

// const Home = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="HomeScreen"
//       screenOptions={{
//         headerStyle: { backgroundColor: '#4F46E5' },
//         headerTintColor: '#fff',
//         headerTitleStyle: { fontWeight: 'bold' },
//       }}
//     >
//       {/* Use Case 1 - Home & Planning */}
//       <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'ExploreEase' }} />
//       <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} options={{ title: 'Find Destinations' }} />
//       <Stack.Screen name="DestinationPreview" component={DestinationPreviewScreen} options={{ title: 'Destination Preview' }} />
//       <Stack.Screen name="DateModeSelection" component={DateModeSelectionScreen} options={{ title: 'Schedule Your Tour' }} />
//       <Stack.Screen name="TourCustomization" component={TourCustomizationScreen} options={{ title: 'Customize Tour' }} />
//       <Stack.Screen name="TripSummary" component={TripSummaryScreen} options={{ title: 'Trip Summary' }} />

//       {/* Use Case 2 - Journey Setup */}
//       <Stack.Screen name="JourneySetup" component={JourneySetupScreen} options={{ title: 'Journey Setup' }} />
//       <Stack.Screen name="VRJourney" component={VRJourneyScreen} options={{ title: 'VR Journey', headerShown: false }} />

//       {/* Use Case 3 - VR Exploration */}
//       <Stack.Screen 
//         name="VRExploration" 
//         component={VRExplorationScreen} 
//         options={{ title: 'Explore', headerShown: false }}
//       />

//       {/* Use Case 4 - Marketplace */}
//       <Stack.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: 'Local Marketplace' }} />
//       <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
//       <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
//       <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
//       <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmation' }} />
//       {/* Add AppNavigator as a screen */}
//       <Stack.Screen name="AppNavigator" component={AppNavigator} />
//     </Stack.Navigator>
//   );
// };

// export default Home;


// import React, { useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TouchableOpacity, Modal, View, Text, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Import all internal screens
// import HomeScreen from './HomeScreen';
// import DestinationSearchScreen from './DestinationSearchScreen';
// import DestinationPreviewScreen from './DestinationPreviewScreen';
// import DateModeSelectionScreen from './DateModeSelectionScreen';
// import TourCustomizationScreen from './TourCustomizationScreen';
// import TripSummaryScreen from './TripSummaryScreen';
// import JourneySetupScreen from './JourneySetupScreen';
// import VRJourneyScreen from './VRJourneyScreen';
// import VRExplorationScreen from './VRExplorationScreen';
// import MarketplaceScreen from './MarketplaceScreen';
// import ProductDetailsScreen from './ProductDetailsScreen';
// import CartScreen from './CartScreen';
// import PaymentScreen from './PaymentScreen';
// import OrderConfirmationScreen from './OrderConfirmationScreen';
// import AppNavigator from './AppNavigator';
// import { useNavigation } from '@react-navigation/native';
// // User Profile Modal Component
// const UserProfileModal = ({ visible, onClose }) => {
//   const userData = {
//     name: 'Vicky',
//     email: 'Vicky@example.com',
//     memberSince: 'January 2023',
//     completedJourneys: 8,
//     travelPoints: 1250,
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={false}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <SafeAreaView className="flex-1 bg-white">
//         <StatusBar barStyle="dark-content" />

//         {/* Header */}
//         <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
//           <TouchableOpacity onPress={onClose}>
//             <Ionicons name="arrow-back" size={24} color="#4F46E5" />
//           </TouchableOpacity>
//           <Text className="text-xl font-bold text-gray-800">My Profile</Text>
//           <TouchableOpacity>
//             <Ionicons name="settings-outline" size={24} color="#4F46E5" />
//           </TouchableOpacity>
//         </View>

//         <ScrollView className="flex-1">
//           {/* User Info Card */}
//           <View className="items-center px-6 py-8 bg-indigo-50">
//             <View className="bg-white w-24 h-24 rounded-full shadow-md items-center justify-center mb-4">
//               <Ionicons name="person" size={48} color="#4F46E5" />
//             </View>
//             <Text className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</Text>
//             <Text className="text-gray-600 mb-4">{userData.email}</Text>
//             <Text className="text-indigo-600">Member since {userData.memberSince}</Text>
//           </View>

//           {/* Stats Section */}
//           <View className="flex-row justify-between px-6 py-6 bg-white">
//             <View className="items-center">
//               <Text className="text-2xl font-bold text-indigo-600">{userData.completedJourneys}</Text>
//               <Text className="text-gray-600">Journeys</Text>
//             </View>
//             <View className="items-center">
//               <Text className="text-2xl font-bold text-indigo-600">{userData.travelPoints}</Text>
//               <Text className="text-gray-600">Travel Points</Text>
//             </View>
//             <View className="items-center">
//               <Text className="text-2xl font-bold text-indigo-600">3</Text>
//               <Text className="text-gray-600">Badges</Text>
//             </View>
//           </View>

//           {/* Menu Items */}
//           <View className="px-6 py-4">
//             {[ 
//               { icon: 'time-outline', title: 'Journey History', screen: 'JourneyHistory' },
//               { icon: 'heart-outline', title: 'Saved Destinations', screen: 'SavedDestinations' },
//               { icon: 'card-outline', title: 'Payment Methods', screen: 'PaymentMethods' },
//               { icon: 'notifications-outline', title: 'Notifications', screen: 'NotificationSettings' },
//               { icon: 'help-circle-outline', title: 'Help & Support', screen: 'HelpSupport' },
//               { icon: 'log-out-outline', title: 'Sign Out', action: 'signOut' }
//             ].map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 className="flex-row items-center py-4 border-b border-gray-100"
//                 onPress={() => {
//                   if (item.action === 'signOut') {
//                     console.log('Signing out...');
//                     // Handle actual sign-out logic here
//                     navigation.navigate('SignIn');  // Navigating to SignIn
//                   } else {
//                     navigation.navigate(item.screen);
//                   }
//                 }}
//               >
//                 <Ionicons name={item.icon} size={24} color="#4F46E5" className="mr-4" />
//                 <Text className="flex-1 text-gray-800 text-lg">{item.title}</Text>
//                 <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* App Info */}
//           <View className="items-center py-8">
//             <Text className="text-gray-400">ExploreEase v1.0.0</Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Modal>
//   );
// };


// const Stack = createNativeStackNavigator();

// const Home = () => {
//   const [profileModalVisible, setProfileModalVisible] = useState(false);
  
//   return (
//     <>
//       {/* User Profile Modal */}
//       <UserProfileModal 
//         visible={profileModalVisible}
//         onClose={() => setProfileModalVisible(false)}
//         navigation={navigation}
//       />
      
//       <Stack.Navigator
//         initialRouteName="HomeScreen"
//         screenOptions={{
//           headerStyle: { backgroundColor: '#4F46E5' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { fontWeight: 'bold' },
//           // Add profile button to header right for all screens
//           headerRight: () => (
//             <TouchableOpacity 
//               onPress={() => setProfileModalVisible(true)}
//               style={{ marginRight: 10 }}
//             >
//               <Ionicons name="person-circle" size={28} color="white" />
//             </TouchableOpacity>
//           ),
//         }}
//       >
//         {/* Use Case 1 - Home & Planning */}
//         <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'ExploreEase' }} />
//         <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} options={{ title: 'Find Destinations' }} />
//         <Stack.Screen name="DestinationPreview" component={DestinationPreviewScreen} options={{ title: 'Destination Preview' }} />
//         <Stack.Screen name="DateModeSelection" component={DateModeSelectionScreen} options={{ title: 'Schedule Your Tour' }} />
//         <Stack.Screen name="TourCustomization" component={TourCustomizationScreen} options={{ title: 'Customize Tour' }} />
//         <Stack.Screen name="TripSummary" component={TripSummaryScreen} options={{ title: 'Trip Summary' }} />

//         {/* Use Case 2 - Journey Setup */}
//         <Stack.Screen name="JourneySetup" component={JourneySetupScreen} options={{ title: 'Journey Setup' }} />
//         <Stack.Screen 
//           name="VRJourney" 
//           component={VRJourneyScreen} 
//           options={{ 
//             title: 'VR Journey', 
//             headerShown: false 
//           }} 
//         />

//         {/* Use Case 3 - VR Exploration */}
//         <Stack.Screen 
//           name="VRExploration" 
//           component={VRExplorationScreen} 
//           options={{ 
//             title: 'Explore', 
//             headerShown: false 
//           }}
//         />

//         {/* Use Case 4 - Marketplace */}
//         <Stack.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: 'Local Marketplace' }} />
//         <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
//         <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
//         <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
//         <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmation' }} />
//         {/* Add AppNavigator as a screen */}
//         <Stack.Screen 
//           name="AppNavigator" 
//           component={AppNavigator}
//           options={{
//             headerShown: false
//           }}
//         />
//       </Stack.Navigator>
//     </>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Modal, View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Import all internal screens
import HomeScreen from './HomeScreen';
import DestinationSearchScreen from './DestinationSearchScreen';
import DestinationPreviewScreen from './DestinationPreviewScreen';
import DateModeSelectionScreen from './DateModeSelectionScreen';
import TourCustomizationScreen from './TourCustomizationScreen';
import TripSummaryScreen from './TripSummaryScreen';
import JourneySetupScreen from './JourneySetupScreen';
import VRJourneyScreen from './VRJourneyScreen';
import VRExplorationScreen from './VRExplorationScreen';
import MarketplaceScreen from './MarketplaceScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import CartScreen from './CartScreen';
import PaymentScreen from './PaymentScreen';
import OrderConfirmationScreen from './OrderConfirmationScreen';
import AppNavigator from './AppNavigator';

// User Profile Modal Component
const UserProfileModal = ({ visible, onClose }) => {
  // Get the navigation object using the useNavigation hook
  const navigation = useNavigation();

  // Sample user data - in a real app, this would come from authentication/storage
  const userData = {
    name: 'Vicky',
    email: 'Vicky@example.com',
    memberSince: 'January 2023',
    completedJourneys: 8,
    travelPoints: 1250,
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#4F46E5" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">My Profile</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          {/* User Info Card */}
          <View className="items-center px-6 py-8 bg-indigo-50">
            <View className="bg-white w-24 h-24 rounded-full shadow-md items-center justify-center mb-4">
              <Ionicons name="person" size={48} color="#4F46E5" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</Text>
            <Text className="text-gray-600 mb-4">{userData.email}</Text>
            <Text className="text-indigo-600">Member since {userData.memberSince}</Text>
          </View>

          {/* Stats Section */}
          <View className="flex-row justify-between px-6 py-6 bg-white">
            <View className="items-center">
              <Text className="text-2xl font-bold text-indigo-600">{userData.completedJourneys}</Text>
              <Text className="text-gray-600">Journeys</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-indigo-600">{userData.travelPoints}</Text>
              <Text className="text-gray-600">Travel Points</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-indigo-600">3</Text>
              <Text className="text-gray-600">Badges</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="px-6 py-4">
            {[ 
              { icon: 'time-outline', title: 'Journey History', screen: 'JourneyHistory' },
              { icon: 'heart-outline', title: 'Saved Destinations', screen: 'SavedDestinations' },
              { icon: 'card-outline', title: 'Payment Methods', screen: 'PaymentMethods' },
              { icon: 'notifications-outline', title: 'Notifications', screen: 'NotificationSettings' },
              { icon: 'help-circle-outline', title: 'Help & Support', screen: 'HelpSupport' },
              { icon: 'log-out-outline', title: 'Sign Out', action: 'signOut' }
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center py-4 border-b border-gray-100"
                onPress={() => {
                  if (item.action === 'signOut') {
                    console.log('Signing out...');
                    // Handle actual sign-out logic here
                    navigation.navigate('SignIn');  // Navigating to SignIn
                  } else {
                    navigation.navigate(item.screen);
                  }
                }}
              >
                <Ionicons name={item.icon} size={24} color="#4F46E5" className="mr-4" />
                <Text className="flex-1 text-gray-800 text-lg">{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View className="items-center py-8">
            <Text className="text-gray-400">ExploreEase v1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const Stack = createNativeStackNavigator();

const Home = () => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  
  return (
    <>
      {/* User Profile Modal */}
      <UserProfileModal 
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
      />
      
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          // Add profile button to header right for all screens
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => setProfileModalVisible(true)}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="person-circle" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      >
        {/* Use Case 1 - Home & Planning */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'ExploreEase' }} />
        <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} options={{ title: 'Find Destinations' }} />
        <Stack.Screen name="DestinationPreview" component={DestinationPreviewScreen} options={{ title: 'Destination Preview' }} />
        <Stack.Screen name="DateModeSelection" component={DateModeSelectionScreen}  options={({ route }) => ({title: route.params?.mode || 'Tour'})} />
        <Stack.Screen name="TourCustomization" component={TourCustomizationScreen} options={{ title: 'Customize Tour' }} />
        <Stack.Screen name="TripSummary" component={TripSummaryScreen} options={{ title: 'Trip Summary' }} />

        {/* Use Case 2 - Journey Setup */}
        <Stack.Screen name="JourneySetup" component={JourneySetupScreen} options={{ title: 'Journey Setup' }} />
        <Stack.Screen 
          name="VRJourney" 
          component={VRJourneyScreen} 
          options={{ 
            title: 'VR Journey', 
            headerShown: false 
          }} 
        />

        {/* Use Case 3 - VR Exploration */}
        <Stack.Screen 
          name="VRExploration" 
          component={VRExplorationScreen} 
          options={{ 
            title: 'Explore', 
            headerShown: false 
          }}
        />

        {/* Use Case 4 - Marketplace */}
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: 'Local Marketplace' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmation' }} />
        {/* Add AppNavigator as a screen */}
        <Stack.Screen 
          name="AppNavigator" 
          component={AppNavigator}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Home;
