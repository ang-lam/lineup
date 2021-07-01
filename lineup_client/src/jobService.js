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
        // validateJob()
        const job = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            date_applied: document.getElementById('date_applied').value,
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
        fetch(`${this.endpoint}/jobs`, configJob)
            .then(resp => resp.json())
            .then(job => {
                debugger
                const j = new Job(job)
                j.appendJob()
            })
    }

    // checkBlanks(object) {
        // Object.keys(object).forEach(function(key){
        //     if (key === 'dateApplied'){
        //         object[key] = (object[key] === '') ? 'Not Applied' : object[key]
        //     }else if(object[key] === '' && key !== 'dateApplied'){
        //         alert('Field cannot be blank');
        //         return false
        //     }
        // })
        //go through keys and values if key/value not dateapplied send error
   
        // object['dateApplied'] = (object['dateApplied'] === '') ? 'Not Applied' : object['dateApplied']
        
        // //iterate over key of object and check if undefined - change to value
        // for (const attribute in object){
        //     // const entry = document.forms['new-job-form'][`${attribute.element.id}`].value
        //     if (attribute === 'dateApplied' && attribute === ''){
        //         debugger
        //         object[attribute] = 'Not Applied'   
        //     }else if (object[attribute] === undefined){
        //         alert('Field cannot be blank');
        //         return false
        //         //make input red
        //     }
        // }
        // return object
    // }

    
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
}