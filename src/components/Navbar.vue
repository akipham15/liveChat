<template>
  <nav v-if="user">
    <div>
      <p>Hello {{ user.displayName }}</p>
      <p class="email">Current logged in as {{ user.email }}</p>
    </div>
    <div class="error">{{ error }}</div>
    <button @click="handleLogout">Logout</button>
  </nav>
</template>

<script>
import { useLogout } from "../composables/useLogout";
import { getUser } from "../composables/getUser";

export default {
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();

    const handleLogout = async () => {
      await logout();
      console.log("logout");
    };

    return { error, handleLogout, user };
  },
};
</script>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
nav p {
  margin: 2px auto;
  text-align: left;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
nav button{
  background: rgb(255, 180, 94);
}
</style>