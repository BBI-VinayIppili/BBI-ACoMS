// Toggle TOC Collapse
document.getElementById("collapse-toc-btn").addEventListener("click", function () {
  const tocContainer = document.getElementById("toc-container");
  tocContainer.classList.toggle("collapsed");
});

// Toggle Comments Collapse
document.getElementById("collapse-comments-btn").addEventListener("click", function () {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.classList.toggle("collapsed");
});


// for arrow direction change
document.addEventListener('DOMContentLoaded', function () {
  // Get references to both toggle icons
  const collapseTocBtn = document.getElementById('collapse-toc-btn');
  const collapseCommentsBtn = document.getElementById('collapse-comments-btn');

  // Function to toggle icons
  function toggleIcon(button) {
    if (button.classList.contains('fa-angles-left')) {
      button.classList.remove('fa-angles-left');
      button.classList.add('fa-angles-right');
    } else {
      button.classList.remove('fa-angles-right');
      button.classList.add('fa-angles-left');
    }
  }

  // Add event listeners to both buttons
  collapseTocBtn.addEventListener('click', function () {
    toggleIcon(collapseTocBtn);
  });

  collapseCommentsBtn.addEventListener('click', function () {
    toggleIcon(collapseCommentsBtn);
  });

});



document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("[id]"); // Select all elements with an 'id' attribute
  const sidebarLinks = document.querySelectorAll("#toc-container .nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = document.querySelector(`#toc-container .nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
          // Highlight the active link
          sidebarLinks.forEach((link) => link.classList.remove("active"));
          if (link) { // Check if link exists
            link.classList.add("active");
          }

          // Expand the parent collapse if the link belongs to a sub-item
          const parentCollapse = link ? link.closest(".collapse") : null; // Use link safely
          if (parentCollapse) {
            parentCollapse.classList.add("show");
            const parentToggle = document.querySelector(`[href="#${parentCollapse.id}"] i`);
            if (parentToggle) { // Check if parentToggle is not null
              parentToggle.classList.replace("fa-angle-right", "fa-angle-down");
            }
          }
        } else {
          // Collapse the parent collapse when the section is out of view
          const parentCollapse = link ? link.closest(".collapse") : null; // Use link safely
          if (parentCollapse) {
            parentCollapse.classList.remove("show");
            const parentToggle = document.querySelector(`[href="#${parentCollapse.id}"] i`);
            if (parentToggle) { // Check if parentToggle is not null
              parentToggle.classList.replace("fa-angle-down", "fa-angle-right");
            }
          }
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.9 }
  );

  // Use map to observe each section dynamically and return an array of observer operations
  Array.from(sections).map((section) => observer.observe(section));
});
