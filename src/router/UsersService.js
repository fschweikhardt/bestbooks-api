const UsersService = {
    allBooks(knex) {
        return knex.select('*').from('books_table')
    },
    allFromAward(knex, award) {
        return knex.select('*').from('books_table').where('award', award)
    },
    allFromYear(knex, year) {
        return knex.select('*').from('books_table').where('year', year)
    },
    specificBook(knex, award, year) {
        return knex.select('*').from('books_table').where('year', year).andWhere('award', award)
    },
}

module.exports = UsersService