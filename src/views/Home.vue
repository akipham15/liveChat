<template>
  <div class="home container">
    <div v-if="showLogin">
      <LoginForm @login="enterChat" />
      <p>
        No account yet?
        <span class="other" @click="showLogin = !showLogin">Signup</span>
      </p>
    </div>
    <div v-else>
      <SignupForm @signup="enterChat" />
      <p>
        Already registered?
        <span class="other" @click="showLogin = !showLogin">Login</span>
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from "../components/SigupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true);
    const router = useRouter();
    const enterChat = () => {
      console.log("signupHandle");
      router.push({ name: "Chatroom" });
    };

    return { showLogin, enterChat };
  },
};
</script>
<style>
.home {
  padding: 20px;
}
.home form {
  width: 300px;
  margin: 20px auto;
}
.home label {
  display: block;
  margin: 20px 0 10px;
}
.home input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.home .other {
  font-weight: bold;
  border-bottom: 1px solid #000;
  cursor: pointer;
}
</style>
