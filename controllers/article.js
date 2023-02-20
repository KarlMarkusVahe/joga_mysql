const con = require('../utils/db')

const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article"
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index', {
            articles: articles
        })
    })
}

const getArticleBySlug = (req, res) => {
    let query = `SELECT *,
                    article.name as article_name,
                    article.name as article_name
                    FROM article
                    INNER JOIN author
                    ON author.id = article.author_id
                    WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err
        article = result
        res.render('article', {
            article: article
        })
    })
}

const getArticlesByAuthor = (req, res) => {
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
}

module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticlesByAuthor
}