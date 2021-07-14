class Comment{

    static all = []
    static commentContainer = document.getElementById('comment-container')
    static commentForm = document.getElementById('comment-form-container')
    static commentTable = document.getElementById('comment-table')


    constructor({id, description, job_id}){
        this.id = id
        this.description = description
        this.job_id = job_id
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
        const targetJob = Job.all.find(j => j.id === parseInt(job.dataset.id))
        for (const comment of targetJob.comments){
            const c = new Comment(comment)
            Comment.commentTable.appendChild(c.commentHTML())
        }
        // const filteredComments = Comment.all.filter(comment => comment.job_id === parseInt(job.dataset.id))
        // for (const comment of filteredComments){
        //     Comment.commentTable.appendChild(comment.commentHTML())
        // }
    }

    static renderForm() {
        Comment.commentForm.innerHTML = `
        <form id="new-comment-form">
                Comment:<br> <textarea id="description"></textarea>
                <input type="submit" id="submit">
        </form>
        `
        Comment.commentForm.addEventListener('submit', Comment.handleSubmit)
    }

    static handleSubmit = () => {
        event.preventDefault()
        if (document.getElementById('description').value === ''){
            alert('Description cannot be empty!')
        } else{
            commentService.createComment()
        }
        event.target.reset()
    }

    handleDelete = () => {
        if (event.target.innerText === 'Delete'){
            this.element.remove()
            commentService.deleteComment(this.id)
        }
        const filteredAll = Comment.all.filter(comment => comment.id != this.id)
        Comment.all = filteredAll
    }
}
