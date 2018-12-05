import { Coin } from './coin'

export class Courses {
    constructor({ DISPLAY }) {
        this.coursesMap = DISPLAY
        this.currencyName = 'USD'
        this.changepct24hour = 'CHANGEPCT24HOUR'
    }

    updateCourse(coin) {
        const symbol = coin.Symbol.toUpperCase()

        const course = this.coursesMap[symbol][this.currencyName][this.changepct24hour]

        const coinWithUpdatedCourse = new Coin({
            ...coin,
            course
        })

        return coinWithUpdatedCourse
    }

    updateCourses(coins) {
        const coinsWithUpdatedCourse = coins.map(coin => this.updateCourse(coin))

        return coinsWithUpdatedCourse
    }
}