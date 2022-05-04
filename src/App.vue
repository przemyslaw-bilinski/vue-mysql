<template>
  <div class="navbar navbar-expand navbar-dark bg-dark fixed-top">
    <div class="container">
      <a href="#" class="navbar-brand">
        <p class="logo p-1">nicessage</p>
      </a>
      <div class="collapse navbar-collapse">
        <template v-if="user.isValid">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link :to="{name: 'user'}" class="nav-link">{{user.name}}</router-link>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-light" @click="logOut">Log out</button>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'registry'}" class="nav-link">Registry</router-link>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
  <section class="vh-100 gradient-custom" id="app">
    <router-view/>
<!--    <home></home>-->
  </section>
</template>

<script>
/*import Home from './components/Home.vue';*/
export default {
  name: 'App',
  created() {
    this.getUser();
  },
 /* render() {
   return this.getUser();
  },*/
  data(){
    return {
      user: {
        isValid: false,
        name: ''
      }
    }
  },
  methods: {
    getUser() {
      let token = localStorage.getItem('data');
      const tokenObj = JSON.parse(token);
      if (tokenObj && tokenObj.user && tokenObj.token) {
        this.user.name = tokenObj.user.Name;
        this.user.isValid = true;
        console.log('user ', this.user);
      }
      else {
        this.user = '';
      }
      return this.user;
    },
    logOut(){
      localStorage.removeItem('data');
      this.$router.push('/');
      this.$router.go(0);
    }
  }
}
</script>

<style>
@import "~bulma/css/bulma.css";
@font-face{
  font-family: 'JetBrainsMono';
  src: url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Regular.woff2') format('woff2'),
  url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-Regular.woff') format('woff'),
  url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/ttf/JetBrainsMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

.gradient-custom {
  /* fallback for old browsers */
 /* background: #6a11cb;*/
  background: #43649e;
  padding-right: 0 !important;

/*
  !* Chrome 10-25, Safari 5.1-6 *!
  background: -webkit-linear-gradient(to right,rgba(37, 117, 252, 1), rgb(203, 150, 17));

  !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!
  background: linear-gradient(to right,rgba(37, 117, 252, 1), rgb(203, 150, 17));*/
}

.swal2-shown {
  overflow: unset !important;
  padding-right: 0 !important;
}
.logo:hover {
  color: #bebdbd;
}

.nav-link {
  color: white;
}

.navbar-brand {
  font-family: 'JetBrainsMono',serif;
}
</style>
