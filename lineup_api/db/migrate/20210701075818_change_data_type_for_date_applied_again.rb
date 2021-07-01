class ChangeDataTypeForDateAppliedAgain < ActiveRecord::Migration[6.1]
  def change
    change_column :jobs, :date_applied, :string
  end
end
