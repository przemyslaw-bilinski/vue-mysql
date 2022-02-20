<template>
    <div>
      <router-link :to="{name: 'Add'} ">Add new user</router-link>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Home",
  created() {
    this.getUsers();
    this.getUser();
  },
  methods: {
    async getUsers(){
      const response = await axios.get('http://localhost:5000/users');
      console.log('response ', response);
    },
    async getUser(){
      let params = {
        username: 'Przemek',
        password: 'test1234'
      }
      const response = await axios.get(`http://localhost:5000/users/${params.username}/${params.password}`);
      console.log('login as Przemek ', response);
      if(response.data.Id > 0 ){
        console.log('user logged in!');
        Swal.fire({
          icon: 'success',
          title: 'Success'
        });
        // open specific page when user log in!
        this.$router.push('/add');
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'User not found or password is incorrect'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>