

<template>
    <main>
        <div class="question_page">
            <div class="layer" id="layer1">
                <img src="@/assets/img/222.png" alt="Layer 1 Image 1" class="layer-image cloud1" />
                <img src="@/assets/img/222.png" alt="Layer 1 Image 2" class="layer-image cloud2" />
            </div>

            <div class="layer" id="layer2">
                <img src="@/assets/img/knigaSin.svg" alt="Layer 2 Image 1" class="layer-image knigaSin" />
                <img src="@/assets/img/mozg.svg" alt="Layer 2 Image 2" class="layer-image mozg">
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
                    <div class="question_txt" id="questionText">
                        <h2>{{ data[episode].title }}</h2>
                    </div>
                    <div class="options">
                        <button class="qButton btn1" @click="next(0)">{{ data[episode].answers[0] }}</button>
                        <button class="qButton btn2" @click="next(1)">{{ data[episode].answers[1] }}</button>
                        <button class="qButton btn3" @click="next(2)">{{ data[episode].answers[2] }}</button>
                        <button class="qButton btn4" @click="next(3)">{{ data[episode].answers[3] }}</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated, watch, ref } from 'vue';
import { useWindowSize, useStorage } from '@vueuse/core'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';



const score = useStorage("score")
const episode = ref(0)
const data = useStorage("quiz")
//#region Process
const next = async (number) => {
    if (number == data.value[episode.value].correct) {
        console.log("Верно")
    }
    if (data.value.length - 1 > episode.value) {
        episode.value += 1;
        if (episode.value == 3) {
            let permissionGranted = await isPermissionGranted();
            if (!permissionGranted) {
                const permission = await requestPermission();
                permissionGranted = permission === 'granted';
            }
            if (permissionGranted) {
                sendNotification({ title: 'Trojan.Pidor.Hahaha!Hi', body: 'Критическая угроза обнаружена на ПК:\nВаши действия: \n\t Вы обречены!', icon: "https://commons.wikimedia.org/wiki/File:Microsoft_Defender_2020_Fluent_Design_icon.png" });
            }
        }
    } else {

    }
}
//#endregion Process

data.value = [
    {
        title: "Кто хочет стать 1? Кто хочет стать 1? Кто хочет стать 1? Кто хочет стать 1? Кто хочет стать 1? Кто хочет стать 1? ",
        answers: [
            'Но вот такое на всякий тоже отработай: ', 'рентгеноэлектрокардиографического', 'Да и думаю на вряд ли будут ответы длинее', 'ну....лучше чем было. Наааамного'
        ],
        correct: 0
    }, {
        title: "Кто хочет стать 2?",
        answers: [
            '1', '2', '3', '4'
        ],
        correct: 1
    }, {
        title: "Кто хочет стать 3?",
        answers: [
            '1', '2', '3', '4'
        ],
        correct: 1
    }, {
        title: "Кто хочет стать 4?",
        answers: [
            '1', '2', '3', '4'
        ],
        correct: 3
    }, {
        title: "Кто хочет стать 5?",
        answers: [
            '1', '2', '3', '4'
        ],
        correct: 0
    }, {
        title: "Кто хочет стать 6?",
        answers: [
            '1', '2', '3', '4'
        ],
        correct: 2
    },
]


function resizeTextToFitContainer(elementId) {
    var questionText = document.getElementById(elementId);
    var containerHeight = questionText.clientHeight;
    var textHeight = questionText.scrollHeight;

    var fontSize = parseFloat(window.getComputedStyle(questionText).fontSize);

    while (textHeight > containerHeight) {
        fontSize -= 1;
        questionText.style.fontSize = fontSize + "px";
        textHeight = questionText.scrollHeight;
    }
}

function resizeTextToFitButtons(selector) {
    var buttons = document.querySelectorAll(selector);

    buttons.forEach(function (button) {
        var buttonHeight = button.clientHeight;
        var textHeight = button.scrollHeight;

        var fontSize = parseFloat(window.getComputedStyle(button).fontSize);

        // Проверка, помещается ли текст внутри кнопки
        if (textHeight > buttonHeight) {
            while (textHeight > buttonHeight) {
                fontSize -= 1;
                button.style.fontSize = fontSize + "px";
                textHeight = button.scrollHeight;
            }
        }
    });
}

function resizeTextToFitContainerNoArgs() {
    var questionText = document.getElementById("questionText");
    var containerHeight = questionText.clientHeight;
    var textHeight = questionText.scrollHeight;

    var fontSize = parseFloat(window.getComputedStyle(questionText).fontSize);

    while (textHeight > containerHeight) {
        fontSize -= 1;
        questionText.style.fontSize = fontSize + "px";
        textHeight = questionText.scrollHeight;
    }
}
setTimeout(function () {
    resizeTextToFitContainer("questionText");
    resizeTextToFitButtons(".options button");
}, 100);

//#region ResizeText
const { width, height } = useWindowSize()

onMounted(() => {
    score.value = 0;
    resizeTextToFitContainer("questionText");
    resizeTextToFitButtons(".options button");
    resizeTextToFitContainerNoArgs();
})

watch(width, () => {
    resizeTextToFitContainer("questionText");
    resizeTextToFitButtons(".options button");
    resizeTextToFitContainerNoArgs();
})
watch(height, () => {
    resizeTextToFitContainer("questionText");
    resizeTextToFitButtons(".options button");
    resizeTextToFitContainerNoArgs();
})



//#endregion


</script>

<style>
main {
    margin: 0;
    padding: 0;
    background: radial-gradient(rgb(206, 217, 222), rgb(5, 97, 134), rgb(7, 58, 79));
    background-repeat: no-repeat;
    /* Это предотвратит повторение фона */
    user-select: none;
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
    /* Стили для изображений облаков */
}

.cloud1 {
    top: -10%;
    left: -20%;
    max-width: 60%;
}

.cloud2 {
    bottom: -18%;
    right: -20%;
    max-width: 65%;
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

.content {
    max-width: 1800px;
}

.wheel-of-fortune {
    /* Стили для верхнего блока с колесом фортуны */
    width: 38%;
    margin-left: 70px;
    margin-right: -3vw;
}

.strlk {
    width: 7vw;
    /* или другое относительное значение */
    top: 50%;
    /* transform: translateY(-50%); */
}

.question-block {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Стили для блока с вопросом и вариантами ответов */
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    margin-right: 110px;
}

.question_txt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(255, 255, 255, 0.7);
    /* Задаем цвет фона: белый с 70% прозрачности */
    color: #215365;
    padding: 30px;
    /* Добавляем отступы для улучшения читаемости */
    border-radius: 10px;
    max-width: 45vw;
    /* Максимальная ширина контейнера с вопросом */
    max-height: 42vh;
    /* Максимальная высота контейнера с вопросом */
    font-size: 5vh;
    margin-bottom: 20px;
    /* Измените значение по вашему усмотрению */
    margin-left: 40px;
}

.options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* Две колонки с равной шириной */
    grid-gap: 10px;
    /* Расстояние между элементами */
    align-items: center;
    justify-content: center;
    margin-left: 35px;
    /* padding-top: 100px; */
}

.options button {
    /* Стили для кнопок-вариантов ответов */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* display: block; */
    max-width: 400px;
    max-height: 100px;
    color: #FFFFFF;
    border-radius: 20px;
    font-size: 2em;
    /* Используем em для относительного размера шрифта */
    padding: 4vh 3vw;
    margin: 10px;
    border: none;
}


.btn1 {
    background: linear-gradient(to bottom, #C5291D, #8F2017, #CF341E);

}

.btn2 {
    background: linear-gradient(to bottom, #E97D3D, #FFC29B, #D47F46);
}

.btn3 {
    background: linear-gradient(to bottom, #37F150, #45C02A, #7EEB75);
}


.btn4 {
    background: linear-gradient(to bottom, #0C91C4, #17698F, #17698F);
}

@media (max-width: 768px) {
    .cloud {
        max-width: 30%;
        /* Уменьшенная максимальная ширина для узких экранов */
    }
}
</style>