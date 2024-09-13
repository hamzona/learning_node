const fs = require("fs")
const path = require("path")

const p = path.join(__dirname, "..", "data", "comments.json");


const getComments = (cb) => {
    fs.readFile(p, (err, file) => {
        cb(JSON.parse(file))
    })
}
module.exports = class Comment {
    constructor(id,content) {
        this.id = id
        this.content=content
    }
    postComment(cb) {
        getComments(comments => {
            console.log(comments)
            const myComments = comments.find(comment => comment.id === this.id)
            myComments.content.unshift(this.content)
            comments = comments.filter(comment => comment.id !== this.id)
            comments.push(myComments)
            fs.writeFile(p, JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err)
                }   
                cb(comments)
            })
        })
    }
    static fetchById(id, cb) {
        getComments(comments => {
            cb(comments.find(comment => comment.id === id))
        })
    }
    static createDefaultComment(id) {
        getComments(comments => {
            console.log(comments)
            comments.push({ id, content: [] })
            fs.writeFile(p, JSON.stringify(comments), (err) => {
                if (err) console.log(err)
            })
        })
    }
}