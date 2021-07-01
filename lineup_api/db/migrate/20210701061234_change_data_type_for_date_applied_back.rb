class ChangeDataTypeForDateAppliedBack < ActiveRecord::Migration[6.1]
  def change
    change_column :jobs, :date_applied, :date
  end
end
