import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OrderConfirmation = ({ navigation }) => {
  const orderDetails = {
    orderNumber: 'AGR24578923',
    orderDate: 'April 19, 2025',
    deliveryDate: 'April 22, 2025',
    trackingStatus: 'Processing',
    items: [
      {
        name: 'Petha',
        quantity: 2,
        price: '₹250'
      }
    ]
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F9FF' }}>
      <LinearGradient
        colors={['#3B82F6', '#60A5FA']}
        style={{
          height: 200,
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }}
      />
      
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5
          }}>
            <Ionicons name="checkmark-circle" size={50} color="#10B981" />
          </View>
          
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>
            Order Successful!
          </Text>
          
          <Text style={{ fontSize: 14, color: '#EFF6FF', marginBottom: 24 }}>
            Your order has been placed successfully
          </Text>
          
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            width: '100%',
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                  Order #{orderDetails.orderNumber}
                </Text>
                <Text style={{ color: '#6B7280', marginTop: 2 }}>
                  {orderDetails.orderDate}
                </Text>
              </View>
              
              <TouchableOpacity style={{
                backgroundColor: '#F3F4F6',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Ionicons name="document-text-outline" size={16} color="#4B5563" style={{ marginRight: 4 }} />
                <Text style={{ color: '#4B5563', fontWeight: '500', fontSize: 12 }}>
                  Receipt
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={{ 
              padding: 12,
              backgroundColor: '#F3F4F6',
              borderRadius: 12,
              marginBottom: 16
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#EFF6FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8
                }}>
                  <Ionicons name="time-outline" size={18} color="#3B82F6" />
                </View>
                <Text style={{ color: '#1F2937', fontWeight: '600' }}>
                  Estimated Delivery
                </Text>
              </View>
              
              <Text style={{ fontSize: 14, color: '#4B5563', marginBottom: 4, paddingLeft: 40 }}>
                Your order will be delivered by:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', paddingLeft: 40 }}>
                {orderDetails.deliveryDate}
              </Text>
            </View>
            
            <View style={{
              padding: 12,
              backgroundColor: '#F0FDF4',
              borderRadius: 12,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#D1FAE5',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8
              }}>
                <Ionicons name="bicycle-outline" size={18} color="#10B981" />
              </View>
              <View>
                <Text style={{ color: '#059669', fontWeight: '600' }}>
                  Status: {orderDetails.trackingStatus}
                </Text>
                <Text style={{ fontSize: 12, color: '#059669' }}>
                  We're preparing your order for shipping
                </Text>
              </View>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
                Order Items
              </Text>
              
              {orderDetails.items.map((item, index) => (
                <View 
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderBottomWidth: index < orderDetails.items.length - 1 ? 1 : 0,
                    borderBottomColor: '#E5E7EB'
                  }}
                >
                  <Image 
                    source={{ uri: 'https://via.placeholder.com/50' }}
                    style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }}
                  />
                  
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '500', color: '#1F2937' }}>{item.name}</Text>
                    <Text style={{ color: '#6B7280', fontSize: 13 }}>Qty: {item.quantity}</Text>
                  </View>
                  
                  <Text style={{ fontWeight: '600', color: '#3B82F6' }}>{item.price}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={{
              backgroundColor: '#EFF6FF',
              borderRadius: 12,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicons name="car-outline" size={18} color="#3B82F6" style={{ marginRight: 8 }} />
              <Text style={{ color: '#3B82F6', fontWeight: '600' }}>
                Track Order
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 16,
            width: '100%',
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            marginBottom: 20,
            alignItems: 'center'
          }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#FEF3C7',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Ionicons name="help-buoy-outline" size={20} color="#F59E0B" />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#1F2937', marginBottom: 2 }}>
                Need Help With Your Order?
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>
                Contact our customer support team
              </Text>
            </View>
            
            <TouchableOpacity style={{
              backgroundColor: '#F3F4F6',
              borderRadius: 8,
              padding: 8
            }}>
              <Ionicons name="chatbubble-outline" size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <View style={{
        padding: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB'
      }}>
        <TouchableOpacity 
          style={{
            flex: 1,
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            padding: 14,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginRight: 12
          }}
          onPress={() => navigation.navigate('FoodItemListings')}
        >
          <Ionicons name="bag-outline" size={20} color="#4B5563" style={{ marginRight: 8 }} />
          <Text style={{ fontWeight: '600', color: '#4B5563' }}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{
            flex: 1,
            backgroundColor: '#3B82F6',
            borderRadius: 12,
            padding: 14,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
          onPress={() => navigation.navigate('JourneySetup')}
        >
          <Ionicons name="home-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={{ fontWeight: '600', color: '#fff' }}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmation;