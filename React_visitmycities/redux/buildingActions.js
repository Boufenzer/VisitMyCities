import axios from 'axios';
import { API_BASE_URL } from '../config';

// Types d'action
export const FETCH_ARCHITECTS_SUCCESS = 'FETCH_ARCHITECTS_SUCCESS';
export const FETCH_BUILDINGS_SUCCESS = 'FETCH_BUILDINGS_SUCCESS';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';

// Action pour récupérer les architectes
export const fetchArchitects = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/visitmycities/architecte`);
        dispatch({ type: FETCH_ARCHITECTS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Erreur lors du chargement des architectes", error);
    }
};

// Action pour récupérer les bâtiments
export const fetchBuildings = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/visitmycities/batiment`);
        dispatch({ type: FETCH_BUILDINGS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Erreur lors du chargement des bâtiments", error);
    }
};

// Action pour récupérer les villes
export const fetchCities = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/visitmycities/ville`);
        dispatch({ type: FETCH_CITIES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("Erreur lors du chargement des villes", error);
    }
};
