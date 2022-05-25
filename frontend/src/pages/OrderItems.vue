<template>
  
  <div>
    <Header />
    <div class="container">
      <table v-if="!editingItem" class="table table-striped">
        <thead class="bg-light">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Product Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="!order_items.length">
            <td colspan="5">
            <h2>...Loading, Please Wait.</h2>
            </td>
          </tr>
          <tr v-for="(item, i) in order_items" :key="item.product_id">
            <td>
              {{i+1}}
            </td>
            <td>
              {{item.date}}
            </td>
            <td>
              {{item.product_category}}
            </td>
            <td>{{item.price}}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button @click="viewDetails(item)" type="button" class="btn btn-primary">View Details</button>
              </div>
              
            </td>
          </tr>
        </tbody>
      </table>

      
      <div class="row justify-content-center">
        <div class="col-4" v-if="editingItem">
          <h3>Update/Delete Order Item</h3>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Date</label>
            <input type="text" v-model="selectedItem.date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Price</label>
            <input type="number" v-model="selectedItem.price" class="form-control" id="exampleInputPassword1">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Category</label>
            <input type="text" v-model="selectedItem.product_category" class="form-control" id="exampleInputPassword1">
          </div>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button @click="UpdateItem(selectedItem.order_item_id)" type="button" class="btn btn-primary">Update</button>
                <button @click="handleDelete(selectedItem)" type="button" class="btn btn-danger">Delete</button>
              </div>
        </div>
      </div>


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
      order_items: {},
      editingItem: false,
      selectedItem: {
        date: "",
        order_item_id: "",
        price: "",
        product_category: "",
        product_id: "",
      },
      base_url:"http://localhost:3080/"

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
      const config = {
        headers:{
          auth_user_id: JSON.parse(localStorage.getItem('user')).seller_id,
        }
      };
      axios.get(`${this.base_url}order_items`, config)
      .then(res => {
        this.order_items = res.data.data
        this.editingItem =false

        })
      .catch(err => console.log(err))
    },
    
    viewDetails(item){
      const {date, order_item_id, price, product_category, product_id, _id} = item
      this.selectedItem = {date, order_item_id, price, product_category, product_id, _id}
      this.editingItem = true
    },

    UpdateItem(id){
      axios.patch(`${this.base_url}order_items/${id}`, this.selectedItem)
      .then(res => {
        console.log(res)
        alert(`${this.selectedItem.product_category} updated`)
        this.fetchOrderItems();
        })
      .catch(err => console.log(err))
    },

    handleDelete(item){
      axios.delete(`${this.base_url}order_items/${item.order_item_id}`)
      .then(res => {
        console.log(res)
        alert(`${item.product_category} deleted`)
        this.fetchOrderItems();
        })
      .catch(err => console.log(err))
    }
    
  }
}
</script>

