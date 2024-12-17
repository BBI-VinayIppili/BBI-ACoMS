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

// by "R" sir ✅

// Function to add event listeners to all <custom-comment> and <comment-container> elements
function addClickEventToCustomComment() {
  // Select all <custom-comment> elements with class 'enable'
  const customComments = document.querySelectorAll('custom-comment.enable');

  // Select all <comment-container> elements with a 'data-thread-id' attribute
  const commentThreads = document.querySelectorAll('.comment-container[data-thread-id]');

  // Utility function to remove 'active' class from all elements
  const clearActiveClasses = () => {
    customComments.forEach(el => el.classList.remove('active'));
    commentThreads.forEach(el => el.classList.remove('active'));
  };

  // Function to handle element activation
  const activateElement = (clickedElement, relatedSelector, relatedAttribute) => {
    clearActiveClasses();

    const relatedId = clickedElement.getAttribute(relatedAttribute);
    const relatedElement = document.querySelector(relatedSelector.replace('{id}', relatedId));

    if (relatedElement) {
      clickedElement.classList.add('active');
      relatedElement.classList.add('active');

      // Scroll the related element into view
      relatedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  };

  // Add event listeners to <custom-comment> elements
  customComments.forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent document click handler
      activateElement(element, '[data-thread-id="{id}"]', 'data-comment');
    });
  });

  // Add event listeners to <comment-container> elements
  commentThreads.forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent document click handler
      activateElement(element, '[data-comment="{id}"]', 'data-thread-id');
    });
  });

  // Add a click event on the document to remove 'active' class
  document.addEventListener('click', (event) => {
    // If clicked element or its ancestors do not have 'active', clear all active classes
    if (!event.target.closest('.active')) {
      clearActiveClasses();
    }
  });
}

// Call the function when the page is fully loaded
window.addEventListener('load', addClickEventToCustomComment);

// by "R" sir ✅


