const knex = require('knex')
const app = require('./app')
const { PORT, HOST, USER, DATABASE, PASSWORD } = require('./config')

const db = knex({
  client: 'pg',
  connection: {
    host : `${HOST}`,
    user: `${USER}`,
    database : `${DATABASE}`,
    password : `${PASSWORD}`,
    ssl: { rejectUnauthorized: false }
  }
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})