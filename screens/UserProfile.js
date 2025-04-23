// // screens/UserProfile.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// const UserProfile = ({ navigation }) => {
//   // Sample user data - in a real app, this would come from authentication/storage
//   const [userData, setUserData] = useState({
//     name: 'Alex Johnson',
//     email: 'alex.johnson@example.com',
//     avatar: null, // In a real app, this would be a require() or URI
//     memberSince: 'January 2023',
//     completedJourneys: 8,
//     travelPoints: 1250,
//   });

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" />
      
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#4F46E5" />
//         </TouchableOpacity>
//         <Text className="text-xl font-bold text-gray-800">My Profile</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
//           <Ionicons name="settings-outline" size={24} color="#4F46E5" />
//         </TouchableOpacity>
//       </View>
      
//       <ScrollView className="flex-1">
//         {/* User Info Card */}
//         <View className="items-center px-6 py-8 bg-indigo-50">
//           <View className="bg-white w-24 h-24 rounded-full shadow-md items-center justify-center mb-4">
//             {userData.avatar ? (
//               <Image source={userData.avatar} className="w-24 h-24 rounded-full" />
//             ) : (
//               <Ionicons name="person" size={48} color="#4F46E5" />
//             )}
//           </View>
//           <Text className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</Text>
//           <Text className="text-gray-600 mb-4">{userData.email}</Text>
//           <Text className="text-indigo-600">Member since {userData.memberSince}</Text>
//         </View>
        
//         {/* Stats Section */}
//         <View className="flex-row justify-between px-6 py-6 bg-white">
//           <View className="items-center">
//             <Text className="text-2xl font-bold text-indigo-600">{userData.completedJourneys}</Text>
//             <Text className="text-gray-600">Journeys</Text>
//           </View>
//           <View className="items-center">
//             <Text className="text-2xl font-bold text-indigo-600">{userData.travelPoints}</Text>
//             <Text className="text-gray-600">Travel Points</Text>
//           </View>
//           <View className="items-center">
//             <Text className="text-2xl font-bold text-indigo-600">3</Text>
//             <Text className="text-gray-600">Badges</Text>
//           </View>
//         </View>
        
//         {/* Menu Items */}
//         <View className="px-6 py-4">
//           {[
//             { icon: 'time-outline', title: 'Journey History', screen: 'JourneyHistory' },
//             { icon: 'heart-outline', title: 'Saved Destinations', screen: 'SavedDestinations' },
//             { icon: 'card-outline', title: 'Payment Methods', screen: 'PaymentMethods' },
//             { icon: 'notifications-outline', title: 'Notifications', screen: 'NotificationSettings' },
//             { icon: 'help-circle-outline', title: 'Help & Support', screen: 'HelpSupport' },
//             { icon: 'log-out-outline', title: 'Sign Out', action: 'signOut' }
//           ].map((item, index) => (
//             <TouchableOpacity 
//               key={index}
//               className="flex-row items-center py-4 border-b border-gray-100"
//               onPress={() => {
//                 if (item.action === 'signOut') {
//                   // Handle sign out
//                   console.log('Signing out...');
//                   // In a real app, you would clear authentication state here
//                   // Then navigate to SignIn screen
//                   navigation.navigate('SignIn');
//                 } else {
//                   navigation.navigate(item.screen);
//                 }
//               }}
//             >
//               <Ionicons name={item.icon} size={24} color="#4F46E5" className="mr-4" />
//               <Text className="flex-1 text-gray-800 text-lg">{item.title}</Text>
//               <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
//             </TouchableOpacity>
//           ))}
//         </View>
        
//         {/* App Info */}
//         <View className="items-center py-8">
//           <Text className="text-gray-400">ExploreEase v1.0.0</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default UserProfile;