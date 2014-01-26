(function (window, _, Backbone, jQuery) {
    Backbone.View.prototype.eventAggregator = _.extend({}, Backbone.Events);
    ProjectsPage = Page.extend({
        initialize: function () {
            var self = this;
            Page.prototype.initialize.call(this, {});
            jQuery(".next_project").on("click", jQuery.proxy(this, "nextProject"));
            jQuery(".previous_project").on("click", jQuery.proxy(this, "previousProject") );
        },
        nextProject: function(e) {
	        try {e.preventDefault(); } catch(e) {}
            var index = projectsSwiper.activeIndex + 1;
            projectsSwiper.swipeTo(index, 500, true);
        },
        previousProject: function(e) {
	      	 try {e.preventDefault(); } catch(e) {}
             if (parseInt(projectsSwiper.activeIndex) > 1) {
                var index = projectsSwiper.activeIndex - 1;
                projectsSwiper.swipeTo(index, 500, true);
            } 
        },
        positionAssets: function () {
            // right center of screen
            this.$el.find("a.next_project img").position({
                my: "center top",
                at: "center+" + this.$el.find("a.next_project img").outerWidth() + " top+20",
                of: this.$el.find("#projectsSwiper.swiper-container"),
                collision: "none"
            });
            // left center of screen
            this.$el.find("a.previous_project img").position({
                my: "center top",
                at: "center-" + this.$el.find("a.previous_project img").outerWidth() + " top+20",
                of: this.$el.find("#projectsSwiper.swiper-container"),
                collision: "none"
            });
            // center of the page, padding-top in style.css
            this.$el.find(".macmonitor.xycenter").position({
                at: "center top",
                my: "center top",
                of: this.$el
            });
            
            //left center of the projectItemsContainer
            this.$el.find("a.go_home_btn").position({
                my: "center center",
                at: "center-" + ((this.$el.width() / 2) - (this.$el.find("a.go_home_btn").outerWidth() / 2) - 20) + " center+0",
                of: this.$el,
                collision: "none"
            });
            
             //right center of the projectItemsContainer
            this.$el.find("a.go_about_btn").position({
                my: "center center",
                at: "center+" + ((this.$el.width() / 2) - (this.$el.find("a.go_about_btn").outerWidth() / 2) - 20) + " center+0",
                of: this.$el,
                collision: "none"
            });
            
            // the screen background of the iMac monitor
            jQuery(".projectItemsContainer").position({
                my: "center top",
                at: "center top",
                of: this.$el
            });

         
        },
        keyboardHandler: function (e) {
            if (e.keyCode == 37) { // left
               this.previousProject();
            }
            else if (e.keyCode == 39) { // right
               this.nextProject();
            }
        }
    });
})(window, _, Backbone, jQuery);
