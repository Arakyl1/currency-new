import { ref, onMounted } from 'vue'

export function InnerWidth () {
  const elem = ref(0)
  // mounted
  onMounted(() => {
    elem.value = window.innerWidth
    window.addEventListener('resize', () => {
      elem.value = window.innerWidth
    })
  })
  return elem
}
