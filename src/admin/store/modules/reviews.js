import { wrapIntoFormData } from "@/helpers/forms";


export default {
  namespaced:true,
  state:{
    reviews:[]
  },
  actions:{
    async addReview(store,newReview){
      const data = wrapIntoFormData(newReview); 
      try{
        const response = await this.$axios.post('/reviews',data)
        console.log(response.data)
        store.commit("ADD_REVIEW",response.data);
      } catch(error){
        alert(error.message);
      }
    },
    async fetchReview(store){
      try{
        const response = await this.$axios.get('/reviews/154');
        console.log(response.data)
        store.commit('SET_REVIEW',response.data);
      } catch(error){
        alert(error.message);
      }
    }
  },
  mutations:{
    ADD_REVIEW(state,review){
      state.reviews.push(review);
    },
    SET_REVIEW(state,review){
      state.reviews = review;
    }
  }
}