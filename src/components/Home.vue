<template>
    <div>
      TEST 123
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers(){
      const response = await axios.get('http://localhost:5000/users');
      console.log('response ', response);
    }
  }
}
</script>

<style scoped>

</style>