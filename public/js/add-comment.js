/* JS file handles client side for adding comment */

$("#addCommentBtn").on('click', async (e) => {
    e.preventDefault();
    const postID = window.location.toString().split('/')[window.location.toString().split('/').length - 1]; // Retrieves the post ID from the window
    let body = $("#commentText").val().trim();
    if (body === "") {
        alert("All values need to be filled.")
    } else {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
          body,
          postID
        }),
        headers: {
          "Content-Type": "application/json"
        }
        });
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert("Comment could not be created.");
      } 
    }
})
