const UsersService = {
    getYears(knex) {
        return knex.select('year').from('books_table').orderBy('year', 'desc')
    },
    getAwards(knex) {
        return knex.select('award').from('books_table').orderBy('award', 'desc')
    },
    allBooks(knex) {
        return knex.select('*').from('books_table')
    },
    allFromAward(knex, award) {
        return knex.select('*').from('books_table').where('award', award).orderBy('year', 'desc')
    },
    allFromYear(knex, year) {
        return knex.select('*').from('books_table').where('year', year)
    },
    specificBook(knex, award, year) {
        return knex.select('*').from('books_table').where('year', year).andWhere('award', award).first()
    },
    dbLength(knex) {
        return knex.max('id').from('books_table')
    },
    getRandomBook(knex, id) {
        return knex.select('*').from('books_table').where('id', id).first()
    }
}

module.exports = UsersService