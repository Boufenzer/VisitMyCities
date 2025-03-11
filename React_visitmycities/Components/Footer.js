// Footer.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector} from "react-redux";
import { useRoute } from "@react-navigation/native";


const Footer = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user); 
  const route = useRoute(); 

  return (
    <View style={styles.bottomNav}>
    {/* Bouton Home */}
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate('HomeScreen')}
    >
      <Ionicons 
        name={route.name === 'HomeScreen' ? "home" : "home-outline"} // 🔹 Change selon la page
        size={24} 
        color="#000" 
      />
    </TouchableOpacity>
  
    {/* Bouton Favoris */}
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate(user ? 'FavoriteScreen' : 'NotConnectedScreen')}
    >
      <Ionicons 
        name={route.name === 'FavoriteScreen' ? "heart" : "heart-outline"} // 🔹 Change selon la page
        size={24} 
        color="#000" 
      />
    </TouchableOpacity>
  
    {/* Bouton Profil */}
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate('NotConnectedScreen')}
    >
      <Ionicons 
        name={route.name === 'NotConnectedScreen' || route.name === 'LoginScreen' || route.name === 'RegisterScreen' ? "person" : "person-outline"} // 🔹 Change selon la page
        size={24} 
        color="#000" 
      />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    paddingVertical: 2,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    padding: 10,
  },
});

export default Footer;
