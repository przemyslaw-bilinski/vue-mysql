<template>
    <div class="main">
<!--      <router-link :to="{name: 'Add'} ">Add new user</router-link>-->
      <button class="main-button" @click="$router.push('login')">Login</button>
      <button class="main-button" @click="$router.push('add')">Registry</button>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Home",
  created() {
    this.getUsers();
  //  this.getUser();
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
      if(response.data.Id){
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
.main {
  border: 2px black solid;
  width: 100%;
  height: 50vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
.main-button {
  width: 30vh;
  height:10vh;
  font-size: 32px;
  font-weight: bold;
  background-color: #008CBA;
  color: white;
  border-radius: 50px;
  margin: 0 50px;
  border: none;
}
.main-button:hover {
  background-color: #066787;
}

</style>