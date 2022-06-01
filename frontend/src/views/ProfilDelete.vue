<template>
    <ul class="horizontal">
    <li><router-link :to="{name: 'profil', params: {id: data.userId}}">Paramètres du profil <fa :icon="['fa', 'cog']" class="so"/></router-link></li>
    <li><router-link :to="{name: 'profilsecure', params: {id: data.userId}}">Sécurité et confidentialité <fa :icon="['fa', 'lock']" class="so"/></router-link></li>
    <li><a class="active">Supprimer son compte <fa :icon="['fa', 'trash']" class="so"/></a></li>
    <li @click="logOut" class="deco">Déconnexion <fa :icon="['fa', 'user-xmark']" class="so"/></li>
    <li style="float: right;"><router-link :to="{name: 'feedView', params: {id: data.userId}}">Forum <fa :icon="['fa', 'comment-dots']" class="so"/></router-link></li>
    </ul>
    <div class="all">
      <div class="top">
        <h1>Ceci supprimera votre compte.</h1>
        <p><fa :icon="['fa', 'triangle-exclamation']" class="so-alerte"/>Vous vous apprêtez à lancer la procédure de suppression de votre compte Groupomania.<fa :icon="['fa', 'triangle-exclamation']" class="so-alerte"/>
            <br> Votre nom d'affichage, vos posts et votre profil public ne seront plus visibles sur Groupomania.com.
        </p>
      </div>
      <div class="mid">
        <h2>Ce que vous devez aussi savoir</h2>
        <p>Certaines informations de compte peuvent encore être disponibles dans les moteurs de recherche tels que Google ou Bing.</p>
        <p>Si vous voulez simplement modifier votre nom d'utilisateur, il n'est pas nécessaire de désactiver votre compte. Il suffit de l'éditer dans vos <router-link :to="{name: 'profil', params: {id: data.userId}}">Paramètres.</router-link></p>
        <p>Pour utiliser votre nom d'utilisateur ou adresse email actuels avec un autre compte Groupomania, modifiez-les avant de désactiver ce compte.</p>
      </div>
    </div>
    <div class="bot">
        <h4>Voulez vous supprimer votre compte ?</h4>
        <button @click="deleteUser" type="button" id="submit-btn" class="btn">Supprimer mon compte</button>
        <p></p>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'ProfilView',
  data() {
    return {
      data :{
        username: null,
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('usertoken'),
        user: null,
        toto: 'toto',
        newUser: '',
      },
    }
  },
  watch: {
    $route: {
      immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Groupomania - Supprimer son compte';
        }
    }
  },
  methods: {
    deleteUser(id){
      const self = this
      const userId = this.data.userId;
      console.log(id);
      const token = localStorage.getItem('usertoken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios
      .delete("http://localhost:3000/api/user/" + userId, {
        headers : headers,
      })
      .then(() => {
        alert('Votre compte à bien été supprimé !');
        localStorage.clear()
        console.log(localStorage);
        self.$router.push({name: "home"})
      })
      .catch(error => console.log(error));
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
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    margin: 100px;
}
h1, h2, h3 {
    color: #022E51;
}
h4 {
  margin: 0px 0px 15px;
}
img{
  border: solid 3px rgb(138, 138, 138);
  border-radius: 100px;
  height: 100px;
}
img:hover{
  border-color: #04AA6D;
}
.top p{
  padding: 12px;
  border: 2px solid #04AA6D;
  border-radius: 6px;
}
.mid { 
  margin: 0px 30px;
}
.mid p{
  padding: 12px;
  border: 2px solid #04AA6D;
  border-radius: 6px;
}
.bot p{
  padding: 4px;
}
.so-alerte{
  padding: 0px 5px;
  color: #04AA6D;
  font-size: 20px;
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.so {
  padding-left: 5px;
}
.top{
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
  align-items: center;
  padding: 30px 30px 0px 30px;
  flex-direction: column;
}
.username{
  padding: 30px;
}
.avatar{
  padding: 30px;
}
#submit-btn{
  cursor: pointer;
  color: white;
  background-color: #022E51;
  padding: 15px;
  border-style: none;
  border-radius: 4px;
  margin-bottom: 15px;
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
}
</style>