<template>
  <div class="app__wrap" ref="cont">
    <a1-ftom-to-currense />
    <o1window-pop-up/>
    <s2-calculator/>
  </div>
</template>

<script setup>
import A1FtomToCurrense from '@/components/main/A1-FtomToCurrense.vue'
import O1windowPopUp from './components/other/O1windowPopUp.vue'
import { store, updateActiveCalculator } from '@/store/store'
import { InnerHeigth } from '@/OtherJS/InnerHeigth'
import { ref, watch } from 'vue'
import { toucheElemPosition } from '@/OtherJS/toucheElemPosition'
import S2Calculator from './components/main/S2Calculator.vue'

store.windowHeigth = InnerHeigth()
const cont = ref(null)
const elem = toucheElemPosition(cont, { vector: true })

watch(() => elem.vector, vector => {
  if (vector === 1 && !store.activePopUp && !store.activeCalculator) {
    console.log('active Calculator')
    updateActiveCalculator()
  }
})
</script>

<style lang="scss">
@import './styles/variables';
#app {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to top, var(--col-black-1), #156767);
  overflow: hidden;
}
.app__wrap{
  position: relative;
  height: 100vh;
  width: 100vw;
}
</style>
