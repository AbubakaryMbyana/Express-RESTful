const { urlencoded } = require('express')
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid')
app.use(urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))

let comments = [
    {
        id: uuid(),
        username: 'Abuu',
        comment: 'weeee hutuwezi'
    },
    {
        id: uuid(),
        username: 'Naseer',
        comment: 'Fala nini'
    },
    {
        id: uuid(),
        username: 'Jafar',
        comment: 'Usiseme chochote huyu ni fala'
    },
    {
        id: uuid(),
        username: 'KIngwendu',
        comment: 'Shenzi type'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newComment
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})






















app.get('/tacos', (req, res) => {
    console.log(req.body)
    res.send('Get /tacos respond')
})

app.post('/tacos', (req, res) => {
    const { meat } = req.body
    res.send(`${meat}`)
})
app.listen('3000', () => {
    console.log('listening in 3000')
})