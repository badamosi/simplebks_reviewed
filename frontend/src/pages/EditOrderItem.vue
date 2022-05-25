<template>
  
  <div>
    <Header />
    <div class="container">
      <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Nav from '../components/Navigation'
import Header from '../components/Header'

export default {
  name: 'App',
  data(){
    return {
      order_items: {}

    }
  },
  components: {
    // Nav, 
    Header,
},
  mounted(){
      this.fetchOrderItems()
  },
  methods: {
    fetchOrderItems(){
      axios.get(`http://localhost:3080/order_items`)
      .then(res => this.order_items = res.data.data)
      .catch(err => console.log(err))
    },
    handleDelete(item){
      axios.delete(`http://localhost:3080/order_items/${item.id}`)
      .then(res => {
        console.log(res)
        alert(`${item.product_category} is deleted`)
        this.fetchOrderItems();
        })
      .catch(err => console.log(err))
    }
    
  }
}
</script>

