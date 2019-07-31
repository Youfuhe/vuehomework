<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <td>訂購日期</td>
          <td class="text-center">訂單編號</td>
          <td class="text-center">客戶姓名</td>
          <td class="text-center">購買項目</td>
          <td class="text-center">金額</td>
          <td>是否付款</td>
          <td>編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,key) in orderList" :key="key">
          <td class="align-middle">{{ order.create_at | date }}</td>
          <td class="text-center align-middle">{{ order.id }}</td>
          <td class="align-middle">
            <div class="text-center" v-if="order.user">{{ order.user.name }}</div>
          </td>
          <td class="text-center">
            <ul v-for="item in order.products" :key="item.id" style="list-style:none">
              <li>{{ item.product.title }} 數量：{{ item.qty }}{{ item.product.unit }}</li>
            </ul>
          </td>
          <td class="text-right align-middle">{{ order.total | currency }}</td>
          <td class="align-middle">
            <span class="text-success" v-if="order.is_paid">已付款</span>
            <span class="text-danger" v-else>尚未付款</span>
          </td>
          <td class="align-middle">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(order.id)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title d-flex w-100" id="exampleModalLabel">
              <span>編輯</span>
              <span class="ml-auto"></span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="tempOrder.user">
              <div class="form">
                <div class="form-group">
                  <label for="name">訂購人姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="請輸入訂購人資訊"
                    v-model="tempOrder.user.name"
                  />
                </div>
              </div>
              <div class="form">
                <div class="form-group">
                  <label for="tel">訂購人電話</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="tel"
                    placeholder="請輸入訂購人電話"
                    v-model="tempOrder.user.tel"
                  />
                </div>
              </div>
              <div class="form">
                <div class="form-group">
                  <label for="email">訂購人郵箱</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="請輸入訂購人郵箱"
                    v-model="tempOrder.user.email"
                  />
                </div>
              </div>
              <div class="form">
                <div class="form-group">
                  <label for="address">訂購人地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="請輸入訂購人地址"
                    v-model="tempOrder.user.address"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark" @click="editOrderList()">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      orderList: {
        products: {}
      },
      tempOrder: {}
    };
  },
  methods: {
    getOrderList(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.orderList = response.data.orders;
      });
    },
    openModal(ID) {
      var vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${ID}`;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.tempOrder = response.data.order;
          $("#orderModal").modal("show");
          console.log(vm.tempOrder);
        }
      });
    },
    editOrderList() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      this.$http.put(api, { data: vm.tempOrder }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#orderModal").modal("hide");
          vm.getOrderList();
        } else {
          $("#orderModal").modal("hide");
          vm.getOrderList();
          console.log("編輯失敗");
        }
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>
