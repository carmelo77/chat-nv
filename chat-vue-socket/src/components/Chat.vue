<template>
  <div id="app">
    <div class="card">
      <div class="card-header bg-primary text-white">
        Chat
      </div>
      <div class="card-body">
        <div class="list-group" v-for="item in chat" :key="item.name">
          <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
            <!--  <h5 class="mb-1">{{ item.name }}</h5>
              <small>3 days ago</small> -->
            </div>
            <p :class="item.class">{{ item.message }}</p>
          </a>
        </div>
          <div class="form-group mt-2">
            <input type="text" class="form-control mr-sm-2" v-model="message"
             placeholder="Escribe tu mensaje aquí..." @keypress.enter.prevent="send()">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
    }
  },

  methods: {
    send: function() {
      this.$store.dispatch('send_messages', {message: this.message});
      this.message = "";
    }
  },
  computed: {
    chat() {
      return this.$store.getters.chat;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
