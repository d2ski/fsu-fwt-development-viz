let intersectionObserver;

const initIntersectionObserver = function () {
  if (intersectionObserver) return;

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const eventName = entry.isIntersecting ? "enterViewport" : "exitViewport";
      entry.target.dispatchEvent(new CustomEvent(eventName));
    });
  });
};

export function viewport(node) {
  initIntersectionObserver();

  intersectionObserver.observe(node);

  return {
    destroy() {
      intersectionObserver.unobserve(node);
    },
  };
}
