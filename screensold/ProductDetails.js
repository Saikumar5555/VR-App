import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProductDetails = ({ navigation, route }) => {
  const { item = {
    id: 1, 
    name: 'Petha',
    description: 'Famous Agra sweet made from ash gourd',
    price: '₹250',
    rating: 4.8,
    deliveryTime: '30 min',
    longDescription: 'Petha is a famous sweet from Agra, known for its association with the Mughal era. This translucent soft candy is made from ash gourd (winter melon) and is believed to have been a favorite in the royal kitchens.',
    culturalSignificance: 'Agra Petha is deeply intertwined with the city\'s Mughal heritage. It is said to have been invented during Shah Jahan\'s reign while he was building the Taj Mahal. The sweet became a staple in royal kitchens and has since become an essential part of Agra\'s culinary identity. Today, it makes for a perfect souvenir that represents the rich culture and history of the city.',
    ingredients: ['Ash Gourd', 'Sugar', 'Lime Water', 'Cardamom', 'Saffron'],
    imageUrl: 'https://via.placeholder.com/400x300',
  } } = route.params || {};
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('about');
  
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  
  const addToCart = () => {
    navigation.navigate('ReviewCart', { item, quantity });
  };
  
  const buyNow = () => {
    navigation.navigate('ReviewCart', { item, quantity, buyNow: true });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ position: 'relative' }}>
          <Image 
            source={{ uri: item.imageUrl }}
            style={{ width: '100%', height: 300 }}
            resizeMode="cover"
          />
          
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0,
              height: 100,
              padding: 16
            }}
          >
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 20,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <View style={{
            position: 'absolute',
            bottom: -20,
            right: 20,
            backgroundColor: '#3B82F6',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
              {item.price}
            </Text>
          </View>
        </View>
        
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>
            {item.name}
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
              <Ionicons name="star" size={18} color="#FBBF24" />
              <Text style={{ marginLeft: 4, color: '#4B5563', fontWeight: '500' }}>
                {item.rating}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time-outline" size={18} color="#4B5563" />
              <Text style={{ marginLeft: 4, color: '#4B5563' }}>
                {item.deliveryTime}
              </Text>
            </View>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            borderBottomWidth: 1, 
            borderBottomColor: '#E5E7EB',
            marginBottom: 20,
            paddingBottom: 10
          }}>
            <TouchableOpacity 
              style={{ 
                marginRight: 20, 
                paddingBottom: 8,
                borderBottomWidth: activeTab === 'about' ? 2 : 0,
                borderBottomColor: '#3B82F6'
              }}
              onPress={() => setActiveTab('about')}
            >
              <Text style={{ 
                fontWeight: '600', 
                color: activeTab === 'about' ? '#3B82F6' : '#6B7280',
                fontSize: 16
              }}>
                About
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ 
                marginRight: 20, 
                paddingBottom: 8,
                borderBottomWidth: activeTab === 'cultural' ? 2 : 0,
                borderBottomColor: '#3B82F6'
              }}
              onPress={() => setActiveTab('cultural')}
            >
              <Text style={{ 
                fontWeight: '600', 
                color: activeTab === 'cultural' ? '#3B82F6' : '#6B7280',
                fontSize: 16
              }}>
                Cultural Significance
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ 
                paddingBottom: 8,
                borderBottomWidth: activeTab === 'ingredients' ? 2 : 0,
                borderBottomColor: '#3B82F6'
              }}
              onPress={() => setActiveTab('ingredients')}
            >
              <Text style={{ 
                fontWeight: '600', 
                color: activeTab === 'ingredients' ? '#3B82F6' : '#6B7280',
                fontSize: 16
              }}>
                Ingredients
              </Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'about' && (
            <Text style={{ color: '#4B5563', lineHeight: 24, fontSize: 16 }}>
              {item.longDescription}
            </Text>
          )}
          
          {activeTab === 'cultural' && (
            <View>
              <Text style={{ color: '#4B5563', lineHeight: 24, fontSize: 16 }}>
                {item.culturalSignificance}
              </Text>
              
              <Image 
                source={{ uri: 'https://via.placeholder.com/350x150' }}
                style={{ width: '100%', height: 150, borderRadius: 12, marginTop: 16 }}
                resizeMode="cover"
              />
            </View>
          )}
          
          {activeTab === 'ingredients' && (
            <View>
              {item.ingredients.map((ingredient, index) => (
                <View 
                  key={index}
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    paddingVertical: 10,
                    borderBottomWidth: index < item.ingredients.length - 1 ? 1 : 0,
                    borderBottomColor: '#E5E7EB'
                  }}
                >
                  <View style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: 4, 
                    backgroundColor: '#3B82F6',
                    marginRight: 12
                  }} />
                  <Text style={{ color: '#4B5563', fontSize: 16 }}>{ingredient}</Text>
                </View>
              ))}
            </View>
          )}
          
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 12 }}>
              Quantity
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#EFF6FF',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={decrementQuantity}
              >
                <Ionicons name="remove" size={24} color="#3B82F6" />
              </TouchableOpacity>
              
              <View style={{
                width: 60,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F9FAFB',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#E5E7EB'
              }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>
                  {quantity}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#EFF6FF',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={incrementQuantity}
              >
                <Ionicons name="add" size={24} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={{
        padding: 20,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#fff'
      }}>
        <TouchableOpacity 
          style={{
            flex: 1,
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            paddingVertical: 16,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
          onPress={addToCart}
        >
          <Ionicons name="cart-outline" size={20} color="#374151" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{
            flex: 1,
            backgroundColor: '#3B82F6',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
          onPress={buyNow}
        >
          <Ionicons name="flash-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;