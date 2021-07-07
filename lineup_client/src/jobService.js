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

    configJob = (method) => { 
        const configJob = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.jobObject())
        }
        return configJob
    }

    createJob = () => {
        // validateJob()
        
        fetch(`${this.endpoint}/jobs`, this.configJob('POST'))
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
    }
    
    updateJob(id, target){
        const editedJob = target.target.parentNode
        //might change id to class - not good to have identical id's
        const job = {
            title: editedJob.querySelector('#title').value,
            company: editedJob.querySelector('#company').value,
            date_applied: editedJob.querySelector('#date_applied').value,
            link: editedJob.querySelector('#link').value,
            status: editedJob.querySelector('#status').value
        }

        const configJob = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
            //need to be string to share to server
            //can refactor into instance/class method called gatherJobInput
        }

        fetch(`${this.endpoint}/jobs/${id}`, configJob)
            .then(resp => resp.json())
            .then(job => {
                Job.renderJobRow(job, target)
                const filteredAll = Job.all.filter(job => job.id != id)
                Job.all = filteredAll
                new Job(job)
                
        })
    }
}