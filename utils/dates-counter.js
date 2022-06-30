class DatesCounter {
    calculateDaysBetweenDates(startDate, endDate) {
        const difference = new Date(startDate).getTime() - new Date(endDate).getTime();
        return Math.ceil(difference / (1000 * 3600 * 24));
    }
}


module.exports = new DatesCounter
