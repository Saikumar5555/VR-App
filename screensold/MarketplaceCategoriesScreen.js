import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const categories = [
  { id: '1', name: 'Food', icon: 'fast-food' },
  { id: '2', name: 'Fashion', icon: 'shirt' },
  { id: '3', name: 'Crafts', icon: 'brush' },
  { id: '4', name: 'Souvenirs', icon: 'gift' },
];

const MarketplaceCategoriesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={tw`flex-1 bg-gray-50 p-4`}>
      <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>Local Specialties</Text>
      
      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-white p-3 rounded-lg shadow-sm mb-6`}>
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          placeholder="Search famous items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={tw`ml-2 flex-1 text-gray-700`}
        />
      </View>
      
      {/* Categories Grid */}
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductList', { category: item.name })}
            style={tw`flex-1 m-2 bg-white p-6 rounded-xl shadow-sm items-center justify-center`}
          >
            <Ionicons 
              name={item.icon} 
              size={40} 
              color="#3b82f6" 
              style={tw`mb-3`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};