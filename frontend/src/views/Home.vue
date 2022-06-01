<template>
    <div class="container-top">
        <div class="top">
            <div class="paragraphe">
                <h1>Dynamisez les échanges, gagnez en efficacité</h1>
                <p>Le réseau social d'entreprise Groupomania simplifie le partage d'information dans votre entreprise et facilite le travail collaboratif, au quotidien.</p>
                <p>Pas encore inscrit ?</p>
                <router-link style="text-decoration: none; color: inherit;" to="/signup"><button type="button" class="btn">Cliquez ici pour rejoindre vos collaborateurs !</button></router-link>
            </div>
            <div class="media">
                <img src="../assets/homepage.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeView",
    components: {
    }, 
    data() {
        return {
            userId: localStorage.getItem("userId")
        }
    },
    watch: {
    $route: {
      immediate: true,
        handler(to) {
          document.title = to.meta.title || 'Groupomania - Accueil';
        }
    }
  },
}

</script>

<style scoped>
h1 {
    color: #022E51;
    display: flex;
    margin-top: 22px;
    margin-bottom: 0;
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
}
.container-top{
    position: static;
    display: flex;
    margin-bottom: 0;
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
}
.top {
    display: flex;
    width: 100%;
    height: 644px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
.paragraphe{
    justify-content: center;
    margin: 40px 40px 40px 100px;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
}
.btn {
  cursor: pointer;
  color: rgb(255, 255, 255);
  background-color: #022E51;
  padding: 20px;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  border-style: none;
  border-radius: 4px;
  font-size: 17px;
}
button:hover{
background-color: #04AA6D;
color: white;
}
.link, .link:hover, .link:focus, .link:active {
font-size: 22px;
color: #022E51;
text-decoration: none;
}
.media{ 
    height: 600px;
    width: 1600px;
}
@media (min-width: 1100px) and (max-width: 1500px) {
.top{ 
    width: 100%;
}
.media{ 
display: flex;
align-items: center;
}
img{ 
width: 100%;
}
}
@media (min-width: 0px) and (max-width: 1100px) {
    .media { 
       display: none;
    }
    .paragraphe {
        margin: 30px;
    }
}
</style>