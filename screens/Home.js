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

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#4F46E5' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Use Case 1 - Home & Planning */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'ExploreEase' }} />
      <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} options={{ title: 'Find Destinations' }} />
      <Stack.Screen name="DestinationPreview" component={DestinationPreviewScreen} options={{ title: 'Destination Preview' }} />
      <Stack.Screen name="DateModeSelection" component={DateModeSelectionScreen} options={{ title: 'Schedule Your Tour' }} />
      <Stack.Screen name="TourCustomization" component={TourCustomizationScreen} options={{ title: 'Customize Tour' }} />
      <Stack.Screen name="TripSummary" component={TripSummaryScreen} options={{ title: 'Trip Summary' }} />

      {/* Use Case 2 - Journey Setup */}
      <Stack.Screen name="JourneySetup" component={JourneySetupScreen} options={{ title: 'Journey Setup' }} />
      <Stack.Screen name="VRJourney" component={VRJourneyScreen} options={{ title: 'VR Journey', headerShown: false }} />

      {/* Use Case 3 - VR Exploration */}
      <Stack.Screen name="VRExploration" component={VRExplorationScreen} options={{ title: 'Explore', headerShown: false }} />

      {/* Use Case 4 - Marketplace */}
      <Stack.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: 'Local Marketplace' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmation' }} />
    </Stack.Navigator>
  );
};

export default Home;
