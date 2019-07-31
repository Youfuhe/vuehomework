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
      <div class="row">
        <div class="col-sm-4 order-sm-2 order-2">
          <div class="p-3 bg-cart">
            <div class="h3 font-weight-bold text-center text-opacity mb-3">訂單摘要</div>
            <hr />
            <div class="d-flex justify-content-between mb-3">
              <div class="text-right">小計</div>
              <div class="text-right">{{cart.total | currency}}</div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="text-right">運費</div>
              <div class="text-right">$150</div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="h5 mb-0 text-right">總計</div>
              <div class="h5 mb-0 text-right">{{cart.final_total+150 | currency}}</div>
            </div>
            <div class="input-group input-group-sm">
              <input type="text" placeholder="輸入優惠碼" class="form-control" />
              <div class="input-group-append">
                <button class="btn btn-secondary">
                  <!---->
                  <span class>套用優惠碼</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              class="rounded-0 py-2 btn btn-lg btn-success btn-block font-weight-bold"
              @click="show = !show"
              v-if="show"
            >建立訂單</div>
            <div
              class="rounded-0 py-2 btn btn-lg btn-success btn-block font-weight-bold"
              @click="show = !show"
              v-if="!show"
            >取消</div>
          </div>
        </div>

        <div class="col-sm-8 pt-3 px-0 mb-5 bg-cart" v-if="!show">
          <div class="h3 text-center mb-3 font-weight-bold">收件人資料</div>

          <div>
            <form class=" mr-4 ml-4 mb-4">
              <hr />
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
            </form>
            <button
              class="rounded-0 btn btn-success btn-lg btn-block font-weight-bold"
              @click="creatOrder"
            >送出訂單</button>
          </div>
        </div>

        <div class="col-sm-8 mb-5" v-if="show">
          <div class="h3 mb-0 p-3 bg-cart text-center font-weight-bold">購物車內容</div>
          <div class="border-bottom py-4" v-for="item in cart.carts" :key="item.id">
            <div class="d-flex align-items-center">
              <img
                width="100"
                :src="item.product.imageUrl"
                alt
                class="img-fluid mr-4 d-none d-md-inline"
              />
              <div class="h4 mr-auto ml-2 align-middle">{{item.product.title}}</div>
              <div class="h5 mr-4">{{item.qty}}/{{item.product.unit}}</div>
              <div class="h5 mr-4">{{item.final_total | currency}}</div>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm mr-2"
                @click="deleteCart(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
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
      show: true,
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

.bg-cart {
  background: rgb(77, 77, 77);
}
form {
  background: rgb(77, 77, 77);
}
</style>