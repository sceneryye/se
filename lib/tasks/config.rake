#encoding:utf-8
namespace :imodec do
	task :config=>:environment do
		Ecstore::Config.where(:key=>"page_title").first_or_initialize(:name=>"网站Title",:value=>"scnc-sh | 呵护儿童健康").save
		Ecstore::Config.where(:key=>"meta_keywords").first_or_initialize(:name=>"网站Keywords",:value=>"scnc-sh | 呵护儿童健康").save
		Ecstore::Config.where(:key=>"meta_description").first_or_initialize(:name=>"网站Description",:value=>"scnc-sh | 呵护儿童健康").save
	end
end