<template>
    <div class="main">
<!--      <router-link :to="{name: 'Add'} ">Add new user</router-link>-->
<!--      <button class="main-button" @click="$router.push('login')">Login</button>-->
      <router-link :to="{name: 'login'}" class="link-router" >Login</router-link>
<!--      <button class="main-button" @click="$router.push('add')">Registry</button>-->
      <router-link :to="{name: 'registry'}" class="link-router">Registry</router-link>
    </div>
</template>

<script>
export default {
  name: "Home",

}
</script>

<style scoped>
.main {
  border: 2px black solid;
  width: 100%;
  height: 50vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
.link-router {
  font-size: 32px;
  font-weight: bold;
  color: #404B4F;
  margin-left: 10vh;
}
.link-router:hover {
  color: #121516;
}

</style>