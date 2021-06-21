const baseUrl = 'http://127.0.0.1:3000/'
const jobService = new JobService(baseUrl)

jobService.getJobs()