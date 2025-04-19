import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const VRJourneyScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = React.useState('pilot');
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <View style={tw`flex-1 bg-black`}>
      {/* VR View Placeholder */}
      <Image 
        source={{ uri: 'https://example.com/airplane-view.jpg' }} 
        style={tw`flex-1`}
        resizeMode="cover"
      />
      
      {/* Controls Overlay */}
      <View style={tw`absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4`}>
        <View style={tw`flex-row justify-between mb-4`}>
          <TouchableOpacity 
            onPress={() => setViewMode('pilot')}
            style={tw`flex-1 items-center py-2 ${viewMode === 'pilot' ? 'bg-blue-600' : 'bg-gray-800'} rounded-l-lg`}
          >
            <MaterialCommunityIcons 
              name="airplane" 
              size={24} 
              color={viewMode === 'pilot' ? 'white' : '#9ca3af'} 
            />
            <Text style={tw`text-white mt-1`}>Pilot View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setViewMode('window')}
            style={tw`flex-1 items-center py-2 ${viewMode === 'window' ? 'bg-blue-600' : 'bg-gray-800'} rounded-r-lg`}
          >
            <FontAwesome 
              name="window-maximize" 
              size={24} 
              color={viewMode === 'window' ? 'white' : '#9ca3af'} 
            />
            <Text style={tw`text-white mt-1`}>Window View</Text>
          </TouchableOpacity>
        </View>
        
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity 
            onPress={() => setSoundEnabled(!soundEnabled)}
            style={tw`p-3 bg-gray-800 rounded-full`}
          >
            <Ionicons 
              name={soundEnabled ? 'volume-high' : 'volume-mute'} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('ArrivalNotification')}
            style={tw`bg-green-600 px-6 py-3 rounded-full flex-row items-center`}
          >
            <Text style={tw`text-white font-bold`}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="white" style={tw`ml-2`} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};