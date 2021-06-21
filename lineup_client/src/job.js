class Job {
    //class variable to remember objects
    //will need to remove the elements from frontend with a method (filter and remove from array)
    //the all array will be populated/updated with all instances at a refresh
    static all = []
    static jobContainer = document.getElementById('job-container')
    static jobTable = document.getElementById('job-table')

    constructor(id, title, company, dateApplied, link, status){
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
        `
        return this.element
    }

    appendJob() {
        const newRow = document.createElement('tr')
        const filledRow = newRow.appendChild(this.jobHTML())
        Job.jobContainer.appendChild(filledRow)
    }
}