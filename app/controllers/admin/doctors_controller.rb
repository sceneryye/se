class Admin::DoctorsController < Admin::BaseController
	require 'rqrcode'
	def index
    lv = params[:lv].to_i

		@users  =  Ecstore::User.where(member_lv_id:lv).paginate(:page=>params[:page],:per_page=>15)

	end

	def edit
		@user = Ecstore::User.find(params[:id])
    @sales = Ecstore::User.where(member_lv_id:3)
		@code  =  Ecstore::RecommendCode.where(member_id:nil).last.code
	end

  def update
		@user = Ecstore::User.find(params[:id])
    @user.update_attributes(params[:user])

		@code = Ecstore::RecommendCode.where("code = ? and (member_id is null or member_id =?)",@user.code,@user.member_id)
		if @code.size>0
			 @code = @code.first
		# else
		# 	return render text:'推荐码不能使用'
		end
		@code.update_attributes(:member_id=>@user.member_id)
    redirect_to admin_doctors_url(lv:@user.member_lv_id)
  end

	def new

    # (1..100).each do |i|
      @code= Ecstore::RecommendCode.new do |code|
        code.code = random_string(10).to_s
      end
      @code.save!
    # end
		# qrcode = RQRCode::QRCode.new("http://www.scnc-sh.com/mobile?code=#{@code.code}")
		# # With default options specified explicitly
		# png = qrcode.as_png(
		#           resize_gte_to: false,
		#           resize_exactly_to: false,
		#           fill: 'white',
		#           color: 'black',
		#           size: 120,
		#           border_modules: 4,
		#           module_px_size: 6,
		#           file: nil # path to write
		#           )
		# IO.write("/root/web/scnc_files/images/doctor_codes/#{@code.code}.png", png.to_s)

		# QRCode.image("http://www.scnc-sh.com/mobile?code=#{@code.code}", "/root/scnc_files/images/doctor_codes/", :format => :png, :filename => @code.code , :unit => 12)
    redirect_to recommend_codes_admin_doctors_url

  end

	def recommend_codes
		@recommend_codes = Ecstore::RecommendCode.paginate(:page=>params[:page],:per_page=>20)

	end

	private

    def random_string(len)
       chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a
      # chars = ("0".."9").to_a
      str = ""
      1.upto(len) { |i| str << chars[rand(chars.size-1)] }
      return str
    end


end
