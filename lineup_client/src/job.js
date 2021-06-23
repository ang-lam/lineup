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
        this.element.addEventListener('click', this.handleClick)
    
        
        Job.all.push(this) //new instance pushed into all array
    }

    //function is responsible for creating the HTML in each element of an instance
    jobHTML() {
        this.element.innerHTML = `
            <td>${this.title}</td>
            <td>${this.company}</td>
            <td>${this.dateApplied}</td>
            <td>${this.link}</td>
            <td>${this.status}</td>
            <td><button id='delete-bttn'>Delete</button>
        `
        return this.element
    }

    appendJob() {
        Job.jobTable.appendChild(this.jobHTML())
    }

    static renderForm() {
        Job.jobForm.innerHTML += `
            <form id="new-job-form">
                Title: <input type="text" id="title">
                Comapny: <input type="text" id="company">
                Date Applied: <input type="date" id="date-applied">
                Job Link: <input type="text" id="link">
                Status: <input type="text" id="status">
                <input type="submit" id="submit">
            </form>
        `
    }

    handleClick() {
        if (event.target.innerHTML === 'Delete'){
            jobService.deleteJob()
        }
    }

    

}