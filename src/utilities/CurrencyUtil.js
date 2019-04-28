export default class CurrencyUtil {

    static numberToCurrencyFormat(number, currency = 'Rp. ',) {
        const currencyFormat = (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return `${currency} ${currencyFormat}`;
    }


}