import Vue from 'vue';
import Vuex from 'vuex';
import chatModule from './modules/chat';

import VueSocketio from 'vue-socket.io';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: { //Los state son las variables a usar de forma global
    chat: [],
    users: [],
    username: null,
    exist: false,
    io: {}
  },

  getters: {
    chat(state) {
      return state.chat;
    },

    users(state) {
      return state.users;
    },

    username(state) {
      return state.username;
    },

    exists(state) {
      return state.exist;
    }
  },

  mutations: {
    setSocket: function(state, socket) {
      state.io = socket;
      console.log('Socket find!');
    },
    /*user: function(state, user) {
      this.state.username = user;
      this.state.users.push({name: user});
    },

    chat: function(state, message) {
      state.chat.push({name: state.username, message: message});
    }*/
    SOCKET_NEW_MESSAGE(state, message) {
      state.chat.push(message[0]);
    },

    SOCKET_LOGIN(state, data) {
      state.users = data[0].users;
      state.username = data[0].username;
      state.exist = false;
    },

    SOCKET_USERS_EXISTS(state) {
      state.exist = true;
    },

    SOCKET_USER_JOINED(state, data) {
      state.users = data[0].users;
      state.chat.push({class: 'list-group-item list-group-item-success',
        message: data[0].username + ' ha entrado en la sala.'});
    },

    SOCKET_USER_LEFT(state, data) {
      state.users = data[0].users;
      state.chat.push({class: 'list-group-item list-group-item-danger',
        message: data[0].username + ' ha abandonado la sala.'});
    }
  },

  actions: {
    /*setUsername: function(payload, user) {
      payload.commit('user', user);
    },

    send_messages: function(payload, message) {
      payload.commit('chat', message.message);
    }*/
    send_messages: (payload, message) => {
      payload.rootState.io.emit('newMessage', message.message);
    },

    login: (payload, username) => {
      payload.rootState.io.emit('login', username);
    }
  },

  modules: {
    //chatModule,
  },
});

Vue.use(VueSocketio, 'http://localhost:3000', store);
