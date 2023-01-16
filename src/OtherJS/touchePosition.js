import { reactive } from 'vue'

export const touchStartPos = reactive({ x: null, y: null, started: false, vector: null })
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
  e.preventDefault()
  const dx = e.changedTouches[0].clientX - touchStartPos.x
  const absDx = Math.abs(dx)
  const dy = e.changedTouches[0].clientY - touchStartPos.y
  const absDy = Math.abs(dy)

  if (Math.max(absDx, absDy) > 5) {
    touchStartPos.vector = (absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0))
    touchStartPos.started = false
  }
}
const onTouchEnd = (e) => {
  touchStartPos.started = false
}

export function addHandler (elem) {
  elem.value.addEventListener('touchstart', onToucheStart, { passive: false })
  elem.value.addEventListener('touchmove', onToucheMove, { passive: false })
  elem.value.addEventListener('touchend', onTouchEnd, false)
}

export function removeHandler (elem) {
  elem.value.removeEventListener('touchstart', onToucheStart, { passive: false })
  elem.value.removeEventListener('touchmove', onToucheMove, { passive: false })
  elem.value.removeEventListener('touchend', onTouchEnd, false)
}
