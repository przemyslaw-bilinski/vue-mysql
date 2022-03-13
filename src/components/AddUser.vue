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
const ER_DUP_ENTRY = 'ER_DUP_ENTRY';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
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
       console.log('response ', response);
       console.log('response.data ', response.data);
       console.log('response.data.code ', response.data.code);
       console.log('ER_DUP_ENTRY ', ER_DUP_ENTRY);
       if(response.data.code === ER_DUP_ENTRY){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Current user already exist in database!'
      });
       }
       else {
         Swal.fire({
           icon: 'success',
           title: 'Success'
         });
         this.name = '';
         this.email = '';
         this.password = '';
         this.plateNumber = '';
         this.$router.push('/user');
       }
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    generateUserId() {
      console.log('uuidv4 ', uuidv4());
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