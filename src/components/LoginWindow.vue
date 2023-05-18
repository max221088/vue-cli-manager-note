<template>
    <div class="login-window">
      <div class="login-box">
        <h2>Login</h2>
        <div class="form">
          <input type="text" placeholder="Email" v-model="userCred.email"/>
          <input type="password" placeholder="Password" v-model="userCred.pass"/>
        </div>
        <button class="btn" @click="login()"> Login</button>
      </div>
    </div>
</template>

<script>
export default {
    name: 'LoginWindow',
    props: [],
    data: function () {
      return {
        userCred: {
            email: '',
            pass: ''
        }
      }
    },
    methods: {
      login () {
        this.$store.dispatch('login', this.userCred);
        
      }
    },
    created () {
        if (localStorage.getItem('userCred')) {
            this.userCred = JSON.parse(localStorage.getItem('userCred'));
        } 
    }
  }
</script>