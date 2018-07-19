<template>
  <div id="app">
    <h3>Usuarios conectados: </h3>
    <ul v-if="users">
      <li v-for="user in users">
        <b v-if="user === username">{{ user }}</b>
        <span v-else>{{ user }}</span>
      </li>
    </ul>
    <p v-else>No hay usuarios autentificados.</p>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },

  computed: {
    users() {
      return this.$store.getters.users;
    },
    username() {
      return this.$store.getters.username;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
