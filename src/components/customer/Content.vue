<template>
  <div class="row d-flex justify-content-center">
    <div
      class="col-xl-2 col-lg-6　py-4 pb-5"
      style="min-width: 290px;max-width:350px; position: relative;"
      v-for="item in products"
      :key="item.id"
    >
      <div class="pic" style="position: relative">
        <div class="tw-video-brand selfmake-brand text-center">
          <span>動作片</span>
        </div>
        <div>
          <img class="img-fluid" :src="item.url" alt />
        </div>

        <div class="dis w-100">
          <div
            class="card-body position-relative pt-5 pb-3"
            style="background: linear-gradient(hsla(0,0%,9%,0),#111 40%);"
          >
            <div>
              <h3 class="card-title text-left">{{item.name}}</h3>
              <p class="text-left" style="color:#dcddde">{{item.title}}</p>
              <div class="heart position-absolute" style="bottom:20%;right:5%">
                <i
                  class="fa-heart fa-lg text-white fas fa-2x"
                  :class="{'text-danger' : item.mylike}"
                  @click="item.mylike = !item.mylike"
                ></i>
              </div>
              <div class="text-left">
                <button
                  href="#"
                  class="btn btn-outline-light btn-sm infoBtn mr-1"
                  style="color:#dcddde"
                >查看內容</button>
                <button class="btn btn-outline-light btn-sm ml-auto infoBtn" style="color:#dcddde">
                  <!---->
                  <i aria-hidden="true" class="fa fa-cart-plus"></i> 加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <p class="pt-2" style="font-size: 20px;color:#aaa">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: "1",
          mylike: true,
          name: "夜問永春",
          title: "主演:劉德華",
          url: "https://img.ruten.com.tw/s1/3/81/1f/21737115866399_465.jpg"
        },
        {
          id: "2",
          mylike: false,
          name: "玩命關頭",
          title: "主演:45679",
          url:
            "https://images.zi.org.tw/kocpc/2019/03/1551940758-219b4b82f16e5aa0ca27610c1e9d151e.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* 圖片放大 */
.pic {
  overflow: hidden;
}
.pic img {
  transform: scale(1, 1);
  transition: all 1s ease-out;
}
.pic:hover img {
  transform: scale(1.2, 1.2);
}
.infoBtn:hover {
  color: #f8f9fa;
  background-color: rgba(0, 190, 6, 1);
  border-color: #f8f9fa;
}

/* 下標顯示 */
.dis {
  position: absolute;
  opacity: 0;
  bottom: -10px;
  z-index: 1000;
  visibility: hidden;
  transition: all 0.7s;
}
.pic:hover .dis {
  opacity: 1;
  transform: scale(1) translateZ(0);
  visibility: visible;
  cursor: pointer;
}

/* 動作片變色 */
.tw-video-brand {
  position: absolute;
  top: 10px;
  right: 6px;
  z-index: 1000;
}
.tw-video-brand.selfmake-brand {
  background-position: -40px 0;
}
.tw-video-brand {
  z-index: 1;
  display: inline-block;
  background: rgb(156, 27, 27);
  width: 60px;
  height: 25px;
  border-radius: 10px;
  transition: background-color 0.5s linear;
}

.pic:hover .tw-video-brand {
  background: #28a745;
}
</style>
