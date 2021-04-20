import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './components/UI/Spinner/Spinner';
import registerServiceWorker from './registerServiceWorker';
import storePresistor from './store/configureStore/configureStore';

ReactDOM.render(
  <Provider store={storePresistor.store}>
    <PersistGate loading={<Spinner />} persistor={storePresistor.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
