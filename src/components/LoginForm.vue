<template>
  <h2>Login</h2>
  <p class="error">{{ error }}</p>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useLogin } from "../composables/useLogin";

export default {
  emits: ['login'],
  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const { error, login } = useLogin();

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);

      if (!error.value) {
        context.emit("login");
      }
    };

    return { error, email, password, handleSubmit };
  },
};
</script>

<style>
</style>