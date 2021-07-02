class Job {
    //class variable to remember objects
    //will need to remove the elements from frontend with a method (filter and remove from array)
    //the all array will be populated/updated with all instances at a refresh
    static all = []
    static jobTable = document.getElementById('job-table')
    static jobForm = document.getElementById('form-container')

    constructor({id, title, company, date_applied, link, status}){
        this.id = id
        this.title = title
        this.company = company
        this.date_applied = date_applied
        this.link = link
        this.status = status
        //instantiate the object with own element in constructor function
        //can reference job element with this.__
        this.element = document.createElement('tr')
        this.element.dataset.id = this.id
        this.element.id =  `job-${this.id}`
        this.element.addEventListener('click', this.handleBttn)
    
        
        Job.all.push(this) //new instance pushed into all array
    }

    //function is responsible for creating the HTML in each element of an instance
    jobHTML = () => {
        this.element.innerHTML = `
            <td class="title-column">${this.title}</td>
            <td>${this.company}</td>
            <td>${this.date_applied}</td>
            <td>${this.link}</td>
            <td>${this.status}</td>
            <button id='delete-bttn'>Delete</button>
            <button id='edit-bttn'>Edit</button>
        `
        //wirte a function for each column for undefined?
        //status should be a drop down?
        return this.element
    }

    appendJob() {
        Job.jobTable.appendChild(this.jobHTML())
        const titleColumn = document.getElementsByClassName('title-column')
        for (const job of titleColumn){
            job.addEventListener('click', this.handleClick)
        }
    }

    static renderForm() {
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
    }

    handleBttn = () => {
        if (event.target.innerText === 'Delete'){
            this.element.remove()
            jobService.deleteJob(this.id)
        } else if (event.target.innerText === 'Edit'){
            this.handleEdit()
        }
    }

    handleEdit = () => {
        //render object in form for edit
        //grab object from all array
        const job = Job.all.find(job => job.id === parseInt(event.target.parentNode.dataset.id))
        Job.jobForm.innerHTML = ''
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

        //submit for fetch request
        //create object like create fetch with the values after submit
        //need to do submit handler (does current submit work?)
        
    }

    handleEditSubmit = (target) => {
        target.preventDefault()
        jobService.updateJob(this.id, target)
        //update DOM
        
    }

    handleClick = () => {
        //render the show page of the job
        const job = event.target.parentNode
        this.renderJobDetails(job)
    }

    static handleSubmit = () => {
        event.preventDefault()
        jobService.createJob()
        event.target.reset()
    }

    renderJobDetails = (job) => {
        initializeTable()
        // Job.jobTable.innerHTML = ''
        //make a function that customize render of headers?
        Job.jobTable.append(job)
    
        //after this need to append and show comments
        Comment.renderForm()
        Job.jobForm.remove()
        // commentService.getComments(job)
        Comment.renderComments(job)
    }

    addListenerToBttns = () => {

    }

    static renderJobRow = (job, target) => {
        debugger
        target.target.parentNode.innerHTML = `
            <td class="title-column">${job.title}</td>
            <td>${job.company}</td>
            <td>${job.date_applied}</td>
            <td>${job.link}</td>
            <td>${job.status}</td>
            <button id='delete-bttn'>Delete</button>
            <button id='edit-bttn'>Edit</button>
        `
    }

    

}