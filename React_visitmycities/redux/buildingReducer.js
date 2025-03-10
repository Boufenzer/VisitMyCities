import { FETCH_ARCHITECTS_SUCCESS, FETCH_BUILDINGS_SUCCESS, FETCH_CITIES_SUCCESS } from './buildingActions';

const initialState = {
    architects: [],
    buildings: [],
    cities: []
};

const buildingReducer = (state = initialState, action) => {
    console.log("📌 Action Redux reçue :", action);

    switch (action.type) {
        case FETCH_ARCHITECTS_SUCCESS:
            console.log("✅ Données architectes :", action.payload);
            return { ...state, architects: action.payload };

        case FETCH_BUILDINGS_SUCCESS:
            console.log("✅ Données bâtiments :", action.payload);
            return { ...state, buildings: action.payload };

        case FETCH_CITIES_SUCCESS:
            console.log("✅ Données villes :", action.payload);
            return { ...state, cities: action.payload };

        default:
            return state;
    }
};

export default buildingReducer;
