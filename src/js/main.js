(function ($) {
  "use strict";

  var cfg = {
      scrollDuration: 800,
    },
    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  /* Preloader
   * -------------------------------------------------- */
  var ssPreloader = function () {
    $("html").addClass("ss-preload");

    $WIN.on("load", function () {
      $("#loader").fadeOut("slow", function () {
        $("#preloader").delay(300).fadeOut("slow");
      });

      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };

  /* Mobile Menu
   * ---------------------------------------------------- */
  var ssMobileMenu = function () {
    var toggleButton = $(".menu-toggle"),
      nav = $(".header__nav-wrap"),
      body = $("body");

    toggleButton.on("click", function (event) {
      event.preventDefault();

      toggleButton.toggleClass("is-clicked");
      body.toggleClass("noscroll");
      nav.slideToggle();
    });

    if (toggleButton.is(":visible")) nav.addClass("mobile");

    $WIN.on("resize", function () {
      if (toggleButton.is(":visible")) nav.addClass("mobile");
      else nav.removeClass("mobile");
    });

    nav.find("a").on("click", function () {
      if (nav.hasClass("mobile")) {
        toggleButton.toggleClass("is-clicked");
        body.toggleClass("noscroll");
        nav.slideToggle();
      }
    });
  };

  /* Highlight the current section in the navigation bar
   * ------------------------------------------------------ */
  var ssWaypoints = function () {
    var sections = $(".target-section"),
      navigation_links = $(".header__nav li a");

    sections.waypoint({
      handler: function (direction) {
        var active_section;

        active_section = $("section#" + this.element.id);
        console.log(this.element.id);

        if (direction === "up")
          active_section = active_section.prevAll(".target-section").first();

        var active_link = $(
          '.header__nav li a[href="#' + active_section.attr("id") + '"]'
        );

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },

      offset: "25%",
    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var ssSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing",
          function () {
            window.location.hash = target;
          }
        );
    });
  };

  /* Back to Top
   * ------------------------------------------------------ */
  var ssBackToTop = function () {
    var pxShow = 500, // height on which the button will show
      fadeInTime = 400, // how slow/fast you want the button to show
      fadeOutTime = 400, // how slow/fast you want the button to hide
      scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
      goTopButton = $(".go-top");

    // Show or hide the sticky footer button
    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMobileMenu();
    ssWaypoints();
    ssSmoothScroll();
    ssBackToTop();
  })();
})(jQuery);
