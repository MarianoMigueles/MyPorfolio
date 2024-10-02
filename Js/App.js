window.addEventListener('wheel', function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
  
      const container = document.querySelector('main');

      let currentScroll = container.scrollLeft;
      let targetScroll = currentScroll + e.deltaY;
  
      const smoothScroll = () => {
        currentScroll += (targetScroll - currentScroll) * 0.2;
        container.scrollLeft = currentScroll;
  
        if (Math.abs(targetScroll - currentScroll) > 1) {
          requestAnimationFrame(smoothScroll);
        }
      };
  
      smoothScroll();
    }
});
  