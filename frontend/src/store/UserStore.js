import UserService from '../services/UserService.js'

export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_WALLET_DIFF = "update-wallaet-diff";
export const ADD_FAVORITES = "add-favorites";
export const REMOVE_FAVORITES = "remove-favorites";
export const GET_BY_ID = "get-By-Id";

export default {
  state: {
    loggedInUser: null,
    currUser: null
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
    updateWallet(state, { walletVal }) {
      state.loggedInUser.digitalWallet = walletVal;
    },
    setCurrUser(state, { user }) {
      state.currUser = user;
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
      return UserService.logout()
        .then(() => {
          const user = null;
          store.commit({ type: 'setUser', user });
        })
    },
    [UPDATE_WALLET_DIFF](store, { user }) {
      return UserService.updateWallet(user)
        .then(userDb => {
          store.commit({ type: 'updateWallet', walletVal: userDb.digitalWallet });
        })
    },
    [ADD_FAVORITES](store, { projId, user }) {
      console.log("user", user, 'projId', projId)

      if (!user) return

      return UserService.addFavorites(user, projId)
        .then(userDb => {
          // console.log('here')
          store.commit({ type: 'setFavorite', projId });
        })

    },

    [REMOVE_FAVORITES](store, { projId }) {
      var user = store.getters.loggedInUser
      return UserService.removeFavorites(user, projId)
        .then(_ => {
          console.log('made it')
          store.commit({ type: 'removeFavorite', projId });
        })
    },
    [GET_BY_ID](store, { userId }) {
      return UserService.getById(userId).then(user => {
        store.commit({ type: 'setCurrUser', user })
      })
    }
  }
}
