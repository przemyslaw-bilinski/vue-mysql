<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase login-header">Sign up</h2>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="name"/>
                </div>
                <span class="error" v-if="v$.name.$error">
                    {{ v$.name.$errors[0].$message}}
                  </span>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" required v-model="email"/>
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
                <span class="error" v-if="v$.password.$error">
                    {{ v$.password.$errors[0].$message}}
                  </span>
              </div>
              <div class="field">
                <label class="label">Plate Number</label>
                <div class="control">
                  <input class="input" type="text" v-model="plateNumber"/>
                </div>
                <span class="error" v-if="v$.plateNumber.$error">
                    {{ v$.plateNumber.$errors[0].$message}}
                  </span>
              </div>
              <button class="btn btn-outline-light btn-lg px-5 mt-5" type="submit" @click="addUser">Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import useValidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

const ER_DUP_ENTRY = 'ER_DUP_ENTRY';
const USER_DUPLICATE_NAME = 'Current user already exist in database!';
const TITLE_ERROR = 'Error';
const TITLE_SUCCESS = 'Success';
const ICON_ERROR = 'error';
const ICON_SUCCESS = 'success';
export default {
  name: "AddUser",
  created() {
    let token = localStorage.getItem('data');
    if (token) {
      this.$router.push('/user');
    }
  },
  data() {
    return {
      v$: useValidate(),
      name: '',
      email: '',
      password: '',
      plateNumber: ''
    }
  },
  validations() {
    return {
      name: {required},
      password: {required, minLength: minLength(6)},
      plateNumber: {required},
      email: {required, email}
    }
  },
  methods: {
    async addUser() {
      console.log('this.v$ ', this.v$);
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('http://localhost:5000/registry', {
            Id: uuidv4(),
            Name: this.name,
            Email: this.email,
            Password: this.password,
            PlateNumber: this.plateNumber,
            CreatedDate: new Date()
          });
          if (response.data.code === ER_DUP_ENTRY) {
            Swal.fire({
              icon: ICON_ERROR,
              title: TITLE_ERROR,
              text: USER_DUPLICATE_NAME
            });
          } else {
            Swal.fire({
              icon: ICON_SUCCESS,
              title: TITLE_SUCCESS
            });
            this.name = '';
            this.email = '';
            this.password = '';
            this.plateNumber = '';
            if (response.data.token) {
              localStorage.setItem('data', JSON.stringify({
                token: response.data.token,
                user: response.data.user
              }));
              this.$router.push({name: 'user'});
            }
          }
        } catch (error) {
          console.error('Error: ', error);
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