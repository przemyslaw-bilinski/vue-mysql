<template>
<div>
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="text" v-model="username"/>
    </div>
  </div>
  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" v-model="email"/>
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
export default {
  name: "AddUser",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      plateNumber: ''
    }
  },
  methods: {
   async addUser() {
      try {
       const response = await axios.post('http://localhost:5000/users', {
          Name: this.username,
          Email: this.email
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
         this.username = '';
         this.email = '';
       }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  }
}
</script>

<style scoped>

</style>