import { CART_ACTION_TYPES } from "./cart.types";


const addCartItem = (cartItems, productToAdd) => {
    //find if cartitems  contains productToAdd
    const existingCartItem = cartItems.find(
       (cartItem) => cartItem.id === productToAdd.id);
    //if found increse its quantity
       if(existingCartItem){
           return cartItems.map((cartItem) =>
           cartItem.id === productToAdd.id 
           ? {...cartItem, quantity : cartItem.quantity +1} 
           : cartItem
           );
       }

    //return new array with modified cartitems/new cart items
    return [...cartItems, {...productToAdd, quantity: 1}]
};

const removeCartItem = (cartItems, cartItemToRemove) =>{
   //find the cart item to remove
   const existingCartItem = cartItems.find(
       (cartItem) => cartItem.id === cartItemToRemove.id);

   //check if quantity is equals to 1, if it is remove that item from the cart
   if(existingCartItem.quantity ===1){
       return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
   }

   //return back caritems with matching cart item with reduced quantity
   return cartItems.map((cartItem) =>
           cartItem.id === cartItemToRemove.id 
           ? {...cartItem, quantity : cartItem.quantity - 1} 
           : cartItem
           );
}

   const clearCartItem = (cartItems, cartItemToClear) =>{
       return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
   }

export const setIsCartOpen = (boolean) =>{
    return ({type :CART_ACTION_TYPES.SET_IS_CART_OPEN, payload : boolean});
}

export const addItemToCart = (cartItems , productToAdd) =>{
    const newCartItems = addCartItem(cartItems, productToAdd);
    return ({type : CART_ACTION_TYPES.SET_CART_ITEMS, payload : newCartItems})
}
export const removeItemFromCart = (cartItems, cartItemToRemove) =>{
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return ({type : CART_ACTION_TYPES.SET_CART_ITEMS, payload : newCartItems})
}
export const clearItemFromCart = (cartItems, cartItemToClear) =>{
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return ({type : CART_ACTION_TYPES.SET_CART_ITEMS, payload : newCartItems})
}
