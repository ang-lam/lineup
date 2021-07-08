//To DO LIST
//make back button grab from all array and not do a fetch request
//check bugs
//refactor code
//remove comments

const baseUrl = 'http://127.0.0.1:3000'
const jobService = new JobService(baseUrl)
const commentService = new CommentService(baseUrl)
const navigation = document.getElementById('navigation')

Job.jobTable.addEventListener('submit', Job.handleEdit)
Job.jobTable.addEventListener('submit', Job.handleEditSubmit)

initializeTable()
jobService.getJobs()
Job.renderForm()
commentService.getComments()
// renderAlertBttn()


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
    Job.renderAlerts()
    //renderAlerts with parameter of alert array
    const filteredAll = Job.all.filter(job => job.id != this.id)
    Job.all = filteredAll
    for (const job of filteredAll) {
        job.appendJob()
    }
    Job.renderForm()
    Comment.commentTable.innerHTML = ''
    Comment.commentForm.innerHTML = ''
    navigation.innerHTML = ''
}

currentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDate = yyyy + '/' + mm + '/' + dd;
    return currentDate
}

function createCloseButton() {
    const list = document.getElementsByTagName('li')
    for (const alert of list){
        const span = document.createElement('span')
        const text = document.createTextNode('\u00D7')
        span.className = 'close'
        span.appendChild(text)
        alert.appendChild(span)
    }
}

function removeAlert() {
    const close = document.getElementsByClassName('close')
    for (const bttn of close) {
        bttn.addEventListener('click', handleClose)
    }
}

function handleClose() {
    debugger
    const li = this.parentElement
    li.style.display = 'none'
    //need function to remove job from alert array
}

styleAlerts = () => {
    createCloseButton()
    removeAlert()
}

