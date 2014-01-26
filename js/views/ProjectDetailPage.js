(function (window, _, Backbone, jQuery) {
    Backbone.View.prototype.eventAggregator = _.extend({}, Backbone.Events);
    ProjectDetailPage = Page.extend({
        initialize: function () {
            var self = this;
            Page.prototype.initialize.call(this, {});
        },
        positionAssets: function () {

        },
        showProjectTemplate: function(project_id) {
          	jQuery("#mainSwiper").slideUp(function() {
	      		var parsedHTML = jQuery.parseHTML(jQuery("#projectDetailPagesTemplate").html());
	          	var selectedTemplate = jQuery(parsedHTML).filter(function() {
		 	        	return jQuery(this).attr("id") == project_id;
	        	});

                jQuery("nav").find("img.nav_logo").stop(true, false).animate({
                    "background-color" : selectedTemplate.data("bgcolor")
                });
	        	
	            jQuery("body").prepend("<center class='project_item_container' style='background-color:"+selectedTemplate.data("bgcolor")+"'>"+selectedTemplate.get(0).outerHTML+"</center>");
	                         
          	});
        	
           
            
        },
        addTopNavigation: function() {
	        Page.prototype.addTopNavigation.call(this, {});
	        jQuery("nav").find("ul li a[href='" + "#projects" + "']").addClass("active");
            jQuery(".left_bar").html('');
            jQuery(".left_bar").html('<a class="back_to_project_overview" href="#projects"><img src="images/back_arrow.png" alt="back arrow" />back to project overview</a>');

        },
        addLeftNavigation: function() {
            Page.prototype.addLeftNavigation.call(this, "body");
            jQuery("nav").find("ul li a[href='" + "#projects" + "']").addClass("active");
            jQuery("nav ul").prepend('<li><a class="back_to_project_overview" href="#/projects"><img src="images/back_arrow.png" alt="back arrow" />back</a></li>');
        },
        reset: function(callback) {
        	
        	jQuery("center.project_item_container").slideUp(function() {
	        	jQuery(this).remove();
	        	jQuery("nav ul li a.back_to_project_overview").parent().remove();
	        	jQuery("#mainSwiper").fadeIn(callback);
        	});
        	
        }
    });
})(window, _, Backbone, jQuery);
