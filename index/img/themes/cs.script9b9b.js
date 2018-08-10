function qty(){	
	var val_qty = $('.product-template .product_quantity #qty').val();
	if (val_qty == undefined){
		return 1;
	}
	return val_qty;
}
qty();

/**
 * Look under your chair! console.log FOR EVERYONE!
 *
 * @see http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */
 (function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
 	{console.log();return window.console;}catch(err){return window.console={};}})());

/**
 * Page-specific call-backs
 * Called after dom has loaded.
 */
 var GLOBAL = {
 	common : {
 		init: function(){
 			$('.add_to_cart').bind( 'click', addToCart );
 		}
 	},

 	templateIndex : {
 		init: function(){

 		}
 	},

 	templateProduct : {
 		init: function(){

 		}
 	},

 	templateCart : {
 		init: function(){

 		}
 	}

 }
 var UTIL = {
 	fire : function(func,funcname, args){
 		var namespace = GLOBAL;
 		funcname = (funcname === undefined) ? 'init' : funcname;
 		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
 			namespace[func][funcname](args);
 		}
 	},

 	loadEvents : function(){
 		var bodyId = document.body.id;

		// hit up common first.
		UTIL.fire('common');

		// do all the classes too.
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
	}

};
$(document).ready(UTIL.loadEvents);
/**
 * Ajaxy add-to-cart
 */
 Number.prototype.formatMoney = function(c, d, t){
 	var n = this, 
 	c = isNaN(c = Math.abs(c)) ? 2 : c, 
 	d = d == undefined ? "." : d, 
 	t = t == undefined ? "." : t, 
 	s = n < 0 ? "-" : "", 
 	i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
 	j = (j = i.length) > 3 ? j % 3 : 0;
 	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
 function addToCart(e){
 	if (typeof e !== 'undefined') e.preventDefault();
 	var $this = $(this);
 	var form = $this.parents('form');		
 	$.ajax({
 		type: 'POST',
 		url: '/cart/add.js',
 		async: false,
 		data: form.serialize(),
 		dataType: 'json',
 		error: addToCartFail,
 		beforeSend: function() {  
 		},
 		success: addToCartSuccess,
 		cache: false
 	});
 }


 function addToCartSuccess (jqXHR, textStatus, errorThrown){

 	$('#myModal').html('');		
 	var src = Bizweb.resizeImage(jqXHR['image'], 'compact');
 	if(jqXHR['image'] == null){
 		var src = "//bizweb.dktcdn.net/thumb/compact/assets/themes_support/noimage.gif";
 	}

 	if (jqXHR['variant_title'] != "Default Title" ){
 		var variant_title =	'<div class="variant"><label class="hidden-xs">Tùy chọn : </label><span>' + (jqXHR['variant_title']) + '</span></div>';
 	} else {
 		var variant_title = "";
 	}


 	var $popupMobile = '<div class="modal-dialog">'
 	+						'<div class="modal-content">'
 	+ 							'<div class="modal-body">'
 	+	 							'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
 	+									'<span aria-hidden="true"></span>'
 	+								'</button>'
 	+								'<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-hg-6 left-popup-content popup-cart-content">'
 	+									'<h4 class="modal-title">'
 	+										'<i class="fa fa-check" aria-hidden="true"></i>'
 	+										'Đã thêm sản phẩm'
 	+									'</h4>'
 	+									'<div class="media">'
 	+										'<div class="media-left">'
 	+											'<a href="'+jqXHR['url']+'" title="'+jqXHR['title']+'">'
 	+ 												'<img src="'+ src +'" alt="'+ jqXHR['title'] +'">'
 	+											'</a>'
 	+										'</div>'
 	+ 										'<div class="media-body">'
 	+											'<div class="product-title text5line">'
 	+												jqXHR['title']
 	+											'</div>'
 	+											variant_title
 	+ 											'<div class="product-new-price">'
 	+												'<label class="hidden-xs">Giá : </label>'
 	+												'<span>'
 	+													(jqXHR['price']).formatMoney(0) 
 	+ 												'đ</span>'
 	+											'</div>'
 	+											'<div class="product-quantity-popup">'
 	+												'<label>Số lượng : </label>'
 	+												'<span>'+ qty() + '</span>'
 	+											'</div>'
 	+										'</div>'
 	+									'</div>'
 	+								'</div>'
 	+								'<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-hg-6 right-popup-content popup-cart-content">'
 	+									'<div class="action-bottom">'
 	+										'<div class="popup-content-title">Giỏ hàng có <span></span> sản phẩm</div>'
 	+										'<div class="popup-content-fee">'
 	+											'<label>Phí vận chuyển</label>'
 	+											'<strong>Tính khi thanh toán</strong>'
 	+										'</div>'
 	+										'<div class="popup-content-description">'
 	+											'<label>Tổng tiền giỏ hàng</label>'
 	+											'<strong class="total-price"></strong>'
 	+										'</div>'
 	+		 								'<a href="/cart" class="goto_url goto_cart">'
 	+											'<span>Tới giỏ hàng</span>'
 	+										'</a>'
 	+										'<a href="/checkout" class="goto_url goto_checkout">'
 	+											'<span>Thanh toán</span>'
 	+										'</a>'
 	+									'</div>'
 	+								'</div>'
 	+							'</div>'
 	+						'</div>';
 	$('#myModal').html($popupMobile);
 	$('#myModal').modal();

 	if (jqXHR['variant_title'] == "Default Title"){
 		$('.media-body .variant').addClass('hidden');
 	}
 	clearTimeout($('#myModal').data('hideInterval'));

 	$.ajax({
 		type: 'GET',
 		url: '/cart.js',
 		async: false,
 		cache: false,
 		dataType: 'json',
 		success: function (cart){
 			var cart_count = cart.item_count;
 			awe_hidePopup('.loading');
 			Bizweb.updateCartFromForm(cart, '.top-cart-content .mini-products-list');
 			Bizweb.updateCartPopupForm(cart, '#popup-cart-desktop .tbody-popup');
 		}
 	});
 }

 function addToCartFail(jqXHR, textStatus, errorThrown){
 	var response = $.parseJSON(jqXHR.responseText);
 	var $info = '<div class="error">'+ response.description +'</div>';
 }
 $(document).on('click', ".remove-item-cart", function () {
 	var variantId = $(this).attr('data-id');
 	removeItemCart(variantId);
 });
 $(document).on('click', ".items-count", function () {
 	$(this).parent().children('.items-count').prop('disabled', true);
 	var thisBtn = $(this);
 	var variantId = $(this).parent().find('.variantID').val();
 	var qty =  $(this).parent().children('.number-sidebar').val();
 	updateQuantity(qty, variantId);
 });
 $(document).on('change', ".number-sidebar", function () {
 	var variantId = $(this).parent().children('.variantID').val();
 	var qty =  $(this).val();
 	updateQuantity(qty, variantId);
 });
 function updateQuantity (qty, variantId){
 	var variantIdUpdate = variantId;
 	$.ajax({
 		type: "POST",
 		url: "/cart/change.js",
 		data: {"quantity": qty, "variantId": variantId},
 		dataType: "json",
 		success: function (cart, variantId) {
 			Bizweb.onCartUpdateClick(cart, variantIdUpdate);
 		},
 		error: function (qty, variantId) {
 			Bizweb.onError(qty, variantId)
 		}
 	})
 }
 function removeItemCart (variantId){
 	var variantIdRemove = variantId;
 	$.ajax({
 		type: "POST",
 		url: "/cart/change.js",
 		data: {"quantity": 0, "variantId": variantId},
 		dataType: "json",
 		success: function (cart, variantId) {
 			Bizweb.onCartRemoveClick(cart, variantIdRemove);
 			$('.productid-'+variantIdRemove).remove();
 			if($('.tbody-popup>div').length == '0' ){
 				$('#popup-cart').modal('hide');
 			}
 			if($('.list-item-cart>li').length == '0' ){
 				$('.mini-products-list').html('<div class="no-item"><p>Không có sản phẩm nào trong giỏ hàng.</p></div>');
 			}
 			if($('.cart-tbody>div').length == '0' ){
 				$('.bg-cart-page').remove();
 				$('.bg-cart-page-mobile').remove();
 				$('.cart_desktop_page').html('<div class="fw margin-bottom-15 margin-top-15">Không có sản phẩm nào trong giỏ hàng. Quay lại <a href="/">cửa hàng</a> để tiếp tục mua sắm.</div>');
 			}
 			if($('.cart_page_mobile .item-product').length == '0'){
 				$('.header-cart-content').html('<div class="fw margin-bottom-15 padding-15 margin-top-15">Không có sản phẩm nào trong giỏ hàng. Quay lại <a href="/">cửa hàng</a> để tiếp tục mua sắm.</div>');
 			}
 		},
 		error: function (variantId, r) {
 			Bizweb.onError(variantId, r)
 		}
 	})
 }