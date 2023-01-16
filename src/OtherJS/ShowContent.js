import { ref, watch } from 'vue'
import { store, updateMask } from '@/store/store'

export function ShowContent () {
  const activeElem = ref(false)
  function updateActiveElem () {
    activeElem.value = !activeElem.value
    updateMask()
  }
  watch(() => store.mask, (newMask) => {
    if (!newMask && activeElem.value) {
      activeElem.value = !activeElem.value
    }
  })
  return { activeElem, updateActiveElem }
}
