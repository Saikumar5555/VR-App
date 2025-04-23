// // screens/DestinationSearchScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Sample destination data with local image references
// const DESTINATIONS = [
//   {
//     id: '1',
//     name: 'Agra, U.P',
//     description: 'City of Lights with iconic Eiffel Tower and rich history',
//     image: require('../assets/images/Agra.jpg'),
//     category: 'Cultural'
//   },
//   {
//     id: '2',
//     name: ''Goldentemple, Punjab'',
//     description: 'Modern metropolis with traditional temples and gardens',
//     image: require('../assets/images/Goldentemple.jpg'),
//     category: 'Urban'
//   },
//   {
//     id: '3',
//     name: 'charminar, Telangana',
//     description: 'Romantic canal city with stunning architecture',
//     image: require('../assets/images/charminar.jpg'),
//     category: 'Cultural'
//   },
//   {
//     id: '4',
//     name: 'Indiagate, New Delhi',
//     description: 'Tropical paradise with beaches and spiritual temples',
//     image: require('../assets/images/Indiagate.jpg'),
//     category: 'Beach'
//   },
//   {
//     id: '5',
//     name: 'Red Fort, New Delhi',
//     description: 'The Big Apple with iconic skyline and Central Park',
//     image: require('../assets/images/Redfort.jpg'),
//     category: 'Urban'
//   },
//   {
//     id: '6',
//     name: 'Grand Canyon, USA',
//     description: 'Spectacular natural wonder with breathtaking views',
//     image: require('../assets/images/grandcanyon.jpg'),
//     category: 'Nature'
//   },
//   {
//     id: '7',
//     name: 'Cairo, Egypt',
//     description: 'Ancient civilization with pyramids and rich history',
//     image: require('../assets/images/cairo.jpg'),
//     category: 'Historical'
//   },
//   {
//     id: '8',
//     name: 'Sydney, Australia',
//     description: 'Harbor city with iconic Opera House and beautiful beaches',
//     image: require('../assets/images/sydney.jpg'),
//     category: 'Urban'
//   }
// ];

// // Categories for filtering
// const CATEGORIES = ['All', 'Cultural', 'Urban', 'Beach', 'Nature', 'Historical'];

// const DestinationSearchScreen = ({ navigation }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   // Filter destinations based on search query and selected category
//   const filteredDestinations = DESTINATIONS.filter(dest => {
//     const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           dest.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const renderDestinationItem = ({ item }) => (
//     <TouchableOpacity 
//       className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm"
//       onPress={() => navigation.navigate('DestinationPreview', { destination: item })}
//     >
//       <Image 
//         source={item.image}
//         className="w-full h-40"
//         resizeMode="cover"
//       />
//       <View className="p-4">
//         <View className="flex-row justify-between items-center mb-2">
//           <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
//           <View className="bg-indigo-100 px-2 py-1 rounded">
//             <Text className="text-xs text-indigo-700">{item.category}</Text>
//           </View>
//         </View>
//         <Text className="text-gray-600">{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" />
      
//       {/* Search Bar */}
//       <View className="px-4 py-3 bg-white border-b border-gray-200">
//         <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
//           <Ionicons name="search" size={20} color="#6B7280" />
//           <TextInput
//             className="flex-1 ml-2 text-gray-800"
//             placeholder="Search destinations..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Ionicons name="close-circle" size={20} color="#6B7280" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
      
//       {/* Categories */}
//       <View className="py-3 px-4">
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={CATEGORIES}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               className={`px-4 py-2 mr-2 rounded-full ${
//                 selectedCategory === item ? 'bg-indigo-600' : 'bg-gray-200'
//               }`}
//               onPress={() => setSelectedCategory(item)}
//             >
//               <Text
//                 className={`font-medium ${
//                   selectedCategory === item ? 'text-white' : 'text-gray-800'
//                 }`}
//               >
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
      
//       {/* Destination List */}
//       <FlatList
//         data={filteredDestinations}
//         keyExtractor={(item) => item.id}
//         renderItem={renderDestinationItem}
//         contentContainerClassName="px-4 py-2"
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View className="flex-1 justify-center items-center py-10">
//             <Ionicons name="search-outline" size={48} color="#D1D5DB" />
//             <Text className="text-gray-400 mt-3 text-center">
//               No destinations found. Try different search terms.
//             </Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default DestinationSearchScreen;


// screens/DestinationSearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Sample destination data with local image references
const DESTINATIONS = [
  {
    id: '1',
    name: 'Agra, U.P',
    description: 'City of Love',
    image: require('../assets/images/Agra.jpg'),
    category: 'Historical'
  },
  {
    id: '2',
    name: 'Goldentemple, Punjab',
    description: 'City of Spirituality',
    image: require('../assets/images/Goldentemple.jpg'),
    category: 'Cultural'
  },
  {
    id: '3',
    name: 'charminar, Telangana',
    description: 'City of Pearls',
    image: require('../assets/images/charminar.jpg'),
    category: 'Historical'
  },
  {
    id: '4',
    name: 'Indiagate, New Delhi',
    description: 'City of Remembrance',
    image: require('../assets/images/Indiagate.jpg'),
    category: 'Historical'
  },
  {
    id: '5',
    name: 'Red Fort, New Delhi',
    description: 'City of Kings',
    image: require('../assets/images/Redfort.jpg'),
    category: 'Cultural'
  },
  // {
  //   id: '6',
  //   name: 'Grand Canyon, USA',
  //   description: 'Spectacular natural wonder with breathtaking views',
  //   image: require('../assets/images/grandcanyon.jpg'),
  //   category: 'Nature'
  // },
  // {
  //   id: '7',
  //   name: 'Cairo, Egypt',
  //   description: 'Ancient civilization with pyramids and rich history',
  //   image: require('../assets/images/cairo.jpg'),
  //   category: 'Historical'
  // },
  // {
  //   id: '8',
  //   name: 'Sydney, Australia',
  //   description: 'Harbor city with iconic Opera House and beautiful beaches',
  //   image: require('../assets/images/sydney.jpg'),
  //   category: 'Urban'
  // }
];

// Categories for filtering
const CATEGORIES = ['All',  'Historical','Cultural', 'Urban', 'Beach', 'Nature',];

const DestinationSearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter destinations based on search query and selected category
  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity 
      className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm"
      onPress={() => navigation.navigate('DestinationPreview', { destination: item })}
    >
      <Image 
        source={item.image}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <View className="bg-indigo-100 px-2 py-1 rounded">
            <Text className="text-xs text-indigo-700">{item.category}</Text>
          </View>
        </View>
        <Text className="text-gray-600">{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Search Bar */}
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Search destinations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Categories */}
      <View className="py-3 px-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedCategory === item ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === item ? 'text-white' : 'text-gray-800'
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {/* Destination List */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        renderItem={renderDestinationItem}
        contentContainerClassName="px-4 py-2"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3 text-center">
              No destinations found. Try different search terms.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default DestinationSearchScreen;