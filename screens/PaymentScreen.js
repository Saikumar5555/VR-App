// // screens/PaymentScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// const PaymentScreen = ({ route, navigation }) => {
//   const { cartItems, cartTotal } = route.params;
  
//   // Form state
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: '',
//     cardholderName: '',
//     expiryDate: '',
//     cvv: '',
//     address: '',
//     city: '',
//     zipCode: ''
//   });
  
//   // Loading state for payment processing
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   // Update form fields
//   const updateField = (field, value) => {
//     setPaymentInfo({
//       ...paymentInfo,
//       [field]: value
//     });
//   };
  
//   // Validate form
//   const isFormValid = () => {
//     return (
//       paymentInfo.cardNumber.length >= 16 &&
//       paymentInfo.cardholderName.trim() !== '' &&
//       paymentInfo.expiryDate.length >= 5 &&
//       paymentInfo.cvv.length >= 3 &&
//       paymentInfo.address.trim() !== '' &&
//       paymentInfo.city.trim() !== '' &&
//       paymentInfo.zipCode.trim() !== ''
//     );
//   };
  
//   // Process payment
//   const processPayment = () => {
//     if (!isFormValid()) {
//       return;
//     }
    
//     setIsProcessing(true);
    
//     // Simulate payment processing
//     setTimeout(() => {
//       setIsProcessing(false);
//       navigation.navigate('OrderConfirmation', { 
//         orderNumber: Math.floor(100000 + Math.random() * 900000).toString(), 
//         totalAmount: (parseFloat(cartTotal) + 5.99 + parseFloat(cartTotal) * 0.1).toFixed(2)
//       });
//     }, 2000);
//   };
  
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" />
      
//       <ScrollView className="flex-1 p-4">
//         <Text className="text-2xl font-bold text-gray-800 mb-6">Payment Details</Text>
        
//         {/* Order Summary */}
//         <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
//           <Text className="text-lg font-bold text-gray-800 mb-2">Order Summary</Text>
//           <View className="flex-row justify-between mb-1">
//             <Text className="text-gray-600">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</Text>
//             <Text className="text-gray-800">${cartTotal}</Text>
//           </View>
//           <View className="flex-row justify-between mb-1">
//             <Text className="text-gray-600">Shipping</Text>
//             <Text className="text-gray-800">$5.99</Text>
//           </View>
//           <View className="flex-row justify-between mb-1">
//             <Text className="text-gray-600">Tax</Text>
//             <Text className="text-gray-800">${(parseFloat(cartTotal) * 0.1).toFixed(2)}</Text>
//           </View>
//           <View className="h-px bg-gray-200 my-2" />
//           <View className="flex-row justify-between">
//             <Text className="font-bold text-gray-800">Total</Text>
//             <Text className="font-bold text-indigo-600">
//               ${(parseFloat(cartTotal) + 5.99 + parseFloat(cartTotal) * 0.1).toFixed(2)}
//             </Text>
//           </View>
//         </View>
        
//         {/* Payment Method */}
//         <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
//           <Text className="text-lg font-bold text-gray-800 mb-4">Payment Method</Text>
          
//           <View className="mb-4">
//             <Text className="text-gray-700 mb-1">Card Number</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-3 text-gray-800"
//               placeholder="1234 5678 9012 3456"
//               value={paymentInfo.cardNumber}
//               onChangeText={(text) => updateField('cardNumber', text.replace(/\D/g, ''))}
//               keyboardType="number-pad"
//               maxLength={16}
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-700 mb-1">Cardholder Name</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-3 text-gray-800"
//               placeholder="John Smith"
//               value={paymentInfo.cardholderName}
//               onChangeText={(text) => updateField('cardholderName', text)}
//             />
//           </View>
          
//           <View className="flex-row mb-4">
//             <View className="flex-1 mr-2">
//               <Text className="text-gray-700 mb-1">Expiry Date</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg p-3 text-gray-800"
//                 placeholder="MM/YY"
//                 value={paymentInfo.expiryDate}
//                 onChangeText={(text) => updateField('expiryDate', text)}
//                 maxLength={5}
//               />
//             </View>
            
//             <View className="flex-1 ml-2">
//               <Text className="text-gray-700 mb-1">CVV</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg p-3 text-gray-800"
//                 placeholder="123"
//                 value={paymentInfo.cvv}
//                 onChangeText={(text) => updateField('cvv', text.replace(/\D/g, ''))}
//                 keyboardType="number-pad"
//                 maxLength={4}
//                 secureTextEntry
//               />
//             </View>
//           </View>
//         </View>
        
//         {/* Shipping Address */}
//         <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
//           <Text className="text-lg font-bold text-gray-800 mb-4">Shipping Address</Text>
          
//           <View className="mb-4">
//             <Text className="text-gray-700 mb-1">Address</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-3 text-gray-800"
//               placeholder="123 Main St"
//               value={paymentInfo.address}
//               onChangeText={(text) => updateField('address', text)}
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-700 mb-1">City</Text>
//             <TextInput
//               className="border border-gray-300 rounded-lg p-3 text-gray-800"
//               placeholder="Redfort"
//               value={paymentInfo.city}
//               onChangeText={(text) => updateField('city', text)}
//             />
//           </View>
          
//           <View className="flex-row mb-4">
//             <View className="flex-1 mr-2">
//               <Text className="text-gray-700 mb-1">Zip Code</Text>
//               <TextInput
//                 className="border border-gray-300 rounded-lg p-3 text-gray-800"
//                 placeholder="10001"
//                 value={paymentInfo.zipCode}
//                 onChangeText={(text) => updateField('zipCode', text)}
//                 keyboardType="number-pad"
//               />
//             </View>
            
//             <View className="flex-1 ml-2">
//               <Text className="text-gray-700 mb-1">Country</Text>
//               <View className="border border-gray-300 rounded-lg p-3 bg-gray-100">
//                 <Text className="text-gray-800">United States</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
      
//       {/* Bottom Action Button */}
//       <View className="bg-white p-4 border-t border-gray-200">
//         <TouchableOpacity
//           className={`py-3 rounded-xl flex-row justify-center items-center ${
//             isFormValid() ? 'bg-indigo-600' : 'bg-gray-400'
//           }`}
//           onPress={processPayment}
//           disabled={!isFormValid() || isProcessing}
//         >
//           {isProcessing ? (
//             <ActivityIndicator color="white" className="mr-2" />
//           ) : (
//             <Ionicons name="card" size={20} color="white" className="mr-2" />
//           )}
//           <Text className="text-white font-bold text-center text-lg">
//             {isProcessing ? 'Processing...' : 'Complete Payment'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PaymentScreen;



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = ({ route, navigation }) => {
  const { cartItems, cartTotal } = route.params;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  // Loading state for payment processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Update form fields
  const updateField = (field, value) => {
    setPaymentInfo({
      ...paymentInfo,
      [field]: value
    });
  };
  
  // Process payment - modified to always succeed
  const processPayment = () => {
    setIsProcessing(true);
  
    // Simulate payment processing (no validation checks)
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1000); // Reduced delay for faster response
  };

  const continueShopping = () => {
    navigation.navigate("Marketplace"); // this must match exactly with your Stack.Screen name
  };
  

  if (paymentSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" />
        
        <View className="flex-1 items-center justify-center p-4">
          <View className="bg-white p-8 rounded-lg shadow-sm items-center w-full max-w-md">
            <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center mb-4">
              <Ionicons name="checkmark" size={32} color="white" />
            </View>
            <Text className="text-green-600 font-bold text-xl mb-2">Payment Successful!</Text>
            <Text className="text-gray-600 text-center mb-6">
              Your order has been placed successfully. Thank you for shopping with us!
            </Text>
            
            <TouchableOpacity
              className="py-3 px-6 bg-indigo-600 rounded-xl"
              onPress={continueShopping}
            >
              <Text className="text-white font-bold text-center text-lg">
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Payment Details</Text>
        
        {/* Order Summary */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Order Summary</Text>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</Text>
            <Text className="text-gray-800">{formatPrice(cartTotal)}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Shipping</Text>
            <Text className="text-gray-800">{formatPrice(5.99)}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Tax</Text>
            <Text className="text-gray-800">{formatPrice(parseFloat(cartTotal) * 0.1)}</Text>
          </View>
          <View className="h-px bg-gray-200 my-2" />
          <View className="flex-row justify-between">
            <Text className="font-bold text-gray-800">Total</Text>
            <Text className="text-lg font-bold text-indigo-600">
              {formatPrice(parseFloat(cartTotal) + 5.99 + parseFloat(cartTotal) * 0.1)}
            </Text>
          </View>
        </View>
        
        {/* Payment Method */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Payment Method</Text>
          
          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Card Number</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber}
              onChangeText={(text) => updateField('cardNumber', text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={16}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Cardholder Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="Rahul Sharma"
              value={paymentInfo.cardholderName}
              onChangeText={(text) => updateField('cardholderName', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-gray-700 mb-1">Expiry Date</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChangeText={(text) => updateField('expiryDate', text)}
                maxLength={5}
              />
            </View>
            
            <View className="flex-1 ml-2">
              <Text className="text-gray-700 mb-1">CVV</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                placeholder="123"
                value={paymentInfo.cvv}
                onChangeText={(text) => updateField('cvv', text.replace(/\D/g, ''))}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>
        
        {/* Shipping Address */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Shipping Address</Text>
          
          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="A-12, Green Park Apartments"
              value={paymentInfo.address}
              onChangeText={(text) => updateField('address', text)}
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-700 mb-1">City</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800"
              placeholder="Mumbai"
              value={paymentInfo.city}
              onChangeText={(text) => updateField('city', text)}
            />
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-gray-700 mb-1">Zip Code</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                placeholder="400001"
                value={paymentInfo.zipCode}
                onChangeText={(text) => updateField('zipCode', text)}
                keyboardType="number-pad"
              />
            </View>
            
            <View className="flex-1 ml-2">
              <Text className="text-gray-700 mb-1">Country</Text>
              <View className="border border-gray-300 rounded-lg p-3 bg-gray-100">
                <Text className="text-gray-800">India</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Button */}
      <View className="bg-white p-4 border-t border-gray-200">
        <TouchableOpacity
          className="py-3 rounded-xl flex-row justify-center items-center bg-indigo-600"
          onPress={processPayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" className="mr-2" />
          ) : (
            <Ionicons name="card" size={20} color="white" className="mr-2" />
          )}
          <Text className="text-white font-bold text-center text-lg">
            {isProcessing
              ? 'Processing...'
              : `Pay ${formatPrice(parseFloat(cartTotal) + 5.99 + parseFloat(cartTotal) * 0.1)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;