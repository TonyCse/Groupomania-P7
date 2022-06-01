<template>
  <HeaderView />
    <div id="container">
      <router-view />
      <div id="dot"></div>
    </div>
  <FooterView />  
</template>

<script>
import HeaderView from "./components/Header";
import FooterView from "./components/Footer";
export default {
	name: "App",
  components: {
    HeaderView, FooterView, 
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0px
}
</style>
