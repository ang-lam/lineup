class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.date :date_applied
      t.string :link
      t.string :status

      t.timestamps
    end
  end
end
