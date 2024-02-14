import { ADD_ITEM, DELETE_ITEM, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from "../actionTypes/actionTypes";
const initialState = {
    numOfItems: 0,
    data: [],
    error: null,
    loading: false
};
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                numOfItems: state.numOfItems + 1,
            };

        case DELETE_ITEM:
            return {
                ...state,
                numOfItems: state.numOfItems - 1,
            };
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;

    }
}
