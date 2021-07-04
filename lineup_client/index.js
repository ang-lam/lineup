//To DO LIST
//make back button grab from all array and not do a fetch request
//check bugs
//refactor code
//remove comments

const baseUrl = 'http://127.0.0.1:3000'
const jobService = new JobService(baseUrl)
const commentService = new CommentService(baseUrl)
const navigation = document.getElementById('navigation')

Job.jobForm.addEventListener('submit', Job.handleSubmit)
Comment.commentForm.addEventListener('submit', Comment.handleSubmit)
Job.jobTable.addEventListener('submit', Job.handleEdit)
Job.jobTable.addEventListener('submit', Job.handleEditSubmit)
//add eventlistener on the title element

initializeTable()
jobService.getJobs()
Job.renderForm()
commentService.getComments()
renderAlertBttn()


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

    navigation.innerHTML = `<button id="backBttn">Back to All Jobs</button>`
    navigation.firstElementChild.addEventListener('click', handleNavigation)
}

handleNavigation = () => {
    initializeTable()
    renderAlertBttn()
    for (const job of Job.all) {
        job.appendJob()
    }
    Job.renderForm()
    Comment.commentTable.innerHTML = ''
    Comment.commentForm.innerHTML = ''
    navigation.innerHTML = ''
}

function renderAlertBttn() {
    Job.sidebar.innerHTML = `<button id='alert-bttn'>View Alerts</button>`
    Job.sidebar.addEventListener('click', Job.renderAlerts)
}

function addCheckToList(){
    const list = document.querySelector('ul')
    list.addEventListener('click', handleCheck)
}

function handleCheck() {
    debugger
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked')
    }
}

function styleAlerts() {
    addCheckToList()
}

