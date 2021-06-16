/* JS file handles client side for deleting posts */
// let updateBtn = $("#updateBtn");

$("#deleteBtn").on('click', async (e) => {
    e.preventDefault();
    const postID = window.location.toString().split('/')[window.location.toString().split('/').length - 1]; // Retrieves the post ID from the window
    const response = await fetch(`/api/post/delete/${postID}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        document.location.replace('/dash');
      } else {
        alert("Post could not be deleted.");
    } 
})
