class PagesController < ApplicationController

	layout 'standard'

	def index
			@cates = Ecstore::PageCategory.all
		if params[:cate].nil?
			cate = 2
		else
			cate = params[:cate].to_i
		end
		@cate = Ecstore::PageCategory.find(cate)
		@pages = Ecstore::Page.includes(:meta_seo).where(page_cate_id: cate)
		if params[:platform]=='mobile'
			render :layout=>'fykzx'
		end
	end

	def show
		if params[:id]=='top_cate' && params[:cate_id].present?
			@page = Ecstore::Page.includes(:meta_seo).where(page_cate_id: params[:cate_id]).last

		else
				@page = Ecstore::Page.includes(:meta_seo).find(params[:id])
		end
		if @page.nil?
			@page = Ecstore::Page.includes(:meta_seo).last
		end

		@cates = Ecstore::PageCategory.all

		if params[:platform]=='mobile'
			render :layout=>'fykzx'
		end
      # render :layout=> @page.layout.present? ? @page.layout : nil

	end



end
