#encoding:utf-8
class HomeController < ApplicationController
	before_filter :find_user
	# layout 'magazine'
	layout 'standard'


	def index
		@title = "scnc-sh 呵护儿童健康"
		@suppliers = Ecstore::Supplier.where(:recommend=>1)
		@galleries = Ecstore::Teg.where(:tag_type=>"gallery")
		@i = 1
		@home = Ecstore::Home.where(:supplier_id=>nil).last


	

		return render :layout=>'new'

		respond_to do  |format|
			format.mobile { render :layout=> 'msite'}
		end
	end

	def blank
		@return_url = params[:return_url]
		render :layout=>nil
	end

	def topmenu
		render :layout=>nil
	end

	def subscription_success
		@title = "scnc-sh 呵护儿童健康"
	end

end
