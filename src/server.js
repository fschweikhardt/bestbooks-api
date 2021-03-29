const knex = require('knex')
const app = require('./app')
const { PORT } = require('./config')

const db = knex({
  client: 'pg',
  connection: {
    host : 'ec2-54-198-252-9.compute-1.amazonaws.com',
    user: 'nobqqnmgwfztus',
    database : 'dc4cgkjcdcgs46',
    password : '2b2bd4cdcc4a7d4d5df414231c5f64070a304394b3816d9c22d89774ecc27fe8',
    ssl: {
      rejectUnauthorized: false
    }
  }
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})