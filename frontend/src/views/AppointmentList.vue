<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col gap-4 p-4 box-border">
        <h1 class="text-center text-xl font-bold">List Appointments</h1>
        <router-link to="/appointments/new">
          <button type="button" class="btn btn-accent w-32">
            Add
         </button>
        </router-link>
        <div class="overflow-x-auto">
          <table class="table" v-if="appointments.length > 0">
            <!-- head -->
            <thead>
              <tr>
                <th>Start</th>
                <th>Title</th>
                <th>Invited</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="appointment of appointments">
                <td>
                  <div class="font-bold">{{formatDate(appointment.start)}}
                  </div>
                </td>
                <td>
                  {{ appointment.title }}
                </td>
                <td>
                  <p v-for="user of appointment.participants" class=" bg-white/10 p-1 mb-2 text-center rounded text-yellow-400">
                    {{ user.name }}
                  </p>
                  <p v-if="appointment.participants.length == 0">
                    no users invited
                  </p>
                </td>
                <th>
                  <div class="font-bold">{{formatDate(appointment.end)}}
                  </div>
                </th>
              </tr>
            </tbody>
            
          </table>
          <p class="text-center" v-else>Not Available Appointment</p>
        </div>
      </div>
    </template>
  </MainLayout>

</template>
<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { appointmentStore } from '../../store/appointmentStore';
import { onMounted, ref } from 'vue';
const store = appointmentStore()

const appointments = ref([])

const getAppointments = async () =>{
  try {
   const response =  await store.getAppointment(store.getUserData.user.id)
   const {datas} = response
   appointments.value = datas
   console.log(appointments.value);
   
  } catch (error) {
    console.log(error)
  }
}

const formatDate = (date)=>{
  return new Date(date).toLocaleString();
}

onMounted(()=>{
  getAppointments()
})

</script>