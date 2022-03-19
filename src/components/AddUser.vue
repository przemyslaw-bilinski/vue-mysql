<template>
<div class="registry-form">
  <div class="field">
    <label class="label">Name</label>
    <div class="control">
      <input class="input" type="text" v-model="name"/>
    </div>
  </div>
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
  <div class="field">
    <label class="label">Plate Number</label>
    <div class="control">
      <input class="input" type="text" v-model="plateNumber"/>
    </div>
  </div>
  <div class="control">
    <button class="button" @click="addUser">SAVE</button>
  </div>
</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';


const ER_DUP_ENTRY = 'ER_DUP_ENTRY';
const USER_DUPLICATE_NAME = 'Current user already exist in database!';
const TITLE_ERROR = 'Error';
const TITLE_SUCCESS = 'Success';
const ICON_ERROR = 'error';
const ICON_SUCCESS = 'success';
export default {
  name: "AddUser",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      plateNumber: ''
    }
  },
  methods: {
   async addUser() {
      try {
       const response = await axios.post('http://localhost:5000/users', {
         Id: uuidv4(),
         Name: this.name,
         Email: this.email,
         Password: this.password,
         PlateNumber: this.plateNumber,
         CreatedDate: new Date()
        });
       if(response.data.code === ER_DUP_ENTRY){
      Swal.fire({
        icon: ICON_ERROR,
        title: TITLE_ERROR,
        text: USER_DUPLICATE_NAME
      });
       }
       else {
         Swal.fire({
           icon: ICON_SUCCESS,
           title: TITLE_SUCCESS
         });
         this.name = '';
         this.email = '';
         this.password = '';
         this.plateNumber = '';
         this.$router.push({name: 'User', params: {name: this.name, email: this.email}});
       }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  }
}
</script>

<style scoped>
.registry-form {
  border: 2px solid black;
  padding: 50px;
  width: 50%;
  margin-left: auto;
  margin-right:auto;
}

</style>