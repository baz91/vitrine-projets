import { ref, onMounted } from "vue";

export const useAppLoader = () => {
  const showLoading = ref(true);

  onMounted(() => {
    // On attend que tout soit chargé
    window.addEventListener(
      "load",
      () => {
        setTimeout(() => {
          showLoading.value = false;
        }, 800);
      },
      { once: true },
    );

    // Sécurité : si l'événement load ne se déclenche pas (rare)
    setTimeout(() => {
      showLoading.value = false;
    }, 3000);
  });

  return { showLoading };
};
