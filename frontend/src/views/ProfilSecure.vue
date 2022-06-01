<template>
    <ul class="horizontal">
        <li><router-link :to="{name: 'profil', params: {id: data.userId}}">Paramètres du profil <fa :icon="['fa', 'cog']" class="so"/></router-link></li>
        <li><a href="" class="active">Sécurité et confidentialité <fa :icon="['fa', 'lock']" class="so"/></a></li>
        <li><router-link :to="{name: 'profildelete', params: {id: data.userId}}">Supprimer son compte <fa :icon="['fa', 'trash']" class="so"/></router-link></li>
        <li @click="logOut" class="deco">Déconnexion <fa :icon="['fa', 'user-xmark']" class="so"/></li>
        <li style="float: right;"><router-link :to="{name: 'feedView', params: {id: data.userId}}">Forum <fa :icon="['fa', 'comment-dots']" class="so"/></router-link></li>
    </ul>
    <div class="all">
        <h1>Sécurité</h1>
        <h4>Modifiez les informations de sécurité de votre compte.</h4>
        <p class="info"><fa :icon="['fa', 'circle-info']" class="so-info"/>Ces informations sont vos identifiants afin de vous connecter au site Groupomania, vous pouvez changer votre e-mail ou votre mot de passe.</p>
        <div class="mid">
          <div class="card">
              <div class="email">
                  <p>Nouvelle adresse email: </p>
                  <input v-model="data.email" type="text" name="email" placeholder="Modifiez l'email">
              </div>
              <div class="password">
                  <p>Nouveau mot de passe: </p>
                  <input v-model="data.password" type="text" name="password" placeholder="Modifiez le mot de passe">
              </div>
          </div>
          <div class="button">
            <button @click="changeEmail" type="button" id="submit-btn" class="btn">Enregistrer l'email</button>
            <button @click="changePassword" type="button" id="submit-btn" class="btn">Enregistrer le mot de passe</button>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'ProfilSecure',
  data: () => {
    return {
      data :{
        email: "",
        password: "",
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('usertoken'),
      } 
    }
  },
  watch: {
    $route: {
      immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Groupomania - Sécurité & confidentialité';
        }
    }
  },
  methods: {
    /* eslint-disable no-useless-escape */
    changeEmail() {
      const self = this
      let userEmail = {email: this.data.email}
      console.log(this.data.email);
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('usertoken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      if (this.data.email == "" 
      || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.data.email) == false ) {
        window.alert("veuillez remplir le champ correctement") 
      } else {
        axios
        .put("http://localhost:3000/api/user/securemail" + id, userEmail, {
          headers : headers,
        })
        .then(response => {
          window.alert("Changement pris en compte", response);
          self.$router.go()
        })
        .catch(function(error) {console.log(error);});
      }
    },
    changePassword() {
      const self = this
      let userPassword = {password: this.data.password}
      console.log(this.data.password);
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('usertoken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      if (this.data.password != "") {
        axios.put("http://localhost:3000/api/user/securepassword" + id, userPassword, {
          headers : headers,
        })
        .then(response => {
          window.alert("Changement pris en compte", response);
          self.$router.go()
        })
        .catch(function(error) {console.log(error);});
      } else {
        window.alert('Veuillez remplir le champ')
      }
    },
    logOut() {
      const self = this
      localStorage.clear()
      console.log(localStorage);
      self.$router.push({name: "login"})
    },
      getUser(){
      const self = this
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('usertoken');
      if (!token) {
        self.$router.push({name: "login"})
        return
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      axios.get('http://localhost:3000/api/user/'+ id, {
        headers: headers,
      })
      .then(res => {
        console.log(res);
        this.data.username = res.data.username
        console.log(this.$data);
      })
      .catch(error => console.log({error}));
    },
  },
  mounted() {
   this.getUser()
   if (localStorage.user) {
     this.username = localStorage.user
     console.log(localStorage.user);
   }
  }
};

</script>


<style scoped>
#loginForm {
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin: 100px;
}
h1 {
    color: #022E51;
    margin: 0px;
}
a{
  margin: 0px;
  padding: 0px;
}
img{
  border: solid 3px rgb(138, 138, 138);
  border-radius: 100px;
  height: 100px;
}
img:hover{
  border-color: #04AA6D;
}
.info {
  margin: 0px 0px 45px 0px;
  padding: 12px;
  border: 2px solid #04AA6D;
  border-radius: 6px;
}
.error{
  color: #ff1100;
  font-size: 20px;
  font-weight: 700;
}
ul.horizontal {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #022E51;
    display:inline-flexbox;
    flex-wrap: wrap;
}
ul.horizontal li a {
    color: white;
    text-align: center;
    padding: 15px 16px;
    text-decoration: none;
    float: left;
}
ul.horizontal li a:hover:not(.active) {
    background-color: #04AA6D;
}

ul.horizontal li a.active {
    background-color:#04AA6D;
    cursor: pointer;
}
.deco {
  cursor: pointer;
  color: white;
  background-color: #022E51;
  padding: 15px;
  border-style: none;
  float: right;
}
.deco:hover{
  background-color:#04AA6D;
}
.all {
  margin: 70px 40px 47px 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 479px;
}
.mid{
  display: flex;
  flex-direction: column;
}
.card{
    background-color: #022E51;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    color: white;
}
.email{
    padding: 20px;
    border-right: solid 1px #000000;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.email:hover{
    background-color:#04AA6D;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.email input{
    height: 25px;
}
.email p{ 
  margin: 10px;
}
.password{
    padding: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.password p{ 
  margin: 10px;
}
.password:hover{
    background-color:#04AA6D;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
}
.password input{
    height: 25px;
}
ul .btn {
  cursor: pointer;
  color: white;
  background-color: #022E51;
  padding: 15px;
  border-style: none;
  float: right;
}
.so {
  padding-left: 5px;
}
.deco {
  cursor: pointer;
  color: white;
  background-color: #022E51;
  padding: 15px;
  border-style: none;
  float: right;
  display: flex;
}
.so-info{
  padding: 0px 5px;
  color: #04AA6D;
  font-size: 20px;
}
.info {
  margin: 0px 0px 45px 0px;
  padding: 12px;
  border: 2px solid #04AA6D;
  border-radius: 6px;
}
.deco:hover{
  background-color:#04AA6D;
}

#submit-btn{
  cursor: pointer;
  color: white;
  background-color: #022E51;
  padding: 15px;
  border-style: none;
  border-radius: 4px;
  margin: 30px;
}

.btn:hover{
  background-color:#04AA6D;
}

#submit-btn:hover{
  background-color:#04AA6D;
}

.username_input{
  height: 30px;
    box-shadow: 2px 2px 8px 5px rgba(0, 0, 0, 0.247);
    border-style: none;
    border-radius: 4px;
}
.button {
  display: flex;
  justify-content: space-around;
}
@media (min-width: 0px) and (max-width: 909px) {

.email{
  border-bottom: 1px solid black;
  border-right: none;
}

.email:hover{
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0px;
}
.password:hover{
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 5px;
}
ul.horizontal {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.username{ 
  padding: 5px;
}
}
</style>