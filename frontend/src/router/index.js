import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/Login'
import SignupView from '../views/Signup'
import HomeView from '../views/Home'
import ProfilView from '../views/Profil'
import ProfilSecure from '../views/ProfilSecure'
import ProfilDelete from '../views/ProfilDelete'
import Feed from '../views/Feed'

const routes = [
  { path: '/', name: 'home', component: HomeView, },
  { path: '/signup', name: 'signup', component: SignupView, },
  { path: '/login', name: 'login', component: LoginView, },
  { path: '/profil/:id', name: 'profil', component: ProfilView, },
  { path: '/profilsecure/:id', name: 'profilsecure', component: ProfilSecure, },
  { path: '/profildelete/:id', name: 'profildelete', component: ProfilDelete, },
  { path: '/feed/:id', name: 'feedView', component: Feed }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
