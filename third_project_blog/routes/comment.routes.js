const route = require("express").Router()

const Comment = require("../models/comment")

route.post("/postComment/:id", (req, res) => {
    const { id } = req.params
    const { content } = req.body
    console.log(id, content)
    const comment = new Comment(id, content)

    comment.postComment(() => {
        res.redirect(`/blog/${id}`)
    })
})

module.exports = route