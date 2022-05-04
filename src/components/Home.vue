<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
              <router-link :to="{name: 'login'}" class="link-router p-4">Login</router-link>
              <router-link :to="{name: 'registry'}" class="link-router p-4">Registry</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    let token = localStorage.getItem('data');
    if (token) {
      this.user.isValid = true;
      this.$router.push('/user');
    }
    else {
      this.user.isValid = false;
    }
  },
  data() {
    return {
      user: {}
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

.link-router {
  font-size: 32px;
  font-weight: bold;
  color: white;
}
.link-router:hover {
  color: #bebdbd;
}

</style>