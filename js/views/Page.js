(function (window, _, Backbone, jQuery) {
    Backbone.View.prototype.eventAggregator = _.extend({}, Backbone.Events);
    Page = Backbone.View.extend({
        initialize: function () {
            this.positionAssets();
            jQuery(window).on("resize", jQuery.proxy(this, "positionAssets"));
        },
        positionAssets: function () {
        	this.positionAssets();
        },
        addLeftNavigation: function(element) {
          
            jQuery("nav").remove();

            if(element == undefined)
                   element = "#"+this.$el.attr("id");

            jQuery(element)
            .prepend(jQuery("#leftNavigationTemplate").html()); 

            jQuery("nav .leftnav_vertical_bar").height(
                    jQuery(window).height() -  jQuery("nav .leftnav_vertical_bar").height()
            );

            jQuery("nav").find("ul li a").removeClass("active");
            jQuery("nav").find("ul li a[href='" + window.location.hash.toString() + "']").addClass("active");

            jQuery("nav").show();
          
        },
        addRightNavigation: function() {

        },
        addTopNavigation: function () {

            if (jQuery("nav").size() <= 0)
                jQuery("body").prepend(jQuery("#topNavigationTemplate").html()); jQuery("nav").fadeIn();

            this.positionLeftRightNavBar();
            jQuery("nav").find("ul li a").removeClass("active");
            jQuery("nav").find("ul li a[href='" + window.location.hash.toString() + "']").addClass("active");
                       	
            jQuery(window).on("resize", jQuery.proxy(this, "positionLeftRightNavBar"));
        },
        positionLeftRightNavBar: function () {
            var $left_bar = jQuery("nav").find(".left_bar");
            var $right_bar = jQuery("nav").find(".right_bar");
            var $nav_logo = jQuery("nav").find("img.nav_logo");

            $left_bar.css({
                width: (jQuery(window).width() - $nav_logo.width()) / 2,
                left: 0
            });

            $right_bar.css({
                width: ((jQuery(window).width() - $nav_logo.width()) / 2),
                left: ((jQuery(window).width() - $nav_logo.width()) / 2) + $nav_logo.width()
            });

            $nav_logo.position({
                at: "right top",
                my: "left top",
                of: $left_bar
            });
        },
        initMouseOvers: function() {
	        var initSrc = "";
	        jQuery(".nav_btn").hover(
	        	function() {
		        	var src = jQuery(this).find("img").attr("src");
		        	initSrc = src.match(/[^\/]+(?!\/)$/)[0];
		        	jQuery(this).find("img").attr("src", "images/mo_"+initSrc);
	        	},
	        	function() {
		        	jQuery(this).find("img").attr("src", "images/"+initSrc);
	        	}
	        );
        }
    });
})(window, _, Backbone, jQuery);
