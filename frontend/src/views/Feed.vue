<template>
<section class="body">
  <ul class="horizontal">
    <li @click="logOut" class="deco">Déconnexion <fa :icon="['fa', 'user-xmark']" class="so"/></li>
    <li style="float: right;"><router-link :to="{name: 'profil', params: {id: userId}}">Profil<fa :icon="['fa', 'user']" class="so"/></router-link></li>
  </ul>
  <section class="all">
    <div class="form">
      <textarea v-model="message" class="textarea" placeholder="Quoi de neuf ?"></textarea>
      <div class="button-form">
        <input id="input_file" class="input-file" type="file" accept="jpeg, jpg, gif, png" v-on:change="getImage()">
        <label for="input_file" class="label-file"><fa :icon="['fa', 'image']" class="so-button" type="file" /></label>
        <fa @click="sendArticle" :icon="['fa', 'paper-plane']" class="so-button"/>
      </div>
    </div>
  </section>
  <section class="articles">
    <div class="card_article" v-for="article in articles" :key="article.id">
      <div class="card_top">
        <div class="card_username">
          {{article.User.username}}
        </div>
        <p>Posté le: {{formatDate(article.createdAt)}}</p>
        <div v-if="article.userId == userId || isAdmin">
            <fa @click="deleteArticle(article.id, article.image)" :icon="['fa', 'trash']" class="so-card"/>
        </div>
      </div>
      <div class="message">
      {{article.message}}
      </div>
      <a :href="article.image"><img :src = "article.image" :alt="article.image"></a>
    </div>
  </section>
</section>
</template>

<script>
import moment from 'moment';
import axios from "axios";
export default {
  name: 'ProfilView',
  data() {
    return {
      userId: parseInt(localStorage.getItem('userId')),
      token: localStorage.getItem('usertoken'),
      user:localStorage.getItem('user'),
      message:'',
      image:'',
      createdAt:'',
      id: null,
      isAdmin: false,
      articles:[],
    }
  },
  watch: {
    $route: {
      immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Groupomania - Feed';
        }
    }
  },
  methods: {
    getImage() {
      this.image = event.target.files[0];
      console.log(this.image);
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
        this.username = res.data.username
        this.isAdmin = res.data.isAdmin
        console.log(res);
      })
      .catch(error => console.log({error}));
    },
    logOut() {
      const self = this
      localStorage.clear()
      console.log(localStorage);
      self.$router.push({name: "login"})
    },
    sendArticle(){
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('usertoken');
      let article = { 
        message: this.message,
        username: this.user,
        image: this.image
        }
      console.log(article);
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
      if (this.message != '')
      axios.post("http://localhost:3000/api/article/create"+id, article, {
        headers: headers,
      })
      .then(response => {
        console.log("Article posté !", response);
        document.location.reload();
      })
      .catch(function(error) {console.log(error)});
    },
    formatDate(date){
      return moment(date).format('DD-MM-YYYY à HH:mm')
    },
    getAll(){
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('usertoken');
      const header = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
      axios.get("http://localhost:3000/api/article/"+id, header)
      .then(res => {
          const data = res.data;
          this.articles = data;
          console.log(data);
      })
      .catch(error => console.log({error}));
    },
    deleteArticle(id, image){
      const articleId = id;
      const articleImage = {image: image};
      console.log(articleImage);
      const token = localStorage.getItem('usertoken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios
      .delete("http://localhost:3000/api/article/"+ articleId, {
        headers : headers,
      })
      .then(() => {
        alert('Le post à bien été supprimé!');
        document.location.reload();
      })
      .catch(error => console.log(error));
    }
},
  mounted() {
    this.getAll();
    this.getUser()
  }
}
</script>

<style scoped>
.body{
  min-height: 644px;
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
.so {
  padding-left: 5px;
}
.all {
  display: flex;
  justify-content: center;
}
.form{
  width: 500px;
  padding: 20px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-bottom: 1px solid #022e51;
}
.textarea{
  border: 2px solid #022e51;
  height:90px;
  width: 500px;
  resize: none;
  display: flex;
  align-self: center;
  border-radius: 5px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1.5em;
}
.textarea:focus-visible{
  outline: 2px solid #04AA6D;
  border-color: transparent;
  font-size: 1.5em;
  color: #022e51;
}
.textarea::placeholder {
  color: #022e51 ;
}
.textarea:focus::placeholder { 
  opacity: 0; 
}
.button-form{
  display:flex;
}
.label-file {
    cursor: pointer;
    color: #00b1ca;
    font-weight: bold;
}
.label-file:hover {
    color: #25a5c4;
}

.input-file {
    display: none;
}
.so-button{
  padding: 10px;
  font-size: 22px;
  flex-direction: row;
  color: #022E51;
  cursor: pointer;
}
.so-button:hover{
  color: #04AA6D;
}
.articles{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 40px;
}
.card_article{
  border: 2px solid #022e51;
  width: 500px;
  margin: 0px 0px 40px 0px;
  border-radius: 5px;
  font-weight: 600;
  color: #022e51;
}
.card_article:hover{
  border: 2px solid #04AA6D;
}
.card_article:hover .message {
  border-top: 2px solid #04AA6D;
}
.card_article img {
  width: 99%;
}
.card_top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #022E51;
  color: white;
}
.card_top .so {
 padding: 10px;
}
.card_username{
  padding: 10px;
}
.so-card {
  padding: 10px;
  font-size: 22px;
  flex-direction: row;
  color: #ffffff;
  cursor: pointer;
}
.so-card:hover{
  color: #04AA6D;
}
.message{
  width: 100%;
  border-top: 2px solid #022e51;
  margin: 0px;
  padding: 20px 0px;
}
@media (min-width: 0px) and (max-width: 595px) {

.form {
  width: 300px;
}
.textarea{ 
  width: 300px;
}
.card_article{ 
  width: 300px;
}
}
</style>
