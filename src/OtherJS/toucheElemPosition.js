import { onBeforeUnmount, onMounted, reactive } from 'vue'

export function toucheElemPosition (elem, option) {
  const touchStartPos = reactive({ x: null, y: null, dx: null, dy: null, started: false, vector: null })
  const onToucheStart = (e) => {
    touchStartPos.x = e.touches[0].clientX
    touchStartPos.y = e.touches[0].clientY
    touchStartPos.started = true
    touchStartPos.vector = null
    // e.preventDefault()
  }
  const onToucheMove = (e) => {
    if (!touchStartPos.started) {
      return
    }
    // e.preventDefault()
    touchStartPos.dx = e.changedTouches[0].clientX - touchStartPos.x
    touchStartPos.dy = e.changedTouches[0].clientY - touchStartPos.y
    if (option && option.vector) {
      const absDx = Math.abs(touchStartPos.dx)
      const absDy = Math.abs(touchStartPos.dy)
      if (Math.max(absDx, absDy) > 5) {
        touchStartPos.vector = (absDx > absDy ? (touchStartPos.dx > 0 ? 1 : 3) : (touchStartPos.dy > 0 ? 2 : 4))
        touchStartPos.started = false
      }
    }
  }
  const onTouchEnd = (e) => {
    touchStartPos.started = false
  }

  function addHandler (elem) {
    elem.value.addEventListener('touchstart', onToucheStart, { passive: true })
    elem.value.addEventListener('touchmove', onToucheMove, { passive: true })
    elem.value.addEventListener('touchend', onTouchEnd, true)
  }

  function removeHandler (elem) {
    elem.value.removeEventListener('touchstart', onToucheStart, { passive: true })
    elem.value.removeEventListener('touchmove', onToucheMove, { passive: true })
    elem.value.removeEventListener('touchend', onTouchEnd, true)
  }

  onMounted(() => addHandler(elem))
  onBeforeUnmount(() => removeHandler(elem))
  return touchStartPos
}
