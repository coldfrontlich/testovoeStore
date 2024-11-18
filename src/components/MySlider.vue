<template>
  <div class="slider-info">
    <div class="breadcrumb-smartphone">Главная * Продукты * Краски</div>
    <h1 class="slider-info__h1">Краски</h1>
  </div>
  <div class="slider-container">
    <div class="breadcrumb">Главная * Продукты * Краски</div>
    <div class="slider-slide" :style="{ backgroundImage: `url(${images[currentIndex]})` }">
      <div class="slide-content">
        <h1 class="slider__h1">{{ slideTitles[currentIndex] }}</h1>
        <h2 class="slider__h2">{{ slideDescriptions[currentIndex] }}</h2>
      </div>
    </div>

    <button @click="prevSlide" class="slider-button-prev">❮</button>
    <button @click="nextSlide" class="slider-button-next">❯</button>
    <div class="pagination">
      <span
        v-for="(image, index) in images"
        :key="index"
        @click="goToSlide(index)"
        :class="{ active: index === currentIndex }"
        class="pagination-dot"
      ></span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const images = ref([
      'backgrounds/slider1.jpeg',
      'backgrounds/slider2.jpeg',
      'backgrounds/slider3.jpeg',
      'backgrounds/slider4.jpeg',
      'backgrounds/slider5.jpeg',
      'backgrounds/slider6.jpeg',
    ])
    const slideTitles = ref([
      'Краски',
      'Продукт 2',
      'Продукт 3',
      'Продукт 4',
      'Продукт 5',
      'Продукт 6',
    ])
    const slideDescriptions = ref([
      'Идеально подходит для стен и других поверхностей. Найди свой идеальный цвет!',
      'Описание для второго слайда',
      'Описание для третьего слайда',
      'Описание для четвертого слайда',
      'Описание для пятого слайда',
      'Описание для шестого слайда',
    ])

    const currentIndex = ref(0)

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % images.value.length
    }

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
    }

    const goToSlide = (index) => {
      currentIndex.value = index
    }

    return { images, slideTitles, slideDescriptions, currentIndex, nextSlide, prevSlide, goToSlide }
  },
}
</script>

<style scoped>
.slider-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.breadcrumb {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  color: rgb(255, 255, 255, 0.3);
  padding: 10px 5px;
  border-radius: 5px;
  z-index: 10;
  font-size: 10px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 6%;
  text-align: left;
  text-transform: uppercase;
}

.slider-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  height: 85vh;
  min-width: 100vw;
  color: white;
  text-align: center;
  transition: background-image 0.5s ease;
}

.slide-content {
  padding: 20px;
  border-radius: 10px;
}

.slider-button-prev,
.slider-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
  z-index: 10;
}

.slider-button-prev {
  left: 10px;
  z-index: 1;
}

.slider-button-next {
  right: 10px;
  z-index: 1;
}

.pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 20px;
}

.pagination-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.pagination-dot.active {
  opacity: 1;
}

.slider__h2 {
  font-size: 16px;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: 2%;
  text-align: center;
}
.slider__h1 {
  font-size: 72px;
  font-weight: 400;
  line-height: 88%;
  text-align: center;
  margin: 20px;
}

.breadcrumb-smartphone {
  font-size: 16px;
  padding: 10px 5px;
  border-radius: 5px;
  z-index: 10;
  font-size: 10px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 6%;
  text-align: left;
  text-transform: uppercase;
  color: rgb(31, 32, 32, 0.3);
}

.slider-info {
  margin-left: 4rem;
  margin-bottom: 2rem;
}

@media (min-width: 801px) {
  .slider-info {
    display: none;
  }
}

.slider-info__h1 {
  margin: 0;
  margin-top: 2rem;
  font-size: 36px;
  font-weight: 400;
  line-height: 88%;
  letter-spacing: -4%;
  text-align: left;
}

@media (max-width: 800px) {
  .slider-container {
    display: none;
  }
}

@media (max-width: 600px) {
  .slider-info {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
