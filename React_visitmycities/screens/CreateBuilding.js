import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity,AppRegistry  } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Footer from "../Components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";



export default function HomeScreen() {
  const navigation = useNavigation(); // ✅ Ajout de la navigation
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // 🔹 Récupérer user depuis Redux
  const [cities,setVilles] = useState([]);
  const [searchText, setSearchText] = useState('');


  const filteredCities = cities.filter(city =>
    city.nom.toLowerCase().includes(searchText.toLowerCase())
  );




  
  useEffect(() => {
    axios.get(`${API_BASE_URL}/visitmycities/ville`)
    
    .then((response) => {                  
      
      setVilles(response.data);})
      .catch(error => {console.error(error);});
    }, []);


    const handleLogout = () => {
      dispatch(logout());
      navigation.replace("LoginScreen");
    };
    
    const CityCard = ({ city }) => (
      <TouchableOpacity onPress={() => navigation.navigate("Cityscreen", {city})}>
        <View style={styles.card}>
          <Image source={{uri:city.image}} style={styles.image} />
          <View style={styles.badge}>
            <Text style={styles.cityName}>{city.nom}</Text>
            <Text style={styles.region}>{city.cp}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    
  return (
    <View style={styles.container}>
      {/* IMAGE PLEIN ÉCRAN EN HAUT */}
      <View style={styles.bannerContainer}>
        <Image source={require("../assets/header_home.jpg")} style={styles.banner} />
        <View style={styles.textOverlay}>
          
          <Text style={styles.logo}>
            VISIT<Text style={styles.highlight}>MY</Text>CITIES
          </Text>
        </View>
      </View>

      {user && (
        <View>
          <Text style={styles.welcomeText}>Bienvenue, {user.pseudo} !</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      )}


      {/* BARRE DE RECHERCHE */}
      <View style={styles.searchContainer}>
      
        <TextInput
          style={styles.searchInput}
          placeholder="Découvrir"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Ionicons
          name="search"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
      </View>

      {/* LISTE DES VILLES */}
      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CityCard city={item} navigation={navigation} />}
      />
       <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bannerContainer: {
    width: "100%",
    height: "25%", // ✅ Ajustable selon besoin
  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  textOverlay: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  highlight: {
    color: "#FDB927", // Jaune pour "MY"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    width: 300,
    height: 450,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 20, // Appliquer le margin seulement à gauche
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -75 }], // Centrage horizontal
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 25, // ✅ Forme arrondie
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 150, // Ajustable selon besoin
  },
  cityName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  region: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    padding: 10,
  },
});
