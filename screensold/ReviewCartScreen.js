import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const cartItems = [
  {
    id: '1',
    name: 'Petha',
    price: '₹120',
    quantity: 2,
    total: '₹240',
  },
  {
    id: '2',
    name: 'Dalmoth',
    price: '₹200',
    quantity: 1,
    total: '₹200',
  },
];

const ReviewCartScreen = ({ navigation }) => {
  const subtotal = 440;
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  return (
    <View style={tw`flex-1 bg-gray-50 p-4`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-900 ml-4`}>Review Cart</Text>
      </View>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`bg-white p-4 rounded-lg shadow-sm mb-3`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
              <Text style={tw`text-lg font-bold text-blue-600`}>{item.total}</Text>
            </View>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`text-gray-500`}>{item.price} × {item.quantity}</Text>
              <View style={tw`flex-row`}>
                <TouchableOpacity style={tw`p-1`}>
                  <Ionicons name="remove-circle" size={20} color="#ef4444" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`p-1 ml-2`}>
                  <Ionicons name="add-circle" size={20} color="#10b981" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      
      <View style={tw`mt-4 bg-white p-4 rounded-lg shadow-sm`}>
        <View style={tw`flex-row justify-between py-2`}>
          <Text style={tw`text-gray-600`}>Subtotal</Text>
          <Text style={tw`font-semibold`}>₹{subtotal}</Text>
        </View>
        <View style={tw`flex-row justify-between py-2`}>
          <Text style={tw`text-gray-600`}>Delivery Fee</Text>
          <Text style={tw`font-semibold`}>₹{deliveryFee}</Text>
        </View>
        <View style={tw`border-t border-gray-200 my-2`} />
        <View style={tw`flex-row justify-between py-2`}>
          <Text style={tw`text-lg font-bold`}>Total</Text>
          <Text style={tw`text-lg font-bold text-blue-600`}>₹{total}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('DeliveryPayment')}
        style={tw`bg-blue-600 py-4 rounded-full mt-6 flex-row justify-center items-center`}
      >
        <Text style={tw`text-white font-bold text-lg`}>Proceed to Payment</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" style={tw`ml-2`} />
      </TouchableOpacity>
    </View>
  );
};