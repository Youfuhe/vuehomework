<template>
  <div>
    <Nav></Nav>
    <Header></Header>
    <div class="content" style="background:rgb(31,31,31,1)">
      <div class="text-white" style="padding:5% 2%">
        <div class="text-center">
          <h2 class="pb-5">每日精選隨你看</h2>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import $ from "jquery";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";

export default {
  data() {
    return {};
  },
  components: {
    Nav,
    Header,
    Footer
  },
  
  //   created() {
  //     $(".carousel").carousel({
  //       interval: 1000
  //     });
  //   }
};
</script>


