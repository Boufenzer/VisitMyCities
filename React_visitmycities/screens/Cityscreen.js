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
  TextInput,
} from "react-native"; // ✅ Correct
import axios from "axios";
import { API_BASE_URL } from "../config";
import Footer from "../Components/Footer";
import { useSelector} from "react-redux";
import { Ionicons } from '@expo/vector-icons';





export default function CityScreen() {
   const route = useRoute();
  const { city } = route.params;
  const navigation = useNavigation();
  const [batiments,setBatiments] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [searchText, setSearchText] = useState("");
  const [allBat, setAllBat] = useState(false);


  useEffect(() => {
    if (allBat){
      axios.get(`${API_BASE_URL}/visitmycities/batiment`)

      .then((response) => {                  
    
       setBatiments(response.data);})
      .catch(error => {console.error(error);});
    } else {   axios.get(`${API_BASE_URL}/visitmycities/batiment/ville?villeId=${city.id}`)

   .then((response) => {                  
 
    setBatiments(response.data);})
   .catch(error => {console.error(error);});}
 
  }, [allBat]);
 

  const filteredBatiments = batiments.filter(b => {
    const estValide = (b.valide == 1);
    const correspondRecherche = b.nom
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
      b.type.toLowerCase().includes(searchText.toLowerCase()) ||
      b.architect.nom.toLowerCase().includes(searchText.toLowerCase());
    return estValide && correspondRecherche;
  });

    // 🔹 Bouton pour basculer entre l'affichage de la ville ou de tous les bâtiments
    const handleToggleShowAll = () => {
      setAllBat(!allBat);
    };

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

 
      <View style={styles.searchContainer}>
  <TextInput
    style={styles.searchInput}
    placeholder="Rechercher un bâtiment ( Nom, Architecte, Type)"
    placeholderTextColor="#666"
    value={searchText}
    onChangeText={setSearchText} // <-- Met à jour le state quand on tape
  />
</View>
      
<FlatList
  data={filteredBatiments}
  keyExtractor={(item) => item.id.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
    <BatCard batiment={item} navigation={navigation} />
  )}
/>


     <View style={styles.addView}>
              <TouchableOpacity
          style={styles.addButton}
          onPress={handleToggleShowAll}
          
        ><Text style={styles.addButtonText}> {allBat ? "Afficher uniquement la ville" : "Afficher tous les bâtiments"}</Text></TouchableOpacity>
          </View>

          {user && user.expert && (
  <View style={styles.addViewExpert}>
    <TouchableOpacity
      style={styles.addButtonExpert}
      onPress={() => navigation.navigate("CreateBuilding", { city })}
    >
      <Ionicons name="add-circle-outline" size={30} color="#000" />
    </TouchableOpacity>
  </View>
)}

      
   
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
    marginTop: 0,
    marginBottom: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    width: 300,
    height: 505,
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
addButtonExpert: {
  position: "absolute",
  bottom: 55,
  right: 10,
  

}

});
