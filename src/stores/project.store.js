import { defineStore } from "pinia";
import projectsData from "../data/projects.json";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: projectsData,
  }),

  getters: {
    getBySlug: (state) => (slug) => state.projects.find((p) => p.slug === slug),
  },
});
