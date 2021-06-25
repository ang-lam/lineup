class Job {
    //class variable to remember objects
    //will need to remove the elements from frontend with a method (filter and remove from array)
    //the all array will be populated/updated with all instances at a refresh
    static all = []
    static jobTable = document.getElementById('job-table')
    static jobForm = document.getElementById('form-container')

    constructor({id, title, company, dateApplied, link, status}){
        this.id = id
        this.title = title
        this.company = company
        this.dateApplied = dateApplied
        this.link = link
        this.status = status
        //instantiate the object with own element in constructor function
        //can reference job element with this.__
        this.element = document.createElement('tr')
        this.element.dataset.id = this.id
        this.element.id =  `job-${this.id}`
        this.element.addEventListener('click', this.handleDelete)
    
        
        Job.all.push(this) //new instance pushed into all array
    }

    //function is responsible for creating the HTML in each element of an instance
    jobHTML() {
        this.element.innerHTML = `
            <td id="title-column">${this.title}</td>
            <td>${this.company}</td>
            <td>${this.dateApplied}</td>
            <td>${this.link}</td>
            <td>${this.status}</td>
            <td><button id='delete-bttn'>Delete</button>
        `
        //wirte a function for each column for undefined?
        //status should be a drop down?
        return this.element
    }

    appendJob() {
        Job.jobTable.appendChild(this.jobHTML())
        const titleColumn = document.getElementById('title-column')
        titleColumn.addEventListener('click', this.handleClick)
    }

    static renderForm() {
        Job.jobForm.innerHTML += `
            <form id="new-job-form">
                Title: <input type="text" id="title">
                Comapny: <input type="text" id="company">
                Date Applied: <input type="date" id="dateApplied">
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

    handleDelete = () => {
        if (event.target.innerText === 'Delete'){
            this.element.remove()
            jobService.deleteJob(this.id)
        }
    }

    handleClick() {
        debugger
    }

    

}