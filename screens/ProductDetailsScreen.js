// // screens/ProductDetailsScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Sample product descriptions (in a real app, these would come from an API)
// const PRODUCT_DESCRIPTIONS = {
//   'French Cheese Assortment': {
//     description: 'Experience the authentic taste of U.P with our premium cheese assortment. This collection features four distinct varieties of artisanal French cheese, carefully selected for quality and flavor.',
//     details: [
//       'Includes Camembert, Brie, Roquefort, and Comté',
//       'Sourced from traditional French dairies',
//       'Perfect for gatherings or as a special gift',
//       'Vacuum-sealed for freshness'
//     ],
//     origin: 'U.P',
//     delivery: 'Ships internationally with temperature control'
//   },
//   'Premium Matcha Set': {
//     description: 'Our premium matcha set brings the authentic Japanese tea ceremony experience to your home. This high-grade matcha powder is carefully selected from the finest tea leaves in Uji, Japan.',
//     details: [
//       'Includes 30g of ceremonial grade matcha powder',
//       'Traditional bamboo whisk (chasen)',
//       'Handcrafted ceramic bowl (chawan)',
//       'Detailed instruction booklet'
//     ],
//     origin: 'Uji, Japan',
//     delivery: 'Ships worldwide in protective packaging'
//   }
// };

// // Default product description for products without specific descriptions
// const DEFAULT_DESCRIPTION = {
//   description: 'This authentic local product represents the culture and craftsmanship of the region. Each item is carefully selected to provide you with a genuine experience of the local traditions.',
//   details: [
//     'Authentic local product',
//     'Excellent quality and craftsmanship',
//     'Makes a perfect souvenir or gift',
//     'Supports local artisans and businesses'
//   ],
//   origin: 'Local region',
//   delivery: 'International shipping available'
// };

// const ProductDetailsScreen = ({ route, navigation }) => {
//   const { product, addToCart } = route.params;
//   const [quantity, setQuantity] = useState(1);
  
//   // Get product description data
//   const descData = PRODUCT_DESCRIPTIONS[product.name] || DEFAULT_DESCRIPTION;
  
//   // Increase quantity
//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };
  
//   // Decrease quantity
//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
  
//   // Add to cart with selected quantity
//   const handleAddToCart = () => {
//     for (let i = 0; i < quantity; i++) {
//       addToCart(product);
//     }
//     navigation.goBack();
//   };
  
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" />
      
//       <ScrollView className="flex-1">
//         {/* Product Image */}
//         <Image
//           source={{ uri: product.image }}
//           className="w-full h-64"
//         />
        
//         {/* Product Details */}
//         <View className="p-5">
//           <View className="flex-row justify-between items-start mb-2">
//             <Text className="text-2xl font-bold text-gray-800 flex-1">{product.name}</Text>
//             <Text className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</Text>
//           </View>
          
//           <View className="flex-row items-center mb-4">
//             <View className="flex-row">
//               {[1, 2, 3, 4, 5].map(star => (
//                 <Ionicons
//                   key={star}
//                   name={star <= 4 ? "star" : "star-outline"}
//                   size={16}
//                   color="#FFD700"
//                 />
//               ))}
//             </View>
//             <Text className="text-gray-500 ml-2">4.0 (24 reviews)</Text>
//           </View>
          
//           {/* Description */}
//           <View className="mb-6">
//             <Text className="text-base text-gray-700 leading-6 mb-4">{descData.description}</Text>
            
//             <Text className="font-bold text-gray-800 mb-2">Product Details:</Text>
//             {descData.details.map((detail, idx) => (
//               <View key={idx} className="flex-row items-center mb-2">
//                 <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//                 <Text className="text-gray-700">{detail}</Text>
//               </View>
//             ))}
//           </View>
          
//           {/* Additional Info */}
//           <View className="bg-gray-50 rounded-lg p-4 mb-6">
//             <View className="flex-row items-center mb-3">
//               <Ionicons name="location-outline" size={20} color="#4F46E5" />
//               <Text className="text-gray-700 ml-2 font-medium">Origin: {descData.origin}</Text>
//             </View>
//             <View className="flex-row items-center">
//               <Ionicons name="airplane-outline" size={20} color="#4F46E5" />
//               <Text className="text-gray-700 ml-2 font-medium">{descData.delivery}</Text>
//             </View>
//           </View>
          
//           {/* Quantity Selector */}
//           <View className="mb-6">
//             <Text className="font-bold text-gray-800 mb-2">Quantity:</Text>
//             <View className="flex-row items-center">
//               <TouchableOpacity 
//                 className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
//                 onPress={decreaseQuantity}
//               >
//                 <Ionicons name="remove" size={20} color="#4B5563" />
//               </TouchableOpacity>
              
//               <Text className="mx-4 text-xl font-bold text-gray-800">{quantity}</Text>
              
//               <TouchableOpacity 
//                 className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
//                 onPress={increaseQuantity}
//               >
//                 <Ionicons name="add" size={20} color="#4B5563" />
//               </TouchableOpacity>
              
//               <Text className="ml-4 text-gray-500">
//                 Total: ${(product.price * quantity).toFixed(2)}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
      
//       {/* Bottom Action Buttons */}
//       <View className="bg-white p-4 border-t border-gray-200 flex-row">
//         <TouchableOpacity 
//           className="bg-indigo-600 flex-1 py-3 rounded-xl mr-2 flex-row justify-center items-center"
//           onPress={handleAddToCart}
//         >
//           <Ionicons name="cart" size={20} color="white" />
//           <Text className="text-white font-bold ml-2">Add to Cart</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           className="bg-white border-2 border-indigo-600 py-3 px-4 rounded-xl flex-row justify-center items-center"
//           onPress={() => navigation.navigate('Cart')}
//         >
//           <Ionicons name="cart" size={20} color="#4F46E5" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProductDetailsScreen;





// // screens/ProductDetailsScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // Sample product descriptions (in a real app, these would come from an API)
// const PRODUCT_DESCRIPTIONS = {
//   'French Cheese Assortment': {
//     description: 'Experience the authentic taste of U.P with our premium cheese assortment. This collection features four distinct varieties of artisanal French cheese, carefully selected for quality and flavor.',
//     details: [
//       'Includes Camembert, Brie, Roquefort, and Comté',
//       'Sourced from traditional French dairies',
//       'Perfect for gatherings or as a special gift',
//       'Vacuum-sealed for freshness'
//     ],
//     origin: 'U.P',
//     delivery: 'Ships internationally with temperature control'
//   },
//   'Premium Matcha Set': {
//     description: 'Our premium matcha set brings the authentic Japanese tea ceremony experience to your home. This high-grade matcha powder is carefully selected from the finest tea leaves in Uji, Japan.',
//     details: [
//       'Includes 30g of ceremonial grade matcha powder',
//       'Traditional bamboo whisk (chasen)',
//       'Handcrafted ceramic bowl (chawan)',
//       'Detailed instruction booklet'
//     ],
//     origin: 'Uji, Japan',
//     delivery: 'Ships worldwide in protective packaging'
//   }
// };

// // Default product description for products without specific descriptions
// const DEFAULT_DESCRIPTION = {
//   description: 'This authentic local product represents the culture and craftsmanship of the region. Each item is carefully selected to provide you with a genuine experience of the local traditions.',
//   details: [
//     'Authentic local product',
//     'Excellent quality and craftsmanship',
//     'Makes a perfect souvenir or gift',
//     'Supports local artisans and businesses'
//   ],
//   origin: 'Local region',
//   delivery: 'International shipping available'
// };

// const ProductDetailsScreen = ({ route, navigation }) => {
//   const { product, addToCart } = route.params;
//   const [quantity, setQuantity] = useState(1);
  
//   // Get product description data
//   const descData = PRODUCT_DESCRIPTIONS[product.name] || DEFAULT_DESCRIPTION;
  
//   // Increase quantity
//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };
  
//   // Decrease quantity
//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
  
//   // Add to cart with selected quantity
//   const handleAddToCart = () => {
//     for (let i = 0; i < quantity; i++) {
//       addToCart(product);
//     }
//     navigation.goBack();
//   };

//   // Function to speak text
//   const speakText = (text) => {
//     // In a real app, you would implement text-to-speech functionality here
//     // For demonstration purposes, we'll just show an alert or console log
//     console.log(`Speaking: ${text}`);
//     // You would use a library like react-native-tts here:
//     // Speech.speak(text);
//   };
  
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" />
      
//       <ScrollView className="flex-1">
//         {/* Product Image */}
//         <Image
//           source={{ uri: product.image }}
//           className="w-full h-64"
//         />
        
//         {/* Product Details */}
//         <View className="p-5">
//           <View className="flex-row justify-between items-start mb-2">
//             <View className="flex-row items-center flex-1">
//               <Text className="text-2xl font-bold text-gray-800">{product.name}</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakText(product.name)}
//                 accessibilityLabel={`Listen to product name: ${product.name}`}
//               >
//                 <Ionicons name="volume-medium" size={20} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>
//             <View className="flex-row items-center">
//               <Text className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakText(`${product.price.toFixed(2)} dollars`)}
//                 accessibilityLabel="Listen to price"
//               >
//                 <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           <View className="flex-row items-center mb-4">
//             <View className="flex-row">
//               {[1, 2, 3, 4, 5].map(star => (
//                 <Ionicons
//                   key={star}
//                   name={star <= 4 ? "star" : "star-outline"}
//                   size={16}
//                   color="#FFD700"
//                 />
//               ))}
//             </View>
//             <Text className="text-gray-500 ml-2">4.0 (24 reviews)</Text>
//           </View>
          
//           {/* Description */}
//           <View className="mb-6">
//             <View className="flex-row items-center mb-4">
//               <Text className="text-base text-gray-700 leading-6 flex-1">{descData.description}</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakText(descData.description)}
//                 accessibilityLabel="Listen to product description"
//               >
//                 <Ionicons name="volume-medium" size={20} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>
            
//             <View className="flex-row items-center mb-2">
//               <Text className="font-bold text-gray-800">Product Details:</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakText("Product Details")}
//                 accessibilityLabel="Listen to section header"
//               >
//                 <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>
            
//             {descData.details.map((detail, idx) => (
//               <View key={idx} className="flex-row items-center mb-2">
//                 <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
//                 <Text className="text-gray-700 flex-1">{detail}</Text>
//                 <TouchableOpacity 
//                   onPress={() => speakText(detail)}
//                   accessibilityLabel={`Listen to detail: ${detail}`}
//                 >
//                   <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
          
//           {/* Additional Info */}
//           <View className="bg-gray-50 rounded-lg p-4 mb-6">
//             <View className="flex-row items-center mb-3">
//               <Ionicons name="location-outline" size={20} color="#4F46E5" />
//               <Text className="text-gray-700 ml-2 font-medium">Origin: {descData.origin}</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakText(`Origin: ${descData.origin}`)}
//                 accessibilityLabel="Listen to origin information"
//               >
//                 <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>
//             <View className="flex-row items-center">
//               <Ionicons name="airplane-outline" size={20} color="#4F46E5" />
//               <Text className="text-gray-700 ml-2 font-medium">{descData.delivery}</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakText(descData.delivery)}
//                 accessibilityLabel="Listen to delivery information"
//               >
//                 <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           {/* Quantity Selector */}
//           <View className="mb-6">
//             <View className="flex-row items-center mb-2">
//               <Text className="font-bold text-gray-800">Quantity:</Text>
//               <TouchableOpacity 
//                 className="ml-2"
//                 onPress={() => speakText("Quantity")}
//                 accessibilityLabel="Listen to section header"
//               >
//                 <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>
//             <View className="flex-row items-center">
//               <TouchableOpacity 
//                 className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
//                 onPress={decreaseQuantity}
//               >
//                 <Ionicons name="remove" size={20} color="#4B5563" />
//               </TouchableOpacity>
              
//               <Text className="mx-4 text-xl font-bold text-gray-800">{quantity}</Text>
              
//               <TouchableOpacity 
//                 className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
//                 onPress={increaseQuantity}
//               >
//                 <Ionicons name="add" size={20} color="#4B5563" />
//               </TouchableOpacity>
              
//               <View className="flex-row items-center ml-4">
//                 <Text className="text-gray-500">
//                   Total: ${(product.price * quantity).toFixed(2)}
//                 </Text>
//                 <TouchableOpacity 
//                   className="ml-2"
//                   onPress={() => speakText(`Total: ${(product.price * quantity).toFixed(2)} dollars`)}
//                   accessibilityLabel="Listen to total price"
//                 >
//                   <Ionicons name="volume-medium" size={16} color="#4F46E5" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
      
//       {/* Bottom Action Buttons */}
//       <View className="bg-white p-4 border-t border-gray-200 flex-row">
//         <TouchableOpacity 
//           className="bg-indigo-600 flex-1 py-3 rounded-xl mr-2 flex-row justify-center items-center"
//           onPress={handleAddToCart}
//         >
//           <Ionicons name="cart" size={20} color="white" />
//           <Text className="text-white font-bold ml-2">Add to Cart</Text>
//           <TouchableOpacity 
//             className="ml-2"
//             onPress={() => speakText("Add to Cart")}
//             accessibilityLabel="Listen to button text"
//           >
//             <Ionicons name="volume-medium" size={16} color="white" />
//           </TouchableOpacity>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           className="bg-white border-2 border-indigo-600 py-3 px-4 rounded-xl flex-row justify-center items-center"
//           onPress={() => navigation.navigate('Cart')}
//         >
//           <Ionicons name="cart" size={20} color="#4F46E5" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProductDetailsScreen;



import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Sample product descriptions (in a real app, these would come from an API)
const PRODUCT_DESCRIPTIONS = {
  'Petha Sweet Box': {
    description: 'Agra\'s famous sweet made from ash gourd, available in different flavors. A must-try delicacy that has been part of Agra\'s culinary tradition for centuries.',
    details: [
      'Contains 12 pieces of assorted petha',
      'Available in plain, kesar, and paan flavors',
      'Packaged in traditional gift box',
      'Stays fresh for 2 weeks'
    ],
    origin: 'Agra, Uttar Pradesh',
    delivery: 'Free shipping across India'
  },
  'Samosa Chaat': {
    description: 'Crispy samosas topped with tangy chutneys, yogurt, and spices. A popular North Indian street food that offers an explosion of flavors in every bite.',
    details: [
      '2 large potato-stuffed samosas',
      'Includes tamarind and mint chutneys',
      'Garnished with sev and onions',
      'Served with spicy green chutney'
    ],
    origin: 'Delhi NCR',
    delivery: 'Available for local delivery only'
  },
  'Taj Mahal Miniature': {
    description: 'Exquisite miniature replica of the iconic Taj Mahal, perfect as a souvenir or home decor item. Handcrafted by local artisans using marble dust.',
    details: [
      'Height: 6 inches',
      'Made with marble powder',
      'Intricate detailing',
      'Includes wooden display base'
    ],
    origin: 'Agra, Uttar Pradesh',
    delivery: 'Ships worldwide in protective packaging'
  },
  'Handcrafted Keychain': {
    description: 'Beautiful handmade keychain featuring traditional Indian motifs. Each piece is unique and supports local artisans.',
    details: [
      'Made with brass and enamel',
      'Traditional peacock design',
      'Approx. 2 inches in length',
      'Comes in gift packaging'
    ],
    origin: 'Jaipur, Rajasthan',
    delivery: 'Free shipping in India'
  },
  'Chikan Embroidered Kurta': {
    description: 'Authentic Chikan embroidery kurta from Lucknow. This traditional hand-embroidery technique is recognized as a Geographical Indication.',
    details: [
      '100% cotton fabric',
      'Hand-stitched embroidery',
      'Available in multiple sizes',
      'Delicate wash care'
    ],
    origin: 'Lucknow, Uttar Pradesh',
    delivery: 'Free shipping with 7-day returns'
  }
};

// Default product description for products without specific descriptions
const DEFAULT_DESCRIPTION = {
  description: 'This authentic Indian product represents the rich culture and craftsmanship of our country. Each item is carefully made by local artisans using traditional techniques.',
  details: [
    'Handmade by skilled artisans',
    'Uses traditional methods',
    'Supports local communities',
    'Makes a perfect gift'
  ],
  origin: 'Various regions of India',
  delivery: 'Shipping available across India'
};

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product, addToCart } = route.params;
  const [quantity, setQuantity] = useState(1);
  
  // Get product description data
  const descData = PRODUCT_DESCRIPTIONS[product.name] || DEFAULT_DESCRIPTION;
  
  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Add to cart with selected quantity
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigation.goBack();
  };

  // Function to speak text
  const speakText = (text) => {
    console.log(`Speaking: ${text}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1">
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          className="w-full h-64"
        />
        
        {/* Product Details */}
        <View className="p-5">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-row items-center flex-1">
              <Text className="text-2xl font-bold text-gray-800">{product.name}</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakText(product.name)}
                accessibilityLabel={`Listen to product name: ${product.name}`}
              >
                <Ionicons name="volume-medium" size={20} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-indigo-600">  {formatPrice(product.price)}</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakText(`${product.price} rupees`)}
                accessibilityLabel="Listen to price"
              >

                <Ionicons name="volume-medium" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-row items-center mb-4">
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map(star => (
                <Ionicons
                  key={star}
                  name={star <= 4 ? "star" : "star-outline"}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text className="text-gray-500 ml-2">4.0 (24 reviews)</Text>
          </View>
          
          {/* Description */}
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <Text className="text-base text-gray-700 leading-6 flex-1">{descData.description}</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakText(descData.description)}
                accessibilityLabel="Listen to product description"
              >
                <Ionicons name="volume-medium" size={20} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            
            <View className="flex-row items-center mb-2">
              <Text className="font-bold text-gray-800">Product Details:</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakText("Product Details")}
                accessibilityLabel="Listen to section header"
              >
                <Ionicons name="volume-medium" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            
            {descData.details.map((detail, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <View className="w-2 h-2 rounded-full bg-indigo-600 mr-2" />
                <Text className="text-gray-700 flex-1">{detail}</Text>
                <TouchableOpacity 
                  onPress={() => speakText(detail)}
                  accessibilityLabel={`Listen to detail: ${detail}`}
                >
                  <Ionicons name="volume-medium" size={16} color="#4F46E5" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
          {/* Additional Info */}
          <View className="bg-gray-50 rounded-lg p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="location-outline" size={20} color="#4F46E5" />
              <Text className="text-gray-700 ml-2 font-medium">Origin: {descData.origin}</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakText(`Origin: ${descData.origin}`)}
                accessibilityLabel="Listen to origin information"
              >
                <Ionicons name="volume-medium" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="airplane-outline" size={20} color="#4F46E5" />
              <Text className="text-gray-700 ml-2 font-medium">{descData.delivery}</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakText(descData.delivery)}
                accessibilityLabel="Listen to delivery information"
              >
                <Ionicons name="volume-medium" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Quantity Selector */}
          <View className="mb-6">
            <View className="flex-row items-center mb-2">
              <Text className="font-bold text-gray-800">Quantity:</Text>
              <TouchableOpacity 
                className="ml-2"
                onPress={() => speakText("Quantity")}
                accessibilityLabel="Listen to section header"
              >
                <Ionicons name="volume-medium" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center">
              <TouchableOpacity 
                className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
                onPress={decreaseQuantity}
              >
                <Ionicons name="remove" size={20} color="#4B5563" />
              </TouchableOpacity>
              
              <Text className="mx-4 text-xl font-bold text-gray-800">{quantity}</Text>
              
              <TouchableOpacity 
                className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center"
                onPress={increaseQuantity}
              >
                <Ionicons name="add" size={20} color="#4B5563" />
              </TouchableOpacity>
              
              <View className="flex-row items-center ml-4">
                 <Text className="text-gray-500">
                  Total: {formatPrice(product.price * quantity)}
                </Text>

                <TouchableOpacity 
                  className="ml-2"
                  onPress={() => speakText(`Total: ${(product.price * quantity).toFixed(2)} dollars`)}
                  accessibilityLabel="Listen to total price"
                >
                  <Ionicons name="volume-medium" size={16} color="#4F46E5" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Buttons */}
      <View className="bg-white p-4 border-t border-gray-200 flex-row">
        <TouchableOpacity 
          className="bg-indigo-600 flex-1 py-3 rounded-xl mr-2 flex-row justify-center items-center"
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Add to Cart</Text>
          <TouchableOpacity 
            className="ml-2"
            onPress={() => speakText("Add to Cart")}
            accessibilityLabel="Listen to button text"
          >
            <Ionicons name="volume-medium" size={16} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white border-2 border-indigo-600 py-3 px-4 rounded-xl flex-row justify-center items-center"
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;