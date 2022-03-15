import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducers'
import IntlProviderWrapper from './hoc/IntlProviderWrapper';


const reduxStore = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App />
      </IntlProviderWrapper>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
