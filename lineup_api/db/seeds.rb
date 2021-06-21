# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

first_job = Job.create(title: 'Entry Software Engineer', company: 'Microsoft', link: 'https://www.microsfot.com/careers/example', status: 'in-progress')

Comment.create([
    {description: 'Submit application by Saturday.', job: first_job},
    {description: 'Resume objective needs to be updated for this position', job: first_job}
])