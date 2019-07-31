<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-info mt-4" @click="openModal(true)">新增優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="80">目次</th>
          <th>優惠名稱</th>
          <th width="120">折扣比例</th>
          <th width="120">截止日期</th>
          <th width="120">是否啟用</th>
          <th width="250">折扣碼</th>
          <th class="text-center" width="120">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupon" :key="key">
          <td>{{ item.num }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>{{ item.code }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal" id="openModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">新增優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="coupon_title">優惠名稱</label>
              <input
                type="text"
                class="form-control"
                id="coupon_title"
                placeholder="優惠名稱"
                v-model="tempcoupon.title"
              />
            </div>
            <div class="form-group">
              <label for="coupon_title">折扣比例</label>
              <input
                type="text"
                class="form-control"
                id="coupon_percent"
                placeholder="折扣比例"
                v-model="tempcoupon.percent"
              />
            </div>
            <div class="form-group">
              <label for="coupon_dueDate">截止日期</label>
              <input
                type="text"
                class="form-control"
                id="coupon_dueDate"
                placeholder="截止日期"
                v-model="tempcoupon.due_date"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">折扣碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                placeholder="折扣碼"
                v-model="tempcoupon.code"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempcoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click="addNewCoupon">儲存</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="deleteModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除{{ tempcoupon.title }}優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger">確認刪除{{ tempcoupon.title }}優惠券</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認</button>
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
      coupon: [],
      tempcoupon: {},
      isNew: false
    };
  },
  methods: {
    getCoupon(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.$http.get(api).then(response => {
        console.log(response);
        vm.coupon = response.data.coupons;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempcoupon = {};
        this.isNew = true;
      } else {
        this.tempcoupon = Object.assign({}, item); //避免物件傳參考
        this.isNew = false;
      }
      $("#openModal").modal("show");
    },
    addNewCoupon() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethods = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempcoupon.id}`;
        httpMethods = "put";
      }
      this.$http[httpMethods](api, { data: vm.tempcoupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#openModal").modal("hide");
          vm.getCoupon();
        } else {
          $("#openModal").modal("hide");
          vm.getCoupon();
          console.log("新增失敗");
        }
      });
    },
    deleteModal(item) {
      $("#deleteModal").modal("show");
      const vm = this;
      vm.tempcoupon = Object.assign({}, item);
    },
    deleteCoupon() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempcoupon.id}`;
      this.$http.delete(url).then(response => {
        console.log(response, vm.tempcoupon);
        $("#deleteModal").modal("hide");
        this.getCoupon();
      });
    }
  },
  created() {
    this.getCoupon();
  }
};
</script>
