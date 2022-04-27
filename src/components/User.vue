<template>
  <div class="user-form">
    <div class="header">
      <p class="login-header">Logged as {{ name }}</p>
    </div>
    <div class="field">
      <label class="label">Plate Number</label>
      <div class="control">
        <input class="input" type="text" v-model="plateNumber"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Subject</label>
      <div class="control">
        <input class="input" type="text" v-model="subject"/>
      </div>
    </div>
    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="input" v-model="message"></textarea>
<!--        <input class="input" type="text-area" v-model="message"/>-->
      </div>
    </div>
    <div class="control">
      <button class="button" @click="sendEmail">Send Message</button>
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
  name: "User",
  async created() {
    let token = localStorage.getItem('data');
    if (token) {
      const response = await axios.get('user', {
        headers: {
          Authorization: localStorage.getItem('data')
        }
      });
      console.log('response in user ', response);
      if (!response.data) {
        this.$router.push('/');
      } else {
        this.name = response.data.Name;
        this.sender = response.data.Email;
      }
    }
  },
  /*props: ['name', 'sender'],*/
  data() {
    return {
      name: '',
      sender: '',
      subject: '',
      message: '',
      plateNumber: ''
    }
  },
  methods: {
    async sendEmail() {
      console.log('## this.plateNumber ', this.plateNumber);
      if (this.plateNumber === '') {
        Swal.fire({
          icon: ICON_ERROR,
          title: TITLE_ERROR,
          text: 'Plate Number cannot be empty!'
        });
        return;
      }
      let params = {
        plateNumber: !(this.plateNumber === '') ? this.plateNumber : null
      }
      const response = await axios.get(`/users/${params.plateNumber}`);
      console.log('## response.data ', response.data);
      if (response.data.Id) {
        let messageParams = {
          sender: this.sender,
          recipient: response.data.Email,
          subject: this.subject,
          message: this.message
        };
        console.log('## messageParams ', messageParams);
        const emailSentResponse = await axios.post(`http://localhost:5000/send/${messageParams.sender}/${messageParams.recipient}/${messageParams.subject}/${messageParams.message}`);
        console.log('## emailSentResponse ', emailSentResponse);
        if (emailSentResponse.data.statusCode === 200) {
          Swal.fire({
            icon: ICON_SUCCESS,
            title: TITLE_SUCCESS,
            text: 'Email has been sent!'
          });
          this.plateNumber = '';
          this.subject = '';
          this.message = '';
        }
        else {
          Swal.fire({
            icon: ICON_ERROR,
            title: TITLE_ERROR,
            text: emailSentResponse.data.responseMessage
          });
        }
      }
      else {
        Swal.fire({
          icon: ICON_ERROR,
          title: TITLE_ERROR,
          text: 'User is not exists in database'
        });
      }
    }
  }
}
</script>

<style scoped>
.user-form {
  border: 2px solid black;
  padding: 50px;
  width: 50%;
  margin-left: auto;
  margin-right:auto;
}
.header {
  text-align: left;
  margin-bottom: 5vh;
}
.login-header {
  font-size: 2vh;
  font-weight: bold;
}
</style>