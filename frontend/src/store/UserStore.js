import UserService from '../services/UserService.js'


export const LOGIN = "login";
export const LOGOUT = "logout";
export const SIGNUP = "signup";



export default {
    state: {
        loggedinUser: null
      },
      mutations: {
        setUser(state, {user}) {
          state.loggedinUser = user;
        }
      },
      getters: {
        loggedinUser(state) {
          return state.loggedinUser;
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