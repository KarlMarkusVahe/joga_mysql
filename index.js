const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

app.use(express.static('public'))

const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
})

con.connect(function (err) {
    if (err) throw err
    console.log("connected")
})

const articleRoutes = require('./routes/article')

app.use('/', articleRoutes)
app.use('/article', articleRoutes)

app.get('/author/:author_id', (req, res) => {
    let query = `SELECT * FROM article WHERE author_id="${req.params.author_id}"`
    let articles
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        query = `SELECT * FROM author WHERE id="${req.params.author_id}"`
        let author
        con.query(query, (err, result) => {
            if (err) throw err
            author = result
            res.render('author', {
                author: author,
                articles: articles
            })
        })
    })
})

app.listen(3050, () => {
    console.log("App started")
})