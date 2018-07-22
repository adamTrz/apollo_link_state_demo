import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import 'typeface-roboto';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import cart from './redux/store';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/adam-trzcinski-eb3612/todrink-app/dev',
});

const store = createStore(cart);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
