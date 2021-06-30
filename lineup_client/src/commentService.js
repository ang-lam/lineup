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
            description: document.getElementById('description').value,
            job_id: Job.jobTable.lastChild.dataset.id
        }

        const configComment = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
            //need to be string to share to server
            //can refactor into instance/class method called gatherJobInput
        }
        fetch(`${this.endpoint}/comments`, configComment)
            .then(resp => resp.json())
            .then(comment => {
                const c = new Comment(comment)
                c.appendComment()
            })
    }

    deleteComment(id){
        fetch(`${this.endpoint}/comments/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(json => alert(json.message))
    }
    
}