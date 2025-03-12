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

const EditBuilding = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const city = route.params?.city;
  const { batiment } = route.params;
  console.log("City reçue :", batiment);

  const [annee, setAnnee] = useState(batiment.annee ? String(batiment.annee) : "");
  const [taille, setTaille] = useState(batiment.taille ? String(batiment.taille) : "");
  const [type, setType] = useState(batiment.type || "");
  const [valide, setValide] = useState(batiment.valide || false);
  const [description, setDescription] = useState(batiment.description || "");
  const [gps, setGps] = useState(batiment.gps || "");
  const [image, setImage] = useState(batiment.image || "");
  const [nom, setNom] = useState(batiment.nom || "");



  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction pour créer le bâtiment
  const editBuilding = async () => {


    const buildingData = {
      annee: parseInt(annee, 10) || 0,
      taille: parseFloat(taille) || 0,
      type,
      valide,
      description,
      gps,
      image,
      nom,
    };

    console.log("Données envoyées :", buildingData);

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/visitmycities/batiment/${batiment.id}`,
        buildingData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigation.navigate("HomeScreen");
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
          value={annee.toString()}
          onChangeText={setAnnee}
          keyboardType="number-pad" 
        />
        <TextInput
          style={styles.input}
          placeholder="Taille du bâtiment"
          value={taille.toString()}
          onChangeText={setTaille}
          keyboardType="number-pad" 
        />
        <TextInput
          style={styles.input}
          placeholder="Type de bâtiment"
          value={type}
          onChangeText={setType}
        />


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

        <TouchableOpacity style={styles.loginButton} onPress={editBuilding}>
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

export default EditBuilding;
