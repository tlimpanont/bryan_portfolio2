(function(window, _, Backbone, jQuery) {
	Backbone.View.prototype.eventAggregator = _.extend({}, Backbone.Events);
	HomePage = Page.extend({
		initialize: function() {
			Page.prototype.initialize.call(this, {});
		},
		positionAssets: function() {
		    
		 jQuery("img#home_logo").position({
	        at: "center top",
	        my: "center top+50",
	        of: this.$el
	      });
          
          // right center of the window viewport
	      jQuery("a.next_slide").position({
	        at: "right-"+jQuery("a.next_slide").outerWidth()+" center+"+jQuery("a.next_slide img").outerHeight() / 2,
	        my: "center center",
	        of: this.$el
	      });
		}
	});
})(window, _, Backbone, jQuery);
