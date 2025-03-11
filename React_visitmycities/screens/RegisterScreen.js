import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Footer from '../Components/Footer';

console.log(`${API_BASE_URL}/visitmycities/usager`);

const RegisterScreen = ({ navigation }) => {
  // DÃ©finir les Ã©tats pour email, password et confirmPassword
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction de validation de l'inscription
  const inscription = async () => {
   

    if (password !== confirmPassword) {
     setError('Les mots de passe doivent être identiques');
      setErrorMessage('');
      return;
    }
      const userData ={
        pseudo: pseudo,
        email: email,
        password: password,
      }

      try {
        console.log("Données envoyées :", userData);
console.log("URL de l'API :", `${API_BASE_URL}/visitmycities/usager`);

        const response = await axios.post(`${API_BASE_URL}/visitmycities/usager`,userData,{headers: {'Content-Type': 'application/json','Accept': 'application/json'}});
        
        if (response.status === 200) {
          navigation.replace('LoginScreen');
            setErrorMessage('Utilisateur créer')
        }
        setError('')
        setPseudo('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

      }catch (err) {
        console.error(err);
        setError('Erreur lors de la création de l\'utilisateur');
        setErrorMessage('');
      }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.infoText}>Inscription</Text>

      {/* Champ Email */}
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={pseudo}   
        onChangeText = {(newPseudo) => setPseudo(newPseudo)}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText = {(newEmail) => setEmail(newEmail)}
      />

      {/* Champ Mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText = {(newPassword) => setPassword(newPassword)}
      />

      {/* Champ Confirmer le Mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText = {(confirmPassword) => setConfirmPassword(confirmPassword)}
      />

      {/* Bouton d'inscription */}
      <TouchableOpacity style={styles.loginButton} onPress={inscription}>      
        <Text style={styles.loginButtonText}>S'inscrire</Text>
      </TouchableOpacity>

      {error ? <Text style={{color: 'red', marginTop: 10}}>{error}</Text> : null }
      {errorMessage? <Text style={{color: 'green', marginTop: 10}}>{errorMessage}</Text> : null }
      <Footer />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',  // Garder le contenu alignÃ© vers le haut
    backgroundColor: '#fff',
    paddingTop: 150,  // Augmenter le paddingTop pour abaisser tout le contenu
  },
  infoText: {
    fontSize: 36,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 25,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 40,
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
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

export default RegisterScreen;
