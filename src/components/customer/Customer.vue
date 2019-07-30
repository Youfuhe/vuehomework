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
  components: {
    Header,
    Footer,
  },
};
</script>


