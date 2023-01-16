import { ref, onMounted, onBeforeUnmount } from 'vue'

export function elemWidtn (cont) {
  const elem = ref(0)
  // methods
  function getElemWidth () {
    elem.value = cont.value?.clientWidth
  }
  // mounted
  onMounted(() => {
    cont.value.addEventListener('load', getElemWidth)
    window.addEventListener('resize', getElemWidth)
    getElemWidth()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', getElemWidth)
  })
  return elem
}
