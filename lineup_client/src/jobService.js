// responsible for fetch requests/ service calls

class JobService{

    constructor(endpoint){
        this.endpoint = endpoint
    }
    
    getJobs = () => {
        fetch(`${this.endpoint}/jobs`)
        .then(resp => resp.json())
        .then(jobs => {
            for (const job of jobs){
                const j = new Job(job)
                j.appendJob()
            }
        })
    }

    jobObject = () => {
        const job = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            date_applied: document.getElementById('date_applied').value,
            link: document.getElementById('link').value,
            status: document.getElementById('status').value
        }
        return job
    }

    configJob = (method, job) => { 
        const configJob = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        }
        return configJob
    }

    createJob = () => {
        fetch(`${this.endpoint}/jobs`, this.configJob('POST', this.jobObject()))
            .then(resp => resp.json())
            .then(job => {
                const j = new Job(job)
                j.appendJob()
            })
    }
    
    deleteJob(id){
        fetch(`${this.endpoint}/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(json => alert(json.message))
            
        Job.removeJobFromAllArray(id)
    }
    
    updateJob(id, event){
        const editedJob = event.target.parentNode
        //might change id to class - not good to have identical id's
        const job = {
            title: editedJob.querySelector('#title').value,
            company: editedJob.querySelector('#company').value,
            date_applied: editedJob.querySelector('#date_applied').value,
            link: editedJob.querySelector('#link').value,
            status: editedJob.querySelector('#status').value
        }

        fetch(`${this.endpoint}/jobs/${id}`, this.configJob('PATCH', job))
            .then(resp => resp.json())
            .then(job => {
                Job.renderJobRow(job, event)
                Job.removeJobFromAllArray(id)
                new Job(job)          
        })
    }
}