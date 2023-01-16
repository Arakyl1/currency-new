<template>
    <div class="s2"
    ref="cont"
    :class="{ active: store.activeCalculator }">
      <div class="s2__con --flex">
        <div class="s2__show-expression --flex">
            <p class="s2__result --c-white-1 --t-3xl" v-if="twoValue">{{ fullExpression }}</p>
            <p class="s2__result --c-white-1 --t-3xl" v-else>{{ oneValue }}</p>
        </div>
        <div class="s2__bt-con">
            <ul class="s2__bt-contrils --grid" @click="getSum($event)">
                <li class="s2__bt-item" v-for="item in calculData"
                :key="item.dataAtr"
                :data-calcul="item.dataAtr"
                :class="[item.class]">
                    <div class="s2__bt-text" v-if="item.img">
                        <img :src="'img/calculator/'+ item.img + '.svg'" :alt="item.dataAtr">
                    </div>
                    <div class="s2__bt-text" v-else>
                      <p class="--c-white-1">{{ item.dataAtr }}</p>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
</template>
<script setup>
import Calculator from '@/BasicLogic/Calculator'
import { computed, ref, watch } from 'vue'
import { store, updateActiveCalculator } from '@/store/store'
import { toucheElemPosition } from '@/OtherJS/toucheElemPosition'

const calculData = ref([
  { dataAtr: 'C', img: 'c', class: '__yellow' },
  { dataAtr: 'percent', img: 'percent' },
  { dataAtr: 'plus-minus', img: 'plus-minus' },
  { dataAtr: 'delete', img: 'delete', class: '__yellow' },
  { dataAtr: '7', num: 7, img: null },
  { dataAtr: '8', num: 8, img: null },
  { dataAtr: '9', num: 9, img: null },
  { dataAtr: 'xmark', img: 'xmark' },
  { dataAtr: '4', num: 4, img: null },
  { dataAtr: '5', num: 5, img: null },
  { dataAtr: '6', num: 6, img: null },
  { dataAtr: 'minus', img: 'minus' },
  { dataAtr: '1', num: 1, img: null },
  { dataAtr: '2', num: 2, img: null },
  { dataAtr: '3', num: 3, img: null },
  { dataAtr: 'plus', img: 'plus' },
  { dataAtr: 'circle', img: 'circle', class: '__small' },
  { dataAtr: '0', num: 0, img: null },
  { dataAtr: 'divide', img: 'divide' },
  { dataAtr: 'equals', img: 'equals', class: '__yellow' }
])
const oneValue = ref(0)
const twoValue = ref(0)
const operator = ref('')
const cont = ref(null)
const position = toucheElemPosition(cont, { vector: true })
// methods
function getSum (e) {
  const value = e.target.closest('.s2__bt-item')?.dataset.calcul
  if (!value) return
  if (value === 'C') {
    oneValue.value = twoValue.value = 0
    operator.value = ''
  }
  const res = parseInt(value)
  if (isFinite(res)) {
    if (Number(oneValue.value) < 1e12) {
      if (oneValue.value === 0) {
        oneValue.value = value
        return
      }
    }
    oneValue.value += value
  } else if (value === 'equals') {
    if (operator.value && oneValue.value && twoValue.value) {
      oneValue.value = parseFloat(Calculator.getSum(parseFloat(oneValue.value), twoValue.value, operator.value).toFixed(6))
      twoValue.value = operator.value = ''
    }
  } else if (value === 'circle') {
    if (Number.isInteger(parseFloat(oneValue.value)) &&
    oneValue.value.slice(-1) !== '.') {
      oneValue.value += '.'
    }
  } else if (value === 'delete' && oneValue.value !== 0) {
    if (oneValue.value !== '') {
      oneValue.value = deleteSumbol(oneValue.value)
    } else if (operator.value) {
      operator.value = ''
      oneValue.value = twoValue.value
      twoValue.value = 0
    }
    if (!oneValue.value && !operator.value) {
      oneValue.value = 0
    }
  } else if (oneValue.value) {
    if (twoValue.value && operator.value) {
      oneValue.value = parseFloat(Calculator.getSum(parseFloat(oneValue.value), twoValue.value, operator.value).toFixed(6))
    }
    const oper = Calculator.getOpetator(value)
    if (!oper) {
      oneValue.value = parseFloat(Calculator.getAdditionalFunction(value, parseFloat(oneValue.value)))
      return
    }
    twoValue.value = parseFloat(oneValue.value)
    oneValue.value = ''
    operator.value = oper
  }
}
function deleteSumbol (el) {
  return `${el}`.slice(0, -1)
}
const fullExpression = computed(() => {
  return twoValue.value ? twoValue.value + (operator.value ? ' ' + operator.value + ' ' : '') + oneValue.value : ''
})
// watch
watch(() => position.vector, (vector) => {
  if (vector === 3 && store.activeCalculator) {
    updateActiveCalculator()
  }
})

</script>

<style lang="scss">
.s2{
    @include position-block(top, left, translateX(-100%), 0, 0, fixed);
    background-color: var(--col-black-1);
    height: 100%;
    width: 100vw;
    z-index: 100;
    padding: 3.5rem 1.5rem;
    transition: all ease 0.4s;
    &.active {
     transform: translateX(0);
    }
    &__con{
      max-width: 450px;
      margin: auto;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
    }
    &__show-expression{
        flex-grow: 2;
        padding: 1.25rem;
        overflow: hidden;
        margin-bottom: 2rem;
        flex-flow: nowrap column-reverse;
        @include border-main(1, solid, gray-1, 15);
    }
    &__result{
        overflow-wrap: break-word;
        word-break: keep-all;
        text-align: right;
    }
    &__bt-contrils{
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: repeat(5, minmax(0, 1fr));
        gap: 0.5rem;
        @include media-style((
          500: (gap: 0.375rem),
          360: (gap: 0.125rem)
        ))
    }
    &__bt-item{
        aspect-ratio: 1;
        margin: 0.35rem;
        @include border-main(2, solid, gray-1, 15);
        background: var(--col-gray-1);
        color: var(--col-white-1);
        position: relative;
        &.__yellow{
            background: var(--col-yellow-1);
            border: none;
        }
        &.__small {
            .s2__bt-text{
               align-items: flex-end
            }
        }
    }
    &__bt-text{
        @include min-max-height-width(50%, 50%, 50%, 80%);
        @include position-block(top, left, translate(-50%, -50%), 50%, 50%);
        display: flex;
        align-items: center;
        justify-content: center;
        & > p{
          font-size: 2.25rem;
          @include media-style((
            500: (font-size: 2rem),
            360: (font-size: 1.75rem)
          ))
        }
        img{
            max-height: 70%;
            max-width: 70%;
        }
    }
}
</style>
