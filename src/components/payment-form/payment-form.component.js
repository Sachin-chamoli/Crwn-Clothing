import { CardElement , useStripe, useElements} from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";
import {PaymentFormContainer, FormConatiner } from "./payment-form-styles";


const PaymentForm = () =>{ 

    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method : 'post',
            headers: {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify({ amount : 1000})
        }).then((res) => res.json());

        console.log(response);
    }

    return(
    <PaymentFormContainer>
        <FormConatiner onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
            <CardElement/>
            <Button buttonType={BUTTON_TYPE_CLASS.inverted}>Pay Now</Button>
        </FormConatiner>
    </PaymentFormContainer>
    )
}

export default PaymentForm