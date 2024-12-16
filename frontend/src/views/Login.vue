<template>

   <MainLayout>
      <template #content>
         <div class="w-full h-screen flex justify-center items-center">
            <form @submit.prevent="login" method="post" class="flex flex-col gap-4 w-96">
               <div class="flex flex-col gap-2">
                  <label for="username">Username</label>
                  <input type="text" id="username" v-model="form.username" class="border outline-none h-10 p-2 rounded">
                  <small v-if="isEmpty" class="text-red-600 text-xs">username can be empty</small>
               </div>
               <button class="h-10 bg-pink-500 rounded text-white">
                  login
               </button>
            </form>
         </div>
      </template>
   </MainLayout>

</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { appointmentStore } from '../../store/appointmentStore';
import { onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue';

const form = reactive({
   username : ''
});
const router = useRouter();
const appStore = appointmentStore()

const isSubmitted = ref(false);
const isEmpty = computed(() => !form.username.trim() && isSubmitted.value);

const login = async () => {
   isSubmitted.value = true
   if (isEmpty) {
      try {
         const response = await appStore.userLogin(form)
         if (response.success) {
            router.replace('/appointments')
         }
      } catch (error) {
         console.log(error)
      }
   }
};

</script>
