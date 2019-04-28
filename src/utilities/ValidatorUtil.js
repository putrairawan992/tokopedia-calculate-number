export default class ValidatorUtil {

    static checkNumberIsCurrency(number) {
        const currencyRegex = /^\s*-?((\d{1,3}(\.(\d){3})*)|\d*)(,\d{1,2})?\s*$/,
            currencyLabel = /Rp/,
            valid = {
                error: true,
                message: `Invalid amount format, 
            please input like this following format (eg. Rp190.850, 190.850,00)`
            };

        if (currencyLabel.test(number)) {
            const splitNumber = number.split('Rp'),
                numberValue = splitNumber[1].trim();
            if (currencyRegex.test(numberValue) && numberValue) {
                valid.error = false;
                valid.message = '';
            }
        } else {
            if (currencyRegex.test(number)) {
                valid.error = false;
                valid.message = '';
            }
        }

        return valid;
    }


}