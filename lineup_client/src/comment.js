class Comment{

    static all = []
    static commentContainer = document.getElementById('comment-container')
    static commentForm = document.getElementById('comment-form-container')


    constructor(id, description, job_id){
        this.id = id
        this.description = description
        this.job_id = job_id
        //row in table 
        this.element = document.createElement('tr')
        this.element.dataset.id = this.id
        this.element.id =  `comment-${this.id}`
        
        Comment.all.push(this)
    }

    commentHTML() {
        this.element.innerHTML = `
            <td id="comment">${this.description}</td>
            <td><button id='delete-bttn'>Delete</button>
        `
        return this.element
    }

    renderComments() {

    }

    static renderForm() {
        Comment.commentForm.innerHTML = `
        <form id="new-comment-form">
                Description: <textarea id="description"></textarea>
                <input type="submit" id="submit">
        </form>
        `
    }
}
