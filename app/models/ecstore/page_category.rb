class Ecstore::PageCategory < Ecstore::Base

	self.table_name = "page_cates"
	self.primary_key = 'id'

	has_many :pages,
				:foreign_key=> "page_cate_id",
				:conditions=>{:marketable=>'true'}

	has_many :page_categorys,:foreign_key=>"parent_id",:class_name=>"PageCategory"
 	belongs_to :parent_category,  :foreign_key=>"parent_id", :class_name=>"PageCategory"

  has_one :seo, :foreign_key=>:pk,:conditions=>{ :mr_id => 4 }

  include Ecstore::Metable

end
