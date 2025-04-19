import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const JourneySetupScreen = ({ navigation }) => {
  const [language, setLanguage] = React.useState('English');
  const [narrationSpeed, setNarrationSpeed] = React.useState(1.0);

  return (
    <View style={tw`flex-1 bg-blue-50 p-6`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Ionicons name="location-sharp" size={80} color="#3b82f6" />
        <Text style={tw`text-2xl font-bold mt-4 text-blue-800`}>Taj Mahal</Text>
        <Text style={tw`text-gray-600 mt-2`}>Agra, Uttar Pradesh</Text>
      </View>

      <View style={tw`mb-8`}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Language</Text>
          <View style={tw`flex-row items-center bg-white p-3 rounded-lg border border-gray-200`}>
            <MaterialIcons name="language" size={24} color="#4b5563" />
            <TextInput
              value={language}
              onChangeText={setLanguage}
              style={tw`ml-2 flex-1 text-gray-700`}
              placeholder="Select language"
            />
            <Ionicons name="chevron-down" size={20} color="#4b5563" />
          </View>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 text-gray-700`}>Narration Speed</Text>
          <View style={tw`flex-row items-center justify-between bg-white p-3 rounded-lg border border-gray-200`}>
            <MaterialIcons name="speed" size={24} color="#4b5563" />
            <Text style={tw`text-gray-700 mx-2`}>{narrationSpeed}x</Text>
            <View style={tw`flex-row`}>
              <TouchableOpacity 
                onPress={() => setNarrationSpeed(Math.max(0.5, narrationSpeed - 0.1))}
                style={tw`p-2`}
              >
                <Ionicons name="remove" size={20} color="#4b5563" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setNarrationSpeed(Math.min(2.0, narrationSpeed + 0.1))}
                style={tw`p-2`}
              >
                <Ionicons name="add" size={20} color="#4b5563" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('VRJourney')}
          style={tw`bg-blue-600 py-4 rounded-full flex-row justify-center items-center`}
        >
          <Text style={tw`text-white font-bold text-lg`}>Start Journey</Text>
          <Ionicons name="arrow-forward" size={24} color="white" style={tw`ml-2`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};