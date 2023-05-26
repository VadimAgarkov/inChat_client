import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/messageReducer.js';


const store = createStore(reducer);

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default store;