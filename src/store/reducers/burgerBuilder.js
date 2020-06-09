import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    ingredients: null,
    totalPrice: 4.0,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.7
}

const addIngredient = (state, action) => {
    const updatedIngs = updateObject(state.ingredients, {[action.payload.ingredient]: state.ingredients[action.payload.ingredient]+1})
    const updatedState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = updateObject(state.ingredients, {[action.payload.ingredient]: state.ingredients[action.payload.ingredient]-1})
    const updatedSt = {
        ingredients: updatedIng,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
        building: true
    }
    return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: initialState.totalPrice,
        error: false,
        building: false
    });
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGS_ERROR:
            return updateObject(state, {error: true});
        default:
            return state;
    }
};

export default burgerBuilder;
