class Comment{

    static all = []

    constructor(id, description, job_id){
        this.id = id
        this.description = description
        this.job_id = job_id
        
        Comment.all.push(this)
    }
}