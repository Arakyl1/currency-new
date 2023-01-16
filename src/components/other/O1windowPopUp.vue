<template>
<div class="o1" :style="{ transform: `translateY(${transformPopUp})`}">
  <div class="o1__control-line" ref="cont">
    <span class="--b-c-gray-2" ></span>
  </div>
  <div class="o1__con --flex">
  <o2search-form @search="(event) => activeSearch = event"/>
  <div class="spacer--150"></div>
    <div class="o1__common-base"
    :class="{ 'active--search': activeSearch }">
      <h3 class="o1__title --c-gray-2 --t-s">Common bases</h3>
      <ul class="o1__list-base --flex" @click="hidePopUp($event)">
        <li class="o1__item __base --flex" v-for="item in basicCurrencies" :key="item" :data-currense="item">
          <div class="o1__img">
            <img :src="`img/color/${item}.svg`" :alt="item" class=" --b-c-white-1 --cur-img">
          </div>
          <p class="o1__text __up --c-gray-2">{{ item }}</p>
        </li>
      </ul>
    </div>
    <div class="spacer--200"></div>
    <div class="o1__main --flex">
      <h3 class="--c-gray-2 --t-s">Token name</h3>
      <icon-arround-down  @click="rotate = !rotate" :class="{ __rotate: rotate }"/>
    </div>
    <div class="o1__lict-con" >
      <ul class="o1__list --flex" v-if="store.currencyValue" :class="{ '__reverce': rotate}" @click="hidePopUp">
      <li class="o1__item --flex" v-for="item in store.currencyValue" :key="item.code" :data-currense="item.code">
        <div class="o1__img">
          <img :src="`img/color/${item.code}.svg`" :alt="item.code" class=" --b-c-white-1 --cur-img">
        </div>
        <p class="o1__text __key __up --c-gray-2">{{ item.code }}</p>
        <p class="o1__text --c-gray-2">{{ item.description }}</p>
      </li>
    </ul>
    <p class="--t-xl --c-gray-2" v-else>Еhere is nothing on your request</p>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, watch } from 'vue'
import IconArroundDown from '@/components/Icons/IconArroundDown.vue'
import O2searchForm from './O2searchForm.vue'
import { store, updatePopUp } from '@/store/store'
import { toucheElemPosition } from '@/OtherJS/toucheElemPosition'
import { computed } from '@vue/reactivity'

const rotate = ref(false)
const cont = ref(null)
const elem = toucheElemPosition(cont)
const activeSearch = ref(false)
const basicCurrencies = ref(['eur', 'byn', 'azn', 'rub', 'usd', 'gel', 'kmf', 'sar'])

const transformPopUp = computed(() => store.activePopUp && elem.dy > 0 && elem.started
  ? `calc(${(-100 + (elem.dy / (store.windowHeigth / 100)))}% + 10px)`
  : store.activePopUp && (-100 + (elem.dy / (store.windowHeigth / 100))) < -50
    ? 'calc(-100% + 10px)'
    : 0)
// methods
function hidePopUp (event) {
  const key = event.target.closest('.o1__list-base-item')?.dataset.currense || event.target.closest('.o1__item')?.dataset.currense
  if (key) {
    store.currency[store.activeCurrense] = key
  } else return
  updatePopUp()
}
// watch
watch(() => elem.started, started => {
  if (parseFloat(transformPopUp.value).toFixed(2) > -50 && !started) {
    store.activePopUp = false
    elem.dy = null
  } else if (store.activePopUp) {
    elem.dy = 0
  }
})
</script>
<style lang="scss">
.o1{
  @include position-block(top, left, translateY(0), 100%);
  width: 100vw;
  height: 100vh;
  transition: transform ease-out 0.2s;
  transition: height ease-in-out 0;
  background: linear-gradient(to top, var(--col-black-1), #156767);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 3px 0 12px -1px var(--col-black-1);
  &.active {
    transform: translateY(-100%);
  }
  &__control-line{
    max-width: 40%;
    margin: 0 auto;
    padding: 1rem 0;
    & > span{
      display: inline-block;
      height: 4px;
      width: 100%;
      border-radius: 2px;
    }
  }
  &__con{
    max-width: 600px;
    margin: auto;
    flex-direction: column;
    height: 100%;
    padding: 0.5rem 1.5rem 6rem;
    overflow: hidden;
    border-radius: var(--border-radius-15);
  }
    &__lict-con{
      overflow-y: scroll;
    }
    &__list{
      flex-flow: column;
      &.__reverce{
        flex-flow: column-reverse;
      }
    }
    &__list-base{
      flex-flow: row;
    }
    &__text{
      &.__key{
        min-width: 57px;
      }
      &.__up{
        text-transform: uppercase
      }
    }
    &__common-base{
      @include border-main(1, solid, green-1, 15);
      padding: 1rem;
      min-height: calc((var(--quanity-colums-base-container) * 42px) + 3.875rem);
      transform-origin: top;
      overflow: hidden;
      transition: all ease .3s;
      &.active--search{
       min-height: 3rem;
       max-height: 3rem;
      }
    }
    &__list-base{
      display: flex;
      flex-wrap: wrap;
    }
    &__main{
      margin-bottom: 1rem;
      & > h3{
        flex-grow: 2;
      }
      & > svg.__rotate{
        transform: scale(-1);
      }
    }
    &__title{
      margin-bottom: 1rem;
    }
    &__item{
      margin-bottom: 1.5rem;
      &.__base{
        width: 33.3%;
        margin-bottom: 1rem;
      }
      & > div.o1__img {
        margin-right: 1rem;
      }
    }
}
</style>
