
import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_BASE_URL } from "../config";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CityBat() {
  const route = useRoute();
  const { batiment } = route.params;
  const [isFavori, setIsFavori] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();



  if (user) {
    useEffect(() => {
      axios.get(`${API_BASE_URL}/visitmycities/batiment/favoris?userId=${user.id}`)
        .then(response => {
          const favoris = response.data;
          const estFavori = favoris.some(fav => fav.id === batiment.id);
          setIsFavori(estFavori);
        })
        .catch(error => console.error("Erreur de récupération des favoris :", error));
    }, []);
  }


  useEffect(() => {
    axios.get(`${API_BASE_URL}/visitmycities/architecte/${batiment.id}`)

      .then(response => {

        setData(response.data);
      })
      .catch(error => { console.error(error); });
  }, []);


  const addFav = async () => {


    try {

      console.log("URL de l'API :", `${API_BASE_URL}/visitmycities/${batiment.id}/${user.id}`);
      setIsFavori(!isFavori);

      if (isFavori == false) {
        const response = await axios.post(`${API_BASE_URL}/visitmycities/usager/${user.id}/${batiment.id}`, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
        if (response.status === 200) {

          setErrorMessage('Utilisateur créer')
        }
      } else {
        const response = await axios.delete(`${API_BASE_URL}/visitmycities/usager/${user.id}/${batiment.id}`, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
        if (response.status === 200) {

          setErrorMessage('Utilisateur créer')
        }
      }


    } catch (err) {
      console.error(err);
      setError('Erreur lors de la création de l\'utilisateur');
      setErrorMessage('');
    }
  };




  const openGoogleMaps = () => {
    const destination = encodeURIComponent(batiment.gps);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    Linking.openURL(url).catch((err) =>
      console.error("Erreur d'ouverture du lien", err)
    );
  };
  return (
    <View style={styles.container}>
      {/* IMAGE PLEIN ÉCRAN EN HAUT */}
      <View style={styles.bannerContainer}>
        {user && (<TouchableOpacity style={styles.fav}  >
          <Ionicons
            name={isFavori ? "heart" : "heart-outline"}
            size={30}
            color="red"
            onPress={addFav}
          />
        </TouchableOpacity>)}

        {user && user.expert && (<TouchableOpacity style={styles.edit}  >
          <Ionicons
            name="create-outline"
            size={30}
            color="black"
            onPress={() => navigation.navigate("EditBuilding", { batiment })}
          />
        </TouchableOpacity>)}

        <Image source={{ uri: batiment.image }} style={styles.banner} />
        <View style={styles.textOverlay}>
          <Text style={styles.logo}>{batiment.nom}</Text>
        </View>
      </View>
      <Text style={styles.titrepage}>Informations</Text>
      <View style={styles.batcontainer}>
     

          {/* Année de création */}
          {batiment.annee && (
            <View style={styles.batInfos}>
              <Text style={styles.titreinfo}>Année de construction : </Text>
              <Text style={styles.descinfo}>{batiment.annee}</Text>
            </View>
          )}
      
        {/* Architectes */}
        {batiment.architect && (
        
            <View style={styles.batInfos}>
              <Text style={styles.titreinfo}>Architecte : </Text>
              <Text style={styles.descinfo}>{batiment.architect.nom} {batiment.architect.prenom}</Text>
            </View>
         
        )}

        {/* Taille */}
        {batiment.taille && (
          <View style={styles.batInfos}>
            <Text style={styles.titreinfo}>Taille : </Text>
            <Text style={styles.descinfo}>{batiment.taille} metres</Text>
          </View>
        )}


        {/* Taille */}
        {batiment.type && (
          <View style={styles.batInfos}>
            <Text style={styles.titreinfo}>Type de batiment : </Text>
            <Text style={styles.descinfo}>{batiment.type} </Text>
          </View>
        )}


        <Text style={styles.titreDesc}>Description</Text>
        <Text style={styles.desc}>{batiment.description}</Text>

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
          <Text style={styles.buttonText}>Itinéraire</Text>
        </TouchableOpacity></View>

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
  button: {
    marginTop: 20,
    backgroundColor: "#FDB927",
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  fav: {
    position: "absolute",
    top: 240,
    right: 20,
    zIndex: 1,
  },
  edit: {
    position: "absolute",
    top: 240,
    left: 20,
    zIndex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 25,

  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  batcontainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  batInfos: {
    marginBottom: 20,
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

  },
  titreDesc: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  

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
  titreinfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  descinfo: {
    fontSize: 15,
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 25,
    marginTop: 20,
  },
});
