import { wrapIntoFormData } from "@/helpers/forms";


export default {
  namespaced:true,
  state:{
    reviews:[],
    currentReview:{}
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
    async removeReview(store,removeReview){
      console.log(removeReview);
      try{
        const response = await this.$axios.delete(`/reviews/${removeReview.id}`)
        store.commit('REMOVE_REVIEW',removeReview);
      }catch(error){
        console.log(error.message);
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
    },
    addCurrentReview(store,currentReview){
      store.commit('ADD_CURRENT_REVIEW',currentReview);
    },
    async updateReveiw(store,updatedReview){
      console.log(updatedReview);
      const data = wrapIntoFormData(updatedReview); 
      console.log(data);
      try{
        const response = await this.$axios.post(`/reviews/${updatedReview.id}`,data);
        store.commit('UPDATE_CURRENT_REVIEW',response.data.review);
      } catch(error){
        console.log(error.message);
      }
    }
  },
  mutations:{
    ADD_REVIEW(state,review){
      state.reviews.push(review);
    },
    SET_REVIEW(state,review){
      state.reviews = review;
    },
    REMOVE_REVIEW(state,removedReview){
      state.reviews = state.reviews.filter(review=>{
        return review.id!=removedReview.id
      })
    },
    ADD_CURRENT_REVIEW(state,currentReview){
      state.currentReview = currentReview;
    },
    UPDATE_CURRENT_REVIEW(state,updateReveiw){
      state.reviews = state.reviews.map(review=>{
        return review.id===updateReveiw.id ? updateReveiw : review;
      })
    }
  }
}