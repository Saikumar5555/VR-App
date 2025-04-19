import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DeliveryPayment = ({ navigation, route }) => {
  const { total = 300 } = route.params || {};
  
  const [activeTab, setActiveTab] = useState('delivery');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main Street, Sector 7',
      city: 'Agra',
      state: 'Uttar Pradesh',
      zip: '282001',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: 2,
      name: 'John Doe',
      address: '456 Park Avenue, Civil Lines',
      city: 'Agra',
      state: 'Uttar Pradesh',
      zip: '282002',
      phone: '+91 9876543210',
      isDefault: false
    }
  ]);
  
  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: 'phone-portrait-outline',
      description: 'Pay using Google Pay, PhonePe or any UPI app'
    },
    {
      id: 'card',
      name: 'Card Payment',
      icon: 'card-outline',
      description: 'Pay using Credit or Debit card'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: 'cash-outline',
      description: 'Pay when your order is delivered'
    }
  ];
  
  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      cost: 50,
      time: '3-5 days',
      description: 'Regular delivery at economical rates'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      cost: 100,
      time: '1-2 days',
      description: 'Faster delivery for urgent orders'
    }
  ];
  
  const getFinalTotal = () => {
    const selectedDelivery = deliveryOptions.find(option => option.id === deliveryOption);
    return total + (selectedDelivery ? selectedDelivery.cost : 0);
  };
  
  const handlePlaceOrder = () => {
    navigation.navigate('OrderConfirmation');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
      }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
          Checkout
        </Text>
      </View>
      
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
      }}>
        <TouchableOpacity 
          style={{ 
            flex: 1, 
            alignItems: 'center', 
            paddingVertical: 16,
            borderBottomWidth: 2,
            borderBottomColor: activeTab === 'delivery' ? '#3B82F6' : 'transparent'
          }}
          onPress={() => setActiveTab('delivery')}
        >
          <Text style={{ 
            color: activeTab === 'delivery' ? '#3B82F6' : '#6B7280',
            fontWeight: '600'
          }}>
            Delivery
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ 
            flex: 1, 
            alignItems: 'center', 
            paddingVertical: 16,
            borderBottomWidth: 2,
            borderBottomColor: activeTab === 'payment' ? '#3B82F6' : 'transparent'
          }}
          onPress={() => setActiveTab('payment')}
        >
          <Text style={{ 
            color: activeTab === 'payment' ? '#3B82F6' : '#6B7280',
            fontWeight: '600'
          }}>
            Payment
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        {activeTab === 'delivery' && (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
              Delivery Address
            </Text>
            
            {savedAddresses.map((address) => (
              <TouchableOpacity 
                key={address.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: address.isDefault ? '#BFDBFE' : '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                      {address.name}
                    </Text>
                    
                    {address.isDefault && (
                      <View style={{ 
                        backgroundColor: '#EFF6FF', 
                        paddingHorizontal: 8, 
                        paddingVertical: 2,
                        borderRadius: 4,
                        marginLeft: 8
                      }}>
                        <Text style={{ fontSize: 12, color: '#3B82F6', fontWeight: '500' }}>
                          Default
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <TouchableOpacity>
                    <Ionicons name="pencil-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                
                <Text style={{ color: '#4B5563', marginBottom: 4 }}>
                  {address.address}
                </Text>
                <Text style={{ color: '#4B5563', marginBottom: 4 }}>
                  {address.city}, {address.state}, {address.zip}
                </Text>
                <Text style={{ color: '#4B5563' }}>
                  {address.phone}
                </Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                backgroundColor: '#F3F4F6',
                borderRadius: 12,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#D1D5DB',
                marginBottom: 24
              }}
            >
              <Ionicons name="add" size={20} color="#4B5563" />
              <Text style={{ color: '#4B5563', fontWeight: '500', marginLeft: 8 }}>
                Add New Address
              </Text>
            </TouchableOpacity>
            
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
              Delivery Options
            </Text>
            
            {deliveryOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: deliveryOption === option.id ? '#BFDBFE' : '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
                onPress={() => setDeliveryOption(option.id)}
              >
                <View style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 12, 
                  borderWidth: 2,
                  borderColor: deliveryOption === option.id ? '#3B82F6' : '#D1D5DB',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12
                }}>
                  {deliveryOption === option.id && (
                    <View style={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: 6, 
                      backgroundColor: '#3B82F6' 
                    }} />
                  )}
                </View>
                
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                      {option.name}
                    </Text>
                    <Text style={{ fontWeight: '600', color: '#3B82F6' }}>
                      ₹{option.cost}
                    </Text>
                  </View>
                  
                  <Text style={{ color: '#6B7280', marginTop: 2 }}>
                    {option.description}
                  </Text>
                  
                  <Text style={{ color: '#4B5563', marginTop: 4, fontWeight: '500' }}>
                    Estimated delivery: {option.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {activeTab === 'payment' && (
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
              Payment Method
            </Text>
            
            {paymentMethods.map((method) => (
              <TouchableOpacity 
                key={method.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: paymentMethod === method.id ? '#BFDBFE' : '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
                onPress={() => setPaymentMethod(method.id)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: 12, 
                    borderWidth: 2,
                    borderColor: paymentMethod === method.id ? '#3B82F6' : '#D1D5DB',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12
                  }}>
                    {paymentMethod === method.id && (
                      <View style={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: 6, 
                        backgroundColor: '#3B82F6' 
                      }} />
                    )}
                  </View>
                  
                  <View style={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: '#EFF6FF',
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons name={method.icon} size={24} color="#3B82F6" />
                  </View>
                  
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                      {method.name}
                    </Text>
                    <Text style={{ color: '#6B7280', fontSize: 14 }}>
                      {method.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            {paymentMethod === 'upi' && (
              <View style={{ 
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                marginTop: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2
              }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
                  Enter UPI ID
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 14,
                    color: '#1F2937'
                  }}
                  placeholder="example@upi"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            )}
            
            {paymentMethod === 'card' && (
              <View style={{ 
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                marginTop: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2
              }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
                  Card Details
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 14,
                    color: '#1F2937',
                    marginBottom: 12
                  }}
                  placeholder="Card Number"
                  placeholderTextColor="#9CA3AF"
                />
                
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <TextInput
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#D1D5DB',
                      borderRadius: 8,
                      padding: 12,
                      fontSize: 14,
                      color: '#1F2937',
                      marginRight: 8
                    }}
                    placeholder="MM/YY"
                    placeholderTextColor="#9CA3AF"
                  />
                  
                  <TextInput
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#D1D5DB',
                      borderRadius: 8,
                      padding: 12,
                      fontSize: 14,
                      color: '#1F2937'
                    }}
                    placeholder="CVV"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 14,
                    color: '#1F2937'
                  }}
                  placeholder="Name on Card"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            )}
          </View>
        )}
        
        <View style={{ 
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 16,
          margin: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2
        }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
            Order Summary
          </Text>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 8
          }}>
            <Text style={{ color: '#6B7280' }}>Subtotal</Text>
            <Text style={{ color: '#1F2937', fontWeight: '500' }}>₹{total - 50}</Text>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 8
          }}>
            <Text style={{ color: '#6B7280' }}>Delivery Fee</Text>
            <Text style={{ color: '#1F2937', fontWeight: '500' }}>
              ₹{deliveryOptions.find(option => option.id === deliveryOption)?.cost || 50}
            </Text>
          </View>
          
          <View style={{ 
            borderTopWidth: 1, 
            borderTopColor: '#E5E7EB',
            marginVertical: 12
          }} />
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between'
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>Total</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#3B82F6' }}>
              ₹{getFinalTotal()}
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={{
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB'
      }}>
        <TouchableOpacity 
          style={{
            backgroundColor: '#3B82F6',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
          onPress={handlePlaceOrder}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
            Place Order • ₹{getFinalTotal()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryPayment;