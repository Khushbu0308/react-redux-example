import { ADD_ITEM, DELETE_ITEM, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from "../actionTypes/actionTypes";

export const addItem = () => {
    return {
        type: ADD_ITEM
    }
}
export const deleteItem = () => {
    return {
        type: DELETE_ITEM
    }
}
export const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}
export const fetchDataSuccess = (data) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}
export const fetchDataFailure = (error) => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}