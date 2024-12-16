document.addEventListener("DOMContentLoaded", function () {
  const mockCommentsData = [
    {
      thread_id: 1,
      user_name: "John Doe",
      profile_pic: "https://via.placeholder.com/50",
      comment: "This is a sample comment.",
      date_time: "2024-12-15T12:00:00Z",
      replies: [
        {
          thread_id: 2,
          user_name: "Jane Smith",
          profile_pic: "https://via.placeholder.com/50",
          comment: "This is a reply.",
          date_time: "2024-12-16T08:30:00Z",
          replies: []
        }
      ]
    }
  ];

  displayComments(mockCommentsData);

  function displayComments(commentsData) {
    const commentsLists = document.querySelectorAll(".comments-list");

    const threads = {};
    commentsData.forEach((comment) => {
      if (!threads[comment.thread_id]) {
        threads[comment.thread_id] = [];
      }
      threads[comment.thread_id].push(comment);
    });

    for (let threadId in threads) {
      const thread = threads[threadId];
      const threadDiv = document.createElement("div");

      thread.forEach((comment) => {
        const commentCard = createCommentCard(comment);
        threadDiv.appendChild(commentCard);
      });

      commentsLists.forEach((commentsList) => {
        commentsList.appendChild(threadDiv.cloneNode(true));
      });
    }
  }

  function createCommentCard(comment) {
    const commentCard = document.createElement("div");
    commentCard.className = "card mb-3";

    const commentCardBody = document.createElement("div");
    commentCardBody.className = "card-body";

    const userDiv = document.createElement("div");
    userDiv.className = "d-flex align-items-center mb-2";

    const userProfileLink = document.createElement("a");
    userProfileLink.href = "https://example.com/user-profile";
    userProfileLink.target = "_blank";

    const userProfileImage = document.createElement("img");
    userProfileImage.src = comment.profile_pic;
    userProfileImage.alt = "User Profile";
    userProfileImage.className = "rounded-circle me-2";
    userProfileLink.appendChild(userProfileImage);

    const userName = document.createElement("h5");
    userName.className = "card-title mb-0";
    userName.textContent = comment.user_name;

    userDiv.appendChild(userProfileLink);
    userDiv.appendChild(userName);

    const commentText = document.createElement("p");
    commentText.className = "card-text";
    commentText.textContent = comment.comment;

    const commentDate = document.createElement("p");
    commentDate.className = "text-muted small";
    commentDate.textContent = `Posted on: ${comment.date_time}`;

    commentCardBody.appendChild(userDiv);
    commentCardBody.appendChild(commentText);
    commentCardBody.appendChild(commentDate);

    if (comment.replies && comment.replies.length > 0) {
      const repliesDiv = document.createElement("div");
      repliesDiv.className = "replies-list mt-3 ms-3";
      comment.replies.forEach((reply) => {
        const replyCard = createCommentCard(reply);
        repliesDiv.appendChild(replyCard);
      });
      commentCardBody.appendChild(repliesDiv);
    }

    commentCard.appendChild(commentCardBody);
    return commentCard;
  }
});
