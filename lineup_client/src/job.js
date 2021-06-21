class Job {
    //class variable to remember objects
    //will need to remove the elements from frontend with a method (filter and remove from array)
    //the all array will be populated/updated with all instances at a refresh
    static all = []

    constructor(id, title, company, dateApplied, link, status){
        
        
        Job.all.push(this) //new instance pushed into all array
    }
}