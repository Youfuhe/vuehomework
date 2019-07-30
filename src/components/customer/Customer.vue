<template>
  <div>
    
    <Header></Header>
    <div class="content" style="background:rgb(31,31,31,1)">
      <div class="text-white" style="padding:5% 2%">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import $ from "jquery";
import Header from "./Header";
import Footer from "./Footer";


export default {
  data() {
    return {
      products: []
      //  category: "",
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    getProduct() {
      console.log("2");
      let vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.products = response.data.products;
          vm.products.forEach(item => {
            this.$set(item, "mylike", false);
          });
        }
      });
      // this.products = this.$refs.getChiledata.products;
    }
  },
  created() {
    console.log("1");
    this.getProduct();
  }
  //   created() {
  //     $(".carousel").carousel({
  //       interval: 1000
  //     });
  //   }
};
</script>


