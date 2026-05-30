import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectView from "../views/ProjectView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/project/:slug",
    name: "project",
    component: ProjectView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
