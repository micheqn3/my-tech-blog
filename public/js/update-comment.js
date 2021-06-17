/* JS file handles client side for updating and deleting comments */

$("#updateComment").on('click', async (e) => {
    e.preventDefault();
    const postID = window.location.toString().split('/')[window.location.toString().split('/').length - 1]; // Retrieves the comment ID from the window
    const body = $("#body").val().trim();
    if (body === "") {
        alert("All values need to be filled out.")
    } else {
        const response = await fetch(`/api/comment/update/${postID}`, {
            method: "PUT",
            body: JSON.stringify({
                postID,
                body, 
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            document.location.replace(`/comment/get/${postID}`); // Redirects to the comment after successful response
        } else {
            alert('Could not update the comment!')
        }
    }
})


$("#deleteComment").on('click', async (e) => {
    e.preventDefault();
    const postID = window.location.toString().split('/')[window.location.toString().split('/').length - 1]; // Retrieves the post ID from the window
    const response = await fetch(`/api/comment/delete/${postID}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        document.location.replace('/dash');
      } else {
        alert("Comment could not be deleted.");
    } 
})