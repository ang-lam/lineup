const baseUrl = 'http://127.0.0.1:3000'
const jobService = new JobService(baseUrl)
const commentService = new CommentService(baseUrl)

Job.jobForm.addEventListener('submit', Job.handleSubmit)
Comment.commentForm.addEventListener('submit', Comment.handleSubmit)
Job.jobTable.addEventListener('submit', Job.handleEdit)
Job.jobTable.addEventListener('submit', Job.handleEditSubmit)
//add eventlistener on the title element

initializeTable()
jobService.getJobs()
Job.renderForm()
commentService.getComments()


function initializeTable() {
    Job.jobTable.innerHTML = `
        <tr id="table-header">
            <th>Title</th>
            <th>Company</th>
            <th>Date Applied</th>
            <th>Link</th>
            <th>Status</th>
        </tr>
    `
}

renderBackBttn = () => {
    const navigation = document.getElementById('navigation')
    navigation.innerHTML = `<button id="backBttn">Back to All Jobs</button>`
}


