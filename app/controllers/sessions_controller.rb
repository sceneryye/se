#encoding:utf-8
class SessionsController < ApplicationController
  require 'rest-client'

  skip_before_filter :authorize_user!
  layout 'login'



  def shop_login
    shop_id = params[:shop_id] || params[:id]
    return_url = params[:return_url]

    if shop_id.blank? && params[:from].blank?
      return render :text=>'店铺不存在'
    end

    supplier_id = 78
    @supplier = Ecstore::Supplier.find(supplier_id)
    if !return_url.blank?
      session[:return_url] =  return_url
    end
    
    if params[:scope] =='1'
      scope = 'snsapi_base'
    else
      scope = 'snsapi_userinfo' #snsapi_base      
    end

    redirect_uri = "http%3a%2f%2fmall.scnc-sh.com%2fauth%2fweixin%2fshops#{shop_id}%2fcallback"
    @oauth_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{@supplier.weixin_appid}&redirect_uri=#{redirect_uri}&response_type=code&scope=#{scope}&state=STATE#wechat_redirect"

    session[:shop_id] = shop_id

    redirect_to  @oauth_url
  end

  

  def auto_login2
    
    shop_id = 0
    layout = params[:layout]
    supplier_id = 78
    @supplier = Ecstore::Supplier.find(supplier_id)

    redirect_uri = "http%3a%2f%2fmall.scnc-sh.com%2fauth%2fweixin%2fshops#{shop_id}shops#{layout}%2fcallback"
    @oauth_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{@supplier.weixin_appid}&redirect_uri=#{redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"

    session[:return_url] =  params[:return_url]
    session[:shop_id] = shop_id

    redirect_to  @oauth_url
  end

  def new

  end

  def auto_login1
    supplier_id = params[:id]
    if params[:supplier_id]
      supplier_id  = params[:supplier_id]
    end
    @supplier = Ecstore::Supplier.find(supplier_id)


    #redirect_uri = "http://mall.scnc-sh.com/auth/weixin/callback?supplier_id=#{@supplier.id}"
    #redirect_uri= URI::escape(redirect_uri)
    #redirect_uri="http%3a%2f%2fmall.scnc-sh.com%2fauth%2fweixin%2f#{supplier_id}%2fcallback"
    redirect_uri = params[:return_url] || "http%3a%2f%2fmall.scnc-sh.com%2fm"

    #@oauth2_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{@supplier.weixin_appid}&redirect_uri=#{redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
    @oauth2_url = "https://open.weixin.qq.com/connect/qrconnect?appid=#{@supplier.weixin_appid}&redirect_uri=#{redirect_uri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
    # res_data = RestClient.get 'https://open.weixin.qq.com/connect/oauth2/authorize',
    #   {:params => {:appid => @supplier.weixin_appid, :redirect_uri=>redirect_uri, :response_type=>'code',:scope=>'snsapi_base',:state=>'STATE#wechat_redirect'}}
    # # RestClient.get(self.action)
    # # res_data = RestClient.get self.action , xml , {:content_type => :xml}
    # res_data_xml = res_data.force_encoding('gb2312').encode

   # res_data_hash = Hash.from_xml(res_data_xml)
    # @article = Imodec::Page.new do |al|
    #   al.body = res_data_xml
    # end
    # @article.save!
    # return render :text=>res_data_xml#.gsub('<','||')  #res_data.code
    return render :text =>@oauth2_url
    return_url  = params[:return_url]
    session[:return_url] =  return_url
    redirect_to  @oauth2_url

  end

  def auto_login
    supplier_id = params[:id]
    if params[:supplier_id]
      supplier_id  = params[:supplier_id]
    end

    if supplier_id.blank?
      supplier_id =78
    end
    @supplier = Ecstore::Supplier.find(supplier_id)

    #redirect_uri = "http://mall.scnc-sh.com/auth/weixin/callback?supplier_id=#{@supplier.id}"
    #redirect_uri= URI::escape(redirect_uri)

    return_url = params[:return_url]

    if !return_url.blank?
      session[:return_url] =  return_url
    end
    
    if params[:scope] =='1'
      scope = 'snsapi_base'
    else
      scope = 'snsapi_userinfo' #snsapi_base      
    end
    
    redirect_uri = "http%3a%2f%2fmall.scnc-sh.com%2fauth%2fweixin%2f#{supplier_id}%2fcallback"

   # return render :text=>"scope:#{ params[:scope]},from:#{params[:from]},platform:#{params[:platform]},rand:#{params[:rand]}"
   # authenticate from foodiegroup, such as share and auto_login
   redirect_uri_new = "http%3a%2f%2fmall.scnc-sh.com%2fauth%2fweixin%2f#{params[:platform]}_78%2fcallback"
    if params[:from].present?
      redirect_uri = redirect_uri + '2?from=new'
    elsif params[:platform] == 'groupbuy'
      redirect_uri = redirect_uri_new + "?groupdata=groupid=#{params[:groupid]}_groupname=#{params[:groupname]}_imgurl=#{params[:imgurl]}_name=#{params[:name]}_desc=#{params[:desc]}"
    elsif params[:platform] == 'gotofoodie'
      redirect_uri = redirect_uri_new + "?groupid=#{params[:groupid]}"
    else
      redirect_uri = redirect_uri +"?rand=#{params[:rand]}"
    end

    scope = 'snsapi_userinfo' #snsapi_base
    @oauth2_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{@supplier.weixin_appid}&redirect_uri=#{redirect_uri}&response_type=code&scope=#{scope}&state=STATE#wechat_redirect"

    
    redirect_to  @oauth2_url
  end

  def new_mobile
    @no_need_login = 1
    supplier_id = params[:id]
    if params[:supplier_id]
      supplier_id  = params[:supplier_id]
    end
    if supplier_id.nil?
      supplier_id =78
    end
    @supplier = Ecstore::Supplier.find(supplier_id)

    #redirect_uri = "http://mall.scnc-sh.com/auth/weixin/callback?supplier_id=#{@supplier.id}"
    #redirect_uri= URI::escape(redirect_uri)
    redirect_uri="http%3a%2f%2fmall.scnc-sh.com%2fauth%2fweixin%2f#{supplier_id}%2fcallback?return_url=#{params[:return_url]}"

    @oauth2_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{@supplier.weixin_appid}&redirect_uri=#{redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
    return_url  =params[:return_url]

    session[:return_url] =  return_url
    session[:from] = params[:from]

    # return redirect_to(after_user_sign_in_path) if signed_in?
    @no_need_login = 1
    render :layout=>@supplier.layout
  end


  def create

    @shop_id = params[:shop_id]


    if params[:supplier_id]
      @supplier_id= params[:supplier_id]
    else
      @supplier_id = params[:id]
    end

    if @supplier_id.nil?
      @supplier_id = '78'
    end

    if @supplier_id =="78"
      @return_url=params[:return_url].to_s+"&id=78"
    else
      @return_url=params[:return_url]
    end

    if @shop_id.present?
      @return_url = "/mobile/#{@shop_id}/shop"
      params[:session][:username] = "#{params[:session][:mobile]}_shop_#{@shop_id}"
    end

    @platform = params[:platform]

    if @platform =='mobile' && @supplier_id.length>0
     @account = Ecstore::Account.user_authenticate_mobile(params[:session][:username],params[:session][:password],@supplier_id)

    elsif @platform == 'vshop'
      @account = Ecstore::Account.admin_authenticate(params[:session][:username],params[:session][:password])
    else
      @account = Ecstore::Account.user_authenticate(params[:session][:username],params[:session][:password])
    end

    if @account
      sign_in(@account,params[:remember_me])
                 #update cart
                 # @line_items.update_all(:member_id=>@account.account_id,
                 #                                       :member_ident=>Digest::MD5.hexdigest(@account.account_id.to_s))
      if @shop_id.present? && @account.user.user_coupons.blank?
         @return_url = '/coupons'
      end
      render "create"
    else
      render "error"
          #  render js: '$("#login_msg").text("帐号或密码错误!").addClass("error").fadeOut(300).fadeIn(300);'
    end
  end

  def destroy
    sign_out
      # refer_url = request.env["HTTP_REFERER"]
      # refer_url = "/" unless refer_url
      supplier_id=0

    if params[:platform]=="mobile"

       return_url=params[:return_url].to_s+"&id=#{supplier_id}"

       redirect_to "/mlogin?id=#{params[:id]}&supplier_id=#{params[:id]}&return_url=#{return_url}"
    elsif params[:platform]=="vshop"
       redirect_to "/vshop"
    elsif params[:platform]=="mobile_admin"
      redirect_to "/mobile/admin"
    else
      redirect_to "/"
    end
  end

end
