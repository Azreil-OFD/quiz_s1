<script setup lang="js">
import { ref, reactive, watch, onMounted } from "vue";
import { readTextFile } from "@tauri-apps/api/fs";
import gsap from "gsap";

async function loadData(text) {
  try {
    const jsonData = await readTextFile(text);

    return JSON.parse(jsonData);
  } catch {
    return [];
  }
}

const CurrcetScore = ref(0);
const MaxScore = ref(0);
onMounted(async () => {
  let values = await loadData('statistic.json')

  CurrcetScore.value = values[values.length - 1][0];
  MaxScore.value = values[values.length - 1][1];
})
const tweened = reactive({
  CurrcetScore: 0,
  MaxScore: 0,
});
onMounted(() => {
  CurrcetScore.value = 10;
  MaxScore.value = 10;
});

watch(CurrcetScore, (n) => {
  gsap.to(tweened, { duration: 0.5, CurrcetScore: Number(n) || 0 });
});
watch(MaxScore, (n) => {
  gsap.to(tweened, { duration: 0.5, MaxScore: Number(n) || 0 });
});
</script>

<template>
  <main>
    <div class="final_page">
      <div class="layer" id="layer1">
        <img src="@/assets/img/222.png" alt="Layer 1 Image 1" class="layer-image cloud1" />
        <img src="@/assets/img/222.png" alt="Layer 1 Image 2" class="layer-image cloud2" />
      </div>

      <div class="layer" id="layer2">
        <img src="@/assets/img/mozg2.svg" alt="Layer 2 Image 1" class="layer-image mozg2" />
        <img src="@/assets/img/shesterenkaK.svg" alt="Layer 2 Image 2" class="layer-image shesterenkaK" />
        <img src="@/assets/img/shesterenkaS.svg" alt="Layer 2 Image 2" class="layer-image shesterenkaS" />
        <img src="@/assets/img/pazlZH.svg" alt="Layer 2 Image 3" class="layer-image pazlZH" />
        <img src="@/assets/img/korenB.svg" alt="Layer 2 Image 4" class="layer-image korenB" />
        <img src="@/assets/img/1.png" alt="Layer 2 Image 5" class="layer-image PNG1" />
        <img src="@/assets/img/VoprosB.svg" alt="Layer 2 Image 6" class="layer-image VoprosB" />
        <img src="@/assets/img/1.png" alt="Layer 2 Image 7" class="layer-image PNG2" />
        <img src="@/assets/img/VoprosZH.svg" alt="Layer 2 Image 8" class="layer-image VoprosZH" />
        <img src="@/assets/img/VoprosR.svg" alt="Layer 2 Image 9" class="layer-image VoprosR" />
        <img src="@/assets/img/mozg.svg" alt="Layer 2 Image 10" class="layer-image mozg" />
      </div>

      <div class="layer" id="layer3">
        <div class="score_table">
          <h2 class="result-h2">ВАШ РЕЗУЛЬТАТ</h2>
          <div id="result_score">
            {{ tweened.CurrcetScore.toFixed(0) }}/{{
              tweened.MaxScore.toFixed(0)
            }}
          </div>
          <router-link to="/">
            <button class="repeat" @click="">НОВАЯ ИГРА</button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 0;
  padding: 0;
  background: radial-gradient(rgb(206, 217, 222),
      rgb(5, 97, 134),
      rgb(7, 58, 79));
  background-repeat: no-repeat;
  /* Это предотвратит повторение фона */
  user-select: none;
}

h1,
h2,
p,
button {
  color: #ffffff;
}

.repeat:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

button {
  cursor: pointer;
}

.final_page {
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

#layer1 .cloud1 {
  width: 35%;
  top: -7.5%;
  left: -12%;
}

#layer1 .cloud2 {
  width: 50%;
  bottom: -10%;
  right: -12.5%;
  /* transform: scale(-1, 1) */
}

.mozg2 {
  width: 15%;
  top: 15%;
  left: 3%;
}

.shesterenkaK {
  width: 4%;
  top: 10%;
  left: 28%;
}

.shesterenkaS {
  width: 8.5%;
  top: 3%;
  left: 34.5%;
}

.pazlZH {
  width: 6.7%;
  top: 4.5%;
  left: 47%;
}

.korenB {
  width: 9%;
  top: 8%;
  right: 31%;
}

.PNG1 {
  width: 20%;
  transform: rotate(30deg);
  right: 7%;
  top: 4%;
}

.VoprosB {
  width: 5%;
  right: 5%;
  top: 45%;
}

.PNG2 {
  width: 20%;
  left: 5%;
  bottom: 4.5%;
}

.VoprosZH {
  width: 5%;
  top: 44%;
  left: 4%;
}

.VoprosR {
  width: 7%;
  left: 27.5%;
  bottom: 7.5%;
}

.mozg {
  width: 15%;
  right: 9%;
  bottom: 8%;
}

.score_table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  /* Используем относительное значение для расстояния */
}

.result-h2 {
  margin-top: 12%;
  /* Используем относительное значение для отступа сверху */
  margin-bottom: -2vh;
  font-size: 6vw;
  /* Используем относительное значение для размера текста */
}

#result_score {
  background: linear-gradient(to bottom, #c5291d, #8f2017, #cf341e);
  color: #ffffff;
  width: 70vw;
  /* Используем относительное значение для ширины */
  max-width: 820px;
  /* Устанавливаем максимальную ширину для контроля максимального размера */
  height: 30vh;
  /* Используем относительное значение для высоты */
  max-height: 320px;
  /* Устанавливаем максимальную высоту для контроля максимального размера */
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11vw;
  /* Используем относительное значение для размера текста */
}

.repeat {
  background: linear-gradient(to bottom, #c5291d, #8f2017, #cf341e);
  border: none;
  border-radius: 18px;
  width: 40vw;
  /* Используем относительное значение для ширины */
  max-width: 500px;
  /* Устанавливаем максимальную ширину для контроля максимального размера */
  height: 15vh;
  /* Используем относительное значение для высоты */
  max-height: 150px;
  /* Устанавливаем максимальную высоту для контроля максимального размера */
  font-size: 2.6vw;
  /* Используем относительное значение для размера текста */
}
</style>
