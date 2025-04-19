import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const VRExplorationScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = React.useState('normal');
  const [narrationEnabled, setNarrationEnabled] = React.useState(true);

  return (
    <View style={tw`flex-1 bg-black`}>
      {/* VR View Placeholder */}
      <Image 
        source={{ uri: 'https://example.com/taj-mahal-vr.jpg' }} 
        style={tw`flex-1`}
        resizeMode="cover"
      />
      
      {/* Controls Overlay */}
      <View style={tw`absolute top-0 left-0 right-0 p-4 bg-black bg-opacity-50`}>
        <Text style={tw`text-white text-xl font-bold`}>Taj Mahal</Text>
      </View>
      
      <View style={tw`absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70`}>
        {/* View Mode Selector */}
        <View style={tw`flex-row justify-between mb-4`}>
          <TouchableOpacity 
            onPress={() => setViewMode('normal')}
            style={tw`flex-1 items-center py-2 ${viewMode === 'normal' ? 'bg-blue-600' : 'bg-gray-800'} rounded-l-lg`}
          >
            <Ionicons 
              name="eye" 
              size={24} 
              color={viewMode === 'normal' ? 'white' : '#9ca3af'} 
            />
            <Text style={tw`text-white mt-1`}>Normal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setViewMode('bird')}
            style={tw`flex-1 items-center py-2 ${viewMode === 'bird' ? 'bg-blue-600' : 'bg-gray-800'}`}
          >
            <FontAwesome 
              name="eye" 
              size={24} 
              color={viewMode === 'bird' ? 'white' : '#9ca3af'} 
            />
            <Text style={tw`text-white mt-1`}>Bird's Eye</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setViewMode('ant')}
            style={tw`flex-1 items-center py-2 ${viewMode === 'ant' ? 'bg-blue-600' : 'bg-gray-800'} rounded-r-lg`}
          >
            <MaterialCommunityIcons 
              name="eye" 
              size={24} 
              color={viewMode === 'ant' ? 'white' : '#9ca3af'} 
            />
            <Text style={tw`text-white mt-1`}>Ant's Eye</Text>
          </TouchableOpacity>
        </View>
        
        {/* Navigation Controls */}
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity 
            onPress={() => setNarrationEnabled(!narrationEnabled)}
            style={tw`p-3 bg-gray-800 rounded-full`}
          >
            <Ionicons 
              name={narrationEnabled ? 'volume-high' : 'volume-mute'} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
          
          <View style={tw`flex-row`}>
            <TouchableOpacity style={tw`p-3 mx-2 bg-gray-800 rounded-full`}>
              <Ionicons name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-3 mx-2 bg-gray-800 rounded-full`}>
              <Ionicons name="arrow-down" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-3 mx-2 bg-gray-800 rounded-full`}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-3 mx-2 bg-gray-800 rounded-full`}>
              <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('InformationalOverlay')}
            style={tw`p-3 bg-blue-600 rounded-full`}
          >
            <Ionicons name="information-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};