import { createApp } from "vue";
import 'normalize.css'
import "./styles.css";
import App from "./App.vue";
// import { createRouter, createWebHistory } from "vue-router";
// import StartViewVue from "./view/StartView.vue";
// import GameViewVue from "./view/GameView.vue";
// import FinishViewVue from "./view/FinishView.vue";
// import AdminViewVue from "./view/AdminView.vue";
// document.addEventListener('contextmenu', event => event.preventDefault());

// // Роутеры
// const routes = [
//   { path: "/", component: StartViewVue },
//   { path: "/game", component: GameViewVue },
//   { path: "/finish", component: FinishViewVue },
//   { path: "/admin", component: AdminViewVue },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });


const app = createApp(App)
// app.use(router)
// app.use(VueResizeText)
app.mount("#app");
