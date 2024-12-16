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
    const toc = document.querySelector("#toc-container"); // Table of contents container
    const navLinks = toc.querySelectorAll(".nav-link");  // All TOC links
    
    // Monitor changes to active classes on scroll
    toc.addEventListener("activate.bs.scrollspy", function () {
      navLinks.forEach((link) => {
        const parentLi = link.parentElement; // Get the parent <li> of the link
  
        // Check if the current link has the active class (meaning it's visible in the viewport)
        if (link.classList.contains("active")) {
          // Expand any nested nav (if the link is active)
          const nestedNav = parentLi.querySelector(".nav");
          if (nestedNav) {
            nestedNav.classList.add("show"); // Expand the active nested TOC
          }
  
          // Expand all ancestor navs to ensure the parent items are also open
          let parent = parentLi.closest(".nav");
          while (parent && parent !== toc) {
            parent.classList.add("show"); // Expand any ancestor .nav
            parent = parent.closest(".nav");
          }
        } else {
          // Collapse non-active nested navs
          const nestedNav = parentLi.querySelector(".nav");
          if (nestedNav && !nestedNav.querySelector(".nav-link.active")) {
            nestedNav.classList.remove("show"); // Collapse if no active child
          }
        }
      });
    });
  });
  
  
  
  