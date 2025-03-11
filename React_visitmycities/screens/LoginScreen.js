import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import Footer from '../Components/Footer';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const connexion = async() => {
        if (!email || !password){
            setError('Veuillez renseigner tous les champs');
            return;
        }

        try {
            const url = `${API_BASE_URL}/visitmycities/auth?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

            const response = await axios.get(url, {headers: {'Content-Type': 'application'}});

            console.log("Réponse API :", response.data); 





            if (response.status === 200 && response.data) {
               
                console.log("Réponse API :", response.data); // Debug
            
                if (response.data.authenticated) {
                    dispatch(setUser(response.data.user)); 
                    navigation.replace('HomeScreen');
                } else {
                    setError("Email ou mot de passe incorrect.");
                }
            } else {
                setError("Erreur de connexiion");
            }
            

          
        }catch(err){
console.error(err);
            setError('Erreur lors de la connexion');
            }
        };

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Connexion</Text>

            <TextInput
                style={styles.input}
                placeholder="Adresse e-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

              {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={connexion}>
                <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>
            <Footer />
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    infoText: {
        fontSize: 36,
        marginBottom: 80,

        fontWeight: 'bold'
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 25,
        fontSize: 16
    },
    loginButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginTop: 40,

    },
    loginButtonText: {
        color: 'yellow',
        fontWeight: 'bold',
        fontSize: 16
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

export default LoginScreen;
