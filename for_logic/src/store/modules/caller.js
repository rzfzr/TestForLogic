// const axios = require("axios").default;








function call() {
    return axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(response => (this.info = response))



}