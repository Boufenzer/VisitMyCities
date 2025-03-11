import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native"; // ✅ Correct
import axios from "axios";
import { API_BASE_URL } from "../config";
import Footer from "../Components/Footer";
import { useSelector} from "react-redux";





export default function CityScreen() {
   const route = useRoute();
  const { city } = route.params;
  const navigation = useNavigation();
  const [batiments,setBatiments] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/visitmycities/batiment/ville?villeId=${city.id}`)

   .then((response) => {                  
 
    setBatiments(response.data);})
   .catch(error => {console.error(error);});
  }, []);
  // ✅ Récupérer la ville sélectionnée

  const BatCard = ({batiment}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("CityBat", { batiment })}
    >
      <View style={styles.card}>
        <Image source={{uri:batiment.image}} style={styles.image} />
        <View style={styles.badge}>
          <Text style={styles.cityName}>{batiment.nom}</Text>
        </View>
      </View>
   
     </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* IMAGE PLEIN ÉCRAN EN HAUT */}
      <View style={styles.bannerContainer}>
        <Image source={require("../assets/header.jpg")} style={styles.banner} />
        <View style={styles.textOverlay}>
          <Text style={styles.logo}>
            VISIT<Text style={styles.highlight}>{city.nom}</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.titrepage}>Bâtiments Cultes</Text>
 
      
      <FlatList
        data={batiments.filter(batiment => batiment.valide==1)}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <BatCard batiment={item} navigation={navigation} />
        )}
      />

     
      {user && user.expert && (<View style={styles.addView}>
              {user &&(   <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateBuilding" , {city})}
          
        ><Text style={styles.addButtonText}>Souhaitez vous ajouter un batiment ?</Text></TouchableOpacity>)}
          </View>)}
      
   
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
  titrepage: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
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
    height: 480,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 20, 
  
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
  region: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: '#FDB927',
    paddingVertical: 5,
    paddingHorizontal: 55,
    borderRadius: 20,
    marginVertical: 10,
    width:300,
    position: "absolute",
    bottom: 50,
    
  
},
addButtonText: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 10,
  textAlign: 'center',
},
addView: {
justifyContent: 'center',
  alignItems: 'center',

},

});
