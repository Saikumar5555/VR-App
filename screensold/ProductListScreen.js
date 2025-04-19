import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const foodItems = [
  {
    id: '1',
    name: 'Petha',
    image: 'https://example.com/petha.jpg',
    price: '₹120',
    deliveryTime: '2-3 days',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Tandoori Chicken',
    image: 'https://example.com/tandoori.jpg',
    price: '₹350',
    deliveryTime: '1-2 days',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Dalmoth',
    image: 'https://example.com/dalmoth.jpg',
    price: '₹200',
    deliveryTime: '3-4 days',
    rating: 4.2,
  },
];

const ProductListScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 bg-gray-50 p-4`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-900 ml-4`}>Food Specialties</Text>
      </View>
      
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
            style={tw`bg-white rounded-lg shadow-sm mb-4 overflow-hidden`}
          >
            <Image 
              source={{ uri: item.image }} 
              style={tw`w-full h-48`}
              resizeMode="cover"
            />
            <View style={tw`p-4`}>
              <Text style={tw`text-lg font-bold text-gray-900`}>{item.name}</Text>
              
              <View style={tw`flex-row items-center mt-1`}>
                <Ionicons name="star" size={16} color="#f59e0b" />
                <Text style={tw`text-yellow-600 ml-1`}>{item.rating}</Text>
                <Text style={tw`text-gray-500 ml-2`}>•</Text>
                <MaterialIcons name="delivery-dining" size={16} color="#6b7280" />
                <Text style={tw`text-gray-500 ml-1`}>{item.deliveryTime}</Text>
              </View>
              
              <Text style={tw`text-lg font-bold text-blue-600 mt-2`}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};