import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import Cityscreen from "./screens/Cityscreen";
import CityBat from "./screens/CityBat";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Dashboard from "./screens/Dashboard";
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import { Provider } from 'react-redux'
import store from './redux/store'; 
import NotConnectedScreen from './screens/NotConnectedScreen';
import CreateBuilding from './screens/CreateBuilding';


const Stack = createNativeStackNavigator();







const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                         options={{ headerShown: false }} // ✅ Masquer le titre
                    />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Cityscreen" component={Cityscreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CityBat" component={CityBat} options={{ headerShown: false }} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="ForgotPasswordscreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }}/>
                    <Stack.Screen name="NotConnectedScreen" component={NotConnectedScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateBuilding" component={CreateBuilding} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
