import axios from 'axios'

export default class Api {
  static async GetCurrencies () {
    return axios.get('https://api.exchangerate.host/symbols').then(res => res.data.symbols)
  }

  static async GetSearchCurrencies (cur) {
    return axios.get(`https://api.exchangerate.host/latest?base=${cur}&places=4`).then(res => res.data)
  }

  static GetConvertCurrencies (from, to, num) {
    return axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${num}&places=4`).then(res => res.data)
  }
}
