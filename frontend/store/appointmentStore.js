import api from "@/services/api";

import { defineStore } from "pinia";

export const appointmentStore = defineStore("appointment", {
  persist: true,
  state: () => ({
    userData: {},
  }),
  actions: {
    async userLogin(payload) {
      try {
        const response = await api.post("/users/login", payload);
        this.userData = response.data;
        return this.userData;
      } catch (error) {
        throw error;
      }
    },

    async getUsers(userId) {
      try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async getAppointment(userId) {
      try {
        const response = await api.get(`/appointments/${userId}`)
        console.log(response)
        return response.data
      } catch (error) {
        console.log(error)
        throw error;
      }
    },

    async createAppointment(payload) {
      console.log(payload);
      try {
        const response = await api.post("/appointments", payload);
        console.log(response);
        return response.data
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  getters: {
    getUserData: (state) => state.userData,
  },
});
