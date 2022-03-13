<template>
  <div class="login-form">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" v-model="email"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="password"/>
      </div>
    </div>
    <div class="control">
      <button class="button" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      let params = {
        email: this.email,
        password: this.password
      }
      const response = await axios.get(`http://localhost:5000/users/${params.email}/${params.password}`);
      console.log('## response ', response);
      if (response.data.Id) {
        console.log('user logged in!');
        Swal.fire({
          icon: 'success',
          title: 'Success'
        });
        this.$router.push('/user');
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
.login-form {
  border: 2px solid black;
  padding: 50px;
  width: 50%;
  margin-left: auto;
  margin-right:auto;
}
</style>