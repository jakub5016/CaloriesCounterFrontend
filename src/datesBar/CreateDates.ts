function createDatesArray(date: Date): Date[] {
    let day = date.getDay();
    var daysArray: Date[] = [];
    
    for (let x = 1; x <= 7; x++) {
        if (day === 0) {
            daysArray.push(new Date(date.getTime() - (7 - x) * (24 * 60 * 60 * 1000)));
        } else {
            daysArray.push(new Date(date.getTime() + (x - day) * (24 * 60 * 60 * 1000)));
        }
    }

    return daysArray;
}

export default createDatesArray;
