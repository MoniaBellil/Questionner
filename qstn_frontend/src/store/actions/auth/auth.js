import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  USER_LOADED,
  POINTS_LOADED,
} from "./types";
import Cookies from 'js-cookie';
import api from "../../../axiosConfig";
import setAuthToken from "../../../utils/setAuthToken";
import getConfig from '../../../config';
import * as nearAPI from 'near-api-js';

// Initializing contract
async function initContract() {
  // get network configuration values from config.js
  // based on the network ID we pass to getConfig()
  const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');

  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await nearAPI.connect({ keyStore, ...nearConfig });

  // Initialize wallet connection
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in user's account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      // Gets the accountId as a string
      accountId: walletConnection.getAccountId(),
      // Gets the user's token balance
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    // User's accountId as a string
    walletConnection.account(),
    // accountId of the contract we will be loading
    // NOTE: All contracts on NEAR are deployed to an account and
    // accounts can only have one contract deployed to them.
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ['getMessages'],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ['addMessage'],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      sender: walletConnection.getAccountId(),
    }
  );

  return { contract, currentUser, nearConfig, walletConnection };
}
//register user
export const register = (userData) => async (dispatch) => {
  dispatch({
    type: REGISTER_PENDING,
  });

  try {
    const { data } = await api.post("users/register-user", userData);

    dispatch({ type: REGISTER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: REGISTER_FAILD, payload: error.response.data.message });
  }
};
//login Google
export const loginGoogle = () => async (dispatch) => {
  dispatch({
    type: LOGIN_PENDING,
  });

  try {
    window.open("http://localhost:3000/users/google", "_self");
    dispatch({ type: LOGIN_SUCCESS, payload: "test" });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: "not test" });
  }
};
//login
export const login = (userData) => async (dispatch) => {
  dispatch({
    type: LOGIN_PENDING,
  });

  try {
    const { data } = await api.post("users/login", userData);

    dispatch({ type: LOGIN_SUCCESS, payload: data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: error.response.data.message });
  }
};
export const loginNear = () => async () => {
    window.nearInitPromise = initContract().then(
      ({ contract, currentUser, nearConfig, walletConnection }) => {
        walletConnection.requestSignIn(
      {contractId: nearConfig.contractName, methodNames: [contract.addMessage.name]}, //contract requesting access
    )
  }
  );
};
export const getUser = async () => {
  return await initContract().then(
    ({ contract, currentUser, nearConfig, walletConnection }) => {
      const walletAccountObj = walletConnection.account();
     return currentUser;
}
);
};
// Load User
export const loadUser = () => async (dispatch) => {

  setAuthToken(Cookies.get("token"))
  try {
    const { data } = await api.get("users/profile");

    dispatch({ type: USER_LOADED, payload: data });
    const userId = 
      {
        idUser: data._id
      }
    
    dispatch(loadPoints(userId))
  } catch (err) {
    //dispatch({ type: AUTH_ERROR });
  }
};


// loadPoints
export const loadPoints = (userId) => async (dispatch) => {

  try {
    const { data } = await api.post("users/getPoint",userId);
 
    dispatch({ type: POINTS_LOADED, payload: data });
  } catch (err) {
    //dispatch({ type: AUTH_ERROR });
  }
};


export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
