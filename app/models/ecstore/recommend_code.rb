class Ecstore::RecommendCode < Ecstore::Base
	self.table_name = "recommend_codes"
  attr_accessible :member_id

  belongs_to :user,foreign_key: :member_id
end
