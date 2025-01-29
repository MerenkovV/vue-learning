import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/Home.vue";
import ScenePage from "../components/ScenePage.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
  { path: "/:catchAll(.*)", component: NotFound },
  { path: "/", component: HomeView },
  { path: "/scene", component: ScenePage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
