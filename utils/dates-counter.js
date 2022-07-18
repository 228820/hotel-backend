class DatesCounter {
    calculateDaysBetweenDates(startDate, endDate) {
        const difference = new Date(endDate).getTime() - new Date(startDate).getTime();
        return Math.ceil(difference / (1000 * 3600 * 24));
    }
}


module.exports = new DatesCounter
