// // App.js - Main Component
// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'expo-status-bar';
// import { TailwindProvider } from 'tailwindcss-react-native';

// // Import screens
// import JourneySetup from './screen/JourneySetup';
// import VRJourney from './screen/VRJourney';
// import ArrivalNotification from './screen/ArrivalNotification';
// import BeginVRTour from './screen/BeginVRTour';
// import VRExploration from './screen/VRExploration';
// import InformationalOverlay from './screen/InformationalOverlay';
// import TourExitMarketplace from './screen/TourExitMarketplace';
// import MarketplaceCategories from './screen/MarketplaceCategories';
// import FoodItemListings from './screen/FoodItemListings';
// import ProductDetails from './screen/ProductDetails';
// import ReviewCart from './screen/ReviewCart';
// import DeliveryPayment from './screen/DeliveryPayment';
// import OrderConfirmation from './screen/OrderConfirmation';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <TailwindProvider>
//       <NavigationContainer>
//         <StatusBar style="auto" />
//         <Stack.Navigator initialRouteName="JourneySetup" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="JourneySetup" component={JourneySetup} />
//           <Stack.Screen name="VRJourney" component={VRJourney} />
//           <Stack.Screen name="ArrivalNotification" component={ArrivalNotification} />
//           <Stack.Screen name="BeginVRTour" component={BeginVRTour} />
//           <Stack.Screen name="VRExploration" component={VRExploration} />
//           <Stack.Screen name="InformationalOverlay" component={InformationalOverlay} />
//           <Stack.Screen name="TourExitMarketplace" component={TourExitMarketplace} />
//           <Stack.Screen name="MarketplaceCategories" component={MarketplaceCategories} />
//           <Stack.Screen name="FoodItemListings" component={FoodItemListings} />
//           <Stack.Screen name="ProductDetails" component={ProductDetails} />
//           <Stack.Screen name="ReviewCart" component={ReviewCart} />
//           <Stack.Screen name="DeliveryPayment" component={DeliveryPayment} />
//           <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </TailwindProvider>
//   );
// }


// // App.js - Main entry point
// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import "./global.css"

// // Import screens
// import HomeScreen from './screens/HomeScreen';
// import DestinationSearchScreen from './screens/DestinationSearchScreen';
// import DestinationPreviewScreen from './screens/DestinationPreviewScreen';
// import DateModeSelectionScreen from './screens/DateModeSelectionScreen';
// import TourCustomizationScreen from './screens/TourCustomizationScreen';
// import TripSummaryScreen from './screens/TripSummaryScreen';
// import JourneySetupScreen from './screens/JourneySetupScreen';
// import VRJourneyScreen from './screens/VRJourneyScreen';
// import VRExplorationScreen from './screens/VRExplorationScreen';
// import MarketplaceScreen from './screens/MarketplaceScreen';
// import ProductDetailsScreen from './screens/ProductDetailsScreen';
// import CartScreen from './screens/CartScreen';
// import PaymentScreen from './screens/PaymentScreen';
// import OrderConfirmationScreen from './screens/OrderConfirmationScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator 
//         initialRouteName="Home"
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: '#4F46E5', // Indigo color for header
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       >
//         {/* Use Case 1 - Home & Planning */}
//         <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ExploreEase' }} />
//         <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} options={{ title: 'Find Destinations' }} />
//         <Stack.Screen name="DestinationPreview" component={DestinationPreviewScreen} options={{ title: 'Destination Preview' }} />
//         <Stack.Screen name="DateModeSelection" component={DateModeSelectionScreen} options={{ title: 'Schedule Your Tour' }} />
//         <Stack.Screen name="TourCustomization" component={TourCustomizationScreen} options={{ title: 'Customize Tour' }} />
//         <Stack.Screen name="TripSummary" component={TripSummaryScreen} options={{ title: 'Trip Summary' }} />
        
//         {/* Use Case 2 - Journey Setup */}
//         <Stack.Screen name="JourneySetup" component={JourneySetupScreen} options={{ title: 'Journey Setup' }} />
//         <Stack.Screen name="VRJourney" component={VRJourneyScreen} options={{ title: 'VR Journey', headerShown: false }} />
        
//         {/* Use Case 3 - VR Exploration */}
//         <Stack.Screen name="VRExploration" component={VRExplorationScreen} options={{ title: 'Explore', headerShown: false }} />
        
//         {/* Use Case 4 - Marketplace */}
//         <Stack.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: 'Local Marketplace' }} />
//         <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
//         <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
//         <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
//         <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmation' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppNavigator from './screens/AppNavigator';

// // Screens
// import SignIn from './screens/SignIn';
// import SignUp from './screens/SignUp';
// import Home from './screens/Home';
// import "./global.css"

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="SignIn"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="SignIn" component={SignIn} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="Home" component={Home} />
//         <AppNavigator />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import "./global.css"

// Screens
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import HomeScreen from './screens/HomeScreen';
import UpcomingJourneysScreen from './screens/UpcomingJourneysScreen';
import DestinationSearchScreen from './screens/DestinationSearchScreen';
import DestinationPreviewScreen from './screens/DestinationPreviewScreen';
import JourneySetupScreen from './screens/JourneySetupScreen';
import DateModeSelectionScreen from './screens/DateModeSelectionScreen';
import MainScreen from './screens/MainScreen';
import AppNavigator from './screens/AppNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        
        {/* Main app navigation */}
        <Stack.Screen name="MainScreen" component={MainScreen} />
        
        {/* Individual screens */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="UpcomingJourneys" component={UpcomingJourneysScreen} />
        <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} />
        <Stack.Screen name="DestinationPreview" component={DestinationPreviewScreen} />
        <Stack.Screen name="JourneySetup" component={JourneySetupScreen} />
        <Stack.Screen name="Appnavigator" component={AppNavigator} />
        <Stack.Screen name="DateModeSelection" component={DateModeSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;