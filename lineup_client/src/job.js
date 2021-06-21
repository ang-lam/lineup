class Job {
    //class variable to remember objects
    //will need to remove the elements from frontend with a method (filter and remove from array)
    //the all array will be populated/updated with all instances at a refresh
    static all = []

    constructor(id, title, company, dateApplied, link, status){
        this.id = id
        this.title = title
        this.company = company
        this.dateApplied = dateApplied
        this.link = link
        this.status = status
        //instantiate the object with own element in constructor function
        //can reference job element with this.__
        this.element = document.createElement('table')
        this.element.dataset.id = this.id
        this.element.id =  `job-${this.id}`
        
        Job.all.push(this) //new instance pushed into all array
    }
}