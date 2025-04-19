import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const OrderConfirmationScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 bg-gray-50 justify-center items-center p-6`}>
      <View style={tw`bg-white p-8 rounded-xl shadow-sm items-center w-full max-w-md`}>
        <View style={tw`bg-green-100 p-4 rounded-full mb-6`}>
          <Ionicons name="checkmark-done" size={48} color="#10b981" />
        </View>
        
        <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>Order Confirmed!</Text>
        <Text style={tw`text-gray-600 text-center mb-6`}>
          Your order has been placed successfully and will be delivered within 2-3 days.
        </Text>
        
        <View style={tw`bg-blue-50 p-4 rounded-lg w-full mb-6`}>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-600`}>Order ID</Text>
            <Text style={tw`font-semibold`}>#ORD123456</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-600`}>Delivery To</Text>
            <Text style={tw`font-semibold`}>123, Main Street</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-600`}>Total Amount</Text>
            <Text style={tw`font-bold text-blue-600`}>₹490</Text>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={tw`bg-blue-600 py-3 px-6 rounded-full flex-row items-center`}
        >
          <MaterialIcons name="home" size={20} color="white" />
          <Text style={tw`text-white font-bold ml-2`}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};