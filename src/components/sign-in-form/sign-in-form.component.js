import { useState } from "react"
import { 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
    } from "../../utils/firebase/firebase.utils";

import Button , {BUTTON_TYPE_CLASS} from "../button/button.component";
import FormInput from "../form-input/form-input.component";


import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles"

const defaultFormFields = {
    email : '',
    password : '',
}
const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();

      };

    const handleSubmit = async(event) =>{
        event.preventDefault();


        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Password Incorrect"); 
                break;

                case 'auth/user-not-found':
                    alert("User doesn't exist")
                break;

                default :
                    alert(error)
            }
        }
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    }
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign In with your Email and Password</span>
            <form onSubmit={handleSubmit}>
             
                <FormInput 
                    label="Email"
                    type="email" 
                    id="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                
                <FormInput 
                    label="Password"
                    type="password" 
                    id="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASS.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>

                
            </form>
        </SignInContainer>
    )
}

export default SignInForm