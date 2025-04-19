import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = React.useState(1);

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <Image 
        source={{ uri: product.image }} 
        style={tw`w-full h-64`}
        resizeMode="cover"
      />
      
      <View style={tw`p-6`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>{product.name}</Text>
        
        <View style={tw`flex-row items-center mt-2`}>
          <Ionicons name="star" size={20} color="#f59e0b" />
          <Text style={tw`text-yellow-600 ml-1`}>{product.rating}</Text>
          <Text style={tw`text-gray-500 ml-3`}>•</Text>
          <MaterialIcons name="delivery-dining" size={20} color="#6b7280" />
          <Text style={tw`text-gray-500 ml-1`}>{product.deliveryTime}</Text>
        </View>
        
        <Text style={tw`text-3xl font-bold text-blue-600 mt-4`}>{product.price}</Text>
        
        <Text style={tw`text-gray-700 mt-6 leading-6`}>
          Petha is a translucent soft candy from Agra, India made from ash gourd. It has a sweet, 
          chewy texture and comes in various flavors. This iconic sweet has been part of Agra's 
          culinary tradition since the Mughal era.
        </Text>
        
        <View style={tw`flex-row items-center justify-between mt-8 mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-800`}>Quantity</Text>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity 
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={tw`bg-gray-200 p-2 rounded-l-lg`}
            >
              <Ionicons name="remove" size={20} color="#4b5563" />
            </TouchableOpacity>
            <Text style={tw`px-4 text-lg font-semibold`}>{quantity}</Text>
            <TouchableOpacity 
              onPress={() => setQuantity(quantity + 1)}
              style={tw`bg-gray-200 p-2 rounded-r-lg`}
            >
              <Ionicons name="add" size={20} color="#4b5563" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={tw`flex-row`}>
          <TouchableOpacity
            style={tw`flex-1 bg-blue-100 py-3 rounded-lg flex-row justify-center items-center mr-2`}
          >
            <Ionicons name="cart" size={20} color="#3b82f6" />
            <Text style={tw`text-blue-600 font-bold ml-2`}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw`flex-1 bg-blue-600 py-3 rounded-lg flex-row justify-center items-center ml-2`}
            onPress={() => navigation.navigate('ReviewCart')}
          >
            <FontAwesome name="shopping-bag" size={20} color="white" />
            <Text style={tw`text-white font-bold ml-2`}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};