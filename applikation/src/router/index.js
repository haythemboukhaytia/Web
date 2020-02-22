import Vue from 'vue'
import Router from 'vue-router'
import Abbrecher from '@/components/Abbrecher'
import Absolventen from '@/components/Absolventen'
import Home from '@/components/Home'
import Noten from '@/components/Noten'
import Fächer from '@/components/Fächer'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/abbrecher',
      name: 'Abbrecher',
      component: Abbrecher
    },
    {
      path: '/absolventen',
      name: 'Absolventen',
      component: Absolventen
    },
    {
      path: '/noten',
      name: 'Noten',
      component: Noten
    },
    {
      path: '/fächer',
      name: 'Fächer',
      component: Fächer
    }
  ]
})
