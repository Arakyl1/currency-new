import { ref, onMounted } from 'vue'

export function InnerHeigth () {
  const elem = ref(0)
  // mounted
  onMounted(() => {
    elem.value = window.innerHeight
    window.addEventListener('resize', () => {
      elem.value = window.innerHeight
    })
  })
  return elem
}
