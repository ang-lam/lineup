class Job < ApplicationRecord
    has_many :comments, dependent: :destroy
    
end
