document.addEventListener("DOMContentLoaded", function() {
  const init = () => {
    const marquees = document.querySelectorAll('[wb-data="marquee"]');
    if (!marquees.length) {
      return;
    }

    marquees.forEach((marquee) => {
      const duration = parseInt(marquee.getAttribute("duration"), 10) || 5;
      const marqueeContent = marquee.firstChild;
      if (!marqueeContent) {
        return;
      }

      const marqueeContentClone = marqueeContent.cloneNode(true);
      marquee.append(marqueeContentClone);

      let tween;
      let isHovering = false; // Add a flag to track hover state

      const playMarquee = () => {
        let progress = tween ? tween.progress() : 0;
        tween && tween.progress(0).kill();
        const width = parseInt(getComputedStyle(marqueeContent).getPropertyValue("width"), 10);
        const gap = parseInt(getComputedStyle(marqueeContent).getPropertyValue("column-gap"), 10);
        const distanceToTranslate = -1 * (gap + width);

        tween = gsap.fromTo(
          marquee.children,
          { x: 0 },
          {
            x: distanceToTranslate,
            duration,
            ease: "none",
            repeat: -1
          }
        );
        tween.progress(progress);

        if (isHovering) {
          tween.pause(); // Pause the animation if hovering
        }
      };

      playMarquee();

      function debounce(func) {
        var timer;
        return function (event) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func();
          }, 500, event);
        };
      }

      window.addEventListener("resize", debounce(playMarquee));

      // Add event listeners for hover
      marquee.addEventListener("mouseenter", () => {
        isHovering = true;
        if (tween) {
          tween.pause();
        }
      });

      marquee.addEventListener("mouseleave", () => {
        isHovering = false;
        if (tween) {
          tween.resume(); // Resume the animation when hovering out
        }
      });
    });
  };

  init();
});
