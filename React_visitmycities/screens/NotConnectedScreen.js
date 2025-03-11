import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Footer from '../Components/Footer';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigation } from "@react-navigation/native";





const NotConnectedScreen = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const handleLogout = () => {
        dispatch(logout()); // ✅ Supprime l'utilisateur de Redux
        navigation.replace("LoginScreen"); // ✅ Redirige vers Login
      };
        
      return (
        <View style={styles.container}>
          {user ? (
            <View style={styles.container}>
              <Text style={styles.welcomeText}>Ravi de vous revoir, {user.pseudo} !</Text>
              <TouchableOpacity style={styles.registerButton} onPress={handleLogout}>
                <Text style={styles.registerButtonText}>Se déconnecter</Text>
              </TouchableOpacity>
              <Footer />
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.infoText}>Vous n'êtes pas connecté</Text>
    
              {/* Boutons de connexion */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.loginButtonText}>Se connecter</Text>
              </TouchableOpacity>
    
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text style={styles.registerButtonText}>S'inscrire</Text>
              </TouchableOpacity>
    
              <Footer />
            </View>
          )}
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
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginVertical: 10,
    },
    loginButtonText: {
        color: 'yellow',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: 'yellow',
        paddingVertical: 10,
        paddingHorizontal: 55,
        borderRadius: 20,
        marginVertical: 10,
    },
    registerButtonText: {
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
    welcomeText: {
        fontSize: 18,
        marginBottom: 20,
        
    },
});

export default NotConnectedScreen;
