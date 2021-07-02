# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

job1 = Job.create(title: 'Entry Software Engineer', company: 'Microsoft', date_applied: '', link: 'https://www.microsoft.com/careers/', status: 'In-progress')
job6 = Job.create(title: 'Software Engineer', company: 'Google', date_applied: '', link: 'https://www.careers.google.com/', status: 'In-progress')
job3 = Job.create(title: 'Software Development Engineer', company: 'Twitch', date_applied: '2021-06-30', link: 'https://www.careers.twitch.com/', status: 'Applied')
job2 = Job.create(title: 'Software Engineer I', company: 'Zoom', date_applied: '2021-07-02', link: 'https://www.zoom.com/careers/', status: 'Applied')
job5 = Job.create(title: 'Software Development Engineer', company: 'Amazon', date_applied: '', link: 'https://www.careers.amazon.com/', status: 'In-progress')
job4 = Job.create(title: 'Software Engineer', company: 'Expedia', date_applied: '2021-06-14', link: 'https://www.expedia.com/careers/', status: 'Rejected')


Comment.create([
    {description: 'Submit application by Saturday', job: job1},
    {description: 'Resume objective needs to be updated for this position', job: job1},
    {description: 'Recruiter said need better project portfolio or experience for position', job: job4},
    {description: 'Recruiter will reach out on Friday to give advice', job: job4},
    {description: 'Reach out to people who work at Amazon for advice or referrals', job: job5},
    {description: 'Resume objective needs to be updated for this position', job: job5},
    {description: 'Submit application by Thursday.', job: job5},
    {description: 'Resume objective needs to be updated for this position', job: job1},
    {description: 'Interview on July 14th at 10AM', job: job3},
    {description: 'Review interview questions', job: job3},
    {description: 'Practice at least 10 leetcodes before interview', job: job3}
])