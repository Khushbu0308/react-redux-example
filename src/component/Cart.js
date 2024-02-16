import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, fetchDataFailure, fetchDataRequest, fetchDataSuccess } from "../actions/cartAction";
import axios from 'axios';

const Cart = () => {
    // useSelector hooks is provided by react-redux library that helps us to read the store and its content.
    const state = useSelector((state) => state);
    // It helps us dispatch the actions or action creators which in turn return actions. 
    // Syntax:   const dispatch = useDispatch();
    // dispatch(actionObject or calling the action creator);
    const dispatch = useDispatch();
    console.log(state, "tesing")


    useEffect(() => {
        dispatch((fetchDataRequest()));
        axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            dispatch((fetchDataSuccess(response)));
        }).catch((error) => {
            dispatch((fetchDataFailure(error)));
        })
    }, [])


    // We use useSelector to access the userData state from the Redux store.
    // We use useDispatch to dispatch actions to the Redux store.

    return (
        <div className="cart">
            <h2>Number of items in Cart: {state.numOfItems}</h2>
            <button className="green" onClick={() => { dispatch(addItem()) }}>Add Item to Cart</button>
            <button className="red" onClick={() => { dispatch(deleteItem()) }}>Remove Item from Cart</button>
            <h1>User Data</h1>
            <div>
                {state.loading ? (
                    <p>Loading...</p>
                ) : state.error ? (
                    <p>Error: {state.error}</p>
                ) : (
                    <div>
                        {state.data.data !== undefined ?
                            <ul>
                                {state.data.data.map(user => (
                                    <li key={user.id}>{user.name}</li>
                                ))}
                            </ul> : ""}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Cart;