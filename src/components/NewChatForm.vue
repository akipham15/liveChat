<template>
  <p class="error">{{ error }}</p>
  <form @submit.prevent="handleSubmit">
    <div class="chatbox">
      <textarea
        placeholder="Type a message and hit enter to send ..."
        v-model="message"
        @keypress.enter.prevent="handleSubmit"
      ></textarea>
      <button>Send</button>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getUser } from "../composables/getUser";
import { timestamp } from "../firebase/config";
import { useCollection } from "../composables/useCollection";
export default {
  setup() {
    const message = ref(message);
    const { user } = getUser();
    const { error, addDoc } = useCollection("messages");

    const handleSubmit = async () => {
      //   console.log(user.value.displayName);
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createAt: timestamp(),
      };

      addDoc(chat);
      message.value = "";
    };

    return { message, handleSubmit, error };
  },
};
</script>

<style>
form {
  margin: 10px;
}
.chatbox {
  display: flex;
  align-items: stretch;
}
.chatbox textarea {
  flex-grow: 8;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: non;
}
.chatbox button {
    margin: 5px;
    background: rgb(68, 118, 255);
}
</style>