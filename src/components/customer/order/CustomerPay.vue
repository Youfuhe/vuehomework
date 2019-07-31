<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <nav class="navbar navbar-expand-lg navbar-light fixed-top" :class="{bgsolid : scroll >= 100}">
      <router-link to="/customer">
        <a class="navbar pl-5" href="#">
          <img src="static\logo.png" style="width:140px" />
        </a>
      </router-link>
    </nav>

    <div class="container">
      <div class="my-5 row d-flex justify-content-center">
        <div class="col-md-6 px-0 bg-color">
          <div class="h2 text-center font-weight-bold m-4 bg-color">訂單內容</div>
          <form class="px-4">
            <table class="table">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th class="text-right">單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}{{ item.product.unit}}</td>
                  <td class="align-middle text-right">{{ item.final_total | currency}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right">運費</td>
                  <td class="text-right">$150</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total+150 | currency}}</td>
                </tr>
              </tfoot>
            </table>

            <table class="table">
              <tbody>
                <tr>
                  <th width="100">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div
            class="rounded-0 btn btn-success btn-block btn-lg font-weight-bold py-3"
            @click.prevent="payOrder"
            v-if="order.is_paid === false"
          >確認付款</div>
          <router-link to="/customer">
            <div
              class="rounded-0 btn btn-success btn-block btn-lg font-weight-bold py-3"
              v-if="order.is_paid === true"
            >繼續逛逛</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroll: "0",
      order: {
        user: {}
      },
      orderId: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scroll = document.documentElement.scrollTop;
    },
    getOrder() {
      let vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      let vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          console.log("付款成功");
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
};
</script>

<style scoped>
.navbar-expand-lg {
  z-index: 100;
  background: linear-gradient(#1a1a1a, transparent);
  transition: background-color 0.5s linear;
}
.bgsolid {
  background: rgb(19, 19, 19);
}
.bg-color {
  background: rgb(77, 77, 77);
}

.table {
  color: rgb(255, 255, 255);
}
</style>
