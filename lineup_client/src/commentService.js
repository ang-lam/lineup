// responsible for fetch requests
class CommentService{
    
    constructor(endpoint){
        this.endpoint = endpoint
    }

    getComments() {
        fetch(`${this.endpoint}/comments`)
            .then(resp => resp.json()
            .then(comments => {
            Comment.all.push(comments)
        }))
    }

    createComment() {
        const comment = {
        }
    }
    
}