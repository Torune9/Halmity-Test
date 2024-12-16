<template>
  <MainLayout>
    <template #content>
      <div class="flex flex-col h-screen w-full justify-center items-center">
        <h1 class="text-xl font-bold mb-4">Create Appointment</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4 w-96 flex flex-col">
          <div class="flex flex-col gap-2">
            <label for="title" class="block text-sm font-medium">Title</label>
            <input v-model="payload.title" type="text" id="title" placeholder="Type here" class="input input-bordered"
              required />
          </div>

          <div class="flex flex-col gap-2">
            <label for="start" class="block text-sm font-medium">Start Time</label>
            <input v-model="payload.start" type="datetime-local" id="start" class="input input-bordered" required />
          </div>

          <div class="flex flex-col gap-2">
            <label for="end" class="block text-sm font-medium">End Time</label>
            <input v-model="payload.end" type="datetime-local" id="end" class="input input-bordered" required />
          </div>

          <div class="flex flex-col gap-2">
            <select class="select select-bordered" multiple v-model="payload.participants">
              <option v-for="user of users" :value="user.id" class="mt-4 bg-white/5 rounded p-1 hover:bg-white/10">
                  {{ user.name }}
              </option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">
            Create Appointment
          </button>
        </form>
        <router-link to="/appointments">
          <small>back</small>
        </router-link>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { appointmentStore } from '../../store/appointmentStore';
import { useRoute, useRouter } from 'vue-router';

const store = appointmentStore()

const users = ref([])
const router = useRouter()

const payload = reactive({
  title: '',
  userId: store.getUserData.user.id,
  start: '',
  end: '',
  participants: [],
})

const handleSubmit = async () => {
  try {

    const response = await store.createAppointment(payload)
    if(response.code == 201){
        return router.replace('/appointments')
    }
    console.log(response)

  } catch (error) {
    console.log(error)
  }
};

const getUser = async ()=>{
  try {
    const response =  await store.getUsers(store.getUserData.user.id)
    users.value = response.users
  } catch (error) {
    console.log(error);
    
  }
}

onMounted(()=>{
  getUser()
})
</script>
