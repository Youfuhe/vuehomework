<template>
  <div class="header">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="../../static/1.png" alt="First slide" />
        </div>
        <div class="carousel-item ">
          <img class="d-block w-100" src="../../static/2.png" alt="First slide" />
        </div>
        <div class="carousel-item ">
          <img class="d-block w-100" src="../../static/3.png" alt="First slide" />
        </div>
        <div class="carousel-item ">
          <img class="d-block w-100" src="../../static/4.png" alt="First slide" />
        </div>
        <div class="carousel-item ">
          <img class="d-block w-100" src="../../static/5.png" alt="First slide" />
        </div>
        <div class="carousel-item ">
          <img class="d-block w-100" src="../../static/6.png" alt="First slide" />
        </div>
        <div class="carousel-item ">
          <img class="d-block w-100" src="../../static/7.png" alt="First slide" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  }
};
</script>
<style scoped>
.img-bag {
  background-position: center top;
  background-size: cover;
}
.carousel-control-prev,
.carousel-control-next {
  display: none;
}

.header:hover .carousel-control-prev,
.header:hover .carousel-control-next {
  display: flex;
}
</style>