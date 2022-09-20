export const isExpiryMonthInRange = (expiryMonth: number) => {
    return (expiryMonth >= 1 && expiryMonth <= 12) ? true : false;
};

export const isExpiryYearInRange = (expiryYear: number) => {
    const currentYear = parseInt(new Date().getFullYear().toString().substr(-2));
    const yearRange = currentYear + 5; //add 5 years for projected expiry years
    return (expiryYear >= currentYear && expiryYear <= yearRange) ? true : false;
};
export const validateCardNumber = (cardNumber: string) => {
    const regex = new RegExp("^[0-9]{15,16}$");
    let formErrors = {
        message: "",
        isValid: true
    };
    if (!regex.test(cardNumber))
    {
        formErrors = {
            message: "Enter valid card number",
            isValid: false,
        };
    } else {
        const lRes = luhnCheck(cardNumber);
    
        if (!lRes) {
            formErrors = {
                message: "Enter valid card number",
                isValid: false,
            };
        }
    }
    return formErrors;
};

export const luhnCheck = (cardVal: string) => {
    let sum = 0;
    for (let i = 0; i < cardVal.length; i++) {
        let intVal = parseInt(cardVal.substr(i, 1));
        if (i % 2 === 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    
    return (sum % 10) === 0;
}
export const validateExpiryDate = (expiryInput: string) => {
    const expMonth = parseInt(expiryInput.slice(0, 2));
    const expYear = parseInt(expiryInput.slice(-2));
    let formErrors = {
        message: "",
        isValid: true
    };
    const isValidMonth = isExpiryMonthInRange(expMonth);
    const isValidYear = isExpiryYearInRange(expYear);
    if (!isValidMonth && isValidYear) {
        formErrors.message = `${expMonth} is not valid month!`;
        formErrors.isValid = false;
    } else if (isValidMonth && !isValidYear) {
        const currentYear = parseInt(new Date().getFullYear().toString().substr(-2));
        const yearRange = currentYear + 5;
        formErrors.message = `Year must be greater than current year or validity should be accepted till year ${yearRange} !`;
        formErrors.isValid = false;
    } else if (!isValidMonth && !isValidYear) {
        formErrors.message = `Both month and year is not valid!`;
        formErrors.isValid = false;
    }

    return formErrors;
};