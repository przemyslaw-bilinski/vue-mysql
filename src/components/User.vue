<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-6">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
            <div class="mb-md-5 mt-md-4 pb-5">
              <div class="body-container">
                <ul class="nav nav-tabs">
                  <li class="navbar-item">
                    <button class="btn btn-outline-light" @click="setActive(tabs[0])">{{ tabs[0].label }}</button>
                  </li>
                  <li class="navbar-item">
                    <button class="btn btn-outline-light" @click="setActive(tabs[1])">{{ tabs[1].label }}</button>
                  </li>
                </ul>
                <template v-if="activeTab.id === 0">
                  <h2 class="fw-bold mb-2 text-uppercase login-header mt-4">Your messages</h2>
                  <table class="table table-striped table-dark">
                    <thead class="table-head">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Message</th>
                    <th scope="col">Recipient</th>
                    <th scope="col">Created date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="message in messages" v-bind:key="message.Id">
                    <th scope="row" class="has-text-white">{{message.Id}}</th>
                      <td>{{ message.Subject}}</td>
                      <td>{{ message.TextMessage}}</td>
                      <td>{{ message.Recipient}}</td>
                      <td>{{ message.CreatedDate}}</td>
                    </tr>
                    </tbody>
                  </table>
                </template>
                <template v-if="activeTab.id === 1">
                  <h2 class="fw-bold mb-2 text-uppercase login-header mt-4">Send a nice message</h2>
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
                  </div>
                </div>
                <button class="btn btn-outline-light btn-lg px-5 mt-5" type="submit" @click="sendEmail">Send Message
                </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
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
const USER_DOESNT_EXISTS = 'User does not exists in database';
const EMAIL_HAS_BEEN_SENT = 'Email has been sent!';
const PLATE_NUMBER_CANNOT_BE_EMPTY = 'Plate Number cannot be empty!';

export default {
  name: "User",
  async created() {
    this.activeTab = this.tabs[0];
    let token = localStorage.getItem('data');
    if (token){
      const response = await axios.get('user',{
        headers: {
          Authorization: localStorage.getItem('data')
        }
      });
      const tokenObj = JSON.parse(token);
      if (tokenObj && tokenObj.user && tokenObj.token) {
        this.name = tokenObj.user.Name;
        this.sender = tokenObj.user.Email;
        this.messages = response.data.Messages ? JSON.parse(response.data.Messages) : [];
      }
    }
    else {
      this.$router.push('/');
    }
  },
  data() {
    return {
      name: '',
      sender: '',
      subject: '',
      message: '',
      plateNumber: '',
      messages: [],
      tabs: [
        {
          name: 'Messages',
          label: 'Your messages',
          id: 0
        },
        {
          name: 'sendMessage',
          label: 'Send message',
          id: 1
        }
      ],
      activeTab: {}
    }
  },
  methods: {
    setActive(tab){
      this.activeTab = tab;
      console.log('tab ', tab);
    },
    async sendEmail() {
      if (!this.plateNumber) {
        Swal.fire({
          icon: ICON_ERROR,
          title: TITLE_ERROR,
          text: PLATE_NUMBER_CANNOT_BE_EMPTY
        });
        return;
      }
      const response = await axios.get('email', {
        headers: {
          PlateNumber: this.plateNumber
        }
      });
      if (response.data.Id) {
        const emailSentResponse = await axios.post('send', {
          sender: this.sender,
          recipient: response.data.Email,
          subject: this.subject,
          message: this.message
        });
        if (emailSentResponse.data.statusCode === 200) {
          Swal.fire({
            icon: ICON_SUCCESS,
            title: TITLE_SUCCESS,
            text: EMAIL_HAS_BEEN_SENT
          });
          this.messages.push({
            Id: this.messages.length + 1,
            Recipient: response.data.Email,
            CreatedDate: new Date().toLocaleString(),
            Subject: this.subject,
            TextMessage: this.message
          });
          this.plateNumber = '';
          this.subject = '';
          this.message = '';
          const updateResponse = await axios.post('update', {
            Email: this.sender,
            Messages: JSON.stringify(this.messages)
          });
          if(updateResponse) {
            this.$router.go(0);
          }
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
          text: USER_DOESNT_EXISTS
        });
      }
    }
  }
}
</script>

<style scoped>

.card {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
}
table {
  table-layout:fixed;
}

thead th{
  color: white;
}
td {
  word-break: break-all !important;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: white;
}

.login-header {
  font-size: 4vh;
}

.body-container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.label {
  color: white;
  text-align: left;
}
.input {
  background-color: #262626;
  color: white;
}
.navbar-item {
  padding-left: 0;
}

</style>