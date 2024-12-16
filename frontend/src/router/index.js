import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue';
import AppointmentList from '@/views/AppointmentList.vue';
import AppointmentForm from '@/views/AppointmentForm.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/appointments', component: AppointmentList },
    { path: '/appointments/new', component: AppointmentForm },
  ],
})

export default router
