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

const TITLE_ERROR = 'Error';
const TITLE_SUCCESS = 'Success';
const ICON_ERROR = 'error';
const ICON_SUCCESS = 'success';

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
      if (response.data.Id) {
        Swal.fire({
          icon: ICON_SUCCESS,
          title: TITLE_SUCCESS
        });
       // this.$router.push('/user');
        this.$router.push({ name: 'User', params: {name: response.data.Name, email:response.data.Email}} );


      }
      else {
        Swal.fire({
          icon: ICON_ERROR,
          title: TITLE_ERROR,
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