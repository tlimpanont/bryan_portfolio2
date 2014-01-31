(function(window, _, Backbone, jQuery) {
	
	Backbone.View.prototype.eventAggregator = _.extend({}, Backbone.Events);
	AboutPage = Page.extend({
		initialize: function() {
			var self = this;
			Page.prototype.initialize.call(this, {});
			
			this.$el.css({ "background-color" : this.$el.find(".swiper-slide:first").data("bgcolor") });

			pulsate();
			
			function pulsate() {
				self.$el.find(".swiper-slide img.scroll_down_arrow").animate({
				"opacity" : 0
				}, 1000).animate({
					"opacity": 1
				}, 1000, pulsate);
			}
			
			jQuery(window).on("mousewheel", jQuery.proxy(this, "scrollHandler"));
			
			
		},
		positionAssets: function(e) {
		 	
		 	this.$el.find(".swiper-slide .waypoint").each(function(index, slide) {
		 		var $slide = jQuery(slide);
		 		$slide.position({
			 		at: "center center",
			 		my: "center center+"+0/2,
			 		of: $slide.parent(),
			 		collision: "none"
	 			});
		 	} );


		 	this.$el.find(".swiper-slide .about_main_title").each(function(index, slide) {
		 		var $slide = jQuery(slide);
		 		
		 		$slide.css({
			 		"margin" : 0
	 			});
	 			
		 		$slide.position({
			 		at: "center center",
			 		my: "center center-"+jQuery(this).outerHeight(),
			 		of: $slide.parent().find(".waypoint"),
			 		collision: "none"
	 			});
	 			$slide.css({
			 		"margin" : jQuery(this).data("margin")
	 			});
		 	} );

	 		this.$el.find(".swiper-slide .about_sub_title").each(function(index, slide) {
		 		var $slide = jQuery(slide);
		 		$slide.css({
			 		"margin" : 0
	 			});

		 		$slide.position({
			 		at: "right bottom",
			 		my: "right bottom",
			 		of: $slide.parent().find(".about_main_title"),
			 		collision: "none"
	 			});
	 			
	 			$slide.css({
			 		"margin" : jQuery(this).data("margin")
	 			});
		 	});

		 	this.$el.find(".swiper-slide  img.scroll_down_arrow").position({
				my: "center bottom",
				at: "center bottom-10",
				of: this.$el.find(".swiper-slide  img.scroll_down_arrow").parent(),
				collision: "none"
			});
			
			this.$el.find("a.go_projects_btn").position({
		       	my: "center center",
		        at: "center-"+((this.$el.width() / 2)-(this.$el.find("a.go_projects_btn").outerWidth() / 2) - 20)+" center+0",
		        of: this.$el,
		        collision: "none"
	      	});
	      	
	      	this.initMouseOvers();
		},
		scrollHandler: function(e, delta, deltaX, deltaY) {
			this.onSlideChangeEnd.call(this, aboutSwiper.activeSlide());
		},
		onSlideChangeEnd: function(activeSlide) {
			var $activeSlide = jQuery(activeSlide);
			this.$el.stop(true, false).animate({
				"background-color" : $activeSlide.data("bgcolor")
			});

			jQuery("nav").find("img.leftnav_logo").stop(true, false).animate({
				"background-color" : $activeSlide.data("bgcolor")
			});
		}
	});
})(window, _, Backbone, jQuery);
