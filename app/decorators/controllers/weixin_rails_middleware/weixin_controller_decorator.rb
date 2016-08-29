# encoding: utf-8
# 1, @weixin_message: 获取微信所有参数.
# 2, @weixin_public_account: 如果配置了public_account_class选项,则会返回当前实例,否则返回nil.
# 3, @keyword: 目前微信只有这三种情况存在关键字: 文本消息, 事件推送, 接收语音识别结果
require 'rest-client'
WeixinRailsMiddleware::WeixinController.class_eval do

  def reply
    case @keyword
      when '地址'
        render xml: send("response_location_message", {})
      when '1'
        render xml: send("response_news_message", {})
      when '我是医生'
        render xml: send("response_news_message", {})
      when '测试'
        render xml: send("response_news_message", {})
      when '我是代表'
        render xml: send("response_news_message", {})
      when '登录'
        render xml: send("response_news_message", {})
      when /^[1-9]{1}[0-9]+$/
        render xml: sned("response_event_message", {})
      when '签到'
        render xml: send("response_#{@weixin_message.MsgType}_message", {})
      when /^推送/
        render xml: send("response_#{@weixin_message.MsgType}_message", {})
      else
       render xml: send("response_#{@weixin_message.MsgType}_message", {})
    end
  end

  private

  def response_news_message(options={})
    id = 78
    user = @weixin_message.FromUserName
    #user = @weixin_message.ToUserName

    case @keyword

      when '登录'
        title="自动登录测试"
        desc =""
        pic_url=""
        link_url="http://mall.scnc-sh.com/autologin1?id=#{id}"
        articles = [generate_article(title, desc, pic_url, link_url)]

      when '我要开店'
        title="我的微店"
        desc=""
        pic_url="http://mall.scnc-sh.com/images/a078/homepage/zimaoqu.jpg"
        link_url="http://mall.scnc-sh.com/shop/shopinfos"
        articles = [generate_article(title, desc, pic_url, link_url)]
      when '我是医生'
        title="您好！点击下面连接，填写您的个人信息"
        desc=""
        pic_url="http://mall.scnc-sh.com/assets/doctors_banner.jpg"
        link_url="http://mall.scnc-sh.com/users/2/edit"
        articles = [generate_article(title, desc, pic_url, link_url)]
      when '我是代表'
        title="您好！点击下面连接，填写您的个人信息"
        desc=""
        pic_url="http://mall.scnc-sh.com/assets/sales_banner.jpg"
        link_url="http://mall.scnc-sh.com/users/3/edit"
        articles = [generate_article(title, desc, pic_url, link_url)]

      when '测试'
        title="[测试商品]-----------------"
        desc ="测试商品0.01元，佣金3.00元"
        pic_url="http://mall.scnc-sh.com/images/a072/a0729002_b_1.jpg"
        link_url="http://mall.scnc-sh.com/mproducts?id=a980000&fp=mproducts&supplier_id=#{id}&from=weixin&wechatuser=#{user}"
        articles = [generate_article(title, desc, pic_url, link_url)]

      when 'share'
        share = 0
        @order = Ecstore::Order.where(:recommend_user=>@weixin_message.FromUserName,:pay_status=>'1').select("sum(commission) as share").group(:recommend_user).first
        if @order
          share =@order.share.round(2)
        end

        title="您的总佣金收益是: #{share}元"
        desc ="查看佣金详情请点击"
        pic_url='http://mall.scnc-sh.com/assets/vshop/commission_banner.jpg'
        link_url="http://mall.scnc-sh.com/share?FromUserName=#{user}&supplier_id=#{id}"

        title1="如何轻松赚佣金"
        desc1 =""
        pic_url1="https://mmbiz.qlogo.cn/mmbiz/oMwR6HEEzCy0xJicVicrfc9sEyMlj1M8ytz5UsZFiaF3H28CMq2g0nyiaRyJibjcJic3iaVypnia6vCXKicCQnz3QOGyITA/0"
        link_url1="http://mp.weixin.qq.com/s?__biz=MzA5OTM5ODIzMQ==&mid=203023353&idx=1&sn=f9cf0b0b53d70ec67126a6ab93a7ed9a#rd"

        articles = [generate_article(title, desc, pic_url, link_url),generate_article(title1, desc1, pic_url1, link_url1)]

      when 'subscribe'
          #  title="欢迎关注上儿营养中心"
          # # desc ="回复1:进入上儿自媒体商场 ,回复2:吃货平台活动中心"
          # desc = ""
          # pic_url="http://mall.scnc-sh.com/images/gucunsausage.jpg"
          # link_url=""
          title ="欢迎加入上儿大家庭"
          desc = "这是一个基于移动互联网的社区，宗旨是为成员推出最优性价比的儿童营养品，并享受时刻在身边的便捷服务。"
          pic_url="http://mall.scnc-sh.com/images/homepage/weho.jpg"
          link_url = "http://mall.scnc-sh.com/weihuo/shops/49"
          articles = [generate_article(title, desc, pic_url, link_url)]
      when /qrscene_\d+/
        title = "仅供测试"
        desc = "My song know what you did in the dark"
        pic_url="http://mall.scnc-sh.com/images/gucunsausage5.jpg"
        link_url = 'http://mall.scnc-sh.com/topics/2015sakura?platform=mobile'
        articles = [generate_article(title, desc, pic_url, link_url)]

      else

        desc =""
        title="您好，我们将尽快回复您的问题"
        pic_url="http://mall.scnc-sh.com/images/a0#{id}/homepage/logo.jpg"
        link_url="http://mall.scnc-sh.com/vshop/#{id}"
        articles = [generate_article(title, desc, pic_url, link_url)]
      end

    if articles
      reply_news_message(articles)
    end
  end

  def response_text_message(options={})
    #reply_text_message("Your Message: #{@keyword}")
    case @keyword
    when "签到"
      message="今日成功签到，明天不要忘记哟～"
    when /^推送/
      openid = @weixin_message.FromUserName
      url = 'http://mall.scnc-sh.com/weihuo/template_information'
      content = @weixin_message.Content.match(/[a-zA-Z0-9]+/)
      res_data = RestClient.post url, {:openid => openid, :content => content}
      if res_data == 'success'
        message = "您的推送消息已经送达您的用户。"
      else
        message = "#{res_data}"
      end

    else
      message="您好，请输入您要咨询的问题或拨打我们客服热线：400-7160-777， 我们客服工作时间为08:30-17:30，其余时间如有问题请留言。我们会尽快与您联系，谢谢！"
    end
    reply_text_message(message)
  end

  def check_in_text_message(options={})
    message="今日成功签到，明天不要忘记哟～"
    reply_text_message(message)
  end

  # <Location_X>23.134521</Location_X>
  # <Location_Y>113.358803</Location_Y>
  # <Scale>20</Scale>
  # <Label><![CDATA[位置信息]]></Label>
  def response_location_message(options={})
    @lx    = @weixin_message.Location_X
    @ly    = @weixin_message.Location_Y
    @scale = @weixin_message.Scale
    @label = @weixin_message.Label
    #   reply_text_message("您现在的位置是: #{@lx}, #{@ly}, #{@scale}, #{@label}")
  end

  # <PicUrl><![CDATA[this is a url]]></PicUrl>
  # <MediaId><![CDATA[media_id]]></MediaId>
  def response_image_message(options={})
    @media_id = @weixin_message.MediaId # 可以调用多媒体文件下载接口拉取数据。
    @pic_url  = @weixin_message.PicUrl  # 也可以直接通过此链接下载图片, 建议使用carrierwave.
    reply_image_message(generate_image(@media_id))
  end

  # <Title><![CDATA[公众平台官网链接]]></Title>
  # <Description><![CDATA[公众平台官网链接]]></Description>
  # <Url><![CDATA[url]]></Url>
  def response_link_message(options={})
    @title = @weixin_message.Title
    @desc  = @weixin_message.Description
    @url   = @weixin_message.Url
    # reply_text_message("回复链接信息")
  end

  # <MediaId><![CDATA[media_id]]></MediaId>
  # <Format><![CDATA[Format]]></Format>
  def response_voice_message(options={})
    @media_id = @weixin_message.MediaId # 可以调用多媒体文件下载接口拉取数据。
    @format   = @weixin_message.Format
    # 如果开启了语音翻译功能，@keyword则为翻译的结果
    # reply_text_message("回复语音信息: #{@keyword}")
    reply_voice_message(generate_voice(@media_id))
  end

  # <MediaId><![CDATA[media_id]]></MediaId>
  # <ThumbMediaId><![CDATA[thumb_media_id]]></ThumbMediaId>
  def response_video_message(options={})
    @media_id = @weixin_message.MediaId # 可以调用多媒体文件下载接口拉取数据。
    # 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据。
    @thumb_media_id = @weixin_message.ThumbMediaId
    #  reply_text_message("回复视频信息")
  end

  def response_event_message(options={})
    event_type = @weixin_message.Event
    send("handle_#{event_type.downcase}_event")
  end

  private

  # 关注公众账号
  def handle_subscribe_event
    if @keyword.present?

      # 扫描带参数二维码事件: 1. 用户未关注时，进行关注后的事件推送
      #  return reply_text_message("扫描带参数二维码事件: 1. 用户未关注时，进行关注后的事件推送, keyword: #{@keyword}")
      reply_text_message("感谢您关注#{@weixin_public_account.name}")
      return response_news_message()
    end
    reply_text_message("感谢您关注#{@weixin_public_account.name}")
    @keyword = "subscribe"
    response_news_message()
  end

  # 取消关注
  def handle_unsubscribe_event
    Rails.logger.info("#{@weixin_message.FromUserName} 取消关注")
  end

  # 扫描带参数二维码事件: 2. 用户已关注时的事件推送
  def handle_scan_event
    # reply_text_message("扫描带参数二维码事件: 2. 用户已关注时的事件推送, keyword: #{@keyword}")
  end

  def handle_location_event # 上报地理位置事件
    @lat = @weixin_message.Latitude
    @lgt = @weixin_message.Longitude
    @precision = @weixin_message.Precision
    # reply_text_message("Your Location: #{@lat}, #{@lgt}, #{@precision}")
  end

  # 点击菜单拉取消息时的事件推送
  def handle_click_event

    case @keyword
    when 'customer_service'
      @keyword='在线客服'
      response_text_message({})
    when 'ON_SALE'
      @keyword='on_sale'
      response_news_message({})
    when 'NEW'
      @keyword='new'
      response_news_message({})
    when 'SHARE'
      @keyword='share'
      response_news_message({})
    else
        # reply_text_message("你点击了: #{@keyword}")
      end
    end

  # 点击菜单跳转链接时的事件推送
  def handle_view_event
    Rails.logger.info("你点击了: #{@keyword}")
    #  reply_text_message("你点击了: #{@keyword}")
    session[:wechat_user]= @weixin_message.FromUserName
  end

  # 帮助文档: https://github.com/lanrion/weixin_authorize/issues/22

  # 由于群发任务提交后，群发任务可能在一定时间后才完成，因此，群发接口调用时，仅会给出群发任务是否提交成功的提示，若群发任务提交成功，则在群发任务结束时，会向开发者在公众平台填写的开发者URL（callback URL）推送事件。

  # 推送的XML结构如下（发送成功时）：

  # <xml>
  # <ToUserName><![CDATA[gh_3e8adccde292]]></ToUserName>
  # <FromUserName><![CDATA[oR5Gjjl_eiZoUpGozMo7dbBJ362A]]></FromUserName>
  # <CreateTime>1394524295</CreateTime>
  # <MsgType><![CDATA[event]]></MsgType>
  # <Event><![CDATA[MASSSENDJOBFINISH]]></Event>
  # <MsgID>1988</MsgID>
  # <Status><![CDATA[sendsuccess]]></Status>
  # <TotalCount>100</TotalCount>
  # <FilterCount>80</FilterCount>
  # <SentCount>75</SentCount>
  # <ErrorCount>5</ErrorCount>
  # </xml>
  def handle_masssendjobfinish_event
    Rails.logger.info("回调事件处理")
  end

end
