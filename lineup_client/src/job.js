class Job {
    //class variable to remember objects
    //will need to remove the elements from frontend with a method (filter and remove from array)
    //the all array will be populated/updated with all instances at a refresh
    static all = []
    static jobTable = document.getElementById('job-table')
    static jobForm = document.getElementById('form-container')
    static sidebar = document.getElementsByClassName('sidebar')

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
        this.element.addEventListener('click', this.handleClick)
        // this.element.addEventListener('mouseover', this.handleMouseover)
        // this.element.addEventListener('mouseout', this.handleMouseout)
    
        
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
            <button class="button" id="edit-bttn">Edit</button>
            <button class="button" id="delete-bttn">Delete</button>
        `
        //wirte a function for each column for undefined?
        //status should be a drop down?
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
    }

    handleClick = () => {
        debugger
        if (event.target.innerText === 'Delete'){
            if (document.querySelectorAll('.title-column').length === 1) {
                
            } else {
                this.element.remove()
                jobService.deleteJob(this.id)
                const filteredAll = Job.all.filter(job => job.id != this.id)
                Job.all = filteredAll
            }
            
        } else if (event.target.innerText === 'Edit'){
            this.handleEdit()
        } else if (event.target.nodeName === 'TD'){
            this.handleJobDetails()
        }
    }

    handleEdit = () => {
        //render object in form for edit
        //grab object from all array
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

        //submit for fetch request
        //create object like create fetch with the values after submit
        //need to do submit handler (does current submit work?)
        
    }

    handleEditSubmit = (target) => {
        target.preventDefault()
        jobService.updateJob(this.id, target)
        //update DOM
        
    }

    handleJobDetails = () => {
        //render the show page of the job
        const job = event.target.parentNode
        this.renderJobDetails(job)
        
        //replace form with back button
    }

    static handleSubmit = () => {
        event.preventDefault()
        jobService.createJob()
        event.target.reset()
    }

    handleMouseover = () => {
        event.target.parentNode.removeEventListener('mouseover', this.handleMouseover)
        const buttons = `
            <button class="button" id="edit-bttn">Edit</button>
            <button class="button" id="delete-bttn">Delete</button>
        `
        event.target.parentNode.innerHTML += buttons
        
        
    }

    handleMouseout = () => {
        //remove button elements
        event.target.parentNode.querySelectorAll('.button').forEach(e => e.remove())

        // const lastElement = event.target.parentNode.lastElementChild
        // if (lastElement.nodeName === 'BUTTON'){
        //     event.target.parentNode.lastElementChild.remove()
        //     event.target.parentNode.lastElementChild.remove()
        // }
        event.target.parentNode.addEventListener('mouseover', this.handleMouseover)
    }

    renderJobDetails = (job) => {
        initializeTable()
        // Job.jobTable.innerHTML = ''
        //make a function that customize render of headers?
        Job.jobTable.append(job)
    
        //after this need to append and show comments
        Comment.renderForm()
        Job.jobForm.innerHTML = ''
        renderBackBttn()
        // commentService.getComments(job)
        Comment.renderComments(job)
    }

    addListenerToBttns = () => {
        //can delete?
        //add listener to all bttns on application giving all bttns same class
        //get all elements by class and attach eventlistener 
        //('click', handleBttn()) -> back, submit, edit, delete
        const allBttns = document.getElementsByClassName('button')
        for (const button of allBttns){
            button.addEventListener('click', handleBttn)
        }
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
        //refactor date into index.js?
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const date = yyyy + '/' + mm + '/' + dd;
        Job.all.map
    }

    

}