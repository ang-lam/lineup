// responsible for fetch requests
class CommentService{
    
    constructor(endpoint){
        this.endpoint = endpoint
    }

    getComments() {
        fetch(`${this.endpoint}/comments`)
            .then(resp => resp.json()
            .then(comments => {
                for (const comment of comments){
                    const c = new Comment(comment)
                }
        }))
    }

    createComment() {
        const comment = {
            description: document.getElementById('description').value
        }

        const configComment = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        }
        fetch(`${this.endpoint}/comments`, configComment)
            .then(resp => resp.json())
            .then(comment => {
                const c = new Comment(comment)
                j.appendJob()
            })
    }
    
}