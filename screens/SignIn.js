// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Keyboard,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import * as Notifications from 'expo-notifications';

// const SignIn = () => {
//   const navigation = useNavigation();
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [generatedOtp, setGeneratedOtp] = useState('');
//   const [countdown, setCountdown] = useState(0);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);

//   const otpInputs = useRef([]);

//   // Notification config
//   useEffect(() => {
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });
//   }, []);

//   // Countdown for resend OTP
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setIsResendDisabled(false);
//     }
//   }, [countdown]);

//   const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

//   const sendOTP = async () => {
//     if (!validatePhoneNumber(phone)) {
//       Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
//       return;
//     }

//     setLoading(true);
//     Keyboard.dismiss();

//     const dummyOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(dummyOtp);
//     setOtp(['', '', '', '', '', '']);

//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: 'Your OTP Code',
//           body: `Your verification code is: ${dummyOtp}`,
//           data: { otp: dummyOtp },
//         },
//         trigger: { seconds: 1 },
//       });

//       setStep(2);
//       setCountdown(30);
//       setIsResendDisabled(true);
//     } catch (error) {
//       Alert.alert('Notification Error', 'Could not send OTP notification.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOTP = () => {
//     const enteredOtp = otp.join('');
//     if (enteredOtp.length !== 6) {
//       Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP');
//       return;
//     }

//     setLoading(true);

//     if (enteredOtp === generatedOtp) {
//       Alert.alert('Success', "You're now signed in!");
//       navigation.navigate('Home');
//     } else {
//       Alert.alert('Error', 'The OTP you entered is incorrect');
//     }

//     setLoading(false);
//   };

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       otpInputs.current[index + 1]?.focus();
//     }

//     if (index === 5 && value) {
//       verifyOTP();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace') {
//       if (otp[index] === '' && index > 0) {
//         otpInputs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handleResendOTP = () => {
//     if (isResendDisabled) return;
//     sendOTP();
//   };

//   return (
//     <View className="flex-1 bg-gray-50 px-6 justify-center">
//       {/* Header */}
//       <View className="mb-10">
//         <Text className="text-3xl font-bold text-gray-900 mb-2">
//           {step === 1 ? 'Welcome Back' : 'Verify OTP'}
//         </Text>
//         <Text className="text-gray-500 text-base">
//           {step === 1
//             ? 'Sign in with your phone number'
//             : `Enter the code sent to +91${phone}`}
//         </Text>
//       </View>

//       {step === 1 ? (
//         <>
//           {/* Phone Input */}
//           <View className="mb-6">
//             <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
//             <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
//               <Text className="text-gray-700 font-medium mr-2">+91</Text>
//               <TextInput
//                 className="flex-1 text-gray-900 text-lg"
//                 placeholder="Enter your number"
//                 placeholderTextColor="#9CA3AF"
//                 value={phone}
//                 onChangeText={(text) => setPhone(text.replace(/\D/g, ''))}
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 autoFocus
//               />
//             </View>
//           </View>

//           {/* Continue Button */}
//           <TouchableOpacity
//             className={`py-4 rounded-xl ${
//               !phone || phone.length < 10 || loading ? 'bg-indigo-300' : 'bg-indigo-600'
//             } shadow-md mb-6`}
//             onPress={sendOTP}
//             disabled={!phone || phone.length < 10 || loading}
//             activeOpacity={0.8}
//           >
//             <Text className="text-white text-center font-semibold text-lg">
//               {loading ? 'Sending OTP...' : 'Continue'}
//             </Text>
//           </TouchableOpacity>

//           {/* Sign Up Link */}
//           <View className="flex-row justify-center">
//             <Text className="text-gray-500">Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//               <Text className="text-indigo-600 font-medium">Sign up</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <>
//           {/* OTP Input */}
//           <View className="mb-8">
//             <Text className="text-gray-700 mb-4 font-medium">Verification Code</Text>
//             <View className="flex-row justify-between">
//               {[0, 1, 2, 3, 4, 5].map((index) => (
//                 <TextInput
//                   key={index}
//                   ref={(ref) => (otpInputs.current[index] = ref)}
//                   className="w-12 h-12 bg-white rounded-lg border border-gray-300 text-center text-xl"
//                   keyboardType="number-pad"
//                   maxLength={1}
//                   value={otp[index]}
//                   onChangeText={(value) => handleOtpChange(index, value)}
//                   onKeyPress={(e) => handleKeyPress(e, index)}
//                   selectTextOnFocus
//                 />
//               ))}
//             </View>

//             {/* Resend OTP */}
//             <View className="flex-row justify-center mt-4">
//               <Text className="text-gray-500">Didn't receive code? </Text>
//               <TouchableOpacity onPress={handleResendOTP} disabled={isResendDisabled}>
//                 <Text
//                   className={`font-medium ${
//                     isResendDisabled ? 'text-gray-400' : 'text-indigo-600'
//                   }`}
//                 >
//                   {isResendDisabled ? `Resend in ${countdown}s` : 'Resend now'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Verify Button */}
//           <TouchableOpacity
//             className={`py-4 rounded-xl ${
//               otp.join('').length !== 6 || loading ? 'bg-indigo-300' : 'bg-indigo-600'
//             } shadow-md mb-4`}
//             onPress={verifyOTP}
//             disabled={otp.join('').length !== 6 || loading}
//             activeOpacity={0.8}
//           >
//             <Text className="text-white text-center font-semibold text-lg">
//               {loading ? 'Verifying...' : 'Verify'}
//             </Text>
//           </TouchableOpacity>

//           {/* Back to phone number */}
//           <TouchableOpacity
//             className="py-2"
//             onPress={() => {
//               setStep(1);
//               setOtp(['', '', '', '', '', '']);
//             }}
//           >
//             <Text className="text-indigo-600 text-center font-medium">Change phone number</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// export default SignIn;



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Keyboard,
//   ImageBackground,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import * as Notifications from 'expo-notifications';

// // Array of destination backgrounds
// const backgrounds = [
//   { id: 'Agra', source: require('../assets/images/Agra.jpg'), name: 'Agra' },
//   { id: 'Redfort', source: require('../assets/images/Redfort.jpg'), name: 'Redfort' },
  
//   { id: 'Goldentemple', source: require('../assets/images/Goldentemple.jpg'), name: 'Goldentemple' },
// ];

// const SignIn = () => {
//   const navigation = useNavigation();
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [generatedOtp, setGeneratedOtp] = useState('');
//   const [countdown, setCountdown] = useState(0);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
  
//   // Select a random background
//   const [background, setBackground] = useState(backgrounds[Math.floor(Math.random() * backgrounds.length)]);

//   const otpInputs = useRef([]);

//   // Notification config
//   useEffect(() => {
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });
//   }, []);

//   // Countdown for resend OTP
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setIsResendDisabled(false);
//     }
//   }, [countdown]);

//   const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

//   const sendOTP = async () => {
//     if (!validatePhoneNumber(phone)) {
//       Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
//       return;
//     }

//     setLoading(true);
//     Keyboard.dismiss();

//     const dummyOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(dummyOtp);
//     setOtp(['', '', '', '', '', '']);

//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: 'Your OTP Code',
//           body: `Your verification code is: ${dummyOtp}`,
//           data: { otp: dummyOtp },
//         },
//         trigger: { seconds: 1 },
//       });

//       setStep(2);
//       setCountdown(30);
//       setIsResendDisabled(true);
//     } catch (error) {
//       Alert.alert('Notification Error', 'Could not send OTP notification.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOTP = () => {
//     const enteredOtp = otp.join('');
//     if (enteredOtp.length !== 6) {
//       Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP');
//       return;
//     }

//     setLoading(true);

//     if (enteredOtp === generatedOtp) {
//       Alert.alert('Success', "You're now signed in!");
//       navigation.navigate('Home');
//     } else {
//       Alert.alert('Error', 'The OTP you entered is incorrect');
//     }

//     setLoading(false);
//   };

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       otpInputs.current[index + 1]?.focus();
//     }

//     if (index === 5 && value) {
//       verifyOTP();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace') {
//       if (otp[index] === '' && index > 0) {
//         otpInputs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handleResendOTP = () => {
//     if (isResendDisabled) return;
//     sendOTP();
//   };

//   return (
//     <ImageBackground
//       source={background.source}
//       style={{ width: '100%', height: '100%' }}
//       resizeMode="cover"
//     >
//       <StatusBar translucent backgroundColor="transparent" />
//       <SafeAreaView className="flex-1">
//         {/* Semi-transparent overlay */}
//         <View className="flex-1 bg-black/40 px-6 justify-center">
//           {/* Destination Badge */}
//           <View className="absolute top-12 right-6 bg-black/50 px-4 py-2 rounded-full">
//             <Text className="text-white font-medium">{background.name}</Text>
//           </View>

//           {/* Content Container */}
//           <View className="bg-white/90 p-6 rounded-2xl shadow-xl">
//             {/* Header */}
//             <View className="mb-6">
//               <Text className="text-3xl font-bold text-gray-900 mb-2">
//                 {step === 1 ? 'Welcome Back' : 'Verify OTP'}
//               </Text>
//               <Text className="text-gray-600 text-base">
//                 {step === 1
//                   ? 'Sign in with your phone number'
//                   : `Enter the code sent to +91${phone}`}
//               </Text>
//             </View>

//             {step === 1 ? (
//               <>
//                 {/* Phone Input */}
//                 <View className="mb-6">
//                   <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
//                   <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
//                     <Text className="text-gray-700 font-medium mr-2">+91</Text>
//                     <TextInput
//                       className="flex-1 text-gray-900 text-lg py-3"
//                       placeholder="Enter your number"
//                       placeholderTextColor="#9CA3AF"
//                       value={phone}
//                       onChangeText={(text) => setPhone(text.replace(/\D/g, ''))}
//                       keyboardType="phone-pad"
//                       maxLength={10}
//                       autoFocus
//                     />
//                   </View>
//                 </View>

//                 {/* Continue Button */}
//                 <TouchableOpacity
//                   className={`py-4 rounded-xl ${
//                     !phone || phone.length < 10 || loading ? 'bg-indigo-300' : 'bg-indigo-600'
//                   } shadow-md mb-6`}
//                   onPress={sendOTP}
//                   disabled={!phone || phone.length < 10 || loading}
//                   activeOpacity={0.8}
//                 >
//                   <Text className="text-white text-center font-semibold text-lg">
//                     {loading ? 'Sending OTP...' : 'Continue'}
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Sign Up Link */}
//                 <View className="flex-row justify-center">
//                   <Text className="text-gray-700">Don't have an account? </Text>
//                   <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                     <Text className="text-indigo-600 font-medium">Sign up</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             ) : (
//               <>
//                 {/* OTP Input */}
//                 <View className="mb-6">
//                   <Text className="text-gray-700 mb-4 font-medium">Verification Code</Text>
//                   <View className="flex-row justify-between">
//                     {[0, 1, 2, 3, 4, 5].map((index) => (
//                       <TextInput
//                         key={index}
//                         ref={(ref) => (otpInputs.current[index] = ref)}
//                         className="w-12 h-12 bg-white rounded-lg border border-gray-300 text-center text-xl"
//                         keyboardType="number-pad"
//                         maxLength={1}
//                         value={otp[index]}
//                         onChangeText={(value) => handleOtpChange(index, value)}
//                         onKeyPress={(e) => handleKeyPress(e, index)}
//                         selectTextOnFocus
//                       />
//                     ))}
//                   </View>

//                   {/* Resend OTP */}
//                   <View className="flex-row justify-center mt-4">
//                     <Text className="text-gray-700">Didn't receive code? </Text>
//                     <TouchableOpacity onPress={handleResendOTP} disabled={isResendDisabled}>
//                       <Text
//                         className={`font-medium ${
//                           isResendDisabled ? 'text-gray-400' : 'text-indigo-600'
//                         }`}
//                       >
//                         {isResendDisabled ? `Resend in ${countdown}s` : 'Resend now'}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 {/* Verify Button */}
//                 <TouchableOpacity
//                   className={`py-4 rounded-xl ${
//                     otp.join('').length !== 6 || loading ? 'bg-indigo-300' : 'bg-indigo-600'
//                   } shadow-md mb-4`}
//                   onPress={verifyOTP}
//                   disabled={otp.join('').length !== 6 || loading}
//                   activeOpacity={0.8}
//                 >
//                   <Text className="text-white text-center font-semibold text-lg">
//                     {loading ? 'Verifying...' : 'Verify'}
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Back to phone number */}
//                 <TouchableOpacity
//                   className="py-2"
//                   onPress={() => {
//                     setStep(1);
//                     setOtp(['', '', '', '', '', '']);
//                   }}
//                 >
//                   <Text className="text-indigo-600 text-center font-medium">Change phone number</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// export default SignIn;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Keyboard,
//   ImageBackground,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Array of destination backgrounds
// const backgrounds = [
//   { id: 'Agra', source: require('../assets/images/Agra.jpg'), name: 'Agra' },
//   { id: 'Redfort', source: require('../assets/images/Redfort.jpg'), name: 'Redfort' },
//   { id: 'Goldentemple', source: require('../assets/images/Goldentemple.jpg'), name: 'Goldentemple' },
// ];

// const SignIn = () => {
//   const navigation = useNavigation();
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   // Select a random background
//   const [background, setBackground] = useState(backgrounds[Math.floor(Math.random() * backgrounds.length)]);

//   const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

//   const handleSignIn = () => {
//     if (!validatePhoneNumber(phone)) {
//       Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
//       return;
//     }

//     setLoading(true);
//     Keyboard.dismiss();

//     // Simulate login process
//     setTimeout(() => {
//       setLoading(false);
//       // Use replace instead of navigate to avoid stacking screens
//       navigation.replace('Home');
//     }, 1000);
//   };

//   return (
//     <>
//       <StatusBar translucent backgroundColor="transparent" />
//       <ImageBackground
//         source={background.source}
//         style={{ flex: 1, width: '100%', height: '100%' }}
//         resizeMode="cover"
//       >
//         <SafeAreaView style={{ flex: 1 }}>
//           {/* Semi-transparent overlay */}
//           <View className="flex-1 bg-black/40 px-6 justify-center">
//             {/* Destination Badge */}
//             <View className="absolute top-12 right-6 bg-black/50 px-4 py-2 rounded-full">
//               <Text className="text-white font-medium">{background.name}</Text>
//             </View>

//             {/* Content Container */}
//             <View className="bg-white/90 p-6 rounded-2xl shadow-xl">
//               {/* Header */}
//               <View className="mb-6">
//                 <Text className="text-3xl font-bold text-gray-900 mb-2">
//                   Welcome Back
//                 </Text>
//                 <Text className="text-gray-600 text-base">
//                   Sign in with your phone number
//                 </Text>
//               </View>

//               {/* Phone Input */}
//               <View className="mb-6">
//                 <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
//                 <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
//                   <Text className="text-gray-700 font-medium mr-2">+91</Text>
//                   <TextInput
//                     className="flex-1 text-gray-900 text-lg py-3"
//                     placeholder="Enter your number"
//                     placeholderTextColor="#9CA3AF"
//                     value={phone}
//                     onChangeText={(text) => setPhone(text.replace(/\D/g, ''))}
//                     keyboardType="phone-pad"
//                     maxLength={10}
//                     autoFocus
//                   />
//                 </View>
//               </View>

//               {/* Sign In Button */}
//               <TouchableOpacity
//                 className={`py-4 rounded-xl ${
//                   !phone || phone.length < 10 || loading ? 'bg-indigo-300' : 'bg-indigo-600'
//                 } shadow-md mb-6`}
//                 onPress={handleSignIn}
//                 disabled={!phone || phone.length < 10 || loading}
//                 activeOpacity={0.8}
//               >
//                 <Text className="text-white text-center font-semibold text-lg">
//                   {loading ? 'Signing In...' : 'Sign In'}
//                 </Text>
//               </TouchableOpacity>

//               {/* Sign Up Link */}
//               <View className="flex-row justify-center">
//                 <Text className="text-gray-700">Don't have an account? </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                   <Text className="text-indigo-600 font-medium">Sign up</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//       </ImageBackground>
//     </>
//   );
// };

// export default SignIn;




import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Array of destination backgrounds
const backgrounds = [
  { id: 'Agra', source: require('../assets/images/Agra.jpg'), name: 'Agra' },
  // { id: 'Redfort', source: require('../assets/images/Indiagate.jpg'), name: 'Redfort' },
  // { id: 'Goldentemple', source: require('../assets/images/Goldentemple.jpg'), name: 'Goldentemple' },
];

const SignIn = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // Select a random background
  const [background, setBackground] = useState(
    backgrounds[Math.floor(Math.random() * backgrounds.length)]
  );

  const validatePhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSignIn = () => {
    if (!validatePhoneNumber(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 1000);
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={background.source}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Semi-transparent overlay */}
          <View className="flex-1 bg-black/40 px-6 justify-center">

            {/* Destination Badge */}
            <View className="absolute top-12 right-6 bg-black/50 px-4 py-2 rounded-full">
              <Text className="text-white font-medium">{background.name}</Text>
            </View>

            {/* App Name on Background */}
            {/* <View className="absolute top-12 left-6">
              <Text className="text-white text-4xl font-bold tracking-wide">ExploreEase</Text>
            </View> */}

<View className="absolute top-32 left-6 w-full flex justify-center items-center">
  <Text className="text-white text-4xl font-bold tracking-wide">ExploreEase</Text>
</View>


            {/* Content Container */}
            <View className="bg-white/90 p-6 rounded-2xl shadow-xl">
              {/* Header */}
              <View className="mb-6">
                <Text className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </Text>
                <Text className="text-gray-600 text-base">
                  Sign in with your phone number
                </Text>
              </View>

              {/* Phone Input */}
              <View className="mb-6">
                <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
                <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
                  <Text className="text-gray-700 font-medium mr-2">+91</Text>
                  <TextInput
                    className="flex-1 text-gray-900 text-lg py-3"
                    placeholder="Enter your number"
                    placeholderTextColor="#9CA3AF"
                    value={phone}
                    onChangeText={(text) => setPhone(text.replace(/\D/g, ''))}
                    keyboardType="phone-pad"
                    maxLength={10}
                    autoFocus
                  />
                </View>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                className={`py-4 rounded-xl ${
                  !phone || phone.length < 10 || loading ? 'bg-indigo-300' : 'bg-indigo-600'
                } shadow-md mb-6`}
                onPress={handleSignIn}
                disabled={!phone || phone.length < 10 || loading}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row justify-center">
                <Text className="text-gray-700">Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text className="text-indigo-600 font-medium">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default SignIn;
