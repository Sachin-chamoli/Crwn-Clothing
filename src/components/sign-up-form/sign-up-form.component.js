import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {SignUpContainer} from "./sign-up-form.styles"



const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : '',
}

const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName , email, password , confirmPassword} = formFields;

    
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Password do not match");
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        }catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert("Email already in use!")
            }
            console.log("user creation encountered an error", error);
        }
    }
    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    }
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required id="dname" 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />
                
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
                
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    id="password2" 
                    required    
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm