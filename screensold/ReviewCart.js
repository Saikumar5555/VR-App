import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ReviewCart = ({ navigation, route }) => {
  const { item, quantity = 1, buyNow = false } = route.params || {};
  
  const [cartItems, setCartItems] = useState([
    { ...item, quantity },
    // You can add more items here for a pre-populated cart
  ]);
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Remove the ₹ symbol and convert to number
      const price = parseFloat(item.price.replace('₹', ''));
      return total + (price * item.quantity);
    }, 0);
  };
  
  const deliveryFee = 50;
  const total = calculateSubtotal() + deliveryFee;
  
  const handleCheckout = () => {
    navigation.navigate('DeliveryPayment', { total });
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
          Shopping Cart
        </Text>
      </View>
      
      {cartItems.length > 0 ? (
        <>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 16 }}>
              {cartItems.map((item, index) => (
                <View 
                  key={item.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image 
                      source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }}
                      style={{ width: 80, height: 80, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                    
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', flex: 1 }}>
                          {item.name}
                        </Text>
                        
                        <TouchableOpacity onPress={() => removeItem(item.id)}>
                          <Ionicons name="close-circle-outline" size={22} color="#9CA3AF" />
                        </TouchableOpacity>
                      </View>
                      
                      <Text style={{ color: '#6B7280', marginTop: 2, marginBottom: 8, fontSize: 14 }}>
                        {item.description?.slice(0, 50)}...
                      </Text>
                      
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#3B82F6' }}>
                          {item.price}
                        </Text>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <TouchableOpacity 
                            style={{
                              width: 28,
                              height: 28,
                              backgroundColor: '#F3F4F6',
                              borderRadius: 6,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Ionicons name="remove" size={16} color="#4B5563" />
                          </TouchableOpacity>
                          
                          <Text style={{ 
                            paddingHorizontal: 12, 
                            fontSize: 16, 
                            fontWeight: '500',
                            color: '#1F2937'
                          }}>
                            {item.quantity}
                          </Text>
                          
                          <TouchableOpacity 
                            style={{
                              width: 28,
                              height: 28,
                              backgroundColor: '#F3F4F6',
                              borderRadius: 6,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Ionicons name="add" size={16} color="#4B5563" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            
            <View style={{ 
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 16,
              margin: 16,
              marginTop: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
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
                <Text style={{ color: '#1F2937', fontWeight: '500' }}>₹{calculateSubtotal()}</Text>
              </View>
              
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                marginBottom: 8
              }}>
                <Text style={{ color: '#6B7280' }}>Delivery Fee</Text>
                <Text style={{ color: '#1F2937', fontWeight: '500' }}>₹{deliveryFee}</Text>
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
                  ₹{total}
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
              onPress={handleCheckout}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
                Proceed to Checkout (₹{total})
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="cart-outline" size={80} color="#D1D5DB" />
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#4B5563', marginTop: 16 }}>
            Your cart is empty
          </Text>
          <Text style={{ color: '#6B7280', textAlign: 'center', marginTop: 8, marginBottom: 24 }}>
            Looks like you haven't added any items to your cart yet
          </Text>
          <TouchableOpacity 
            style={{
              backgroundColor: '#3B82F6',
              borderRadius: 12,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
            onPress={() => navigation.navigate('MarketplaceCategories')}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReviewCart;