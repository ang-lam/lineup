const baseUrl = 'http://127.0.0.1:3000/'
const jobService = new JobService(baseUrl)

Job.jobForm.addEventListener('submit', handleSubmit)

jobService.getJobs()
Job.renderForm()


function handleSubmit() {
    event.preventDefault()
    jobService.createJob()
    event.target.reset()
}