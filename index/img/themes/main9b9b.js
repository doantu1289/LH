$(document).ready(function ($) {
	"use strict";
	awe_backtotop();
	awe_owl();
	// check_last_active();
	awe_category();
	awe_menumobile();
	awe_tab();
});

$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	hidePopup('.awe-popup'); 	
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;
})

/********************************************************
# SHOW NOITICE
********************************************************/
function awe_showNoitice(selector) {
	$(selector).animate({right: '0'}, 500);
	setTimeout(function() {
		$(selector).animate({right: '-300px'}, 500);
	}, 3500);
}  window.awe_showNoitice=awe_showNoitice;

/********************************************************
# SHOW LOADING
********************************************************/
function awe_showLoading(selector) {
	var loading = $('.loader').html();
	$(selector).addClass("loading").append(loading); 
}  window.awe_showLoading=awe_showLoading;

/********************************************************
# HIDE LOADING
********************************************************/
function awe_hideLoading(selector) {
	$(selector).removeClass("loading"); 
	$(selector + ' .loading-icon').remove();
}  window.awe_hideLoading=awe_hideLoading;

/********************************************************
# SHOW POPUP
********************************************************/
function awe_showPopup(selector) {
	$(selector).addClass('active');
}  window.awe_showPopup=awe_showPopup;

/********************************************************
# HIDE POPUP
********************************************************/
function awe_hidePopup(selector) {
	$(selector).removeClass('active');
}  window.awe_hidePopup=awe_hidePopup;

/********************************************************
# CONVERT VIETNAMESE
********************************************************/
function awe_convertVietnamese(str) { 
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str= str.replace(/đ/g,"d"); 
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,""); 
	return str; 
} window.awe_convertVietnamese=awe_convertVietnamese;


/********************************************************
# SIDEBAR CATEOGRY
********************************************************/
function awe_category(){
	$('.nav-category .fa-angle-down').click(function(e){
		$(this).parent().toggleClass('active');
	});
} window.awe_category=awe_category;

/********************************************************
# MENU MOBILE
********************************************************/
function awe_menumobile(){
	$('.menu-bar').click(function(e){
		e.preventDefault();
		$('#nav').toggleClass('open');
	});
	$('#nav .fa').click(function(e){		
		e.preventDefault();
		$(this).parent().parent().toggleClass('open');
	});
} window.awe_menumobile=awe_menumobile;

/********************************************************
# ACCORDION
********************************************************/
function awe_accordion(){
	$('.accordion .nav-link').click(function(e){
		e.preventDefault;
		$(this).parent().toggleClass('active');
	})
} window.awe_accordion=awe_accordion;

/********************************************************
# OWL CAROUSEL
********************************************************/
function awe_owl() { 
	setTimeout(function(){
		$('.owl-carousel').each( function(){
			var xxs_item = $(this).attr('data-xxs-items');
			var xs_item = $(this).attr('data-xs-items');
			var md_item = $(this).attr('data-md-items');
			var lg_item = $(this).attr('data-lg-items');
			var sm_item = $(this).attr('data-sm-items');	
			var margin	= $(this).attr('data-margin');
			var dot		= $(this).attr('data-dot');
			var loop	= $(this).attr('data-loop');
			var nav		= $(this).attr('data-nav');
			var auto_play = $(this).attr('data-auto-play');
			var auto_height = $(this).attr('data-auto-height');
			if (typeof margin !== typeof undefined && margin !== false) {    
			} else{
				margin = 0;
			}
			if (typeof xxs_item !== typeof undefined && xxs_item !== false) {    
			} else{
				xxs_item = 1;
			}
			if (typeof xs_item !== typeof undefined && xs_item !== false) {    
			} else{
				xs_item = 1;
			}
			if (typeof sm_item !== typeof undefined && sm_item !== false) {    

			} else{
				sm_item = 3;
			}	
			if (typeof md_item !== typeof undefined && md_item !== false) {    
			} else{
				md_item = 3;
			}
			if (typeof dot !== typeof undefined && dot !== true) {   
				dot = dot;
			} else{
				dot = false;
			}
			if (typeof loop !== typeof undefined && loop !== true){
				loop = loop;
			} else {
				loop = false;
			}
			if (typeof nav !== typeof undefined && nav !== true) {   
				nav = nav;
			} else{
				nav = false;
			}
			if (typeof auto_play !== typeof undefined && auto_play !== true){
				auto_play = auto_play;
			} else {
				auto_play = false;
			}
			if (typeof auto_height !== typeof undefined && auto_height !== true){
				auto_height = auto_height;
			} else {
				auto_height = false;
			}
			$(this).owlCarousel({
				loop: loop,
				margin:Number(margin),
				responsiveClass:true,
				dots:dot,
				nav:nav,
				// navText: ['<i class="fa fa-caret-left"></i>','<i class="fa fa-caret-right"></i>'],
				responsive:{
					0:{
						items:Number(xxs_item)				
					},
					543:{
						items:Number(xs_item)				
					},
					768:{
						items:Number(sm_item)				
					},
					992:{
						items:Number(md_item)				
					},
					1200:{
						items:Number(lg_item)				
					}
				},
				autoplay: true,
				autoPlayHoverPause: true,
				autoHeight: false,
				rewind: true
			});
		})
	},300);
} window.awe_owl=awe_owl;

// /* check last active owl-item */
// function check_last_active(){
// 	var x = $('.owl-lastActive');
// 	setTimeout(function(){
// 		x.find('.active .item').css('border-right','#ebebeb 1px solid');
// 		if(x.find('.active').last()){
// 			x.find('.active').last().find('.item').css('border-right','none');
// 		}
// 	}, 300);
// } window.check_last_active = check_last_active;

/********************************************************
# BACKTOTOP
********************************************************/
function awe_backtotop() { 
	if ($('.back-to-top').length) {
		var scrollTrigger = 100, // px
		backToTop = function () {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > scrollTrigger) {
				$('.back-to-top').addClass('show');
			} else {
				$('.back-to-top').removeClass('show');
			}
		};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('.back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
} window.awe_backtotop=awe_backtotop;

/********************************************************
# TAB
********************************************************/
function awe_tab() {
	$(".e-tabs").each( function(){
		$(this).find('.tabs-title li:first-child').addClass('current');
		$(this).find('.tab-content').first().addClass('current');
		$(this).find('.tabs-title li').click(function(){
			var tab_id = $(this).attr('data-tab');
			var url = $(this).attr('data-url');
			$(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);
			$(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
			$(this).closest('.e-tabs').find('.tab-content').removeClass('current');
			$(this).addClass('current');
			$(this).closest('.e-tabs').find("#"+tab_id).addClass('current');
		});    
	});
} window.awe_tab=awe_tab;

/********************************************************
# DROPDOWN
********************************************************/
// $('.dropdown-toggle').click(function() {
// 	$(this).parent().toggleClass('open'); 	
// }); 
$('.btn-close').click(function() {
	$(this).parents('.dropdown').toggleClass('open');
}); 
$('body').click(function(event) {
	if (!$(event.target).closest('.dropdown').length) {
		$('.dropdown').removeClass('open');
	};
});

/*** Fix validate input number ***/
function validateInput(t) {
    "" == t.value && (t.value = 1)
}