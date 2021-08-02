<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div
        v-for="message in formattedDocuments"
        :key="message.id"
        class="single"
      >
        <span class="name">{{ message.name }}</span>
        <span class="hint">:</span>
        <span class="message">{{ message.message }}</span>
        <span class="create-at">{{ message.createAt }} ago</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCollection } from "../composables/getCollection";
// import moment from "moment";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "@vue/runtime-core";
export default {
  setup() {
    const { error, documents } = getCollection("messages");
    // const timeFromNow = (time) => {
    //   return moment(time.toDate()).fromNow();
    // };

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createAt.toDate());
          return { ...doc, createAt: time };
        });
      }
    });

    // auto scroll messages
    const messages = ref(null);
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    return { error, documents, formattedDocuments, messages };
  },
};
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 5px 0;
  text-align: left;
}
.create-at {
  display: inline-block;
  color: #999;
  font-size: 11px;
  margin-left: 15px;
}
.hint {
  display: inline-block;
  color: #999;
  margin: 0px 2px;
  font-size: 11px;
}
.name {
  font-weight: bold;
}
.messages {
  max-height: 400px;
  overflow: auto;
  font-size: 0.9rem;
}
</style>