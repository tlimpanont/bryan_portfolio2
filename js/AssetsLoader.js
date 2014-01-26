(function (window, _, Backbone, jQuery) {
    // DOM READY
    jQuery(function () {
        
        // show the loader on the center of the screen before it loads assets
        jQuery(".loader_square").fadeIn().position({
            at: "center center",
            my: "center center",
            of: jQuery(window)
        });
        
        // to position the assets correctly, all these assets need to be loaded completely
        manifest = [
                { src: "backgrounds/plaat_home.png" },
                { src: "about_head.png" },
                { src: "arrow_right.png" },
                { src: "go_about.png" },
                { src: "go_projects.png" },
                { src: "homepage_visual.png" },
                { src: "mac_monitor.png" },
                { src: "nav_logo.png" },
                { src: "next_project.png" },
                { src: "online_heart.png" },
                { src: "previous_project.png" },
                { src: "scroll_down_arrow.png" },
                { src: "project_p1_background_.png" },
                { src: "project_p1_background_offset.jpg" },
                { src: "project_p1_square_2.png" },
                { src: "loader_square.png" },
                // { src: "backgrounds/batman_arkham_origins_12-wallpaper-1680x1050.jpg" },
                // { src: "backgrounds/lilly_flowers-wallpaper-3840x2160.jpg" },
                // { src: "backgrounds/snarling_tiger-wallpaper-3200x2400.jpg" },
                // { src: "backgrounds/water_drops_macro_4-wallpaper-3840x1080.jpg" },
                // { src: "backgrounds/salamander_artwork-wallpaper-2560x1440.jpg" },
                // { src: "backgrounds/easter_bg.jpg"}
            ];

        preload = new createjs.LoadQueue(true, "images/");

        preload.addEventListener("progress", handleProgress);
        preload.addEventListener("complete", handleComplete);
        preload.addEventListener("fileload", handleFileLoad);
        preload.loadManifest(manifest);
        
        // append the current loading percentage text to the loader square
        function handleProgress(event) {
            jQuery(".loader_square span").html(Math.ceil(event.loaded * 100) + "%");
        }
        // what we can do after each file is loaded
        function handleFileLoad(event) {
            var image = event.result;
            var w = image.width;
            var h = image.height;
        }
        // remove loading square and setting  up all the swipe slides
        function handleComplete(complete_event) {
          
            jQuery(".loader_square").slideToggle(function () {
                jQuery(this).remove();
                
                jQuery("#mainSwiper").fadeIn(500);
                
                // trigger allAssetsLoaded event this event is subscribed by the Application.js file
                window.allAssetsLoaded.call(this, complete_event);
                
            });
            
        }

    }); // END DOM READY

})(window, _, Backbone, jQuery);