<template >

  <div class="text-center">

    <main class="form-signin">
    <img class="mb-4" :src="'/bootstrap-logo.svg'" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="text" v-model="logInForm.username" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Seller ID</label>
    </div>
    <div class="form-floating">
      <input type="text" v-model="logInForm.password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Seller Zip Code Prefix</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button @click="handleLogin" class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">© 2017–2021</p>
</main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return {
      year: 2022,
      logInForm: {
        username: 'e49c26c3edfa46d227d5121a6b6e4d37',
        password: '55325'
      }
    }
  },
  components: {
  },
  mounted(){
      
  },
  methods: {
    handleLogin(){
      console.log(localStorage.getItem('user'))
      axios.post('http://localhost:3080/auth/login', this.logInForm)
      .then(res => {
        if (res.status == 200){
          alert('Logged in successfully')
          localStorage.setItem('user', JSON.stringify(res.data.user_data))
          this.$router.push('/')
        }
      }).catch(err => {
        console.log(err)
        alert("Wrong Username or Password!")})
    }
  }
}
</script>


<style>

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
