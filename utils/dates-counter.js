class DatesCounter {
    calculateDaysBetweenDates(startDate, endDate) {
        let days = 0
        while (startDate < endDate) {
            days ++
            startDate.setDate(startDate.getDate() + 1)
        }

        return days
    }
}

module.exports = new DatesCounter