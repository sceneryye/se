class Admin::DoctorsController < Admin::BaseController
	def index
    lv = params[:lv].to_i

		@users  =  Ecstore::User.where(member_lv_id:lv).paginate(:page=>params[:page],:per_page=>15)

	end

	def edit
    @user = Ecstore::User.find(params[:id])
    @sales = Ecstore::User.where(member_lv_id:3)
	end

  def update
    @user = Ecstore::User.find(params[:id])
    @user.update_attributes(params[:user])
    redirect_to admin_doctors_url(lv:@user.member_lv_id)
  end


end
