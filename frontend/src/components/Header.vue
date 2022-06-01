<template>
  <!--Header-->
  <header>
    <router-link to="/">
      <img src="../assets/Logo/icon-left-font-monochrome-white.png" alt="GROUPOMANIA LOGO">
    </router-link>
  </header>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HeaderView',
  props: {
      text: String,
  },
  components: {
    
  }
}
</script>

<style scoped>
header {
  background-color: #022E51;
}
img {
  width: 100px;
  height: 100px;
  zoom: 200%;
  object-fit: cover;
}
</style>