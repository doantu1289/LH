/***
### minhpq's customize scripts
### (S) phamminh239
### Last modified : August 2017
***/

$(document).ready(function(){ 
	var ww = $(window).width();

	/*** Footer mobile ***/
	if (ww < 768 ){
		$('.foo-collapse .foo-title').on('click', function(){
			$(this).next('.foo-content').slideToggle('fast');
			$(this).toggleClass('toggle-fa');
		});
	} else {
		$('.foo-content').show();
	}

	/*** search ***/
	if (ww >=320){
		$('.header-search .fa').on('click', function(){
			$('.header-search form').toggleClass('open');
			if ($('.header-search form').hasClass('open')){
				$(document).mouseup(function(e) {
					var container = $(".header-search form");
					if (!container.is(e.target) && container.has(e.target).length === 0) {
						container.removeClass('open');
					}
				});
			}
		});
	}

	/*** FIX POPUP LOGIN / REGISTER ***/
	$(document).mouseup(function(e) {
		var container = $("#login_register");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.fadeOut();
			$('#login_register').modal('hide');
		}
	});

	/*** MENU MOBILE ***/
	if (ww < 992){
		$('.module-title').on('click', function(){
			$('.sidebar-menu-content').slideToggle('400');
		});
	}

	/*** MENU LIST MOBILE ***/
	if (ww < 1200){
		$('.sidebar-menu .module-content .fa-caret-right').on('click', function(){
			$(this).next('ul').slideToggle('400');
		});
	}

	/********** Thu gọn **********/
	
	
	

	var menu_limit = "6";
	//	kiểm tra nếu ko phải số thì assign == 5;
	if (isNaN(menu_limit)){
		menu_limit = 5;
	} else {
		// số vị trí mảng = giá trị - 1
		menu_limit = 5;
	}

	/*** menu list ***/
	var sidebar_length = $('.sidebar-menu:not(.site-nav-mobile) .sidebar-menu-list').length;
	//	thiết lập số menu danh mục hiển thị
	if (sidebar_length > (menu_limit + 1) ){
		$('.sidebar-menu .sidebar-linklists:not(.mobile-menu-linklists) > ul').each(function(){
			$('.sidebar-menu-list',this).eq(menu_limit).nextAll().hide().addClass('toggleable');
			$(this).append('<li class="more"><a><label>Xem thêm ... </label></a></li>');
		});
		$('.sidebar-menu .sidebar-linklists:not(.mobile-menu-linklists) > ul, .menu-list').on('click','.more', function(){
			if($(this).hasClass('less')){
				$(this).html('<a><label>Xem thêm ...</label></a>').removeClass('less');
			} else {
				$(this).html('<a><label>Thu gọn ... </label></a>').addClass('less');;
			}
			$(this).siblings('li.toggleable').slideToggle();
		});
	}
	
});