<template>
<div class="a1-1">
    <h1 class="a1-1__title --t-2xl --c-white-1 --600">Exchange</h1>
    <p class="--c-gray-2 --500">Trade tokens in an instan</p>
    <form  class="a1-1__form" @submit.prevent>
        <div class="a1-1__input-con --c-black-1">
            <input type="number" class="--b-o-br-none --c-gray-2 --t-l" v-model="store.value.from">
            <label class="--c-gray-2">From</label>
            <div class="a1-1__input-currense --flex"  @click="updatePopUp('from')">
                <img :src="`img/color/${store.currency.from}.svg`" :alt="store.currency.from" class="--cur-img">
                <p class="--t-s --c-gray-2">{{ store.currency.from }}</p>
                <IconArround />
            </div>
        </div>
        <div class="a1-1__img-con">
            <img src="@/assets/svg/111111.svg" @click="reverceCurrency(store.currency.from, store.currency.to)">
        </div>
        <div class="a1-1__input-con --c-black-1">
            <input type="number" class=" --b-o-br-none --c-gray-2 --t-l" v-model="store.value.to">
            <label class="--c-gray-2">To</label>
            <div class="a1-1__input-currense --flex" @click="updatePopUp('to')">
                <img :src=" `img/color/${store.currency.to}.svg`" :alt="store.currency.to" class="--cur-img">
                <p class="--t-s --c-gray-2">{{ store.currency.to }}</p>
                <IconArround/>
            </div>
        </div>
    </form>
</div>
</template>

<script setup>
import IconArround from '@/components/Icons/IconArround.vue'
import { store, reverceCurrency, updatePopUp } from '@/store/store'

</script>

<style lang="scss">
.a1-1{
    text-align: left;
    padding: 1rem 0.5rem;
    position: relative;
    height: 100%;
    max-width: 600px;
    margin: 0 auto;
    &__title{
        margin-bottom: 1.5rem;
        text-align: center;
    }
    &__form{
        padding: 1.5rem 0;
    }
    &__input-con{
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 1rem 0.75rem 0.5rem;
        @include border-main(2, solid, green-1, 12);
        transition: all ease 0.3s;
        & > input{
            max-width: calc(100% - 100px);
        }
        &:focus,&:hover{
            @include border-main(2, solid, yellow-1, 12);
        }
        & > label{
            font-size: 0.625rem;
            @include position-block(top, left, translateY(-50%), 0.75rem, 1rem);
        }
    }
    &__input-currense{
        width: 100px;
        align-items: center;
        justify-content: space-around;
        transform: translateY(-4px);
        & > p.--t-s{
            padding: 0 0.25rem;
            text-transform: uppercase;
        }
    }
    &__img-con{
        padding: 1rem;
        text-align: center;
        & > img{
            height: 40px;
            width: 40px;
        }
    }
}
</style>
