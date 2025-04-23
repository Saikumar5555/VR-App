// // screens/CartScreen.js
// import React from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// const CartScreen = ({ route, navigation }) => {
//   const { cartItems, setCartItems } = route.params;
  
//   // Remove item from cart
//   const removeItem = (productId) => {
//     setCartItems(cartItems.filter(item => item.id !== productId));
//   };
  
//   // Update item quantity
//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeItem(productId);
//       return;
//     }
    
//     setCartItems(cartItems.map(item => 
//       item.id === productId 
//         ? {...item, quantity: newQuantity} 
//         : item
//     ));
//   };
  
//   // Calculate cart total
//   const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  
//   // Render cart item
//   const renderCartItem = ({ item }) => (
//     <View className="flex-row bg-white rounded-lg p-3 mb-3 shadow-sm">
//       <Image 
//         source={{ uri: item.image }} 
//         className="w-20 h-20 rounded"
//       />
      
//       <View className="flex-1 ml-3">
//         <View className="flex-row justify-between">
//           <Text className="text-gray-800 font-medium">{item.name}</Text>
//           <TouchableOpacity onPress={() => removeItem(item.id)}>
//             <Ionicons name="close-circle" size={20} color="#9CA3AF" />
//           </TouchableOpacity>
//         </View>
        
//         <Text className="text-indigo-600 font-bold mb-2">${item.price.toFixed(2)}</Text>
        
//         <View className="flex-row items-center justify-between">
//           <View className="flex-row items-center">
//             <TouchableOpacity 
//               className="bg-gray-200 w-7 h-7 rounded items-center justify-center"
//               onPress={() => updateQuantity(item.id, item.quantity - 1)}
//             >
//               <Ionicons name="remove" size={16} color="#4B5563" />
//             </TouchableOpacity>
            
//             <Text className="mx-3 font-medium text-gray-800">{item.quantity}</Text>
            
//             <TouchableOpacity 
//               className="bg-gray-200 w-7 h-7 rounded items-center justify-center"
//               onPress={() => updateQuantity(item.id, item.quantity + 1)}
//             >
//               <Ionicons name="add" size={16} color="#4B5563" />
//             </TouchableOpacity>
//           </View>
          
//           <Text className="text-gray-800 font-bold">
//             ${(item.price * item.quantity).toFixed(2)}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
  
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" />
      
//       {/* Cart Items */}
//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id}
//         renderItem={renderCartItem}
//         contentContainerClassName="p-4"
//         ListEmptyComponent={
//           <View className="flex-1 justify-center items-center py-10">
//             <Ionicons name="cart-outline" size={60} color="#D1D5DB" />
//             <Text className="text-gray-400 text-lg mt-4">Your cart is empty</Text>
//             <TouchableOpacity 
//               className="mt-4 bg-indigo-600 px-6 py-2 rounded-lg"
//               onPress={() => navigation.goBack()}
//             >
//               <Text className="text-white font-medium">Continue Shopping</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />
      
//       {/* Order Summary */}
//       {cartItems.length > 0 && (
//         <View className="bg-white p-4 border-t border-gray-200">
//           <Text className="text-lg font-bold text-gray-800 mb-4">Order Summary</Text>
          
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">Subtotal</Text>
//             <Text className="text-gray-800">${cartTotal}</Text>
//           </View>
          
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">Shipping</Text>
//             <Text className="text-gray-800">$5.99</Text>
//           </View>
          
//           <View className="flex-row justify-between mb-4">
//             <Text className="text-gray-600">Tax</Text>
//             <Text className="text-gray-800">${(parseFloat(cartTotal) * 0.1).toFixed(2)}</Text>
//           </View>
          
//           <View className="h-px bg-gray-200 mb-4" />
          
//           <View className="flex-row justify-between mb-4">
//             <Text className="text-lg font-bold text-gray-800">Total</Text>
//             <Text className="text-lg font-bold text-indigo-600">
//               ${(parseFloat(cartTotal) + 5.99 + parseFloat(cartTotal) * 0.1).toFixed(2)}
//             </Text>
//           </View>
          
//           <TouchableOpacity
//             className="bg-indigo-600 py-3 rounded-xl"
//             onPress={() => navigation.navigate('Payment', { cartItems, cartTotal })}
//           >
//             <Text className="text-white font-bold text-center text-lg">Proceed to Checkout</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default CartScreen;


// screens/CartScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = ({ route, navigation }) => {
  const { cartItems, setCartItems } = route.params;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  
  // Remove item from cart
  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === productId 
        ? {...item, quantity: newQuantity} 
        : item
    ));
  };
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  
  // Render cart item
  const renderCartItem = ({ item }) => (
    <View className="flex-row bg-white rounded-lg p-3 mb-3 shadow-sm">
      <Image 
        source={{ uri: item.image }} 
        className="w-20 h-20 rounded"
      />
      
      <View className="flex-1 ml-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-800 font-medium">{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        <Text className="text-indigo-600 font-bold mb-2"> {formatPrice(item.price)}</Text>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity 
              className="bg-gray-200 w-7 h-7 rounded items-center justify-center"
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Ionicons name="remove" size={16} color="#4B5563" />
            </TouchableOpacity>
            
            <Text className="mx-3 font-medium text-gray-800">{item.quantity}</Text>
            
            <TouchableOpacity 
              className="bg-gray-200 w-7 h-7 rounded items-center justify-center"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color="#4B5563" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-gray-800 font-bold">
          {formatPrice(item.price * item.quantity)}

          </Text>
        </View>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <Ionicons name="cart-outline" size={60} color="#D1D5DB" />
            <Text className="text-gray-400 text-lg mt-4">Your cart is empty</Text>
            <TouchableOpacity 
              className="mt-4 bg-indigo-600 px-6 py-2 rounded-lg"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white font-medium">Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      {/* Order Summary */}
      {cartItems.length > 0 && (
        <View className="bg-white p-4 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-800 mb-4">Order Summary</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="text-gray-800">{formatPrice(cartTotal)}</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Shipping</Text>
            <Text className="text-gray-800">{formatPrice(5.99)}</Text>
          </View>
          
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600">Tax</Text>
            <Text className="text-gray-800">{formatPrice(parseFloat(cartTotal) * 0.1)}</Text>
          </View>
          
          <View className="h-px bg-gray-200 mb-4" />
          
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-bold text-gray-800">Total</Text>
            <Text className="text-lg font-bold text-indigo-600">
  {formatPrice(parseFloat(cartTotal) + 5.99 + parseFloat(cartTotal) * 0.1)}
</Text>
          </View>
          
          <TouchableOpacity
            className="bg-indigo-600 py-3 rounded-xl"
            onPress={() => navigation.navigate('Payment', { cartItems, cartTotal })}
          >
          <Text className="text-white font-bold text-center text-lg">
  Proceed to Checkout
</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;