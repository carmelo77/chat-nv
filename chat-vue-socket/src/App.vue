<template>
  <div id="app">
    <div class="container" v-if="username != null">
      <h3 class="text-success">
        Mi usuario es: {{ username }}
      </h3>
    </div>
    <div class="container">
        <div class="col-8 offset-2 mt-4" v-if="username === null">
          <div class="card">
            <div class="card-header bg-primary text-white">
              Set a username
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" name="user" v-model="user">
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-primary btn-block" name="button" @click="login()">Sign-In</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 offset-3 mt-4" v-if="exists">
          <div class="alert alert-danger">
            Este usuario ya está en uso.
          </div>
        </div>
        <div class="row mt-4" v-if="username != null">
          <div class="col-md-6">
            <chat></chat>
          </div>
          <div class="col-md-6">
            <connected></connected>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Chat from './components/Chat';
import Connected from './components/Connected.vue';

export default {
  components: {
    Chat,
    Connected
  },
  data () {
    return {
      user: null,
    }
  },
  methods: {
    login() {
      return this.$store.dispatch('login', this.user);
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    exists() {
      return this.$store.getters.exists;
    }
  },
}
</script>

<style lang="scss">

</style>
