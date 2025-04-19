import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const DeliveryPaymentScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = React.useState('upi');
  const address = "123, Main Street, Agra, Uttar Pradesh - 282001";

  return (
    <ScrollView style={tw`flex-1 bg-gray-50 p-4`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-900 ml-4`}>Delivery & Payment</Text>
      </View>
      
      {/* Delivery Address */}
      <View style={tw`bg-white p-4 rounded-lg shadow-sm mb-6`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`text-lg font-semibold`}>Delivery Address</Text>
          <TouchableOpacity>
            <Text style={tw`text-blue-600`}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row`}>
          <Ionicons name="location" size={20} color="#6b7280" style={tw`mt-1`} />
          <Text style={tw`text-gray-700 ml-2 flex-1`}>{address}</Text>
        </View>
      </View>
      
      {/* Payment Methods */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold mb-3`}>Payment Method</Text>
        
        <TouchableOpacity 
          onPress={() => setPaymentMethod('upi')}
          style={tw`flex-row items-center p-4 bg-white rounded-lg shadow-sm mb-3 ${paymentMethod === 'upi' ? 'border-2 border-blue-500' : ''}`}
        >
          <MaterialCommunityIcons name="bank-transfer" size={24} color="#3b82f6" />
          <Text style={tw`ml-3 font-semibold flex-1`}>UPI Payment</Text>
          {paymentMethod === 'upi' && <Ionicons name="checkmark-circle" size={24} color="#10b981" />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setPaymentMethod('card')}
          style={tw`flex-row items-center p-4 bg-white rounded-lg shadow-sm mb-3 ${paymentMethod === 'card' ? 'border-2 border-blue-500' : ''}`}
        >
          <FontAwesome name="credit-card" size={24} color="#6b7280" />
          <Text style={tw`ml-3 font-semibold flex-1`}>Credit/Debit Card</Text>
          {paymentMethod === 'card' && <Ionicons name="checkmark-circle" size={24} color="#10b981" />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setPaymentMethod('cod')}
          style={tw`flex-row items-center p-4 bg-white rounded-lg shadow-sm ${paymentMethod === 'cod' ? 'border-2 border-blue-500' : ''}`}
        >
          <MaterialIcons name="money" size={24} color="#6b7280" />
          <Text style={tw`ml-3 font-semibold flex-1`}>Cash on Delivery</Text>
          {paymentMethod === 'cod' && <Ionicons name="checkmark-circle" size={24} color="#10b981" />}
        </TouchableOpacity>
      </View>
      
      {/* Order Summary */}
      <View style={tw`bg-white p-4 rounded-lg shadow-sm mb-6`}>
        <Text style={tw`text-lg font-semibold mb-3`}>Order Summary</Text>
        <View style={tw`flex-row justify-between py-2`}>
          <Text style={tw`text-gray-600`}>Subtotal</Text>
          <Text style={tw`font-semibold`}>₹440</Text>
        </View>
        <View style={tw`flex-row justify-between py-2`}>
          <Text style={tw`text-gray-600`}>Delivery Fee</Text>
          <Text style={tw`font-semibold`}>₹50</Text>
        </View>
        <View style={tw`border-t border-gray-200 my-2`} />
        <View style={tw`flex-row justify-between py-2`}>
          <Text style={tw`text-lg font-bold`}>Total</Text>
          <Text style={tw`text-lg font-bold text-blue-600`}>₹490</Text>
        </View>
      </View>
      
      {/* Pay Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderConfirmation')}
        style={tw`bg-blue-600 py-4 rounded-full mb-6 flex-row justify-center items-center`}
      >
        <MaterialIcons name="payment" size={24} color="white" />
        <Text style={tw`text-white font-bold text-lg ml-2`}>Pay ₹490</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};