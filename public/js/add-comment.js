/* JS file handles client side for adding comment */

$("#addCommentBtn").on('click', async (e) => {
    e.preventDefault();
    const postID = window.location.toString().split('/')[ // Retrieves the post ID from the window
        window.location.toString().split('/').length - 1
    ];
    let comment = $("#commentText").val().trim();
    if (comment === "") {
        alert("All values need to be filled.")
    } else {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
          comment,
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
