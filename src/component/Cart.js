import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../actions/cartAction";

const Cart = () => {
    // useSelector hooks is provided by react-redux library that helps us to read the store and its content.
    const state = useSelector((state) => state);
    // It helps us dispatch the actions or action creators which in turn return actions. 
    // Syntax:   const dispatch = useDispatch();
    // dispatch(actionObject or calling the action creator);
    const dispatch = useDispatch();
    console.log(state, "tesing")
    return (
        <div className="cart">
            <h2>Number of items in Cart: {state.numOfItems}</h2>
            <button className="green" onClick={() => { dispatch(addItem()) }}>Add Item to Cart</button>
            <button className="red" onClick={() => { dispatch(deleteItem()) }}>Remove Item from Cart</button>
        </div>
    );
};

export default Cart;