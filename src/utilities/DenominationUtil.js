export class DenominationUtil {

    constructor() {
        this.denominationArray = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];
    }

    
    static getTotalValue(total) {
        const currencyLabel = /Rp/;
        if (currencyLabel.test(total)) {
            const getValue = total.split('Rp');
            return getValue[1].trim().replace('.', '').replace(',', '.');
        } else {
            return total.replace('.', '').replace(',', '.');
        }

    }

    calculateDenomination(total) {
        let i = 0, resultDenomination = [];
        let totalValue = DenominationUtil.getTotalValue(total);
        for (i; i < this.denominationArray.length; i++) {
            const denominationValue = this.denominationArray[i];
            resultDenomination.push({
                label: denominationValue,
                amount: parseInt(parseFloat(totalValue) / denominationValue)
            });
            totalValue = totalValue % denominationValue;
        }
        return {resultDenomination: resultDenomination, changes: totalValue};
    }
}