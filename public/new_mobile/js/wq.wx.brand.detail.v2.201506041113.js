define('wq.wx.brand.detail.v2',function(require,exports,module){var _cacheThisModule_,$=require('zepto'),url=require('url'),cookie=require('cookie'),ls=require('loadJs'),fj=require('formatJson'),storage=require('mqqStorage'),lazyLoad=require('lazyLoad');var Temai={itilTimer:null,isTitleShow:true,isNavShow:true,priceClicked:false,hasLoadedAdAndBrandInfo:false,lastScH:0,wheight:800,itemList:[],scrollTop:0,pageStyle:'small',sortNo:url.getHashParam('sortNo')||1,priceSort:'up',showSoldout:true,catId:url.getHashParam('catId')||'0',actId:url.getUrlParam('actId')||url.getUrlParam('actid'),areaId:url.getUrlParam('areaId')||url.getUrlParam('areaid'),proInfo:'',shopName:'',beginTime:'',brandId:'',microShopLogo:'',microShopName:'',microShopUrl:'',minDiscount:'',cIdAD:'',extlogo:url.getUrlParam('extlogo'),noshareInfo:false,isSharedLink:!!url.getUrlParam('_share'),hidePromotion:url.getUrlParam('hidepromotion'),mmartJson:window.mmartJson,firstItemShopName:'',firstItemImgUrl:'',cptGroupId:1562,mId:url.getUrlParam('mid'),pinMaskMap:[{n:'新品首发',v:256,c:'green'},{n:'秋冬上新',v:512,c:'green'},{n:'新品预售',v:1024,c:'green'},{n:'热销爆款',v:2048,c:'red'},{n:'稀缺好货',v:4096,c:'red'},{n:'微信专享',v:8192,c:'green'},{n:'限时秒杀',v:16384,c:'red'},{n:'底价清仓',v:32768,c:'red'}]};var constants={microShopCommonUrl:'http://wq.jd.com/mshop/gethomepage',adUrlPre:'http://wq.jd.com/mcoss/focusbi/show',material:'http://wq.jd.com/mcoss/material/query?callback=getMaterialCB&mids='+Temai.mId+'&gid='+Temai.cptGroupId+'&r='+Date.now()};var umpBizKey={getMMARTTimeOut:'getMMARTTimeOut',getMMARTFail:'getMMARTFail',mmartNumLess:'mmartNumLess'},umpBiz={'getMMARTTimeOut':{option:{bizid:'12',operation:'1',result:'0',source:'0',message:'获取卖快数据超时'},callback:function(){}},'getMMARTFail':{option:{bizid:'12',operation:'2',result:'0',source:'0',message:'获取卖快数据失败'},callback:function(){}},'mmartNumLess':{option:{bizid:'12',operation:'3',result:'0',source:'0',message:'卖快数据低于15'},callback:function(){}}};Temai.initParam=function(){var _imgtp=url.getUrlParam('imgtp'),_st=url.getHashParam('st'),_priceSort=url.getHashParam('priceSort'),_pageStyle=url.getHashParam('pageStyle'),_showSoldout=url.getHashParam('showSoldout');_imgtp&&(Temai.pageStyle=_imgtp=='1'?'big':'small');_priceSort&&(Temai.priceSort=_priceSort);location.hash.indexOf('pageStyle')>-1&&(Temai.pageStyle=_pageStyle);_showSoldout&&(Temai.showSoldout=_showSoldout=='true'?true:false);_st&&(Temai.scrollTop=_st*1);};Temai.initMaterial=function(){if(!Temai.mId){Temai.initPage();commonFootHandler();return;}
var _cacheKey='MaterialCB'+Temai.cptGroupId+'_'+Temai.mId;storage.readH5Data(_cacheKey,function(res,success){if(!success||!res){fetchBrandData();return;}
Temai.handlerMaterial(res);});function fetchBrandData(){Temai.itilTimer=setTimeout(function(){umpReport(umpBizKey.getMMARTTimeOut);},8000);ls.loadScript({url:constants.material});window.getMaterialCB=function(json){storage.writeH5Data(_cacheKey,json,function(success){},5);if(Temai.itilTimer)clearTimeout(Temai.itilTimer);Temai.handlerMaterial(json);};}};Temai.handlerMaterial=function(json){if(json.errCode!='0'||!json.list.length){Temai.initPage();commonFootHandler();return;}
var _material=json.list[0];Temai.beginTime=_material.dwShowBeginTime;Temai.shopName=_material.sMaterialName;Temai.proInfo=_material.sUserData5;Temai.brandId=_material.dwBrandId;Temai.microShopLogo=_material.sMaterialUrl1;Temai.microShopName=_material.sMaterialName1;Temai.microShopUrl=url.getUrlParam('venderId',_material.sMaterialLink1)||url.getUrlParam('venderid',_material.sMaterialLink1)||_material.dwSellerUin;Temai.minDiscount=_material.sUserData1;Temai.cIdAD=_material.sUserData3.split('-')[0];Temai.initPage();commonFootHandler();};function showFootArea(){var _caller=arguments.callee;try{$("#foot_wx_level2").show();window._wxfootconfig.search.load();}catch(e){setTimeout(function(){_caller();},1000);}}
function commonFootHandler(){var _sfActMap={'35231':'mpj143','35230':'mpj149','35229':'mpj138','35022':'mpj150','34990':'mpj151','34989':'mpj152','34975':'mpj153','34849':'mpj154','34813':'mpj155','34797':'mpj156','34795':'mpj157','34794':'mpj158','34793':'mpj159','34792':'mpj141','34791':'mpj160','34790':'mpj161','34789':'mpj144','34787':'mpj140','34984':'mpj114','35171':'mpj114','35176':'mpj114'},_sfRdMap={'35231':'37014.7.1','35230':'37014.7.2','35229':'37014.7.3','35022':'37014.7.4','34990':'37014.7.5','34989':'37014.7.6','34975':'37014.7.7','34849':'37014.7.8','34813':'37014.7.9','34797':'37014.7.10','34795':'37014.7.11','34794':'37014.7.12','34793':'37014.7.13','34792':'37014.7.14','34791':'37014.7.15','34790':'37014.7.16','34789':'37014.7.17','34787':'37014.7.18','34984':'37014.7.19','35171':'37014.7.20','35176':'37014.7.21'},_hotRd=_sfRdMap[Temai.actId],_mpj=_sfActMap[Temai.actId];_hotRd&&(window._wxfootconfig.search.hotrd=_hotRd);_mpj&&(window._wxfootconfig.search.mpj=_mpj);Temai.brandId&&(window._wxfootconfig.search.brandId=Temai.brandId);showFootArea();}
Temai.initPagePreMMART=function(){Temai.setFilterBarStyle(Temai.sortNo);if(Temai.pageStyle=='small'){$('#imgSwitch').addClass('state_switch');}
if(!Temai.showSoldout){$("#filter [no='3']").addClass('select');}};Temai.initPage=function(){document.title=Temai.shopName||Temai.firstItemShopName;if(Temai.isSharedLink){var backLink=$('#backLink')[0];backLink.parentNode.style.display='';backLink.href='http://wq.jd.com/mcoss/mportal/show?actid=1562&tabid=2&tpl=3&cgid=&ch=8&ptag=17007.4.1';backLink.innerHTML='返回品牌首页';}
var _proInfo=(Temai.proInfo&&Temai.proInfo!='0')?Temai.proInfo.replace(/\d+/g,function(m){return'<em>'+m+'</em>';}):'',_limitTime=setLimitTime(Temai.beginTime),_timeInfo=_limitTime.indexOf('-')>=0?'':(Temai.beginTime?('<span>剩余：'+_limitTime+'</span>'):'');if(!!Temai.microShopName&&Temai.microShopName!='0'){if(_timeInfo){$('#promoteInfo').html(_timeInfo).show();}
$('#shopInfo .text span').html(_proInfo);$('#shopInfo img').attr('src',Temai.microShopLogo);$('#shopInfo p').text(Temai.microShopName);var _microShopUrl=constants.microShopCommonUrl+'?venderid='+Temai.microShopUrl;$('#shopInfo a').attr('href',_microShopUrl+'&ptag=37014.4.16');$('#shopInfo').show();$('#toMicroShop').attr('href',_microShopUrl+'&ptag=37014.4.17').show();}else{var _str=_proInfo+_timeInfo;if(_proInfo||_timeInfo){$('#promoteInfo').html(_str).show();}}
var _str=cookie.get('weixinkey')||'',_tmp=_str.split('**');if(_tmp[4]&&_tmp[4]==Temai.areaId){window.shareConfig.title=$decodeHtml(_tmp[3])+'，全场'+_tmp[2]+'折起 。';window.shareConfig.img_url=_tmp[1];}else{Temai.noshareInfo=true;}
if(Temai.shopName&&Temai.minDiscount){window.shareConfig.desc=Temai.shopName+'，全场'+Temai.minDiscount+'折起。';}};Temai.getCPC=function(){if(Temai.mmartJson.errCode!='0'||!Temai.mmartJson.data.list.length){umpReport(umpBizKey.getMMARTFail);$('#itemCont').html('商品准备中...');return;}
Temai.itemList=Temai.mmartJson.data.list;if(Temai.itemList.length<15){umpReport(umpBizKey.mmartNumLess);}
var _defineProperties=function(item,num){return Object.defineProperties({},{"count":{"value":1,"writable":true,"enumerable":false,"configurable":false},"filterNum":{"value":item.dwSkuState=='0'?1:0,"writable":true,"enumerable":false,"configurable":false},"name":{"value":item['className'+num],"writable":true,"enumerable":false,"configurable":false}});};var _setHasChildProperty=function(obj,value){return Object.defineProperties(obj,{"hasChild":{"value":typeof value==='undefined'?true:false,"writable":true,"enumerable":false,"configurable":false}});};var _checkItem=function(item){var _result=true,_idPrefix='classId',_namePrefix='className';for(var i=4;i>0;i--){var _id=item[_idPrefix+i],_name=item[_namePrefix+i],_correct=true;if(_id==='0'||!_id){if(_name){_result=false;break;}}else{if(!_name){_result=false;break;}}
if(i==1){if(_id==='0'||!_name||!_id){_result=false;break;}}
for(var m=1;m<i;m++){var _idM=item[_idPrefix+m],_nameM=item[_namePrefix+m];if(_idM==='0'||!_nameM||!_idM){_correct=false;break;}}
if(!_correct){_result=false;break;}}
return _result;};var _listInfo=Temai.listInfo={'0':_setHasChildProperty(_defineProperties({dwSkuState:'empty',className0:'全部分类'},0),false)};_listInfo['0'].count=0;var _hideDiscount=Temai.minDiscount==10;for(var i=0;i<Temai.itemList.length;i++){var _item=Temai.itemList[i],_err,_one,_two,_three,_four;Temai.extlogo=='gh'&&(_item.ext1='广货');_item.hidePrice=_item.dwActMinPrice==-1||_item.dwActMinPrice==0||_item.dwMarketPrice==-1||_item.dwMarketPrice==0;_item.dis=_item.hidePrice?'':(_item.dwActMinPrice*10/_item.dwMarketPrice).toFixed(1).replace('.0','');_item.sUrl+=(Temai.extlogo=='gh'?'&extlogo=gh':'')+'&price='+_item.dwActMinPrice;_item.sImg2=JD.performance.getScaleImg(_item.sImg);_item.itemTag=_item.commPinMask?Temai.getItemTag(_item.commPinMask):null;_item.hideDiscount=_hideDiscount;if(!_item.sImg){_item.sImg2=_item.sImg=JD.performance.getScaleImg(_item['sImg200x200']);}
_listInfo['0'].count++;if(_item.dwSkuState=='0'){_listInfo['0'].filterNum++;}
if(!_checkItem(_item)){_item.isWrong=true;_err=_listInfo['-1'];if(_err){_err.count++;_err.name='其他';_item.dwSkuState=='0'?_err.filterNum++:'';}else{_err=_listInfo['-1']=_defineProperties(_item,0);}
continue;}
if(_item.classId1&&_item.classId1!=='0'){_one=_listInfo[_item.classId1];if(_one){_one.count++;_one.name=_one.name||_item.className1;_item.dwSkuState=='0'?_one.filterNum++:'';}else{_one=_listInfo[_item.classId1]=_defineProperties(_item,1);}}
if(_item.classId2&&_item.classId2!=='0'){_two=_listInfo[_item.classId1][_item.classId2];if(_two){_two.count++;_two.name=_two.name||_item.className2;_item.dwSkuState=='0'?_two.filterNum++:'';}else{_two=_listInfo[_item.classId1][_item.classId2]=_defineProperties(_item,2);}
_setHasChildProperty(_one);}
if(_item.classId3&&_item.classId3!='0'){_three=_listInfo[_item.classId1][_item.classId2][_item.classId3];if(_three){_three.count++;_three.name=_three.name||_item.className3;_item.dwSkuState=='0'?_three.filterNum++:'';}else{_three=_listInfo[_item.classId1][_item.classId2][_item.classId3]=_defineProperties(_item,3);}
_setHasChildProperty(_two);}
if(_item.classId4&&_item.classId4!=='0'){_four=_listInfo[_item.classId1][_item.classId2][_item.classId3][_item.classId4];if(_four){_four.count++;_four.name=_four.name||_item.className4;_item.dwSkuState=='0'?_four.filterNum++:'';}else{_four=_listInfo[_item.classId1][_item.classId2][_item.classId3][_item.classId4]=_defineProperties(_item,4);}
_setHasChildProperty(_three);}}
Temai.showItemList(true);if(Temai.scrollTop){window.scrollTo(0,Temai.scrollTop);Temai.scrollTop=0;}
Temai.initCatList(_listInfo);};Temai.initCatList=function(listInfo){var _tpl='\
         <li>\
             <a href="#" catid="#catid#">#name#<span class="count" count="#count#" filterNum="#filterNum#">(#count#)</span></a>\
             #child#\
         </li>',_result=[],_tmpAttr=[];for(var o in listInfo){if(o!=='0'){_tmpAttr.push(o);continue;}
var _item=listInfo[o],_html=_tpl.replace(/#count#/ig,_item.count).replace(/#name#/ig,_item.name).replace(/#catid#/,o).replace(/#filterNum#/ig,_item.filterNum),_child=_item.hasChild?getChild(_item):'';_result.push(_html.replace(/#child#/ig,_child));}
for(var i=0;i<_tmpAttr.length;i++){for(var o in listInfo[_tmpAttr[i]]){var _item=listInfo[_tmpAttr[i]][o],_html=_tpl.replace(/#count#/ig,_item.count).replace(/#name#/ig,_item.name).replace(/#catid#/,o).replace(/#filterNum#/ig,_item.filterNum),_child=_item.hasChild?getChild(_item):'';_result.push(_html.replace(/#child#/ig,_child));}}
if(listInfo['-1']){var _item=listInfo['-1'];_result.push(_tpl.replace(/#count#/ig,_item.count).replace(/#name#/ig,_item.name).replace(/#catid#/,"-1").replace(/#filterNum#/ig,_item.filterNum).replace(/#child#/ig,''));}
$('#catList').html(_result.join('')).find('li').eq(0).addClass('checked');$('#catList a').click(function(){var $this=$(this);$('#catList li').removeClass('checked');$this.closest('li').addClass('checked');Temai.catId=$this.attr('catid');Temai.catBoxState='hide';Temai.hideCatList();if(Temai.catId!=='0'){$('#filter a').eq(0).addClass('select');}else{$('#filter a').eq(0).removeClass('select');}
if(Temai.priceClicked){Temai.sortNo=2;}
Temai.showItemList();});$('#catList li').removeClass('checked');Temai.catId&&$("#catList a[catid='"+Temai.catId+"']").closest('li').addClass('checked');if(Temai.catId&&Temai.catId!=='0'){$('#filter a').eq(0).addClass('select');}else{$('#filter a').eq(0).removeClass('select');}
function getChild(list){var _result=['<ul class="sub_cate_list">'];for(var o in list){var _item=list[o];_result.push(_tpl.replace(/#count#/ig,_item.count).replace(/#name#/ig,_item.name).replace(/#catid#/,o).replace(/#child#/ig,_item.hasChild?getChild(_item):"").replace(/#filterNum#/ig,_item.filterNum));}
_result.push('</ul>');return _result.join('');}
var _clientY=0;$('.mod_category').bind('touchmove',function(e){e.stopPropagation();e.preventDefault();if(_clientY===-1){_clientY=e.changedTouches[0].clientY;return;}
var _top=$('.mod_category').scrollTop(),_offset=e.changedTouches[0].clientY-_clientY;console.debug(_top+':'+_offset+':'+_clientY);$('.mod_category').scrollTop(_top-_offset);_clientY=e.changedTouches[0].clientY;}).bind('touchend',function(){_clientY=-1;});};Temai.hideCatList=function(){$("#catBox").hide();$("#filterMask").hide();$(document).unbind('touchmove',Temai.touchEvent);$("#filter a").eq(0).removeClass('open');};Temai.touchEvent=function(e){e.preventDefault();};Temai.showCatList=function(){$('.qq_footer').hide();$('#catBox').show();$('#filterMask').show();$(document).bind('touchmove',Temai.touchEvent);$('#filter a').eq(0).addClass('open');Temai.calculateHeight();};Temai.calculateHeight=function(){var _windowHeight=$(window).height(),_logoBoxHeight=$('#logoBox').height(),_shopInfoHeight=$('#shopInfo').height(),_filterModHeight=$('#filterMod').height(),_scrollTop=$(window).scrollTop(),_maxHeight=_windowHeight-_shopInfoHeight-_filterModHeight,_domRealHeight=$('#catList').height();if(_scrollTop<=_logoBoxHeight){_maxHeight-=_logoBoxHeight-_scrollTop;}
if(_domRealHeight<_maxHeight){_maxHeight=_domRealHeight;}
$('.mod_category').css('max-height',_maxHeight+'px');};Temai.changeListNum=function(){if(Temai.showSoldout){$('#catBox span.count').each(function(){$(this).html('('+$(this).attr('count')+')');});}else{$('#catBox span.count').each(function(){$(this).html('('+$(this).attr('filterNum')+')');});}};Temai.getItemTag=function(commPinMask){return Temai.pinMaskMap.filter(function(o){return((commPinMask*1)&o.v)!==0;})[0];};Temai.setCPChtml=function(list,pageInit){if(!pageInit){var _itemCont=$('#itemCont')[0],_smallImg=true;if(list.length==0){_itemCont.innerHTML='商品准备中...';return;}
_itemCont.className=Temai.pageStyle=='small'?'mod_itemgrid':'mod_itemlist';_itemCont.innerHTML=fj.formatJson('tpl'+Temai.pageStyle,{list:list,smallImg:_smallImg});}
Temai.firstItemShopName=list[0].sItemName;if(Temai.noshareInfo){window.shareConfig.title=(Temai.shopName||list[0].sItemName).replace(/&bnsp;/g,' ');window.shareConfig.img_url=list[0].sImg;}
lazyLoad.autoLoadImage({scrollOffsetH:500});};Temai.doScroll=function(){var _st=$(window).scrollTop();if(!Temai.hasLoadedAdAndBrandInfo&&$('img[init_src]').length==0){Temai.hasLoadedAdAndBrandInfo=true;Temai.loadAd();}
if(_st>100){Temai.isTitleShow=false;if(_st>Temai.lastScH){if(Temai.isNavShow){$('#filterDiv').css('visibility','hidden').removeClass('mod_filter_fixed');}
Temai.isNavShow=false;}else if(!Temai.isNavShow){$('#filterDiv').css('visibility','visible').addClass('mod_filter_fixed');Temai.isNavShow=true;}}else if(!Temai.isTitleShow){$('#filterDiv').css('visibility','visible').removeClass('mod_filter_fixed');Temai.isTitleShow=true;}
_st>0&&(Temai.lastScH=_st);if(Temai.wheight<_st){$('#goTop').show();}else{$('#goTop').hide();}};Temai.bindEvent=function(){$(window).on('scroll',$.proxy(Temai.doScroll,this));$('#filter a').on('click',function(){var $this=$(this),_no=$this.attr('no');if(_no==1){Temai.catBoxState=Temai.catBoxState=='show'?'hide':'show';}else if(_no==2){Temai.sortNo==2&&(Temai.priceSort=Temai.priceSort=='down'?'up':'down');Temai.sortNo=2;Temai.priceClicked=true;}else if(_no==3){Temai.showSoldout=!Temai.showSoldout;Temai.changeListNum();}else if(_no==4){Temai.pageStyle=Temai.pageStyle=='small'?'big':'small';}
Temai.setFilterBarStyle(_no);if(_no!=='1'){Temai.showItemList();window.scrollTo(0,0);}});$('#itemCont').on('click','.hproduct',function(){history.replaceState('',document.title,location.href.replace(/#.*$/,'')+'#sortNo='+(Temai.sortNo==2?1:Temai.sortNo)+'&showSoldout='+Temai.showSoldout+'&pageStyle='+Temai.pageStyle+'&st='+$(window).scrollTop()+'&catId='+Temai.catId);});};Temai.showItemList=function(pageInit){var _list=Temai.itemList.concat();Temai.hideCatList();if(pageInit){_list.forEach(function(item){var $item=$('#itemCont').find('.hproduct[skuId="'+item.sSkuId+'"]');switch(Temai.catId){case'-1':if(!item.isWrong){$item.remove();}
break;case'0':break;default:if(item.classId1!==Temai.catId&&item.classId2!==Temai.catId&&item.classId3!==Temai.catId&&item.classId4!==Temai.catId){$item.remove();}}
if(!Temai.showSoldout&&item.dwSkuState=='1'){$item.remove();}
if($item&&$item.length){if(Temai.extlogo=='gh'){$item.find('.ext1').text('广货');var $itemA=$item.find('a');$itemA.attr('href',$itemA.attr('href')+'&extlogo=gh');}
if(!item.hideDiscount&&item.dis<10){$item.find('.beforeDis').after('<span class="discount">'+item.dis+'折</span>');}
if(item.itemTag){$item.find('a').prepend('<span class="tag tag_'+item.itemTag.c+'">'+item.itemTag.n+'</span>');}
if(Temai.pageStyle=='big'){$item.find('.beforeExt2').after('<p class="sku">'+item.ext2+'</p>');var $priceAreaDel=$item.find('.priceArea').find('del'),_marketText=$priceAreaDel.text();$priceAreaDel.text('市场价：'+_marketText);var _btnClass='',_btnText='';if(item.dwSkuState=='1'){_btnClass='btn_over';_btnText='已抢完';}else{_btnClass='btn_buy';_btnText='立即购买';}
$item.find('a').append('<span class="'+_btnClass+'">'+_btnText+'</span>');}}});}else{if(Temai.sortNo==2){_list.sort(function(a,b){if(Temai.showSoldout&&a.hidePrice){return 1;}else if(Temai.showSoldout&&b.hidePrice){return-1;}else{return Temai.priceSort=='down'?b.dwActMinPrice-a.dwActMinPrice:a.dwActMinPrice-b.dwActMinPrice;}});}
_list=_list.filter(function(item){var _catId=Temai.catId;switch(_catId){case'-1':if(!item.isWrong){return false;}
break;case'0':break;default:if(item.classId1!==_catId&&item.classId2!==_catId&&item.classId3!==_catId&&item.classId4!==_catId){return false;}}
return Temai.showSoldout||item.dwSkuState=='0';});}
Temai.setCPChtml(_list,pageInit);};Temai.setFilterBarStyle=function(no){var $btn=$("#filter [no='"+no+"']");if(no==1){if(Temai.catBoxState=='show'){Temai.showCatList();}else{Temai.hideCatList();}}else if(no==2){$btn.addClass('select');Temai.priceSort=='down'?$btn.addClass('state_switch'):$btn.removeClass('state_switch');}else if(no==3){Temai.showSoldout?$btn.removeClass('select'):$btn.addClass('select');}else{Temai.pageStyle=='small'?$btn.addClass('state_switch'):$btn.removeClass('state_switch');}};Temai.loadAd=function(){var _adMap={4:2104,17:2103,16:2102,9:2101,8:2100,6:2099,5:2098,3:2096,2:2094,15:2076},_gids=Temai.cIdAD?(_adMap[Temai.cIdAD]||2076):2076;ls.loadScript({url:constants.adUrlPre+'?gids='+_gids+'&pc=1&callback=bannerAd&r='+Math.random()});window.bannerAd=function(result){if(result&&result.errCode==='0'&&result.list&&result.list.length){$('#advertisementBox img').attr('src',result.list[0].locations[0].plans[0].material).parent().attr('href',result.list[0].locations[0].plans[0].sUrl).closest('div').show();}};};function setLimitTime(bt){bt=bt*1+3600*9;var _et=bt*1+3600*24*3,_tmp=getTimeDistance(_et-new Date()/1000),_str='';if(_tmp[0]>0){_str=_tmp[0]+'天';}else if(_tmp[1]>0){_str=_tmp[1]+'小时';}else if(_tmp[2]>0){_str=_tmp[2]+'分';}else{_str=_tmp[3]+'秒';}
return _str;}
function getTimeDistance(ts){var _timeLeft=[0,0,0,0];_timeLeft[0]=(ts>86400)?parseInt(ts/86400):0;ts=ts-_timeLeft[0]*86400;_timeLeft[1]=(ts>3600)?parseInt(ts/3600):0;ts=ts-_timeLeft[1]*3600;_timeLeft[2]=(ts>60)?parseInt(ts/60):0;_timeLeft[3]=ts-_timeLeft[2]*60;return _timeLeft;}
function decodeQuery(name){var s=url.getUrlParam(name);try{return decodeURIComponent(s);}catch(e){return s;}}
function $xss(str,type){if(!str){return str===0?"0":"";}
switch(type){case"none":return str+"";break;case"html":return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function(r){return"&#"+r.charCodeAt(0)+";"}).replace(/ /g,"&nbsp;").replace(/\r\n/g,"<br />").replace(/\n/g,"<br />").replace(/\r/g,"<br />");break;case"htmlEp":return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g,function(r){return"&#"+r.charCodeAt(0)+";"});break;case"url":return escape(str).replace(/\+/g,"%2B");break;case"miniUrl":return str.replace(/%/g,"%25");break;case"script":return str.replace(/[\\"']/g,function(r){return"\\"+r;}).replace(/%/g,"\\x25").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\x01/g,"\\x01");break;case"reg":return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g,function(a){return"\\"+a;});break;default:return escape(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function(r){return"&#"+r.charCodeAt(0)+";"}).replace(/ /g,"&nbsp;").replace(/\r\n/g,"<br />").replace(/\n/g,"<br />").replace(/\r/g,"<br />");break;}}
function $decodeHtml(content){if(content==null){return'';}
return $strReplace(content,{"&amp;":'&',"&quot;":'\"',"\\'":'\'',"&lt;":'<',"&gt;":'>',"&nbsp;":' ',"&#39;":'\'',"&#09;":'\t',"&#40;":'(',"&#41;":')',"&#42;":'*',"&#43;":'+',"&#44;":',',"&#45;":'-',"&#46;":'.',"&#47;":'/',"&#63;":'?',"&#92;":'\\',"<BR>":'\n'});}
function $strReplace(str,re,rt){if(rt!=undefined){replace(re,rt);}else{for(var key in re){replace(key,re[key]);}}
function replace(a,b){var arr=str.split(a);str=arr.join(b);}
return str;}
function detectOS(){var osArray=['ios','android'],osObj=$.os,os,version,tag;if(osObj){version=osObj.version;}
else{return;}
$.each(osArray,function(i,item){if(osObj[item]==true){os=item;return false;}});if(os){os=='ios'?version=parseInt(version,10):os=='android'?version=parseFloat(version):null;tag=os+version;if(os=='android'&&version>=4){tag+=' fixedLayout';}else if(os=='android'&&version<4){tag+=' lowAndroid';}else if(os=='ios'&&version<6){tag+=' lowIphone';}else if(os=='ios'&&version>=6){tag+=' scrollLayout';}
tag=tag.replace('.','_');$('html').addClass(tag);}}
function doReport(){try{if(!(window.ECC_cloud_report_pv&&FOOTDETECT&&FOOTDETECT.objMsgPv)){setTimeout(doReport,200);return;}
var objData=FOOTDETECT.objMsgPv;objData.ptag=url.getUrlParam('PTAG')||url.getUrlParam('ptag');objData.vurl='http://wq.jd.com/portal/wx/brand_detail?ptag='+objData.ptag;window._vurl=objData.vurl;ECC.cloud.report.pvPortal(objData);}catch(e){}}
function umpReport(errorType){JD.report.umpBiz(umpBiz[errorType].option);umpBiz[errorType].callback&&umpBiz[errorType].callback();}
exports.init=function(){detectOS();Temai.initParam();Temai.initPagePreMMART();Temai.getCPC();Temai.initMaterial();Temai.bindEvent();doReport();};});