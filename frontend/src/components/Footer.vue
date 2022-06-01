<template>
  <!--Footer-->
  <footer>
    <div class="footer-container">
      <div class="social">
        <a href="">
          <fa :icon="['fab', 'facebook']" class="so"/>
        </a>
        <a href="">
          <fa :icon="['fab', 'twitter']" class="so"/>
        </a>
        <a href="">
          <fa :icon="['fab', 'github']" class="so"/>
        </a>
      </div>
      <div id="foot">
        © 2022 Copyright CONNECT-E - Groupomania
      </div>
    </div>
  </footer>
</template>

<script>
// importation fontawesome logo réseaux sociaux.
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faFacebook, faTwitter, faGithub)
export default {
  name: "FooterView",
};
</script>


<style scoped>
.footer-container{
  background-color: #022E51;
}
.so{
  height: 50px;
  width: 30px;
  color: rgb(255, 255, 255);
  padding: 0px 20px;
}
.social{
  padding: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
#foot {
  color: #fff;
  padding: 6px 0px 5px;
}
</style>