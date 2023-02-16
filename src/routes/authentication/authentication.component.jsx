// import { getRedirectResult } from 'firebase/auth';
// import { useEffect } from 'react';


import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import "./authentication.styles.scss";

const Authentication = () => {
  // useEffect( async () => {
  //   const response = await getRedirectResult(auth);
  //   if(response){
  //     const userDocRef = createUserDocumentFromAuth(response.user);
  //   }
  // }, [])

  

  // const logGoogleRedirectUser = async () => {
  //   const {user} = await singInWithGoogleRedirect();
  //   console.log({user})
  // };
  return (
    <div className='authentication-container'>
      <SignInForm/>
      {/* <button onClick={singInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm/>
    </div>
  );
};

export default Authentication;
