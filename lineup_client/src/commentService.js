// responsible for fetch requests
class CommentService{
    
    constructor(endpoint){
        this.endpoint = endpoint
    }

    getComments(job) {
        fetch(`${this.endpoint}/comments`)
            .then(resp => resp.json()
            .then(comments => {
                for (const comment of comments){
                    const c = new Comment(comment)
                    c.renderComments(job)
                }
        }))
    }

    createComment() {
        const comment = {
        }
    }
    
}