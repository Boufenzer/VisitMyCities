import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

console.log(`${API_BASE_URL}/visitmycities/building`);

const CreateBuilding = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Récupérer l'objet ville passé en paramètre
  const city = route.params?.city;
  console.log("City reçue :", city); // Vérifie que city est bien présent

  // On n'utilise plus d'état pour la ville ; on utilisera directement city.id
  // États pour les informations du bâtiment
  const [annee, setAnnee] = useState("");
  const [taille, setTaille] = useState("");
  const [type, setType] = useState("");
  const [valide, setValide] = useState(false);
  const [description, setDescription] = useState("");
  const [gps, setGps] = useState("");
  const [image, setImage] = useState("");
  const [nom, setNom] = useState("");

  // État pour saisir l'architecte (nom et prénom)
  const [architecte, setArchitecte] = useState("");

  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction pour créer le bâtiment
  const newBuilding = async () => {
    if (!city || !city.id) {
      console.error("City ou city.id non défini");
      setError("Ville non définie, impossible de créer le bâtiment");
      return;
    }

    const buildingData = {
      annee,
      taille,
      type,
      valide,

      ville: { id: parseInt(city.id, 10) },
      description,
      gps,
      image,
      nom,
    };

    console.log("Données envoyées :", buildingData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/visitmycities/batiment`,
        buildingData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigation.navigate("Cityscreen", { city });
        setErrorMessage("Bâtiment créé");
      }
      setError("");
      // Réinitialiser les champs (la ville reste inchangée)
      setAnnee("");
      setTaille("");
      setType("");
      setValide(false);
      setDescription("");
      setGps("");
      setImage("");
      setNom("");
      setArchitecte("");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création du bâtiment");
      setErrorMessage("");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.infoText}>Ajout Bâtiments</Text>

        <TextInput
          style={styles.input}
          placeholder="Année de construction"
          value={annee}
          onChangeText={setAnnee}
        
        />
        <TextInput
          style={styles.input}
          placeholder="Taille du bâtiment"
          value={taille}
          onChangeText={setTaille}
 
        />
        <TextInput
          style={styles.input}
          placeholder="Type de bâtiment"
          value={type}
          onChangeText={setType}
        />

 
        <View style={styles.readOnlyField}>
          <Text style={styles.readOnlyText}>
            Ville : {city ? city.nom : "Non définie"}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Coordonnées GPS"
          value={gps}
          onChangeText={setGps}
        />
        <TextInput
          style={styles.input}
          placeholder="URL de l'image"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom du bâtiment"
          value={nom}
          onChangeText={setNom}
        />

        <TouchableOpacity style={styles.loginButton} onPress={newBuilding}>
          <Text style={styles.loginButtonText}>Ajouter ce bâtiment</Text>
        </TouchableOpacity>

        {error ? (
          <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
        ) : null}
        {errorMessage ? (
          <Text style={{ color: "green", marginTop: 10 }}>{errorMessage}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  innerContainer: {
    width: "90%",
    alignItems: "center",
  },
  infoText: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  readOnlyField: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
  },
  readOnlyText: {
    fontSize: 16,
    color: "#555",
  },
});

export default CreateBuilding;
