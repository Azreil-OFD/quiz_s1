<script setup lang="js">
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { onMounted, ref, toRaw } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
async function loadData(text) {
  try {
    const jsonData = await readTextFile(text);
    return JSON.parse(jsonData);
  } catch {
    return [];
  }
}
async function saveData(text) {
  const jsonData = JSON.stringify(toRaw(statistic.value));

  await writeTextFile(text, jsonData);
}

const score = ref(0)
const currect = ref(0)
const statistic = ref([])
const data = ref({ data: [] })
const currect_onj = ref({
  id: 0,
  title: "",
  answers: {
    1: { num: 1, text: "" },
    2: { num: 2, text: "" },
    3: { num: 3, text: "" },
    4: { num: 4, text: "" },
  },
  success: null,

})
onMounted(
  async () => {
    data.value.data = await loadData('data.json')
    if (data.value.data.length === 0) {
      alert("База пустая.")
      router.push('/')
    }
    statistic.value = await loadData('statistic.json')
    currect_onj.value.id = data.value.data[0].id
    currect_onj.value.title = data.value.data[0].title
    currect_onj.value.answers = data.value.data[0].answers
    currect_onj.value.success = data.value.data[0].success
  }
)
const next = (answer) => {
  console.log(answer, score.value)
  score.value += answer == data.value.data[currect.value].success ? 1 : 0;
  if (currect.value + 1 === data.value.data.length) {
    router.push("/finish");
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hh = date.getHours();
    let mm = date.getMinutes();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year} ${hh}:${mm}`;
    statistic.value.push([toRaw(score.value), toRaw(data.value.data.length), currentDate])
    saveData('statistic.json')

    score.value = 0;
    currect.value = 0;
  }
  else {
    currect.value += 1;
    currect_onj.value.id = data.value.data[currect.value].id
    currect_onj.value.title = data.value.data[currect.value].title
    currect_onj.value.answers = data.value.data[currect.value].answers
    currect_onj.value.success = data.value.data[currect.value].success
  }
};
</script>

<template>
  <main>
    <div class="question_page">
      <div class="layer" id="layer1">
        <img src="@/assets/img/222.png" alt="Layer 1 Image 1" class="layer-image cloud1" />
        <img src="@/assets/img/222.png" alt="Layer 1 Image 2" class="layer-image cloud2" />
      </div>

      <div class="layer" id="layer2">
        <img src="@/assets/img/knigaSin.svg" alt="Layer 2 Image 1" class="layer-image knigaSin" />
        <img src="@/assets/img/mozg.svg" alt="Layer 2 Image 2" class="layer-image mozg" />
        <img src="@/assets/img/VoprosZh.svg" alt="Layer 2 Image 3" class="layer-image VoprosZh" />
        <img src="@/assets/img/pazlZ.svg" alt="Layer 2 Image 4" class="layer-image pazlZ" />
        <img src="@/assets/img/atom 1.svg" alt="Layer 2 Image 5" class="layer-image atom" />
        <img src="@/assets/img/korenS.svg" alt="Layer 2 Image 6" class="layer-image korenS" />
        <img src="@/assets/img/pazlS.svg" alt="Layer 2 Image 7" class="layer-image pazlS" />
        <img src="@/assets/img/VoprosS.svg" alt="Layer 2 Image 8" class="layer-image VoprosS" />
        <img src="@/assets/img/pazlO.svg" alt="Layer 2 Image 9" class="layer-image pazlO" />
      </div>

      <div class="content">
        <!-- Верхний блок с колесом фортуны -->
        <img src="@/assets/img/koleso.svg" alt="" class="wheel-of-fortune" />
        <img src="@/assets/img/strelka.svg" alt="" class="strlk" />

        <!-- Блок с вопросом и вариантами ответов -->
        <div class="question-block">
          <div class="question_txt">
            <h2>{{ currect_onj.title }}</h2>
          </div>
          <div class="options">
            <button class="qButton btn1" @click="next(1)">{{ currect_onj.answers[1].text }}</button>
            <button class="qButton btn2" @click="next(2)">{{ currect_onj.answers[2].text }}</button>
            <button class="qButton btn3" @click="next(3)">{{ currect_onj.answers[3].text }}</button>
            <button class="qButton btn4" @click="next(4)">{{ currect_onj.answers[4].text }}</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: AGCooperCyr;
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
p {
  color: #ffffff;
}

.qButton:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

button {
  cursor: pointer;
}

.question_page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

.background {
  overflow: hidden;
}

.cloud {
  position: absolute;
  max-width: 50%;
  /* Стили для изображений облаков */
}

.cloud1 {
  top: -10%;
  left: -20%;
}

.cloud2 {
  bottom: -18%;
  right: -20%;
}

.content {
  /* position: relative; */
  min-width: 100vw;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.knigaSin {
  width: 12%;
  top: 2%;
  left: 1%;
}

.mozg {
  width: 14%;
  top: 6%;
  left: 41%;
}

.VoprosZh {
  width: 5%;
  right: 25%;
  top: 6%;
}

.pazlZ {
  width: 7%;
  right: 3%;
  top: 5%;
}

.atom {
  width: 8%;
  left: 3%;
  bottom: 5%;
}

.korenS {
  width: 4%;
  left: 25%;
  bottom: 4%;
}

.pazlS {
  width: 8%;
  right: 50%;
  bottom: 8%;
}

.VoprosS {
  width: 5%;
  right: 28%;
  bottom: 2%;
}

.pazlO {
  width: 8%;
  right: 8%;
  bottom: 5%;
}

.wheel-of-fortune {
  /* Стили для верхнего блока с колесом фортуны */
  width: 38%;
  margin-left: 100px;
}

.strlk {
  width: 8%;
  /* или другое относительное значение */
  position: absolute;
  top: 50%;
  left: 40%;
  /* Измените отступ справа по вашему усмотрению */
  transform: translateY(-50%);
}

.question-block {
  /* Стили для блока с вопросом и вариантами ответов */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin-right: 150px;
}

.question_txt {
  max-width: 770px;
  font-size: 5vh;
  margin-bottom: 50px;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* Две колонки с равной шириной */
  grid-gap: 10px;
  /* Расстояние между элементами */
  align-items: center;
  justify-content: center;
  /* padding-top: 100px; */
}

.options button {
  /* Стили для кнопок-вариантов ответов */
  /* display: block; */
  color: #ffffff;
  border-radius: 20px;
  font-size: 2em;
  /* Используем em для относительного размера шрифта */
  padding: 30px 70px;
  margin: 10px;
  overflow: hidden;
  /* Обрезаем текст, который не помещается внутри кнопки */
  text-overflow: ellipsis;
  /* Добавляем многоточие (...) для обозначения обрезанного текста */
  white-space: nowrap;
  /* Запрещаем перенос текста на новую строку */
  border: none;
}

.btn1 {
  background: linear-gradient(to bottom, #c5291d, #8f2017, #cf341e);
}

.btn2 {
  background: linear-gradient(to bottom, #e97d3d, #ffc29b, #d47f46);
}

.btn3 {
  background: linear-gradient(to bottom, #37f150, #45c02a, #7eeb75);
}

.btn4 {
  background: linear-gradient(to bottom, #0c91c4, #17698f, #17698f);
}

@media (max-width: 768px) {
  .cloud {
    max-width: 30%;
    /* Уменьшенная максимальная ширина для узких экранов */
  }
}
</style>
