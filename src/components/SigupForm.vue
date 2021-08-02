<template>
  <h2>Sign up</h2>
  <p class="error">{{ error }}</p>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="display name"
      v-model="displayName"
    />
    <input type="text" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useSignup } from "../composables/useSignup";

export default {
  emits: ['signup'],
  setup(props, context) {
    const { error, signup } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      console.log(res);

      if (!error.value) {
        context.emit("signup");
      }
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>

<style>
</style>