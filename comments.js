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
    // Format the timestamp
    const formattedTime = new Date(comment.created_at).toLocaleString();

    return `
      <div class="comment-item">
        <div class="avatar-placeholder">
          <img src="${comment.user.profile_picture}" alt="${comment.user.name}'s avatar" class="avatar">
        </div>
        <div class="comment-content">
          <div>
            <span class="comment-user">${comment.user.name}</span>
            <div class="comment-time">${formattedTime}</div> <!-- Time below username -->
          </div>
          <div class="comment-text">${comment.content}</div>
        </div>
      </div>
    `;
  }

  // Create HTML for a thread card
  function createThreadHTML(threadComments) {
    let threadHTML = `
      <div class="comment-container">
        <div class="comment-body">
    `;
    
    threadComments.forEach(comment => {
      threadHTML += createCommentHTML(comment);
    });

    threadHTML += `</div></div>`; // Close comment body and container
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

        // Render each thread's comments in a separate card
        for (let threadId in groupedComments) {
          const threadComments = groupedComments[threadId];
          commentsContainer.innerHTML += createThreadHTML(threadComments);
        }
      })
      .catch(error => {
        commentsContainer.innerHTML = '<p>Failed to load comments.</p>';
      });
  }

  // Initialize rendering comments
  renderComments('comments-container', './comments.json');
});