
export const formatDate = (inputDate) => {
    // Extract day, month, and year components from the input string
    const [year, month, day] = inputDate.slice(0, 10).split('-');

    // Return formatted date
    return `${day}-${month}-${year}`;
};





export const capitalizeFirstLetter = (inputString) => {
    // Convert the first character to uppercase and concatenate with the rest of the string
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
};
