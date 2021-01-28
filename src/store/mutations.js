export default {
  add_token(state,data){
    state.token = data
  },
  remove_token(state){
    state.token = ''
  }

}