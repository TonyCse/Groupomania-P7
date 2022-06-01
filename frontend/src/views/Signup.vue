<template>
  <div id="signupForm">
      <h3>S'inscrire</h3>
      <div class="form">
          <input v-model="formdata.username" type="text" name="username" placeholder="Pseudo">
          <input v-model="formdata.email" type="email" name="email" placeholder="Email">
          <input v-model="formdata.password" type="password" name="password" placeholder="Mot de passe">
          <button @click="sendForm" type="button" class="btn">Je m'inscris !</button>
      </div>
      <p>Vous possédez déjà un compte ? Cliquez ici: 
      <router-link to="/login">Connexion</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignupView',
  
  data: () => {
    return {
      formdata: {
        username: null,
        email: null,
        password: null,
      },
    }   
  },

  watch: {
    $route: {
      immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Groupomania - S\'inscrire';
        }
    }
  },
  methods: {
    // Fonction d'inscription
    sendForm() {
      /* eslint-disable no-useless-escape */
      const self = this
      console.log(this.formdata);
      // console.log(regexEmail);
      // console.log(regexEmail.test(email));
      if (this.formdata.username == null 
      || this.formdata.email == null 
      || this.formdata.password == null 
      || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.formdata.email) == false
      )  {
          window.alert("Un des trois champs est mal rempli !")
      } else {
        let user = {
          username: this.formdata.username,
          email: this.formdata.email,
          password: this.formdata.password,
        };
        axios
        .post("http://localhost:3000/api/user/signup", user)
        .then(function(response) {
          console.log(response);
          window.alert("Inscription réussie!");
          self.$router.push({name: "login"})
        })
        .catch(function(error) {console.log(error);});
      }
    }
  }
}
</script>

<style scoped>
#signupForm {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin: 127px;
}
h3 {
  color: #022E51;
}
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
}
input, .btn {
  margin: 0.8rem;
  padding: 10px;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  border-style: none;
  border-radius: 4px;
  outline: none;
}
input:hover {
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 18%);
}
.btn {
  cursor: pointer;
  color: white;
  background-color: #022E51;
  margin: 2rem;
}
.btn:hover {
    background-color: #04AA6D;
    color: white;
}
@media (min-width: 0px) and (max-width: 500px) {
  #signupForm{ 
    min-height: 535px;
    margin: 0px;
  }
  .form {
    width: 250px;
  }
  p {
    white-space: normal;
  }
}
</style>