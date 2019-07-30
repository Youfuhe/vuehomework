<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" :class="{bgsolid : scroll >= 100}">
      <router-link to="/customer">
        <a class="navbar pl-5" href="#">
          <img src="/static/logo.png" style="width:140px" />
        </a>
      </router-link>
    </nav>
    <div class="d-lg-flex justify-content-center">
      <div class="m-5 d-flex justify-content-center">
        <form class="p-4" style="width:500px;" @submit.prevent="creatOrder">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-model="form.user.email"
              placeholder="請輸入 Email"
              v-validate="'required|email'"
              :class="{'is-invalid':errors.has('email')}"
            />
            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              v-model="form.user.name"
              placeholder="輸入姓名"
              v-validate="'required'"
              :class="{'is-invalid':errors.has('name')}"
            />
            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              name="tel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
              v-validate="'required'"
              :class="{'is-invalid':errors.has('tel')}"
            />
            <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              placeholder="請輸入地址"
              v-validate="'required'"
              :class="{'is-invalid':errors.has('address')}"
            />
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <router-link to="/customer">
              <button class="btn btn-success mx-3">
                <i class="fa fa-cart-plus mr-2"></i>繼續購買
              </button>
            </router-link>
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>

      <!-- 右邊 -->
      <div class="d-flex justify-content-center">
        <div class="my-5" style="width:300px">
          <div class="d-flex justify-content-center mt-2">
            <div class="input-group my-4 input-group-sm" style="width:600px">
              <input type="text" class="form-control" placeholder="請輸入優惠碼" />
              <div class="input-group-append">
                <button class="btn btn-success" type="button">套用優惠碼</button>
              </div>
            </div>
          </div>
          <div class="mt-4 d-flex justify-content-center">
            <table class="table text-white" style="width:600px;">
              <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      @click="deleteCart(item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <!-- <div class="text-success" v-if="item.coupon">
          已套用優惠券
                    </div>-->
                  </td>
                  <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">總計</td>
                  <td class="text-right">{{ cart.total }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">{{ cart.final_total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
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
      cart: [],
      isLoading: false,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scroll = document.documentElement.scrollTop;
    },
    getCart() {
      let vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.cart = response.data.data;
          console.log(vm.cart.total);
          vm.isLoading = false;
        }
      });
    },
    deleteCart(id) {
      let vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.isLoading = false;
          this.getCart();
        }
      });
    },
    creatOrder() {
      let vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(response => {
            console.log(response.data);
            if (response.data.success) {
              console.log(response.data.orderId);
              vm.$router.push(`/customer/customerPay/${response.data.orderId}`);
            }
          });
        } else {
          console.log("欄位不完整");
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>
<style scoped>
.table tr:hover {
  background: rgb(63, 62, 62);
}

.navbar-expand-lg {
  z-index: 100;
  background: linear-gradient(#1a1a1a, transparent);
  transition: background-color 0.5s linear;
}
.bgsolid {
  background: rgb(19, 19, 19);
}

form{
  background: rgb(77, 77, 77)
}
</style>