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
            for (const job of jobs){
                const j = new Job(job)
                j.appendJob()
            }
        })
    }

    createJob() {
        const job = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            dateApplied: document.getElementById('date-applied').value,
            link: document.getElementById('link').value,
            status: document.getElementById('status').value
        }
        const configJob = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
            //need to be string to share to server
            //can refactor into instance/class method called gatherJobInput
        }
    }
}