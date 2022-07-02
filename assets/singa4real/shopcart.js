function myFunction(e){var t=document.getElementById("item-display");t.src=e.src,t.parentElement.style.display="block"}
 (function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});

$(document).on("submit", ".cart2mail", function(event)
{
	var frm = $(this);
	event.preventDefault();
    frm.attr("action", "assets/singa4real/cart2mail.php");
    frm.attr("method", "POST");

    // Disable submit button, if needed
        frm.find("button[type=submit]").attr("disabled", true);

    $.ajax({
        type: frm.attr("method"),
        url: frm.attr("action"),
        data: frm.serialize(),
        success: function (data) {
            if (data.success) {

                frm.find("div .alert-danger").attr("hidden", "hidden");
                frm.find("div .alert-success").removeAttr("hidden");
                frm.trigger("reset");
                
            } else {
                frm.find("div .alert-success").attr("hidden", "hidden");
                frm.find("div .alert-danger").removeAttr("hidden");
                console.error("Cart to Mail: An error occured. " + data.message);
            }

            // Enable submit button
            frm.find("button[type=submit]").attr("disabled", false);
        },
        error: function (data) {
            console.error("Cart to Mail: something went wrong somewhere.");

            frm.find("div .alert-success").attr("hidden", "hidden");
            frm.find("div .alert-danger").removeAttr("hidden");

            // Enable submit button
            frm.find("button[type=submit]").attr("disabled", false);
        },
    });
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var cart = [];
        $(function () {
            if (localStorage.cart)
            {
                cart = JSON.parse(window.atob(localStorage.cart));
                showCart();
            }
        });

        function addToCart(pprice,pname,pqty,pid,pvat,pshipping) {
            var price = pprice.replace(/<strong>/gi, "");
			var price = price.replace(/<b>/gi, "");
            var price = price.replace(/,/gi, "");
            var vat = pvat;
		   var shipping = pshipping;
			var vat = parseFloat(vat);
           var shipping = parseFloat(shipping);
		   var price = parseFloat(price);
            var name = pname.replace(/(<([^>]+)>)/ig, "");
			var proid = pid;
            var qty = pqty.replace(/\D/g, '');
			

            // update qty if product is already present
            for (var i in cart) {
                if(cart[i].ProID == proid)
                {
                    cart[i].Qty = parseFloat(cart[i].Qty) + parseFloat(qty);
                    showCart();
                    saveCart();
                    return;
                }
            }
            // create JavaScript Object
            var item = {ProID: proid,  Vat: vat, Shipping: shipping, Product: name,  Price: price, Qty: qty }; 
            cart.push(item);
            saveCart();
            showCart();
			
        }

        function deleteItem(index){
            cart.splice(index,1); // delete item at index
            showCart();
            saveCart();
          
        }

        function saveCart() {
            if ( window.localStorage)
            {
                localStorage.cart = window.btoa(JSON.stringify(cart));
				
              
            }
        }

        function showCart() {
            $(".cartBody").empty();
          $(".cart_pinfo").empty();
		  var subTotal = 0;
          var grandTotal = 0;
		  var grandVat = 0;
		  var grandShipping = 0;
          var pi = 1;
          var ci = 0;
		  var vi = 0;
		  var si = 0;
            for (var i in cart) {
                var item = cart[i];
				var str = item.Price;
								
if (str == Math.floor(str)) {
var utotal = item.Qty * item.Price;
var utext = utotal+ ".00";
var stext = item.Price+ ".00";
} else {
var utotal = item.Qty * item.Price;
var utext = utotal;
var stext = item.Price;
}
if($('.enablevat').val() == 1){
var vatinv = item.Vat;
var vatin = item.Vat * item.Qty;
}else{
var vatin = parseFloat("0.00");
var vatinv = parseFloat("0.00");
}
var row = "<tr><td class='p-2'><div class='media align-items-center'><div class='media-body'><a href='#' class='d-block text-dark'><b>" + item.Product + "</b></a></div></div></td><td class='text-left font-weight-semibold align-middle p-2'>" + $('.csymbol').val() + numberWithCommas(item.Price.toFixed(2)) + "</td><td class='align-middle p-2'>" + item.Qty + "</td><td class='text-right font-weight-semibold align-middle p-2'>" + $('.csymbol').val() + numberWithCommas(utotal.toFixed(2)) + "</td><td class='text-center align-middle px-0'><a href='#remove' class='shop-tooltip close float-none text-primary' onclick='deleteItem(" + i + ")'>×</a></td></tr>";
if(vi == 0){
	vi = "";
	}else{
	 vi++;
	}
              var shp = item.Shipping * item.Qty;
			  var paypal = "<input type='hidden' name='item_name_"+ pi +"' value='" + item.Product + "'><input type='hidden' name='quantity_"+ pi +"' value='" + item.Qty + "'><input name='tax_"+ pi +"' type='hidden' value='" + numberWithCommas(vatinv) + "'><input type='hidden' name='unit_sum_amount_" + pi + "' value='" + utext + "'><input type='hidden' name='amount_" + pi + "' value='" + stext + "'>";
			  var carttoserver = "<input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "item_name"+ "]" +"'  value='" + item.Product + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "quantity"+ "]" +"' value='" + item.Qty + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "samount"+ "]" +"' value='" + utext + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "amount"+ "]" +"' value='" + stext + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "Vat"+ "]" +"'  value='" + vatin + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "Shipping"+ "]" +"' value='" + shp + "'>";
			  var cart2maildata = "<input type='hidden' name='Item_name_"+ pi +"'  value='" + item.Product + "'><input type='hidden' name='Qty_"+ pi +"' value='" + item.Qty + "'><input type='hidden' name='Unit_price_"+ pi +"' value='" + $('.csymbol').val() + numberWithCommas(utext.toFixed(2)) + "'><input type='hidden' name='Sum_total_"+ pi +"' value='" + $('.csymbol').val() + numberWithCommas(stext.toFixed(2)) + "'><input type='hidden' name='Vat_charge_"+ pi +"'  value='" + $('.csymbol').val() + numberWithCommas(vatin.toFixed(2)) + "'><input type='hidden' name='Shipping_cost_"+ pi +"' value='" + $('.csymbol').val() + numberWithCommas(shp.toFixed(2)) + "'>";
                $(".cartBody").append(row);
              $(".cart_paypal").append(paypal);
			  $(".cart_server").append(carttoserver);
			  $(".cart_cart2mail").append(cart2maildata);
              subTotal += item.Qty * item.Price;
			  grandVat += item.Vat * item.Qty;
			  grandShipping += item.Shipping * item.Qty;
			  si +=  parseFloat(item.Qty);
              pi++;
              ci++
            }
			if($('.smax').val() > 0 && grandShipping >= parseFloat($('.smax').val())){
			grandShipping = $('.smax').val();
			$('.paypal_shipping').val($('.smax').val());
			}else if($('.sfmax').val() > 0 && subTotal >= parseFloat($('.sfmax').val())){
            grandShipping = 0.00;
			$('.paypal_shipping').val(grandShipping);
			}else{
            grandShipping = grandShipping;
			$('.paypal_shipping').val(grandShipping);
			}
			if($('.enablshipping').val() == 2){
			grandShipping = 0.00;
			$('.paypal_shipping').val(grandShipping);	
			}
			if($('.taxu').val() == 1){grandTotal = subTotal + grandVat;}else{grandTotal = subTotal};
          $(".tp").html(numberWithCommas(subTotal.toFixed(2)));
		  $(".vp").html(numberWithCommas(grandVat.toFixed(2)));
		  $(".sp").html(numberWithCommas(grandShipping.toFixed(2)));
		  $(".gtp").html(numberWithCommas(grandTotal.toFixed(2)));
		  $(".ctotal").val(grandTotal.toFixed(2));
		  $(".mctotal").val( $('.csymbol').val() + numberWithCommas(grandTotal.toFixed(2)));
          $(".scount").html(si);
          
        }
$(".add-to-cart").click(function(){
var pprice = $(this).closest(".cart_item").find(".product_price").html();
var pname = $(this).closest(".cart_item").find(".product_name").html();
var pqty = $(this).closest(".cart_item").find(".iqty").val();
var pid = $(this).closest(".cart_item").find(".product_id").html();
var pvat = $(this).closest(".cart_item").find(".product_vat").html();
var pshipping = $(this).closest(".cart_item").find(".product_shipping").html();
addToCart(pprice,pname,pqty,pid,pvat,pshipping);
}); 
    
    
    $(document).ready(function() {
$('.add-to-cart').on('click', function () {
        var cart = $('.my-cart-icon');
        var imgtodrag = $(this).closest(".cart_item").find("img").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
            }, 1000, 'easeInOutExpo');
            
            

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                $(this).detach()
            });
        }
    });  		
function overlayon() {
  $("#overlay").show();
}
function overlayoff() {
  $("#overlay").hide();
} 		

$(document).on("click", '.showfimg', function(event){
var cimg = $(this).attr("src");
var mimg = $(".fleximage");
mimg.attr("src", cimg);
overlayon();
});
$(document).on("click", '#overlay', function(event){
overlayoff();
});
			$('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
            $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');
			});
        });