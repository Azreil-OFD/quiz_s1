<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const full = ref(false);
const getFull = async () => {
  full.value = await appWindow.isFullscreen();
  if (!full.value) {
    router.push("/admin");
  }
};

const run = async () => {
  full.value = await appWindow.isFullscreen();
  if (full.value) {
    router.push('/game');
  } else {
    alert(" Перейдите в полноэкранный режим")
  }
} 
</script>

<template>
  <main>
    <div class="start_page">
      <div class="image-container">
        <div class="layer" id="layer1">
          <img src="@/assets/img/222.png" alt="Layer 1 Image 1" class="layer-image image1" />
          <img src="@/assets/img/222.png" alt="Layer 1 Image 2" class="layer-image image2" />
        </div>
        <div class="layer" id="layer2">
          <img src="@/assets/img/atom.svg" alt="Layer 2 Image 1" class="layer-image image1" />
          <img src="@/assets/img/korenS.svg" alt="Layer 2 Image 2" class="layer-image image2" />
          <img src="@/assets/img/mozg.svg" alt="Layer 2 Image 2" class="layer-image image3" />
          <img src="@/assets/img/voprosZH.svg" alt="Layer 2 Image 2" class="layer-image image4" />
          <img src="@/assets/img/shesterenkaK.svg" alt="Layer 2 Image 2" class="layer-image image5" />
          <img src="@/assets/img/knigaS.svg" alt="Layer 2 Image 2" class="layer-image image6" />
          <img src="@/assets/img/plusik.svg" alt="Layer 2 Image 2" class="layer-image image7" />
          <img src="@/assets/img/knigaK.svg" alt="Layer 2 Image 2" class="layer-image image8" />
          <img src="@/assets/img/plusik.svg" alt="Layer 2 Image 2" class="layer-image image9" />
          <img src="@/assets/img/voprosZ.svg" alt="Layer 2 Image 2" class="layer-image image12" />
          <img src="@/assets/img/pazlZ.svg" alt="Layer 2 Image 2" class="layer-image image13" />
          <img src="@/assets/img/shesterenkaS.svg" alt="Layer 2 Image 2" class="layer-image image14" />
          <img src="@/assets/img/VoprosK.svg" alt="Layer 2 Image 2" class="layer-image image15" />
          <img src="@/assets/img/voprosS.svg" alt="Layer 2 Image 2" class="layer-image image16" />
          <img src="@/assets/img/mozg2.svg" alt="Layer 2 Image 2" class="layer-image image17" />
          <img src="@/assets/img/pazlS.svg" alt="Layer 2 Image 2" class="layer-image image18" />
        </div>

        <div class="layer" id="layer3">
          <img src="@/assets/img/koleso.svg" alt="Layer 3 Image 1" class="layer-image image10" />

          <img @click="getFull()" src="@/assets/img/strelka.svg" alt="Layer 3 Image 2" class="layer-image image11" />

          <div class="button-container">
            <div class="text-block">
              <p>
                Кто хочет стать<br />
                знатоком?
              </p>
            </div>
            <button class="start" @click="run()">Начать</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background: radial-gradient(rgba(1, 127, 177, 1), rgba(1, 76, 107, 1));
  margin: 0;
  user-select: none;
}

main,
h2,
h1,
p,
button {
  margin: 0;
  padding: 0;
  color: #ffffff;
}

.start_page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.layer-image {
  position: absolute;
  height: auto;
}

#layer1 {
  z-index: 1;
}

#layer2 {
  z-index: 2;
}

#layer3 {
  z-index: 3;
}

#layer1 .image1 {
  width: 50%;
  top: -7.5%;
  left: -12%;
}

#layer1 .image2 {
  width: 50%;
  bottom: -10%;
  right: -12.5%;
  /* transform: scale(-1, 1) */
}

#layer2 .image1 {
  width: 11.5%;
  top: 2%;
  left: 2%;
}

#layer2 .image2 {
  width: 5%;
  top: 6%;
  left: 35%;
}

#layer2 .image3 {
  width: 15%;
  top: 4%;
  left: 42%;
}

#layer2 .image4 {
  width: 5%;
  top: 21.5%;
  right: 36.5%;
}

#layer2 .image5 {
  width: 4%;
  right: 32%;
  top: 5.5%;
}

#layer2 .image6 {
  width: 12%;
  right: 6%;
  top: 4%;
}

#layer2 .image7 {
  transform: rotate(50deg);
  width: 3%;
  left: 3%;
  bottom: 29%;
}

#layer2 .image8 {
  width: 10%;
  left: 4%;
  bottom: 3%;
}

#layer2 .image9 {
  width: 3%;
  bottom: 6%;
  left: 28.5%;
}

#layer2 .image12 {
  width: 5%;
  bottom: 7%;
  right: 18%;
}

#layer2 .image13 {
  width: 7%;
  bottom: 3%;
  right: 7%;
}

#layer2 .image14 {
  width: 9%;
  top: 13%;
  right: 25%;
}

#layer2 .image15 {
  width: 6%;
  top: 5%;
  right: 22%;
}

#layer2 .image16 {
  width: 4.5%;
  top: 28%;
  left: 1.5%;
}

#layer2 .image17 {
  width: 15%;
  bottom: 5%;
  left: 40%;
}

#layer2 .image18 {
  width: 9%;
  bottom: 6%;
  right: 28.5%;
}

#layer3 .image10 {
  width: 38%;
}

#layer3 .image11 {
  width: 7%;
}

.layer-image.image10,
.layer-image.image11 {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
}

.layer-image.image11 {
  left: 45%;
}

.button-container {
  display: flex;
  flex-direction: column;
  /* Отображаем элементы в столбце */
  align-items: center;
  justify-content: center;
  /* Выравниваем по центру по вертикали */
  height: 100vh;
  /* Расширяем контейнер на весь экран по высоте */
  margin-left: 48%;
  margin-top: 2.5%;
}

.text-block p {
  margin-bottom: 60px;
  /* Отступ между текстом и кнопкой */
  font-size: 10vh;
  text-align: center;
  line-height: 100%;
}

.start {
  background: linear-gradient(to bottom, #c5291d, #8f2017, #cf341e);
  color: #fff;
  padding: 5% 20%;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 8vh;
  font-weight: bold;
  text-decoration: none;
}

/* При наведении добавим небольшую тень, чтобы кнопка выглядела трёхмерной */
.start:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* Медиа-запросы для более точного контроля на различных разрешениях */
@media screen and (max-width: 768px) {
  .start_page h1 {
    font-size: 6vw;
  }
}

@media screen and (min-width: 1200px) {
  .start_page h1 {
    font-size: 3.5vw;
  }
}
</style>
