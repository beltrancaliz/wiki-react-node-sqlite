import fs from 'fs'
import path from 'path'
import Sql from 'better-sqlite3'

const dbDirPath = path.join(__dirname, '../db')

if (!fs.existsSync(dbDirPath)) {
  fs.mkdirSync(dbDirPath)
}

const databaseMiddleware = (req, res, next) => {
  const env = process.env.NODE_ENV
  const db = new Sql(path.join(dbDirPath, `${env}.db`))

  db.prepare('CREATE TABLE  IF NOT EXISTS wiki (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'date_created TEXT, ' +
    'date_updated TEXT, ' +
    'title TEXT, ' +
    'content TEXT)').run()

  db.close()
  next()
}

export default databaseMiddleware
