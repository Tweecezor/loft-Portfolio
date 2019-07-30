import axios from "../../requests";

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    LOGOUT__USER(state){
      state.user = {};
    }
  },
  getters: {
    userIsLogged: state => {
      const userObj = state.user;
      const userObjectIsEmpty =
        Object.keys(userObj).length === 0 && userObj.constructor === Object;
      return userObjectIsEmpty === false;
    },
    userId: state => {
      return state.user.id
    }
    // userIsLogout: state => {
    //   const userObj = state.user;
    //   const isUserObjectIsEmpty = Object.keys(userObj).length !== 0 && userObj.constructor !== Object;
    //   if(isUserObjectIsEmpty === true){
    //     return true;
    //   } else
    //   return false;

    // }
  },
  actions:{
    async userLogout(store){
      try{
        const response = await axios.post('/logout');
        store.commit("LOGOUT__USER");
      } catch(error){
        throw new Error(
          error.response.data.error || error.response.data.message
        )
      }
    }
  }
};
