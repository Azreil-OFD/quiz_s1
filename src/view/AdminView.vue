<template>
  <p style="position: absolute; left: 10px;top:10px" class="btn" @click="router.push('/')"> Назад </p>
  <div class="container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab"
          aria-controls="home" aria-selected="true">Список</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab"
          aria-controls="profile" aria-selected="false">Добавить</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab"
          aria-controls="contact" aria-selected="false">Статистика</button>
      </li>
    </ul>
    <editModalVue v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h3>Редактирование элемента {{ currect.data.id + 1 }} </h3>
      </template>
      <template v-slot:body>
        <div class="title p-2">
          <label for="title">Вопрос: </label>
          <input type="text" v-model="currect.data.title" class="form-control" />
        </div>
        <div class="answers p-2 ">
          <label class="form-label">Ответ 1</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 1">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 1"
                :checked="currect.data.success == 1">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[1].text" placeholder="Введите вариант ответа!">
          </div>
          <label class="form-label">Ответ 2</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 2">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 2"
                :checked="currect.data.success == 2">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[2].text" placeholder="Введите вариант ответа!">
          </div>
          <label class="form-label">Ответ 3</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 3">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 3"
                :checked="currect.data.success == 3">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[3].text" placeholder="Введите вариант ответа!">
          </div>
          <label class="form-label">Ответ 4</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 4">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 4"
                :checked="currect.data.success == 4">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[4].text" placeholder="Введите вариант ответа!">
          </div>
        </div>
        <button @click="addData()" style="float: right;" class=" btn btn-success m-2">Сохранить</button>
        <button @click="OffEdit()" class="btn btn-danger m-2" v-if="mode == 'edit'">Отмена</button>
      </template>
    </editModalVue>
    <div class="alert alert-danger" role="alert" v-if="error" style="position: absolute; right:2%; top:2%">
      {{ error }}
    </div>

    <div class="alert alert-success" role="alert" v-if="info" style="position: absolute; right:2%; top:2%">
      {{ info }}
    </div>
    <div class="tab-content" id="myTabContent" style="margin-top: 20px;">

      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div v-if="data.data.length !== 0" style="display: block; float: right;">
          <span>Быстрые функции:</span> <br>
          <button class="btn btn-danger m-2" @click="clearData()">Удалить все</button>
        </div>
        <div class="row">
          <div class="col-sm-4" v-for="el in data.data">
            <div class="card border border-secondary mb-3" style="max-width: 40rem;">
              <div class="card-header bg-transparent border border-secondary"> Ворос {{ el.id + 1 }}: {{ el.title }}</div>
              <div class="card-body text-secondary">
                <p v-for="answer in el.answers">
                <p class="" :class="{
                  'card': el.success == answer.num,
                  'border': el.success == answer.num,
                  'border-success': el.success == answer.num,
                  'text-success': el.success == answer.num
                }">{{ answer.num }}) {{ answer.text }}</p>
                </p>
              </div>
              <div class="card-footer bg-transparent border border-secondary"
                style="display: flex; justify-content: space-evenly;">
                <button class="btn btn-primary" v-if="el.id != 0" @click="upArr(data.data, el.id)">
                  &lt Вперед </button>
                <button class="btn btn-danger" @click="deleteData(el.id)">удалить</button>
                <button class="btn btn-secondary" @click="editMode(el.id)">изменить</button>

                <button class="btn btn-primary" v-if="el.id !== data.data.length - 1" @click="downArr(data.data, el.id)">
                  Назад &gt;
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style="margin-top: 10px;">
        <div class="title p-2">
          <label for="title">Вопрос: </label>
          <input type="text" v-model="currect.data.title" class="form-control" />
        </div>
        <div class="answers p-2 ">
          <label class="form-label">Ответ 1</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 1">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 1"
                :checked="currect.data.success == 1">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[1].text" placeholder="Введите вариант ответа!">
          </div>
          <label class="form-label">Ответ 2</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 2">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 2"
                :checked="currect.data.success == 2">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[2].text" placeholder="Введите вариант ответа!">
          </div>
          <label class="form-label">Ответ 3</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 3">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 3"
                :checked="currect.data.success == 3">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[3].text" placeholder="Введите вариант ответа!">
          </div>
          <label class="form-label">Ответ 4</label>
          <div class="input-group">
            <div class="input-group-text" @click="currect.data.success = 4">
              <input class="form-check-input mt-0" type="radio" value=""
                aria-label="Radio button for following text input" @change="currect.data.success = 4"
                :checked="currect.data.success == 4">
            </div>
            <input type="text" class="form-control" aria-label="Text input with radio button"
              v-model="currect.data.answers[4].text" placeholder="Введите вариант ответа!">
          </div>
        </div>
        <button @click="addData()" class=" btn btn-success m-2">Сохранить</button>
      </div>

      <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <div class="card">
          <div class="card-body">
            <p>Среднее: {{ getStat()[0] }}</p>
            <p>Максимально: {{ getStat()[1] }}</p>
            <p>Минимально: {{ getStat()[2] }}</p>

          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Набрано</th>
              <th scope="col">Максимально</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="statistic" v-for="stats in statistic">
              <th scope="row"></th>
              <td>{{ stats[0] }}</td>
              <td>{{ stats[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { useRouter } from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"; import { reactive, ref, toRaw, onMounted, watch } from "vue";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import editModalVue from "../components/editModal.vue";

const statistic = ref([])
const router = useRouter();
const getStat = () => {
  let scoredSum = 0;
  let maxSum = 0;
  let max = 0;
  let min = 0;
  for (let i = 0; i < statistic.value.length; i++) {
    scoredSum += statistic.value[i][0];
    maxSum += statistic.value[i][1];
    max = statistic.value[i][0] > max ? statistic.value[i][0] : max;
    min = statistic.value[i][0] < min ? statistic.value[i][0] : min;
  }

  const avgScore = scoredSum / maxSum;
  return [avgScore, max, min];
}


const data = reactive({
  data: [],
});
const error = ref();
const info = ref();
const mode = ref("view");

const showModal = ref(false)
setInterval(() => {
  info.value = ""
  error.value = ""
}, 5000)

async function loadData() {
  try {
    const jsonData = await readTextFile("data.json");

    return JSON.parse(jsonData);
  } catch {
    return [];
  }
}

async function loadStatistic() {
  try {
    const jsonData = await readTextFile("statistic.json");

    return JSON.parse(jsonData);
  } catch {
    return [];
  }
}
function addId() {
  console.log();
  for (let index = 0; index < data.data.length; index++) {
    data.data[index].id = index;
  }
}
async function clearData() {
  data.data = [];
  saveData();
  loadData();
  addId();
  window.location.reload()
}
async function OffEdit() {
  mode.value = "view";
  showModal.value = false;
  currect.data.id = -1;
  currect.data.title = "";
  currect.data.answers = {
    1: { num: 1, text: "" },
    2: { num: 2, text: "" },
    3: { num: 3, text: "" },
    4: { num: 4, text: "" },
  };
  currect.data.success = null;
}

async function editMode(id) {
  mode.value = "edit";
  showModal.value = true;
  currect.data.id = data.data[id].id;
  currect.data.title = data.data[id].title;
  currect.data.answers = data.data[id].answers;
  currect.data.success = data.data[id].success;
}
async function addData() {
  if (
    currect.data.title === "" ||
    currect.data.answers[1].text === "" ||
    currect.data.answers[2].text === "" ||
    currect.data.answers[3].text === "" ||
    currect.data.answers[4].text === "" ||
    currect.data.success === null
  ) {
    error.value = "Заполните все поля и выберите верный вариант ответа";
    return;
  }

  error.value = "";
  if (mode.value === "edit") {
    data.data[currect.data.id] = JSON.parse(JSON.stringify({
      id: currect.data.id,
      title: currect.data.title,
      answers: currect.data.answers,
      success: currect.data.success,
    }));
    showModal.value = false;
    await OffEdit()
  } else {
    data.data.push(JSON.parse(JSON.stringify({
      id: currect.data.id,
      title: currect.data.title,
      answers: currect.data.answers,
      success: currect.data.success,
    })));
    info.value = "Задачка успешно добавлена";
    await OffEdit()
  }
  addId();
  await saveData();
}
async function upArr(arr, id) {
  const index = arr.findIndex((item) => item.id === id);

  if (index > 0) {
    // Меняем местами с предыдущим элементом
    [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
  }

  data.data = arr;
  addId();
  await saveData();
}
async function deleteData(id) {
  data.data.splice(id, 1);
  addId();
  saveData();
  await saveData();
}
async function downArr(arr, id) {
  const index = arr.findIndex((item) => item.id === id);

  if (index < arr.length - 1) {
    // Меняем местами со следующим элементом
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
  }
  data.data = arr;
  addId();
  await saveData();
}
async function saveData() {
  const jsonData = JSON.stringify(toRaw(data.data));

  await writeTextFile("data.json", jsonData);
}

onMounted(async () => {
  data.data = await loadData();
  statistic.value = await loadStatistic()
  addId();
});

const currect = reactive({
  data: {
    id: -10,
    title: "",
    answers: {
      1: { num: 1, text: "" },
      2: { num: 2, text: "" },
      3: { num: 3, text: "" },
      4: { num: 4, text: "" },
    },
    success: null,
  }
});

const edited = reactive({
  id: -1,
  title: "",
  answers: {
    1: { num: 1, text: "" },
    2: { num: 2, text: "" },
    3: { num: 3, text: "" },
    4: { num: 4, text: "" },
  },
  success: null,
});
</script>
