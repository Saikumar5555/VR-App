import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import * as Notifications from 'expo-notifications';

const SignUp = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const otpInputs = useRef([]);

  // Request notification permission
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Please enable notifications to receive OTP");
        return;
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    };

    setupNotifications();
  }, []);

  // Countdown for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  const generateDummyOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async () => {
    if (!formData.phone || !formData.name || !formData.email) return;

    setLoading(true);
    Keyboard.dismiss();

    try {
      const otp = generateDummyOTP();
      setGeneratedOtp(otp);
      setOtp(['', '', '', '', '', '']);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Your OTP Code",
          body: `Your verification code is: ${otp}`,
          data: { otp },
        },
        trigger: { seconds: 1 },
      });

      setStep(2);
      setCountdown(30);
      setIsResendDisabled(true);
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      if (enteredOtp === generatedOtp) {
        setTimeout(() => {
          Alert.alert("Success", "Account created successfully!");
          navigation.navigate('SignIn');
        }, 1000);
      } else {
        Alert.alert("Error", "Incorrect OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  
    // Auto submit when full
    if (index === 5 && value) {
      verifyOTP();
    }
  };
  
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        otpInputs.current[index - 1]?.focus();
      }
    }
  };
  

  const handleResendOTP = () => {
    if (isResendDisabled) return;
    sendOTP();
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value.replace(/\D/g, '')
    }));
  };

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      <View className="items-center mb-12">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          {step === 1 ? 'Create Account' : 'Verify Phone'}
        </Text>
        <Text className="text-gray-500 text-center">
          {step === 1 ? 'Join our community today' : `Enter code sent to +${formData.phone}`}
        </Text>
      </View>

      {step === 1 ? (
        <>
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
            <TextInput
              placeholder="John Doe"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              className="bg-white rounded-xl px-4 py-3 text-gray-800 shadow-sm border border-gray-200 mb-4"
            />

            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <TextInput
              placeholder="your@email.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              className="bg-white rounded-xl px-4 py-3 text-gray-800 shadow-sm border border-gray-200 mb-4"
            />

            <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
            <View className="flex-row items-center bg-white rounded-xl px-4 shadow-sm border border-gray-200">
              <Text className="text-gray-500 mr-2">+91</Text>
              <TextInput
                placeholder="Enter phone number"
                value={formData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                keyboardType="phone-pad"
                className="flex-1 text-gray-800 text-lg"
                maxLength={10}
              />
            </View>
          </View>

          <TouchableOpacity
            className={`py-4 rounded-xl ${!formData.name || !formData.email || !formData.phone || loading ? 'bg-indigo-300' : 'bg-indigo-600'} shadow-md mb-4`}
            onPress={sendOTP}
            disabled={!formData.name || !formData.email || !formData.phone || loading}
          >
            <Text className="text-white text-center font-bold text-lg">
              {loading ? 'Sending...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text className="text-indigo-600 font-medium">Sign in</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View className="mb-8">
            <Text className="text-gray-700 mb-4 font-medium">Verification Code</Text>
            <View className="flex-row justify-between">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpInputs.current[index] = ref)}
                  className="w-12 h-12 bg-white rounded-lg border border-gray-300 text-center text-xl"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Resend OTP */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-500">
                Didn't receive code?{' '}
              </Text>
              <TouchableOpacity onPress={handleResendOTP} disabled={isResendDisabled}>
                <Text className={`font-medium ${isResendDisabled ? 'text-gray-400' : 'text-indigo-600'}`}>
                  {isResendDisabled ? `Resend in ${countdown}s` : 'Resend now'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className={`py-4 rounded-xl ${otp.join('').length !== 6 || loading ? 'bg-indigo-300' : 'bg-indigo-600'} shadow-md`}
            onPress={verifyOTP}
            disabled={otp.join('').length !== 6 || loading}
          >
            <Text className="text-white text-center font-bold text-lg">
              {loading ? 'Verifying...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-4"
            onPress={() => {
              setStep(1);
              setOtp(['', '', '', '', '', '']);
            }}
          >
            <Text className="text-indigo-600 text-center font-medium">Change phone number</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SignUp;