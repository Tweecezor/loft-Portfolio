export default{
  namespaced:true,
  state:{
    works:[]
  },
  actions:{
    async addWork(store,newWork){
      alert("АКШОН В РАБОТЕ")
      try{
        const response = await this.$axios.post('/works',newWork);
        console.log(response.data);
        store.commit("ADD_SKILL",response.data);
      } catch(error){
        alert(error.message);
        consoel.log(error.message);
      }
    }
  },
  mutations:{

  }
}