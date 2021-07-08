class Job {
    //class variable to remember objects
    //will need to remove the elements from frontend with a method (filter and remove from array)
    //the all array will be populated/updated with all instances at a refresh
    static all = []
    static allForAlerts = []
    static jobTable = document.getElementById('job-table')
    static jobForm = document.getElementById('form-container')
    static sidebar = document.getElementById('sidebar')

    constructor({id, title, company, date_applied, link, status}){
        this.id = id
        this.title = title
        this.company = company
        this.date_applied = date_applied
        this.link = link
        this.status = status
        this.element = document.createElement('tr')
        this.element.dataset.id = this.id
        this.element.id =  `job-${this.id}`
        this.element.addEventListener('click', this.handleClick)
        // this.element.addEventListener('mouseover', this.handleMouseover)
        // this.element.addEventListener('mouseout', this.handleMouseout)
    
        Job.all.push(this)
    }

    //function is responsible for creating the HTML in each element of an instance
    jobHTML = () => {
        this.element.innerHTML = `
            <td class="title-column">${this.title}</td>
            <td>${this.company}</td>
            <td>${this.date_applied}</td>
            <td>${this.link}</td>
            <td>${this.status}</td>
            <button class="button" id="edit-bttn">Edit</button>
            <button class="button" id="delete-bttn">Delete</button>
        `
        return this.element
    }

    appendJob = () => {
        Job.jobTable.appendChild(this.jobHTML())
        // this.element.addEventListener('click', this.handleClick)
        // const titleColumn = document.getElementsByClassName('title-column')
        // for (const job of titleColumn){
        //     job.addEventListener('click', this.handleClick)
        // }
    }

    static renderForm = () => {
        Job.jobForm.innerHTML += `
            <form id="new-job-form">
                Title: <input type="text" id="title">
                Comapny: <input type="text" id="company">
                Date Applied: <input type="date" id="date_applied">
                Job Link: <input type="text" id="link">
                Status: <select id="status">
                    <option disabled selected value> -- select an option -- </option>
                    <option value="In-progress">In-progress</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <input type="submit" id="submit">
            </form>
        `
        Job.jobForm.addEventListener('submit', Job.handleSubmit)
    }

    handleClick = () => {
        if (event.target.innerText === 'Delete'){
            if (document.querySelectorAll('.title-column').length === 1) {
                this.deleteJobAndRenderAll()
            } else {
                this.deleteOnAllJobsPage()
            }
        } else if (event.target.innerText === 'Edit'){
            this.handleEdit()
        } else if (event.target.nodeName === 'TD'){
            this.handleJobDetails()
        }
    }

    deleteJobAndRenderAll = () => {
        this.element.remove()
        jobService.deleteJob(this.id)
        this.renderAllJobs()
    }

    deleteOnAllJobsPage = () => {
        this.element.remove()
        jobService.deleteJob(this.id)
        Job.removeJobFromAllArray(this.id)
    }

    renderAllJobs = () => {
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

    handleEdit = () => {
        const job = Job.all.find(job => job.id === parseInt(event.target.parentNode.dataset.id))
        event.target.parentNode.innerHTML = `
            <form>
                <td class="title-column"><input type="text" id="title" value="${job.title}"></td>
                <td><input type="text" id="company" value="${job.company}"></td>
                <td><input type="date" id="date_applied" value="${job.date_applied}"></td>
                <td><input type="text" id="link" value="${job.link}"></td>
                <td>
                    <select id="status">
                        <option value="${job.status}">${job.status}</option>
                        <option value="In-progress">In-progress</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </td>
                <input type="submit" id="submit-edit">
            </form>
        `
        const submitBttn = document.getElementById('submit-edit')
        submitBttn.addEventListener('click', this.handleEditSubmit)   
    }

    handleEditSubmit = () => {
        event.preventDefault()
        jobService.updateJob(this.id, event)
    }

    handleJobDetails = () => {
        Job.sidebar.id = 'no-sidebar'
        const job = event.target.parentNode
        this.renderJobDetails(job)
    }

    static handleSubmit = () => {
        event.preventDefault()
        jobService.createJob()
        event.target.reset()
    }

    // handleMouseover = () => {
    //     event.target.parentNode.removeEventListener('mouseover', this.handleMouseover)
    //     const buttons = `
    //         <button class="button" id="edit-bttn">Edit</button>
    //         <button class="button" id="delete-bttn">Delete</button>
    //     `
    //     event.target.parentNode.innerHTML += buttons
        
        
    // }

    // handleMouseout = () => {
    //     //remove button elements
    //     event.target.parentNode.querySelectorAll('.button').forEach(e => e.remove())

    //     // const lastElement = event.target.parentNode.lastElementChild
    //     // if (lastElement.nodeName === 'BUTTON'){
    //     //     event.target.parentNode.lastElementChild.remove()
    //     //     event.target.parentNode.lastElementChild.remove()
    //     // }
    //     event.target.parentNode.addEventListener('mouseover', this.handleMouseover)
    // }

    renderJobDetails = (job) => {
        initializeTable()
        Job.jobTable.append(job)
        Comment.renderForm()
        Comment.renderComments(job)
        Job.jobForm.innerHTML = ''
        renderBackBttn()
    }

    static renderJobRow = (job, target) => {
        target.target.parentNode.innerHTML = `
            <td class="title-column">${job.title}</td>
            <td>${job.company}</td>
            <td>${job.date_applied}</td>
            <td>${job.link}</td>
            <td>${job.status}</td>
            <button class='button' id='edit-bttn'>Edit</button>
            <button class='button' id='delete-bttn'>Delete</button>
        `
    }

    static renderAlerts = () => {
        Job.sidebar.id = 'sidebar'
        Job.sidebar.innerHTML = '<ul></ul>'
        const ul = Job.sidebar.firstElementChild
        for (const job of Job.allForAlerts){
            const startDate = Date.parse(job.date_applied);
            const endDate = Date.parse(currentDate());
            const timeDiff = endDate - startDate;
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            if (daysDiff > 14 && job.status === 'Applied'){
                ul.innerHTML += `<li data-id='${job.id}'>It's been two weeks since you've applied to ${job.title} at ${job.company}. Reach out to the company to check on status of application!</li>`
            }else if (job.date_applied === '' && job.status === 'In-progress'){
                ul.innerHTML += `<li data-id='${job.id}'>Application has not been submitted for ${job.title} at ${job.company}.</li>`
            }
        }
        styleAlerts()
    }

    static setAlertArray = () => {
        Job.allForAlerts = Job.all
    }

    static removeJobFromAllArray = (jobId) => {
        const filteredAll = Job.all.filter(job => job.id != jobId)
        Job.all = filteredAll
    }
 
    

}