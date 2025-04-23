// // screens/MarketplaceScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Sample marketplace data
// const MARKETPLACE_DATA = {
//   'Agra, U.P': {
//     name: 'Agra Local Market',
//     categories: [
//       { id: 'food', name: 'French Cuisine', icon: 'restaurant' },
//       { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
//       { id: 'fashion', name: 'Fashion', icon: 'shirt' },
//       { id: 'art', name: 'Art & Crafts', icon: 'color-palette' }
//     ],
//     products: {
//       food: [
//         { id: 'f1', name: 'French Cheese Assortment', price: 24.99, image: 'https://source.unsplash.com/featured/?cheese,french' },
//         { id: 'f2', name: 'Fresh Baked Baguette', price: 3.50, image: 'https://source.unsplash.com/featured/?baguette,bread' },
//         { id: 'f3', name: 'Chocolate Croissants (4)', price: 12.99, image: 'https://source.unsplash.com/featured/?croissant,chocolate' },
//         { id: 'f4', name: 'Bordeaux Red Wine', price: 29.99, image: 'https://source.unsplash.com/featured/?wine,bordeaux' }
//       ],
//       souvenirs: [
//         { id: 's1', name: 'Eiffel Tower Figurine', price: 15.99, image: 'https://source.unsplash.com/featured/?eiffel,souvenir' },
//         { id: 's2', name: 'Agra Photograph Set', price: 19.99, image: 'https://source.unsplash.com/featured/?Agra,photograph' },
//         { id: 's3', name: 'French Lavender Sachet', price: 8.99, image: 'https://source.unsplash.com/featured/?lavender,sachet' }
//       ],
//       fashion: [
//         { id: 'fa1', name: 'Agraian Beret', price: 22.50, image: 'https://source.unsplash.com/featured/?beret,hat' },
//         { id: 'fa2', name: 'Silk Neck Scarf', price: 34.99, image: 'https://source.unsplash.com/featured/?scarf,silk' }
//       ],
//       art: [
//         { id: 'a1', name: 'Montmartre Watercolor', price: 45.00, image: 'https://source.unsplash.com/featured/?watercolor,Agra' },
//         { id: 'a2', name: 'Seine River Canvas Print', price: 60.00, image: 'https://source.unsplash.com/featured/?seine,canvas' }
//       ]
//     }
//   },
//   ''Goldentemple, Punjab'': {
//     name: 'Goldentemple Local Market',
//     categories: [
//       { id: 'food', name: 'Japanese Cuisine', icon: 'restaurant' },
//       { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
//       { id: 'tech', name: 'Tech Gadgets', icon: 'hardware-chip' },
//       { id: 'traditional', name: 'Traditional Items', icon: 'brush' }
//     ],
//     products: {
//       food: [
//         { id: 'f1', name: 'Premium Matcha Set', price: 29.99, image: 'https://source.unsplash.com/featured/?matcha,tea' },
//         { id: 'f2', name: 'Assorted Mochi Box', price: 18.50, image: 'https://source.unsplash.com/featured/?mochi,japanese' },
//         { id: 'f3', name: 'Sake Tasting Set', price: 42.99, image: 'https://source.unsplash.com/featured/?sake,japanese' }
//       ],
//       souvenirs: [
//         { id: 's1', name: 'Goldentemple Tower Keychain', price: 7.99, image: 'https://source.unsplash.com/featured/?keychain,Goldentemple' },
//         { id: 's2', name: 'Japanese Maneki Neko', price: 15.99, image: 'https://source.unsplash.com/featured/?maneki,neko' }
//       ],
//       tech: [
//         { id: 't1', name: 'Mini Karaoke Microphone', price: 45.00, image: 'https://source.unsplash.com/featured/?microphone,karaoke' },
//         { id: 't2', name: 'Anime Themed Earbuds', price: 35.00, image: 'https://source.unsplash.com/featured/?earbuds,anime' }
//       ],
//       traditional: [
//         { id: 'tr1', name: 'Folding Paper Fan', price: 12.50, image: 'https://source.unsplash.com/featured/?fan,japanese' },
//         { id: 'tr2', name: 'Calligraphy Brush Set', price: 28.99, image: 'https://source.unsplash.com/featured/?calligraphy,japanese' }
//       ]
//     }
//   }
// };

// // Default marketplace data for destinations without specific data
// const DEFAULT_MARKETPLACE = {
//   name: 'Local Market',
//   categories: [
//     { id: 'food', name: 'Local Cuisine', icon: 'restaurant' },
//     { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
//     { id: 'crafts', name: 'Local Crafts', icon: 'brush' },
//     { id: 'specialty', name: 'Specialty Items', icon: 'star' }
//   ],
//   products: {
//     food: [
//       { id: 'f1', name: 'Local Delicacy Sampler', price: 22.99, image: 'https://source.unsplash.com/featured/?food,local' },
//       { id: 'f2', name: 'Regional Spice Set', price: 15.50, image: 'https://source.unsplash.com/featured/?spices,cooking' }
//     ],
//     souvenirs: [
//       { id: 's1', name: 'Handcrafted Magnet', price: 5.99, image: 'https://source.unsplash.com/featured/?magnet,souvenir' },
//       { id: 's2', name: 'Destination Postcard Set', price: 10.99, image: 'https://source.unsplash.com/featured/?postcard,travel' }
//     ],
//     crafts: [
//       { id: 'c1', name: 'Artisan Woven Basket', price: 29.99, image: 'https://source.unsplash.com/featured/?basket,woven' },
//       { id: 'c2', name: 'Hand-painted Ornament', price: 18.50, image: 'https://source.unsplash.com/featured/?ornament,painted' }
//     ],
//     specialty: [
//       { id: 'sp1', name: 'Local Musical Instrument', price: 45.00, image: 'https://source.unsplash.com/featured/?instrument,traditional' },
//       { id: 'sp2', name: 'Regional Textile', price: 35.00, image: 'https://source.unsplash.com/featured/?textile,traditional' }
//     ]
//   }
// };

// const MarketplaceScreen = ({ route, navigation }) => {
//   const { destination } = route.params;
//   const destName = typeof destination === 'string' ? destination : destination.name;
  
//   // Get marketplace data for the destination
//   const marketData = MARKETPLACE_DATA[destName] || DEFAULT_MARKETPLACE;
  
//   // State variables
//   const [selectedCategory, setSelectedCategory] = useState(marketData.categories[0].id);
//   const [cartItems, setCartItems] = useState([]);
  
//   // Add item to cart
//   const addToCart = (product) => {
//     const existingItem = cartItems.find(item => item.id === product.id);
    
//     if (existingItem) {
//       // Increase quantity if already in cart
//       setCartItems(cartItems.map(item => 
//         item.id === product.id 
//           ? {...item, quantity: item.quantity + 1} 
//           : item
//       ));
//     } else {
//       // Add new item to cart
//       setCartItems([...cartItems, {...product, quantity: 1}]);
//     }
//   };
  
//   // Calculate total items in cart
//   const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
//   // Calculate cart total price
//   const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  
//   // Render product item
//   const renderProductItem = ({ item }) => (
//     <TouchableOpacity 
//       className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
//       onPress={() => navigation.navigate('ProductDetails', { product: item, addToCart })}
//     >
//       <Image
//         source={{ uri: item.image }}
//         className="w-full h-32"
//       />
//       <View className="p-3">
//         <Text className="text-gray-800 font-medium mb-1">{item.name}</Text>
//         <View className="flex-row justify-between items-center">
//           <Text className="text-indigo-600 font-bold">${item.price.toFixed(2)}</Text>
//           <TouchableOpacity 
//             className="bg-indigo-600 p-2 rounded-full"
//             onPress={() => addToCart(item)}
//           >
//             <Ionicons name="add" size={16} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
  
//   // Render Category Item
//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity
//       className={`mr-3 px-4 py-2 rounded-full border flex-row items-center ${
//         selectedCategory === item.id 
//           ? 'bg-indigo-600 border-indigo-600' 
//           : 'bg-white border-gray-300'
//       }`}
//       onPress={() => setSelectedCategory(item.id)}
//     >
//       <Ionicons 
//         name={item.icon} 
//         size={16} 
//         color={selectedCategory === item.id ? 'white' : '#4F46E5'} 
//         style={{ marginRight: 4 }}
//       />
//       <Text className={`font-medium ${
//         selectedCategory === item.id ? 'text-white' : 'text-gray-700'
//       }`}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );
  
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" />
      
//       {/* Top Bar */}
//       <View className="bg-white p-4 border-b border-gray-200">
//         <View className="flex-row justify-between items-center">
//           <View>
//             <Text className="text-gray-500">You're shopping at</Text>
//             <Text className="text-xl font-bold text-gray-800">{marketData.name}</Text>
//           </View>
          
//           <TouchableOpacity 
//             className="relative"
//             onPress={() => navigation.navigate('Cart', { cartItems, setCartItems })}
//           >
//             <Ionicons name="cart" size={28} color="#4F46E5" />
//             {totalCartItems > 0 && (
//               <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 justify-center items-center">
//                 <Text className="text-white text-xs font-bold">{totalCartItems}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
      
//       {/* Categories Horizontal Scroll */}
//       <View className="py-3 px-4">
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={marketData.categories}
//           keyExtractor={(item) => item.id}
//           renderItem={renderCategoryItem}
//         />
//       </View>
      
//       {/* Product Grid */}
//       <FlatList
//         data={marketData.products[selectedCategory] || []}
//         keyExtractor={(item) => item.id}
//         renderItem={renderProductItem}
//         contentContainerClassName="px-4 py-2"
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View className="flex-1 justify-center items-center py-10">
//             <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
//             <Text className="text-gray-400 mt-3">No products found in this category</Text>
//           </View>
//         }
//       />
      
//       {/* Cart Summary Footer - only visible when cart has items */}
//       {totalCartItems > 0 && (
//         <View className="bg-white p-4 border-t border-gray-200">
//           <TouchableOpacity
//             className="bg-indigo-600 py-3 rounded-xl flex-row justify-between items-center px-4"
//             onPress={() => navigation.navigate('Cart', { cartItems, setCartItems })}
//           >
//             <View className="flex-row items-center">
//               <Ionicons name="cart" size={20} color="white" />
//               <Text className="text-white font-bold ml-2">{totalCartItems} {totalCartItems === 1 ? 'item' : 'items'}</Text>
//             </View>
//             <Text className="text-white font-bold">Checkout ${cartTotal}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default MarketplaceScreen;




// // screens/MarketplaceScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Sample marketplace data
// const MARKETPLACE_DATA = {
//   'Agra, U.P': {
//     name: 'Agra Local Market',
//     categories: [
//       { id: 'food', name: 'French Cuisine', icon: 'restaurant' },
//       { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
//       { id: 'fashion', name: 'Fashion', icon: 'shirt' },
//       { id: 'art', name: 'Art & Crafts', icon: 'color-palette' }
//     ],
//     products: {
//       food: [
//         { id: 'f1', name: 'French Cheese Assortment', price: 24.99, image: 'https://source.unsplash.com/featured/?cheese,french' },
//         { id: 'f2', name: 'Fresh Baked Baguette', price: 3.50, image: 'https://source.unsplash.com/featured/?baguette,bread' },
//         { id: 'f3', name: 'Chocolate Croissants (4)', price: 12.99, image: 'https://source.unsplash.com/featured/?croissant,chocolate' },
//         { id: 'f4', name: 'Bordeaux Red Wine', price: 29.99, image: 'https://source.unsplash.com/featured/?wine,bordeaux' }
//       ],
//       souvenirs: [
//         { id: 's1', name: 'Eiffel Tower Figurine', price: 15.99, image: 'https://source.unsplash.com/featured/?eiffel,souvenir' },
//         { id: 's2', name: 'Agra Photograph Set', price: 19.99, image: 'https://source.unsplash.com/featured/?Agra,photograph' },
//         { id: 's3', name: 'French Lavender Sachet', price: 8.99, image: 'https://source.unsplash.com/featured/?lavender,sachet' }
//       ],
//       fashion: [
//         { id: 'fa1', name: 'Agraian Beret', price: 22.50, image: 'https://source.unsplash.com/featured/?beret,hat' },
//         { id: 'fa2', name: 'Silk Neck Scarf', price: 34.99, image: 'https://source.unsplash.com/featured/?scarf,silk' }
//       ],
//       art: [
//         { id: 'a1', name: 'Montmartre Watercolor', price: 45.00, image: 'https://source.unsplash.com/featured/?watercolor,Agra' },
//         { id: 'a2', name: 'Seine River Canvas Print', price: 60.00, image: 'https://source.unsplash.com/featured/?seine,canvas' }
//       ]
//     }
//   },
//   'Goldentemple, Punjab': {
//     name: 'Goldentemple Local Market',
//     categories: [
//       { id: 'food', name: 'Japanese Cuisine', icon: 'restaurant' },
//       { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
//       { id: 'tech', name: 'Tech Gadgets', icon: 'hardware-chip' },
//       { id: 'traditional', name: 'Traditional Items', icon: 'brush' }
//     ],
//     products: {
//       food: [
//         { id: 'f1', name: 'Premium Matcha Set', price: 29.99, image: 'https://source.unsplash.com/featured/?matcha,tea' },
//         { id: 'f2', name: 'Assorted Mochi Box', price: 18.50, image: 'https://source.unsplash.com/featured/?mochi,japanese' },
//         { id: 'f3', name: 'Sake Tasting Set', price: 42.99, image: 'https://source.unsplash.com/featured/?sake,japanese' }
//       ],
//       souvenirs: [
//         { id: 's1', name: 'Goldentemple Tower Keychain', price: 7.99, image: 'https://source.unsplash.com/featured/?keychain,Goldentemple' },
//         { id: 's2', name: 'Japanese Maneki Neko', price: 15.99, image: 'https://source.unsplash.com/featured/?maneki,neko' }
//       ],
//       tech: [
//         { id: 't1', name: 'Mini Karaoke Microphone', price: 45.00, image: 'https://source.unsplash.com/featured/?microphone,karaoke' },
//         { id: 't2', name: 'Anime Themed Earbuds', price: 35.00, image: 'https://source.unsplash.com/featured/?earbuds,anime' }
//       ],
//       traditional: [
//         { id: 'tr1', name: 'Folding Paper Fan', price: 12.50, image: 'https://source.unsplash.com/featured/?fan,japanese' },
//         { id: 'tr2', name: 'Calligraphy Brush Set', price: 28.99, image: 'https://source.unsplash.com/featured/?calligraphy,japanese' }
//       ]
//     }
//   }
// };

// // Default marketplace data for destinations without specific data
// const DEFAULT_MARKETPLACE = {
//   name: 'Local Market',
//   categories: [
//     { id: 'food', name: 'Local Cuisine', icon: 'restaurant' },
//     { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
//     { id: 'crafts', name: 'Local Crafts', icon: 'brush' },
//     { id: 'specialty', name: 'Specialty Items', icon: 'star' }
//   ],
//   products: {
//     food: [
//       { id: 'f1', name: 'Local Delicacy Sampler', price: 22.99, image: 'https://source.unsplash.com/featured/?food,local' },
//       { id: 'f2', name: 'Regional Spice Set', price: 15.50, image: 'https://source.unsplash.com/featured/?spices,cooking' }
//     ],
//     souvenirs: [
//       { id: 's1', name: 'Handcrafted Magnet', price: 5.99, image: 'https://source.unsplash.com/featured/?magnet,souvenir' },
//       { id: 's2', name: 'Destination Postcard Set', price: 10.99, image: 'https://source.unsplash.com/featured/?postcard,travel' }
//     ],
//     crafts: [
//       { id: 'c1', name: 'Artisan Woven Basket', price: 29.99, image: 'https://source.unsplash.com/featured/?basket,woven' },
//       { id: 'c2', name: 'Hand-painted Ornament', price: 18.50, image: 'https://source.unsplash.com/featured/?ornament,painted' }
//     ],
//     specialty: [
//       { id: 'sp1', name: 'Local Musical Instrument', price: 45.00, image: 'https://source.unsplash.com/featured/?instrument,traditional' },
//       { id: 'sp2', name: 'Regional Textile', price: 35.00, image: 'https://source.unsplash.com/featured/?textile,traditional' }
//     ]
//   }
// };

// const MarketplaceScreen = ({ route, navigation }) => {
//   const { destination } = route.params;
//   const destName = typeof destination === 'string' ? destination : destination.name;
  
//   // Get marketplace data for the destination
//   const marketData = MARKETPLACE_DATA[destName] || DEFAULT_MARKETPLACE;
  
//   // State variables
//   const [selectedCategory, setSelectedCategory] = useState(marketData.categories[0].id);
//   const [cartItems, setCartItems] = useState([]);
  
//   // Add item to cart
//   const addToCart = (product) => {
//     const existingItem = cartItems.find(item => item.id === product.id);
    
//     if (existingItem) {
//       // Increase quantity if already in cart
//       setCartItems(cartItems.map(item => 
//         item.id === product.id 
//           ? {...item, quantity: item.quantity + 1} 
//           : item
//       ));
//     } else {
//       // Add new item to cart
//       setCartItems([...cartItems, {...product, quantity: 1}]);
//     }
//   };

//   // Function to speak product name
//   const speakProductName = (productName) => {
//     // In a real app, you would implement text-to-speech functionality here
//     // For demonstration purposes, we'll just show an alert or console log
//     console.log(`Speaking: ${productName}`);
//     // You would use a library like react-native-tts here:
//     // Speech.speak(productName);
//   };
  
//   // Calculate total items in cart
//   const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
//   // Calculate cart total price
//   const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  
//   // Updated renderProductItem function with improved UI
// const renderProductItem = ({ item }) => (
//   <TouchableOpacity 
//     className="bg-white rounded-xl shadow mb-4 overflow-hidden w-full"
//     onPress={() => navigation.navigate('ProductDetails', { product: item, addToCart })}
//   >
//     <Image
//       source={{ uri: item.image }}
//       className="w-full h-48" // Taller images for better product visibility
//       resizeMode="cover"
//     />
//     <View className="p-4">
//       <Text className="text-gray-800 font-semibold text-base mb-1" numberOfLines={2}>
//         {item.name}
//       </Text>
      
//       <Text className="text-indigo-600 text-lg font-bold mb-2">
//         ${item.price.toFixed(2)}
//       </Text>
      
//       <View className="flex-row justify-between items-center">
//         <TouchableOpacity 
//           className="flex-row items-center py-2 px-3 bg-gray-100 rounded-full"
//           onPress={() => speakProductName(item.name)}
//           accessibilityLabel={`Listen to product name: ${item.name}`}
//         >
//           <Ionicons name="volume-medium" size={18} color="#4F46E5" />
//           <Text className="text-indigo-600 ml-1">Listen</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           className="bg-indigo-600 py-2 px-4 rounded-full flex-row items-center"
//           onPress={() => addToCart(item)}
//         >
//           <Ionicons name="cart" size={18} color="white" />
//           <Text className="text-white font-medium ml-1">Add</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </TouchableOpacity>
// );

// // And update the FlatList to use a single column for better readability
// <FlatList
//   data={marketData.products[selectedCategory] || []}
//   keyExtractor={(item) => item.id}
//   renderItem={renderProductItem}
//   contentContainerClassName="px-4 py-2"
//   numColumns={1} // Changed from 2 to 1 for full-width items
//   showsVerticalScrollIndicator={false}
//   ListEmptyComponent={
//     <View className="flex-1 justify-center items-center py-10">
//       <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
//       <Text className="text-gray-400 mt-3">No products found in this category</Text>
//     </View>
//   }
// />
  
//   // Render Category Item
//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity
//       className={`mr-3 px-4 py-2 rounded-full border flex-row items-center ${
//         selectedCategory === item.id 
//           ? 'bg-indigo-600 border-indigo-600' 
//           : 'bg-white border-gray-300'
//       }`}
//       onPress={() => setSelectedCategory(item.id)}
//     >
//       <Ionicons 
//         name={item.icon} 
//         size={16} 
//         color={selectedCategory === item.id ? 'white' : '#4F46E5'} 
//         style={{ marginRight: 4 }}
//       />
//       <Text className={`font-medium ${
//         selectedCategory === item.id ? 'text-white' : 'text-gray-700'
//       }`}>
//         {item.name}
//       </Text>
//       <TouchableOpacity 
//         className="ml-2"
//         onPress={() => speakProductName(item.name)}
//         accessibilityLabel={`Listen to category name: ${item.name}`}
//       >
//         <Ionicons 
//           name="volume-medium" 
//           size={14} 
//           color={selectedCategory === item.id ? 'white' : '#4F46E5'} 
//         />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
  
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" />
      
//       {/* Top Bar */}
//       <View className="bg-white p-4 border-b border-gray-200">
//         <View className="flex-row justify-between items-center">
//           <View className="flex-row items-center">
//             <Text className="text-gray-500">You're shopping at</Text>
//             <TouchableOpacity 
//               className="ml-2"
//               onPress={() => speakProductName(marketData.name)}
//               accessibilityLabel={`Listen to market name: ${marketData.name}`}
//             >
//               <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//             </TouchableOpacity>
//           </View>
          
//           <TouchableOpacity 
//             className="relative"
//             onPress={() => navigation.navigate('Cart', { cartItems, setCartItems })}
//           >
//             <Ionicons name="cart" size={28} color="#4F46E5" />
//             {totalCartItems > 0 && (
//               <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 justify-center items-center">
//                 <Text className="text-white text-xs font-bold">{totalCartItems}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//         <Text className="text-xl font-bold text-gray-800">{marketData.name}</Text>
//       </View>
      
//       {/* Categories Horizontal Scroll */}
//       <View className="py-3 px-4">
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={marketData.categories}
//           keyExtractor={(item) => item.id}
//           renderItem={renderCategoryItem}
//         />
//       </View>
      
//       {/* Product Grid */}
//       <FlatList
//         data={marketData.products[selectedCategory] || []}
//         keyExtractor={(item) => item.id}
//         renderItem={renderProductItem}
//         contentContainerClassName="px-4 py-2"
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View className="flex-1 justify-center items-center py-10">
//             <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
//             <Text className="text-gray-400 mt-3">No products found in this category</Text>
//           </View>
//         }
//       />
      
//       {/* Cart Summary Footer - only visible when cart has items */}
//       {totalCartItems > 0 && (
//         <View className="bg-white p-4 border-t border-gray-200">
//           <TouchableOpacity
//             className="bg-indigo-600 py-3 rounded-xl flex-row justify-between items-center px-4"
//             onPress={() => navigation.navigate('Cart', { cartItems, setCartItems })}
//           >
//             <View className="flex-row items-center">
//               <Ionicons name="cart" size={20} color="white" />
//               <Text className="text-white font-bold ml-2">{totalCartItems} {totalCartItems === 1 ? 'item' : 'items'}</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakProductName(`${totalCartItems} items for ${cartTotal} dollars`)}
//                 accessibilityLabel="Listen to cart summary"
//               >
//                 <Ionicons name="volume-medium" size={16} color="white" />
//               </TouchableOpacity>
//             </View>
//             <Text className="text-white font-bold">Checkout ${cartTotal}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default MarketplaceScreen; 



import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Sample marketplace data
const MARKETPLACE_DATA = {
  'Agra, U.P': {
    name: 'Agra Local Market',
    categories: [
      { id: 'food', name: 'Street Food', icon: 'restaurant' },
      { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
      { id: 'clothing', name: 'Clothing', icon: 'shirt' },
      { id: 'handicrafts', name: 'Handicrafts', icon: 'color-palette' }
    ],
    products: {
      food: [
        { id: 'f1', name: 'Petha Sweet Box', price: 200, image: 'https://source.unsplash.com/featured/?petha,sweet' },
        { id: 'f2', name: 'Samosa Chaat', price: 50, image: 'https://source.unsplash.com/featured/?samosa,chaat' },
        { id: 'f3', name: 'Kachori with Chutney', price: 40, image: 'https://source.unsplash.com/featured/?kachori,indian' },
        { id: 'f4', name: 'Lassi (Sweet/Salty)', price: 60, image: 'https://source.unsplash.com/featured/?lassi,drink' }
      ],
      souvenirs: [
        { id: 's1', name: 'Taj Mahal Miniature', price: 350, image: 'https://source.unsplash.com/featured/?tajmahal,miniature' },
        { id: 's2', name: 'Marble Inlay Jewelry Box', price: 1200, image: 'https://source.unsplash.com/featured/?marble,jewelrybox' },
        { id: 's3', name: 'Agra Postcard Set', price: 150, image: 'https://source.unsplash.com/featured/?postcard,agra' }
      ],
      clothing: [
        { id: 'fa1', name: 'Chikan Embroidered Kurta', price: 1200, image: 'https://source.unsplash.com/featured/?chikankurta' },
        { id: 'fa2', name: 'Banarasi Silk Dupatta', price: 1800, image: 'https://source.unsplash.com/featured/?banarasi,dupatta' }
      ],
      handicrafts: [
        { id: 'a1', name: 'Marble Inlay Tabletops', price: 4500, image: 'https://source.unsplash.com/featured/?marble,inlay' },
        { id: 'a2', name: 'Handmade Leather Juttis', price: 800, image: 'https://source.unsplash.com/featured/?juttis,footwear' }
      ]
    }
  },
  'Tokyo, Japan': {
    name: 'Tokyo Local Market',
    categories: [
      { id: 'food', name: 'Japanese Cuisine', icon: 'restaurant' },
      { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
      { id: 'tech', name: 'Tech Gadgets', icon: 'hardware-chip' },
      { id: 'traditional', name: 'Traditional Items', icon: 'brush' }
    ],
    products: {
      food: [
        { id: 'f1', name: 'Premium Matcha Set', price: 29.99, image: 'https://source.unsplash.com/featured/?matcha,tea' },
        { id: 'f2', name: 'Assorted Mochi Box', price: 18.50, image: 'https://source.unsplash.com/featured/?mochi,japanese' },
        { id: 'f3', name: 'Sake Tasting Set', price: 42.99, image: 'https://source.unsplash.com/featured/?sake,japanese' }
      ],
      souvenirs: [
        { id: 's1', name: 'Tokyo Tower Keychain', price: 7.99, image: 'https://source.unsplash.com/featured/?keychain,tokyo' },
        { id: 's2', name: 'Japanese Maneki Neko', price: 15.99, image: 'https://source.unsplash.com/featured/?maneki,neko' }
      ],
      tech: [
        { id: 't1', name: 'Mini Karaoke Microphone', price: 45.00, image: 'https://source.unsplash.com/featured/?microphone,karaoke' },
        { id: 't2', name: 'Anime Themed Earbuds', price: 35.00, image: 'https://source.unsplash.com/featured/?earbuds,anime' }
      ],
      traditional: [
        { id: 'tr1', name: 'Folding Paper Fan', price: 12.50, image: 'https://source.unsplash.com/featured/?fan,japanese' },
        { id: 'tr2', name: 'Calligraphy Brush Set', price: 28.99, image: 'https://source.unsplash.com/featured/?calligraphy,japanese' }
      ]
    }
  }
};

// Default marketplace data for destinations without specific data
const DEFAULT_MARKETPLACE = {
  name: 'Local Indian Market',
  categories: [
    { id: 'food', name: 'Local Cuisine', icon: 'restaurant' },
    { id: 'souvenirs', name: 'Souvenirs', icon: 'gift' },
    { id: 'handicrafts', name: 'Handicrafts', icon: 'brush' },
    { id: 'spices', name: 'Spices', icon: 'flame' }
  ],
  products: {
    food: [
      { id: 'f1', name: 'Samosas (6 pieces)', price: 60, image: 'https://source.unsplash.com/featured/?samosa' },
      { id: 'f2', name: 'Mithai Assortment', price: 200, image: 'https://source.unsplash.com/featured/?mithai' }
    ],
    souvenirs: [
      { id: 's1', name: 'Handcrafted Keychain', price: 50, image: 'https://source.unsplash.com/featured/?keychain,handmade' },
      { id: 's2', name: 'Miniature Monument', price: 150, image: 'https://source.unsplash.com/featured/?miniature,monument' }
    ],
    handicrafts: [
      { id: 'c1', name: 'Wooden Carved Elephant', price: 800, image: 'https://source.unsplash.com/featured/?wooden,elephant' },
      { id: 'c2', name: 'Terracotta Pot', price: 300, image: 'https://source.unsplash.com/featured/?terracotta,pot' }
    ],
    spices: [
      { id: 'sp1', name: 'Garam Masala Pack', price: 120, image: 'https://source.unsplash.com/featured/?garammasala' },
      { id: 'sp2', name: 'Assorted Spice Box', price: 250, image: 'https://source.unsplash.com/featured/?spices,indian' }
    ]
  }
};

const MarketplaceScreen = ({ route, navigation }) => {
  const destination = route?.params?.destination ?? null;
  const destName = typeof destination === 'string' ? destination : destination?.name ?? 'Default';
  
  
  // Get marketplace data for the destination
  const marketData = MARKETPLACE_DATA[destName] || DEFAULT_MARKETPLACE;
  
  // State variables
  const [selectedCategory, setSelectedCategory] = useState(marketData.categories[0].id);
  const [cartItems, setCartItems] = useState([]);
  
  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity if already in cart
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      ));
    } else {
      // Add new item to cart
      setCartItems([...cartItems, {...product, quantity: 1}]);
    }
  };

  // Function to speak product name
  const speakProductName = (productName) => {
    // In a real app, you would implement text-to-speech functionality here
    // For demonstration purposes, we'll just show an alert or console log
    console.log(`Speaking: ${productName}`);
    // You would use a library like react-native-tts here:
    // Speech.speak(productName);
  };
  
  // Calculate total items in cart
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate cart total price
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Updated renderProductItem function with improved UI
const renderProductItem = ({ item }) => (
  <TouchableOpacity 
    className="bg-white rounded-xl shadow mb-4 overflow-hidden w-full"
    onPress={() => navigation.navigate('ProductDetails', { product: item, addToCart })}
  >
    <Image
      source={{ uri: item.image }}
      className="w-full h-48" // Taller images for better product visibility
      resizeMode="cover"
    />
    <View className="p-4">
      <Text className="text-gray-800 font-semibold text-base mb-1" numberOfLines={2}>
        {item.name}
      </Text>
      
      <Text className="text-indigo-600 text-lg font-bold mb-2">
      {formatPrice(item.price)}
      </Text>
      
      <View className="flex-row justify-between items-center">
        <TouchableOpacity 
          className="flex-row items-center py-2 px-3 bg-gray-100 rounded-full"
          onPress={() => speakProductName(item.name)}
          accessibilityLabel={`Listen to product name: ${item.name}`}
        >
          <Ionicons name="volume-medium" size={18} color="#4F46E5" />
          <Text className="text-indigo-600 ml-1">Listen</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-indigo-600 py-2 px-4 rounded-full flex-row items-center"
          onPress={() => addToCart(item)}
        >
          <Ionicons name="cart" size={18} color="white" />
          <Text className="text-white font-medium ml-1">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

// And update the FlatList to use a single column for better readability
<FlatList
  data={marketData.products[selectedCategory] || []}
  keyExtractor={(item) => item.id}
  renderItem={renderProductItem}
  contentContainerClassName="px-4 py-2"
  numColumns={1} // Changed from 2 to 1 for full-width items
  showsVerticalScrollIndicator={false}
  ListEmptyComponent={
    <View className="flex-1 justify-center items-center py-10">
      <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
      <Text className="text-gray-400 mt-3">No products found in this category</Text>
    </View>
  }
/>
  
  // Render Category Item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      className={`mr-3 px-4 py-2 rounded-full border flex-row items-center ${
        selectedCategory === item.id 
          ? 'bg-indigo-600 border-indigo-600' 
          : 'bg-white border-gray-300'
      }`}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons 
        name={item.icon} 
        size={16} 
        color={selectedCategory === item.id ? 'white' : '#4F46E5'} 
        style={{ marginRight: 4 }}
      />
      <Text className={`font-medium ${
        selectedCategory === item.id ? 'text-white' : 'text-gray-700'
      }`}>
        {item.name}
      </Text>
      <TouchableOpacity 
        className="ml-2"
        onPress={() => speakProductName(item.name)}
        accessibilityLabel={`Listen to category name: ${item.name}`}
      >
        <Ionicons 
          name="volume-medium" 
          size={14} 
          color={selectedCategory === item.id ? 'white' : '#4F46E5'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Top Bar */}
      <View className="bg-white p-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-gray-500">You're shopping at</Text>
            <TouchableOpacity 
              className="ml-2"
              onPress={() => speakProductName(marketData.name)}
              accessibilityLabel={`Listen to market name: ${marketData.name}`}
            >
              <Ionicons name="volume-medium" size={16} color="#4F46E5" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            className="relative"
            onPress={() => navigation.navigate('Cart', { cartItems, setCartItems })}
          >
            <Ionicons name="cart" size={28} color="#4F46E5" />
            {totalCartItems > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 justify-center items-center">
                <Text className="text-white text-xs font-bold">{totalCartItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-bold text-gray-800">{marketData.name}</Text>
      </View>
      
      {/* Categories Horizontal Scroll */}
      <View className="py-3 px-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={marketData.categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
        />
      </View>
      
      {/* Product Grid */}
      <FlatList
        data={marketData.products[selectedCategory] || []}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerClassName="px-4 py-2"
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-3">No products found in this category</Text>
          </View>
        }
      />
      
      {/* Cart Summary Footer - only visible when cart has items */}
      {totalCartItems > 0 && (
        <View className="bg-white p-4 border-t border-gray-200">
          <TouchableOpacity
            className="bg-indigo-600 py-3 rounded-xl flex-row justify-between items-center px-4"
            onPress={() => navigation.navigate('Cart', { cartItems, setCartItems })}
          >
            <View className="flex-row items-center">
              <Ionicons name="cart" size={20} color="white" />
              <Text className="text-white font-bold ml-2">{totalCartItems} {totalCartItems === 1 ? 'item' : 'items'}</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakProductName(`${totalCartItems} items for ${formatPrice(cartTotal)}`)}
                accessibilityLabel="Listen to cart summary"
              >
                <Ionicons name="volume-medium" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-white font-bold">Checkout{formatPrice(cartTotal)}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MarketplaceScreen; 