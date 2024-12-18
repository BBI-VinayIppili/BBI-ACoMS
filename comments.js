// Function to handle expansion and collapsing
function toggleCommentExpansion(container, expand) {
  const hiddenComments = container.querySelector('.hidden-comments');
  if (expand) {
    container.setAttribute('data-collapsed', 'false');
    if (hiddenComments) hiddenComments.style.display = 'block';
    container.querySelectorAll('.comment-text').forEach(text => text.classList.remove('truncated'));
  } else {
    container.setAttribute('data-collapsed', 'true');
    if (hiddenComments) hiddenComments.style.display = 'none';
    container.querySelectorAll('.comment-text').forEach(text => text.classList.add('truncated'));
  }
}

function clearExpandedComments() {
  document.querySelectorAll('.comment-container[data-collapsed="false"]').forEach(container => {
    toggleCommentExpansion(container, false);
  });
}
 /////////////////



 // Function to clear active classes from elements
function clearActiveClasses() {
  const customComments = document.querySelectorAll('custom-comment.enable');
  const commentThreads = document.querySelectorAll('.comment-container[data-thread-id]');

  customComments.forEach(el => el.classList.remove('active'));
  commentThreads.forEach(el => el.classList.remove('active'));
}

// Function to activate elements (add active class)
function activateElement(clickedElement, relatedSelector, relatedAttribute, relatedClassName) {
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

    // Expand the related comment container if it's the correct class
    if (relatedClassName === 'comment-container') {
      clearExpandedComments();
      toggleCommentExpansion(relatedElement, true);
    }
  }
}




/////////////////////


// Function to add event listeners to all <custom-comment> and <comment-container> elements
function addClickEventToCustomComment() {
  const customComments = document.querySelectorAll('custom-comment.enable');
  const commentThreads = document.querySelectorAll('.comment-container[data-thread-id]');

  // Handle clicks on <custom-comment> elements
  customComments.forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      activateElement(element, '[data-thread-id="{id}"]', 'data-comment', 'comment-container');
    });
  });

  // Handle clicks on <comment-container> elements
  commentThreads.forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();

      const isCollapsed = element.getAttribute('data-collapsed') === 'true';

      // Ensure the clicked thread becomes active
      clearActiveClasses();
      element.classList.add('active');

      // Find and activate the corresponding word (custom-comment)
      const threadId = element.getAttribute('data-thread-id');
      const relatedWord = document.querySelector(`custom-comment[data-comment="${threadId}"]`);
      if (relatedWord) {
        relatedWord.classList.add('active');
      }

      clearExpandedComments(); // Collapse any other open threads
      if (isCollapsed) {
        toggleCommentExpansion(element, true);
      } else {
        toggleCommentExpansion(element, false);
      }
    });
  });

  // Close expanded comments when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.comment-container, .custom-comment')) {
      clearActiveClasses();
      clearExpandedComments();
    }
  });
}


////////////////

document.addEventListener("DOMContentLoaded", function () {
  // Fetch comments from the given URL
  function fetchComments(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error('Error loading comments:', error);
        throw error;
      });
  }

  // Create HTML for a single comment
  function createCommentHTML(comment) {
    const formattedTime = new Date(comment.created_at).toLocaleString();
    return `
      <div class="comment-item" data-comment-id="${comment.id}">
        <div class="avatar-placeholder">
          <img src="./user.png" alt="${comment.user.name}'s avatar" class="avatar">
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-user">${comment.user.name}</span>
            <div class="comment-time">${formattedTime}</div>
          </div>
          <div class="comment-text truncated" data-collapsed="true">${comment.content}</div>
        </div>
      </div>
    `;
  }

  // Create HTML for a thread card with comments
  function createThreadHTML(threadComments, threadId) {
    const initialComments = threadComments.slice(0, 2); // Show only the first two comments initially
    let threadHTML = `
      <div class="comment-container" data-thread-id="${threadId}" style="cursor: pointer;" data-collapsed="true">
        <div class="comment-body">
    `;

    // Render initial comments
    initialComments.forEach(comment => {
      threadHTML += createCommentHTML(comment);
    });

    // Add a hidden section for remaining comments
    if (threadComments.length > 2) {
      threadHTML += `<div class="hidden-comments" style="display: none;">`;
      threadComments.slice(2).forEach(comment => {
        threadHTML += createCommentHTML(comment);
      });
      threadHTML += `</div>`;
    }

    threadHTML += `</div></div>`; // Close the container
    return threadHTML;
  }

  // Group comments by thread_id
  function groupCommentsByThreadId(comments) {
    return comments.reduce((threads, comment) => {
      if (!threads[comment.thread_id]) {
        threads[comment.thread_id] = [];
      }
      threads[comment.thread_id].push(comment);
      return threads;
    }, {});
  }

  // Render the grouped comments
  function renderComments(commentsContainerId, commentsUrl) {
    const commentsContainer = document.getElementById(commentsContainerId);

    fetchComments(commentsUrl)
      .then(comments => {
        const groupedComments = groupCommentsByThreadId(comments);

        for (let threadId in groupedComments) {
          const threadComments = groupedComments[threadId];
          commentsContainer.innerHTML += createThreadHTML(threadComments, threadId);
        }

        // Add event listeners for expanding comments
        addClickEventToCustomComment();
      })
      .catch(error => {
        commentsContainer.innerHTML = '<p>Failed to load comments.</p>';
      });
  }

  // Add styles to truncate comments with ellipses
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .comment-text {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* Limit to 3 lines */
        -webkit-box-orient: vertical;
      }

      .comment-text.truncated[data-collapsed="true"] {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .comment-body[data-collapsed="true"] {
        max-height: 200px;
        overflow: hidden;
      }

      .comment-container {
        border: 1px solid #ddd;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
      }

      .comment-text:not(.truncated) {
        -webkit-line-clamp: unset; /* Remove line restriction */
      }

      .hidden-comments {
        display: none; /* Hidden by default */
      }

      .active {
        background-color: #f0f8ff; /* Highlight active elements */
        border: 2px solid #007bff;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize rendering comments and styles
  addStyles();
  renderComments('comments-container', './comments.json');
});
