import { ref, computed, onMounted, onUnmounted } from "vue"

export function useScreenSize() {
  const width = ref<number>(process.client ? window.innerWidth : 1200)

  const isMobile = computed(() => width.value < 768)
  const isTablet = computed(() => width.value >= 768 && width.value < 1024)
  const isDesktop = computed(() => width.value >= 1024)

  if (process.client) {
    const onResize = () => {
      width.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener("resize", onResize)
    })

    onUnmounted(() => {
      window.removeEventListener("resize", onResize)
    })
  }

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
  }
}
