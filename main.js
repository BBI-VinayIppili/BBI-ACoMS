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
    // Get all the links in the Table of Contents
    const tocLinks = document.querySelectorAll('.nav-link');
    
    // Iterate through each link
    tocLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        // Prevent the default anchor behavior
        e.preventDefault();
  
        // Close all collapses
        document.querySelectorAll('.collapse').forEach(collapse => {
          collapse.classList.remove('show');
        });
  
        // Get the corresponding collapse target and toggle it
        const targetId = link.getAttribute('href').substring(1); // Extracts the ID (e.g., item-1, item-1-1)
        const targetCollapse = document.querySelector(`#${targetId}-collapse`);
  
        if (targetCollapse) {
          // Add the 'show' class to the corresponding collapse section
          targetCollapse.classList.add('show');
        }
      });
    });
  });
  
  
  