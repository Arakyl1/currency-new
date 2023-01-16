<template>
<form class="o2__form --flex">
    <icon-search class="o2__icon"/>
    <input type="text" class="o2__input --b-o-br-none --c-gray-2" v-model="seacrh" @focus="addStain(true)" @blur="addStain(false)">
    <icon-reset class="o2__icon-reset" @click="() => seacrh = ''"/>
</form>
</template>
<script setup>
import IconSearch from '../Icons/IconSearch.vue'
import IconReset from '../Icons/IconReset.vue'
import { ref, watch } from 'vue'
import { store, seacrhList } from '@/store/store'
// eslint-disable-next-line
const emit = defineEmits(['search'])
const seacrh = ref('')
function addStain (event) {
  emit('search', event)
}

watch(seacrh, (newSearch) => seacrhList(newSearch))
watch(() => store.activePopUp, () => {
  seacrh.value = ''
  seacrhList()
})
</script>

<style lang="scss">
.o2{
    &__form {
        position: relative;
        @include border-main(2, solid, green-1);
        border-radius: var(--border-radius-15);
        padding: 0.5rem;
        align-items: center;
        max-width: 100%;
        & > input{
            flex-grow: 2;
            max-width: calc(100% - 24px - 24px - 1.5rem);
            overflow: hidden;
        }
        & > svg{
            @include min-max-height-width(24px, 24px, 24px, 24px);
        }
    }
    &__icon{
        margin-right: 0.75rem;
    }
    &__icon-reset{
        margin-left: 0.75rem;
        flex-grow: 2;
        & path{
            fill: var(--col-white-1);
        }
    }
}
</style>
