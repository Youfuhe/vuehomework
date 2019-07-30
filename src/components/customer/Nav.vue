<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" :class="{bgsolid : scroll >= 100}">
      <router-link to="/customer">
        <a class="navbar pl-5" href="#">
          <img src="../../static/logo.png" style="width:140px" />
        </a>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/customer/action">
              <a class="nav-link" href="#">動作片</a>
            </router-link>
          </li>
          <router-link to="/customer/suspicion">
            <li class="nav-item">
              <a class="nav-link" href="#">懸疑片</a>
            </li>
          </router-link>

          <router-link to="/customer/happy">
            <li class="nav-item">
              <a class="nav-link" href="#">喜劇片</a>
            </li>
          </router-link>

          <router-link to="/customer/horror">
            <li class="nav-item">
              <a class="nav-link" href="#">恐怖片</a>
            </li>
          </router-link>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="">更多</a>
            <div class="dropdown-menu more">
              <router-link to="/customer/animation">
                <a class="dropdown-item pr-1" href="#">動畫</a>
              </router-link>
              <router-link to="/customer/mylike">
                <a class="dropdown-item" href="#">
                  <i class="fa-heart fa-lg fas pr-2"></i>我的最愛
                </a>
              </router-link>
            </div>
          </li>
        </ul>
        <form class="form-inline mr-auto" style="position: relative; max-width:206px">
          <input
            class="form-control"
            type="search"
            aria-label="Search"
            style="border-radius: 10px;"
          />
          <button
            class="btn btn-success"
            type="submit"
            style="position: absolute; right:-1px ;top:0 ;border-radius: 0 10px 10px 0;"
          >
            <i class="fas fa-search"></i>
          </button>
        </form>
        <ul class="navbar-nav pr-4" style="line-height: 54px">
          <li class="nav-item">
            <a class="nav-link" href="#">管理員</a>
          </li>
          <li class="nav-item" style="line-hight:54px">
            <a class="nav-link" href="#">
              <div class="dropdown">
                <i
                  aria-hidden="true"
                  class="fa fa-shopping-cart text-light fa-lg"
                  style="position: relative;"
                >
                  <span class="badge badge-pill badge-danger shop-cart" style="font-size:12px">4</span>
                </i>

                <div
                  data-offset="400"
                  class="dropdown-menu dropdown-menu-right p-3"
                  style="min-width: 300px;"
                >
                  <h6 class="text-white">已選擇商品</h6>
                  <table class="table mb-0 text-white">
                    <tbody>
                      <tr>
                        <td class="align-middle text-center">
                          <a href="#" class="text-muted">
                            <i class="far fa-trash-alt"></i>
                          </a>
                        </td>
                        <td class="align-middle">（英）小腳怪</td>
                        <td class="align-middle">1部</td>
                        <td class="align-middle text-right">600</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex border-top border-bottom mb-3 p-1">
                    <span class="text-uppercase text-muted">Total</span>
                    <strong class="ml-auto text-white">$2,100</strong>
                  </div>
                  <button class="btn btn-success btn-block">
                    <i aria-hidden="true" class="fa fa-cart-plus"></i> 結帳去
                  </button>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      category: "",
      scroll: "0"
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scroll = document.documentElement.scrollTop;
    }
  }
};
</script>
<style scoped>
ul,
li {
  list-style: none;
  text-decoration: none;
}
a {
  text-decoration: none;
}
.navbar-light .navbar-toggler {
  color: rgba(0, 190, 6, 1);
  border-color: rgba(0, 190, 6, 1);
}

.navbar-expand-lg {
  z-index: 100;
  background: linear-gradient(#1a1a1a, transparent);
  transition: background-color 0.5s linear;
}
.nav-item .nav-link {
  color: white;
  font-size: 16px;
  position: relative;
}
.nav-item .nav-link:hover,
.nav-item .nav-link:focus {
  color: rgba(0, 190, 6, 1);
}

/* 更多 */
.dropdown-menu {
  background-color: rgba(30, 30, 30, 1);
}
.dropdown-item {
  color: white;
  background-color: rgba(30, 30, 30, 1);
}
.dropdown-item:hover,
.dropdown-item:focus {
  color: rgba(0, 190, 6, 1);
  background-color: none;
}

.dropdown:hover .more {
  display: flex;
}
.shop-cart {
  position: absolute;
  top: -13px;
  right: -13px;
}

.bgsolid {
  background: rgb(19, 19, 19);
}

/* 購物車 */
.dropdown:hover .dropdown-menu-right {
  display: block;
}
</style>
