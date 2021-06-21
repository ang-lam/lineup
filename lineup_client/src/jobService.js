// responsible for fetch requests/ service calls

class JobService{

    constructor(endpoint){
        this.endpoint = endpoint
    }

    // Read/Index action
    
    getJobs() {
        fetch(`${this.endpoint}/jobs`)
        .then(resp => resp.json())
        .then(jobs => {
            debugger
        })
    }
}