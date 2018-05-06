import UserService from '../services/UserService.js'


export const LOGIN = "login";
export const LOGOUT = "logout";
export const SIGNUP = "signup";



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
        setUser(state, {user}) {
          state.loggedInUser = user;
        }
      },
      actions: {
        [LOGIN](store, {userCredentials}) {
          return UserService.login(userCredentials)
          .then(user=>{
            store.commit({type: 'setUser', user});
          })
        },
        [LOGOUT](store) {
            console.log(store);
            return UserService.logout()
            .then(()=>{
              store.commit({type: 'setUser', user: null});
            })
          }
      }
}