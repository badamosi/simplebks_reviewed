<template >
  <Header />
  <div class="text-center">

    <main class="form-signin">
  <form>
    <img class="mb-4" :src="'/bootstrap-logo.svg'" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Update Account</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">City</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">State</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Update</button>
  </form>
</main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  data(){
    return {
      year: 2022
    }
  },
  components: {
    Header
},
  mounted(){
      
  },
  methods: {

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
