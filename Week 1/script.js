document.addEventListener('DOMContentLoaded', function() {
  const commentInput = document.getElementById('comment-input');
  const submitButton = document.getElementById('submit-comment');
  const commentList = document.getElementById('comment-list');

  submitButton.addEventListener('click', function() {
    const commentText = commentInput.value.trim(); // Get comment text and remove leading/trailing whitespace

    if (commentText !== '') { // Only add if comment is not empty
      const newComment = document.createElement('p'); // Create a new paragraph element
      newComment.textContent = commentText; // Set its text content to the comment
      commentList.appendChild(newComment); // Add the new comment to the list
      commentInput.value = ''; // Clear the input field
    }
  });
});