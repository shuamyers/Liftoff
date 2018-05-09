import UserService from '../services/UserService.js'

export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_WALLET_DIFF = "update-wallaet-diff";


export default {
  state: {
    loggedInUser: null
  },
  getters: {
    loggedInUser(state) {
      return state.loggedInUser;
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedInUser = user;
    },
    updateWallet(state,{walletVal}){
      state.loggedInUser.digitalWallet = walletVal;
    }
  },
  actions: {
    [LOGIN](store, { userCredentials }) {
      return UserService.login(userCredentials)
        .then(user => {
          store.commit({ type: 'setUser', user });
        })
    },
    [REGISTER](store, { registerDetails }) {
      return UserService.register(registerDetails)
        .then(user => {
          store.commit({ type: 'setUser', user });
        })
    },
    [LOGOUT](store) {
      console.log(store);
      return UserService.logout()
        .then(() => {
          store.commit({ type: 'setUser', user: null });
        })
    },
    [UPDATE_WALLET_DIFF](store,{user}){
      UserService.updateWallet(user) 
      .then(userDb => {
        store.commit({type: 'updateWallet', walletVal: userDb.digitalWallet});
      })
   } 
  }
}
