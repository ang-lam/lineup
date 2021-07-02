class Comment{

    static all = []
    static commentContainer = document.getElementById('comment-container')
    static commentForm = document.getElementById('comment-form-container')
    static commentTable = document.getElementById('comment-table')


    constructor({id, description, job_id}){
        this.id = id
        this.description = description
        this.job_id = job_id
        //row in table 
        this.element = document.createElement('tr')
        this.element.dataset.id = this.id
        this.element.id =  `comment-${this.id}`
        this.element.addEventListener('click', this.handleDelete)
        
        Comment.all.push(this)
    }

    commentHTML() {
        this.element.innerHTML = `
            <td id="comment">${this.description}</td>
            <td><button id='delete-bttn'>Delete</button>
        `
        return this.element
    }

    appendComment = () => {
        Comment.commentTable.appendChild(this.commentHTML())
    }

    static renderComments(job) {
        const filteredComments = Comment.all.filter(comment => comment.job_id === parseInt(job.dataset.id))
        for (const comment of filteredComments){
            Comment.commentTable.appendChild(comment.commentHTML())
        }
    }

    static renderForm() {
        Comment.commentForm.innerHTML = `
        <form id="new-comment-form">
                Description: <textarea id="description"></textarea>
                <input type="submit" id="submit">
        </form>
        `
    }

    static handleSubmit = () => {
        event.preventDefault()
        commentService.createComment()
        event.target.reset()
    }

    handleDelete = () => {
        if (event.target.innerText === 'Delete'){
            this.element.remove()
            commentService.deleteComment(this.id)
        }
    }
    
}
