<template>
  <ul class="horizontal">
    <li><a class="active">Paramètres du profil <fa :icon="['fa', 'cog']" class="so"/></a></li>
    <li><router-link :to="{name: 'profilsecure', params: {id: data.userId}}">Sécurité et confidentialité <fa :icon="['fa', 'lock']" class="so"/></router-link></li>
    <li><router-link :to="{name: 'profildelete', params: {id: data.userId}}">Supprimer son compte <fa :icon="['fa', 'trash']" class="so"/></router-link></li>
    <li @click="logOut" class="deco">Déconnexion <fa :icon="['fa', 'user-xmark']" class="so"/></li>
    <li style="float: right;"><router-link :to="{name: 'feedView', params: {id: data.userId}}">Forum <fa :icon="['fa', 'comment-dots']" class="so"/></router-link></li>
  </ul>
  <div class="all">
    <h1>Bonjour {{this.data.username}}.</h1>
    <h4>Modifiez les informations d’identification de votre compte.</h4>
    <p class="info"><fa :icon="['fa', 'circle-info']" class="so-info"/>Votre nom d'utilisateur est le nom sous lequel les autres utilisateurs vous verrons et se souviendront de vous.</p>
    <div class="top">
      <div class="username">
        <h4 class="">Votre nom d'utilisateur actuel est : <br>{{this.data.username}}.</h4>
        <p>Nouveau nom d'utilisateur:</p>
        <input v-model="data.newUser" type="text" name="username" placeholder="Modifiez votre pseudo">
      </div>
    </div>
    <!-- <div v-if="errorMessage != '' ">
      <p class="error">{{errorMessage}}</p>
    </div> -->
    <button @click="change" type="button" id="submit-btn" class="btn">Enregistrer les modifications</button>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faLock, faUserXmark, faTriangleExclamation, faCircleInfo, faTrash, faCommentDots, faUser, faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
library.add(faCog, faLock, faUserXmark, faTriangleExclamation, faCircleInfo, faTrash, faCommentDots, faUser, faImage, faPaperPlane)
import axios from "axios";
export default {
  name: 'ProfilView',
  metaInfo: {
  // if no subcomponents specify a metaInfo.title, this title will be used
  title: 'Profil',
  },
  data() {
    return {
      data :{
        username: '',
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('usertoken'),
        newUser: ''
      },
    }
  },
  watch: {
    $route: {
      immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Groupomania - Profil';
        }
    }
  },
  methods: {
    change() {
      let username = {username: this.data.newUser}
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('usertoken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      if (this.data.newUser != "") {
        axios
        .put("http://localhost:3000/api/user/update" + id, username,{
          headers : headers,
        })
        .then(response => {
          console.log("Nom d'utilisateur changé", response.data);
          this.data.username = response.data.username
        })
        .catch(() => {
          window.alert("Nom d'utilisateur déjà utilisé")
        });
        
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
        console.log(this.data);
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
  margin: 66.5px 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  min-height: 463px;
}
.top{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 30px 15px 30px;
}
.username{
  padding: 0px 30px 10px;
  background-color:#022E51;
  border-radius: 5px;
  color: white;
}
.username:hover{
  background-color:#04AA6D;
}
.avatar{
  padding: 30px;
}
.so {
  padding-left: 5px;
}
.so-info{
  padding: 0px 5px;
  color: #04AA6D;
  font-size: 20px;
}
#submit-btn{
  cursor: pointer;
  color: white;
  background-color: #022E51;
  padding: 15px;
  border-style: none;
  border-radius: 4px;
}

#submit-btn:hover{
  background-color:#04AA6D;
}

.username input{
  height: 30px;
    box-shadow: 2px 2px 8px 5px rgba(0, 0, 0, 0.247);
    border-style: none;
    border-radius: 4px;
    margin: 0px 16px 16px 16px;
}
@media (min-width: 0px) and (max-width: 909px) {

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