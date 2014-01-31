(function(window, _, Backbone, jQuery) {
	Backbone.View.prototype.eventAggregator = _.extend({}, Backbone.Events);
	HomePage = Page.extend({
		initialize: function() {
			Page.prototype.initialize.call(this, {});
		},
		positionAssets: function() {
		    
			jQuery("img#home_logo").css("position", "absolute")
			.position({
				at: "center top",
				my: "center top+50",
				of: this.$el
			});

	       	var $top_bar = this.$el.find(".top_bar");
            var $bottom_bar = this.$el.find(".bottom_bar");
            var $nav_logo = this.$el.find("img.home_next_section");

        
			$top_bar.css({
				height: ($(window).height() - $nav_logo.height()  ) / 2,
				width: $nav_logo.width(),
			    background: "white"
			}).position({
				at: "right-"+$nav_logo.width()+" top",
				my: "left top",
				of: this.$el,
				collision: "none"
			});

			$bottom_bar.css({
		       	height: ($(window).height() - $nav_logo.height()  ) / 2,
		        width: $nav_logo.width(),
		        background: "white"
           }).position({
           		at: "right bottom",
				my: "right bottom",
				of: this.$el,
				collision: "none"
           });

			 
			$nav_logo.position({
				at: "right-"+$nav_logo.width()+" center",
				my: "left center",
				of: this.$el,
				collision: "none"
			});
		}
	});
})(window, _, Backbone, jQuery);
