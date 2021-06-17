/* JS file handles client side for updating and deleting posts  */

$("#updatePost").on('click', async (e) => {
    e.preventDefault();
    const postID = window.location.toString().split('/')[window.location.toString().split('/').length - 1]; // Retrieves the post ID from the window
    const title = $("#title").val().trim();
    const body = $("#body").val().trim();
    if (title === "" || body === "") {
        alert("All values need to be filled out.")
    } else {
        const response = await fetch(`/api/post/update/${postID}`, {
            method: "PUT",
            body: JSON.stringify({
                postID,
                body, 
                title
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            document.location.replace(`/post/${postID}`); // Redirects to the post after successful response
        } else {
            alert('Could not update the post!')
        }
    }
})

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

M.textareaAutoResize($('#title')); // Resizes text area for a lot of text
M.textareaAutoResize($('#body'));