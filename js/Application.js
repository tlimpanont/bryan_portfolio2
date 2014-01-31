(function (window, _, Backbone, jQuery) {

    window.onhashchange = function(e) {
        window.oldURL = e.oldURL; 
        window.newURL = e.newURL; 
        window.oldHash = oldURL.split("#")[1];
        window.newHash = newURL.split("#")[1];
    };

    window.allAssetsLoaded = function (complete_event) { // allAssetsLoaded function
          
        mainSwiper = new Swiper('#mainSwiper', {

            mousewheelControl: false,
            onSlideChangeStart: function () {
                aboutSwiper.swipeTo(0);
            },
            onSlideChangeEnd: function () {
               
                jQuery("nav").find("img.nav_logo").stop(true, false).animate({
                    "background-color" : jQuery("body").css("background-color")
                });

                switch (mainSwiper.activeIndex) {
                    case 0:
						window.location.hash = '/';
                        // no need keyboard functionalities when we on this page
                        jQuery("body").off("keyup", jQuery.proxy(projectsPage, "keyboardHandler"));
						jQuery("nav").fadeOut();
                        break;
                    case 1:
                        window.location.hash = '#projects';
                        // add left navigation on the current page slide
                        projectsPage.addLeftNavigation();
						
                        break;
                    case 2:
                        window.location.hash = '#about';
                        // no need keyboard functionalities when we on this page
                        jQuery("body").off("keyup", jQuery.proxy(projectsPage, "keyboardHandler"));
                        // add topNavigation because this page needs it
						//alert("slide to ABOUT");
                        aboutPage.addLeftNavigation();
						
                        break;
                }
            }
        });
       
        aboutSwiper = new Swiper('#aboutSwiper', {
            mode: 'vertical',
            mousewheelControl: true,
            onSlideChangeEnd: function () {
                aboutPage.onSlideChangeEnd.call(aboutPage, aboutSwiper.activeSlide());
            }
        });
        
        projectPageSwiper = new Swiper("#projectPageSwiper", {
            mode: 'vertical',
            mousewheelControl: true
            /* scrollContainer: true */
        });

        // swipe through all the project items (iMac monitor)
        projectsSwiper = new Swiper('#projectsSwiper', {
            mode: 'horizontal',
            mousewheelControl: false,
            onSlideChangeEnd: function () {
            
                // we on the instruction mode, no need navigation for project items
                if (parseInt(projectsSwiper.activeIndex) == 1) {
                    jQuery(".previous_project").hide();
                    jQuery(".next_project").hide();
                }
                // show navigation when we passed the instruction mode
                if (parseInt(projectsSwiper.activeIndex) > 1) {
                    jQuery(".previous_project").fadeIn("fast");
                    jQuery(".next_project").fadeIn("fast");
                }
                // last project no need to show next project button
                 (projectsSwiper.activeIndex >= projectsSwiper.slides.length - 1) ? jQuery(".next_project").fadeOut("fast") :
		       																        jQuery(".next_project").fadeIn("fast");
            }
        });


        AppRouter = Backbone.Router.extend({
            routes: {
                "": "home",
                "projects": "projects",
                "about": "about",
                "project/:project_id" : "project_detail"
            }
        });

        // setting up pages
        var homePage = new HomePage({ el: jQuery("#page-home") });
        var projectsPage = new ProjectsPage({ el: jQuery("#page-projects") });
        var aboutPage = new AboutPage({ el: jQuery("#page-about") });
        var projectDetailPage = new ProjectDetailPage({el: jQuery("#page-project-detail")});
        // end setting up pages 


        // Initiate the router
        AppRouter = new AppRouter();

        AppRouter.on("route:home", function () {
            projectDetailPage.reset();
            mainSwiper.swipeTo(0);
        });

        AppRouter.on("route:projects", function () {
			jQuery("nav").find("img.nav_logo").stop(true, false).animate({
				"background-color" : jQuery("body").css("background-color")
			});

          	projectDetailPage.reset();
          	
            // activeIndex = 0 means we're on instruction page
            if (parseInt(projectsSwiper.activeIndex) == 0) {
                jQuery("a.next_project").hide(); 
                jQuery("a.previous_project").hide();
               
            }
            else // when we bypass the instruction page
            {
                jQuery("body").on("keyup", jQuery.proxy(projectsPage, "keyboardHandler")); 
            }

            
            jQuery("a.ok_btn").click(function (e) {
                e.preventDefault();
                // keyboard is now available to user to navigate through project items
                jQuery("body").on("keyup", jQuery.proxy(projectsPage, "keyboardHandler"));
                // after click the OK button, go to the first project item
                projectsSwiper.swipeTo(1, 500, true);
            });
            
            mainSwiper.swipeTo(1);
        });

       
                
        AppRouter.on("route:about", function() {
            // switch back to about page when we started from the project detail page
			if(jQuery("#mainSwiper").is(":hidden"))
			{
				projectDetailPage.reset(function() {
					mainSwiper.swipeTo(2);
				});
			}
			else
			{
				// project detail page is not set
				mainSwiper.swipeTo(2);
			}
        });
        
        AppRouter.on("route:project_detail", function (project_id) {
			 jQuery(window).off("mousewheel", jQuery.proxy(aboutPage, "scrollHandler"));
        	 projectDetailPage.addLeftNavigation();
        	 projectDetailPage.showProjectTemplate(project_id);			
        });

        jQuery(document).click(function(e) {
            var x = e.pageX - $(e.target).offset().left;
        });

        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start();



    } // ended allAssetsLoaded function

})(window, _, Backbone, jQuery);