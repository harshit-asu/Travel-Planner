export const getMinDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    return today;
};


export const getDateFromString = (date) => {
    try {
        const months = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
        };
        var dateArr = date.split(' ');
        return dateArr[2] + '-' + months[dateArr[1]] + '-' + dateArr[0];   
    } catch (error) {
        return '';
    }
};


export const convertTo24Hour = (timeString) => {
    let date = new Date(`01/01/2022 ${timeString}`);
    let formattedTime = date.toLocaleTimeString('en-US',
        { hour12: false });
    return formattedTime;
};