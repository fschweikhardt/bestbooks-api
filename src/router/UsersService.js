const UsersService = {
    allBooks(knex) {
        return knex.select('*').from('books_table')
    },
    allFromList(knex, award) {
        return knex.select('*').from('books_table').where('award', award)
    }
}

module.exports = UsersService