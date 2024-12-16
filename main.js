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
    // Get all collapsible elements
    const collapsibles = document.querySelectorAll("#navbar-example3 .collapse");
    console.log()
  
    // Helper function to toggle the state of a specific collapsible without affecting others
    function toggleCollapsible(activeElementId) {
      collapsibles.forEach((collapse) => {
        // Check if this collapse matches the active element
        if (collapse.id === activeElementId) {
          if (!collapse.classList.contains("show")) {
            // Open the active collapsible if it's not already open
            collapse.classList.add("show");
          }
        }
      });
    }
  
    // Add event listener for Bootstrap's ScrollSpy activate event
    document.getElementById("viewer-container").addEventListener("activate.bs.scrollspy", (e) => {
      const activeLink = document.querySelector("#navbar-example3 .nav-link.active");
  
      if (activeLink) {
        // Get the data-bs-target or href for the active link
        const targetId = activeLink.getAttribute("href")?.replace("#", "");
  
        if (targetId) {
          toggleCollapsible(`${targetId}-collapse`);
        }
      }
    });
  });
  
  
  
  
  