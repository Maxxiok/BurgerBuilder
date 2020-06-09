import * as actionTypes from './actionsTypes';
import axios from "../../axios-orders";

export const addIngredient = (ingr) => {
    return {type: actionTypes.ADD_INGREDIENT, payload: {ingredient: ingr}};
};

export const removeIngredient = (ingr) => {
    return {type: actionTypes.REMOVE_INGREDIENT,  payload: {ingredient: ingr}};
};

export const setIngredients = (ings) => {
    return {type: actionTypes.SET_INGREDIENTS, ingredients: ings};
}

export const fetchIngredientsFailed = () => {
    return {type: actionTypes.FETCH_INGS_ERROR};
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://burger-builder-b9da7.firebaseio.com/ingredients.json').then(response=>{
            dispatch(setIngredients(response.data));
        }).catch(error=>{
            dispatch(fetchIngredientsFailed());
        });
    }
}
