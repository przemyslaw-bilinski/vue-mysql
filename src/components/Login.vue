<template>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase login-header">Login</h2>
                <p class="text-white-50 mb-5">Please enter your login and password!</p>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input" type="email" v-model="email"/>
                  </div>
                  <span class="error" v-if="v$.email.$error">
                    {{ v$.email.$errors[0].$message}}
                  </span>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input" type="password" v-model="password"/>
                  </div>
                </div>
                <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                <button class="btn btn-outline-light btn-lg px-5" type="submit" @click="login">Login</button>
              </div>
              <div>
                <p class="mb-0">Don't have an account?
                    <router-link :to="{name: 'registry'}" class="link-router text-white-50 fw-bold">Sign up</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--  </section>-->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import useValidate from "@vuelidate/core";
import { required, email} from '@vuelidate/validators';

const TITLE_ERROR = 'Error';
const TITLE_SUCCESS = 'Success';
const ICON_ERROR = 'error';
const ICON_SUCCESS = 'success';
const LOGIN_ERROR = 'User not found or password is incorrect';

export default {
  name: "Login",
  created() {
    let token = localStorage.getItem('data');
    if (token){
      this.$router.push('/user');
    }
  },
  data() {
    return {
      v$: useValidate(),
      email: '',
      password: ''
    }
  },
  validations() {
    return {
      email: {required, email},
      password: {required}
    }
  },

  methods: {
    async login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const response = await axios.post('login', {
          email: this.email,
          password: this.password
        })
        if (response.data.user.Id) {
          Swal.fire({
            icon: ICON_SUCCESS,
            title: TITLE_SUCCESS
          });
          console.log('response.data.token ', response.data.token);
          if (response.data.token) {
            localStorage.setItem('data', JSON.stringify({
              token: response.data.token,
              user: response.data.user
            }));
            this.$router.go(0);
            this.$router.push({name: 'user'});
          }
        } else {
          Swal.fire({
            icon: ICON_ERROR,
            title: TITLE_ERROR,
            text: LOGIN_ERROR
          });
        }
      }
    }
  }
}
</script>

<style scoped>

.card {
  border: 1px solid rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
}

.login-header {
  font-size: 4vh;
}
.label {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  color: white;
  text-align: left;
}
.input {
  width: 80%;
  background-color: #262626;
  color: white;
}

.error {
  color: #f13030;
}
</style>