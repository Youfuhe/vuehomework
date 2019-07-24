<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item" @click="clickList='a'">
          <router-link class="nav-link" to="/admin/products" :class="{'active': clickList==='a'}">
            <i class="fas fa-box-open"></i>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" :class="{'active': clickList==='b'}"  @click="clickList='b'">
            <span data-feather="file-text"></span>
            <i class="fas fa-address-book"></i>
            訂單列表
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active': clickList==='c'}"  @click="clickList='c'" href="#">
            <span data-feather="file-text"></span>
            <i class="fas fa-ticket-alt"></i>
            優惠券
          </a>
        </li>
      </ul>
      <hr />
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>模擬功能</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item" @click="clickList='d'">
          <router-link class="nav-link" :class="{'active': clickList==='d'}"  to="/customer_order">
            <i class="fas fa-shopping-cart"></i>
            模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return{
      clickList:'a'
    }
  },
  methods: {
    getPath(){
      
    }
  },
}
</script>