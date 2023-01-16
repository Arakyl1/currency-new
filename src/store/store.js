import Api from '@/API/Api'
import { RegExp } from 'core-js'
import { computed, reactive, watch } from 'vue'

const getDate = () => Api.GetCurrencies()
  .then(res => {
    store.currencyValue = res
  })
const convertCurrencies = () => Api.GetConvertCurrencies(store.currency.from, store.currency.to, store.value.from)
  .then(res => { store.value.to = res.result })

export const store = reactive({
  activeCurrense: '',
  activePopUp: false,
  activeCalculator: false,
  windowWidth: 0,
  windowHeigth: 0,
  currency: { from: 'eur', to: 'byn' },
  currencyValue: null,
  value: { from: 1, to: 1 }
})
convertCurrencies()
getDate()
// computed
const allWatchData = computed(() => {
  return {
    curFrom: store.currency.from,
    curTo: store.currency.to,
    from: store.value.from,
    to: store.value.to
  }
})
// methods
export function reverceCurrency (from, to) {
  store.currency.from = to
  store.currency.to = from
}
export function updatePopUp (e) {
  store.activeCurrense = e
  store.activePopUp = !store.activePopUp
}
// export function reverceItem (object = store.currencyValue) {
//   store.currencyValue = Object.fromEntries(Object.entries(object).reverse())
// }
export const seacrhList = async (search) => {
  await getDate()
  if (search) {
    const item = Object.entries(store.currencyValue).filter(el => {
      const reg = new RegExp(`${search}`, 'i')
      const res = reg.test(el[1].code) || reg.test(el[1].description)
      return res ? el : undefined
    })
    if (item) {
      store.currencyValue = Object.fromEntries(item)
    } else { store.currencyValue = null }
  }
}
export function updateActiveCalculator () {
  store.activeCalculator = !store.activeCalculator
}
watch(() => allWatchData.value, () => {
  console.log(true)
  convertCurrencies()
})
