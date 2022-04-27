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
  async created() {
    let token = localStorage.getItem('data');
    if (token){
      const response = await axios.get('user',{
        headers: {
          Authorization: localStorage.getItem('data')
        }
      });
      console.log('response in user ', response);
      if(response.data) {
        this.$router.push('/user');
      }
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
 /* computed: {
    loggedIn() {
      console.log('this.$store.state.auth.status.loggedIn; ', this.$store.state.auth.status);
      return this.$store.state.auth.status.loggedIn;
    }
  },*/
 /* created() {
    if (this.loggedIn) {
      this.$router.push({name:'user', params: {}});
    }
  },*/
  methods: {
    async login() {
     /* let params = {
        email: this.email,
        password: this.password
      }*/
/*
      const response = await axios.post(`http://localhost:5000/login, /${params.email}/${params.password}`);
*/
      const response = await axios.post('login', {
          email: this.email,
          password: this.password
      })
      console.log('## response ', response);
      if (response.data.user.Id) {
        Swal.fire({
          icon: ICON_SUCCESS,
          title: TITLE_SUCCESS
        });
        console.log('response.data.token ', response.data.token);
        if(response.data.token) {
          console.log('response.data ', response.data);
          localStorage.setItem('data', JSON.stringify({
            token: response.data.token,
            user: response.data.user
        }));
          this.$router.push({ name: 'user'});
        }
       // this.$router.push({ name: 'user', params: {name: response.data.user.Name, email:response.data.user.Email}} );

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