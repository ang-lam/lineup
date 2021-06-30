const baseUrl = 'http://127.0.0.1:3000'
const jobService = new JobService(baseUrl)
const commentService = new CommentService(baseUrl)

Job.jobForm.addEventListener('submit', Job.handleSubmit)
//add eventlistener on the title element

initializeTable()
jobService.getJobs()
Job.renderForm()
commentService.getComments()


function initializeTable() {
    Job.jobTable.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Date Applied</th>
            <th>Link</th>
            <th>Status</th>
        </tr>
    `
}


