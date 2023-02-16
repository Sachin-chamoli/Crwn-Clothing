
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { clearItemFromCart, addItemToCart, removeItemFromCart } from "../../store/cart/cart.action"; 

import {
    CheckoutItemContainer, 
    ImageContainer, 
    Basespan,
    Quantity, 
    Arrow, 
    Value,
    RemoveButton 
} from "./checkout-item.styles"
const CheckoutItem = ({cartItem}) =>{
 const {name, price, quantity, imageUrl} = cartItem;

 const dispatch = useDispatch();
 const cartItems = useSelector(selectCartItems);
 const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
 const AddItemHandler = () => dispatch(addItemToCart(cartItems , cartItem));
 const removeItemHandler = () => dispatch(removeItemFromCart(cartItems , cartItem));
 return (
    <CheckoutItemContainer>
        <ImageContainer>
            <img src={imageUrl} alt={name} />
        </ImageContainer>
        <Basespan>{name}</Basespan>
        <Quantity>
            <Arrow onClick={removeItemHandler}>
                &#10094;
            </Arrow>
            <Value>{quantity}</Value> 
            <Arrow onClick={AddItemHandler}>
                &#10095;
            </Arrow>
        </Quantity>
        <Basespan>{quantity * price}</Basespan>
        <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
 )
}

export default CheckoutItem