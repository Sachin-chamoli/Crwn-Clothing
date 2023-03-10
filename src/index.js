import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store , persistor} from './store/store';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={ store }>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={ stripePromise }>
            <App />
          </Elements>
        </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);
