<template>
    <div id="loginForm">
        <h3>Connexion</h3>
        <form>
            <input v-model="logindata.email" type="email" name="email" placeholder="Email">
            <input v-model="logindata.password" type="password" name="password" placeholder="Mot de passe">
            <button @click="logIn" type="button" class="btn">Connexion !</button>
        </form>
        <h4></h4>
        <p>Vous n'avez pas encore de compte ? Cliquez ici: <router-link to="/signup">S'inscrire</router-link></p>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'LoginView',

    data: () => {
        return {
            logindata: {
                email: "",
                password: ""
            },
        }
    },
    watch: {
    $route: {
      immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Groupomania - Se connecter';
        }
    }
  },
    methods: {
    logIn() {
        const self = this
        if (this.logindata.email === null || this.logindata.password === null) { 
            window.alert("N'oubliez pas d'entrer votre pseudo, votre e-mail et un mot de passe svp")
        } else {
            let user = {
                email: this.logindata.email,
                password: this.logindata.password,
            }
            axios
            .post("http://localhost:3000/api/user/login", user)
            .then(function(response) {
            console.log(response);
            localStorage.setItem('usertoken', response.data.token);
            localStorage.setItem('userId', parseInt(response.data.user.id));
            localStorage.setItem('user', response.data.user.username)
            console.log(user);
            console.log(localStorage);
            self.$router.push({name: "profil", params:{id: parseInt(response.data.user.id)}})
            })
            .catch(error => console.log(error));
        }
    }
  }
}
</script>


<style scoped>
#loginForm {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    min-height: 644px;
}
h3 {
    color: #022E51;
}
form {
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
  #loginForm{ 
    min-height: 535px;
  }
  form {
    width: 250px;
    display: flex;
    align-items: center;
  }
  input{ 
      width: 200px;
      display: flex;

  }
}

</style>