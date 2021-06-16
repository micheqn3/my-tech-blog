/* JS file handles client side */

$("#submitPost").on('click', async (e) => {
    e.preventDefault();
    let title = $("#title").val().trim();
    let body = $("#body").val().trim();

    if (title === "" || body === "") {
        alert("All values need to be filled.")
    } else {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
              title,
              body
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });
        
          if (response.ok) {
            document.location.replace('/');
          } else {
            alert("Post could not be created.");
        } 
    }
})

M.textareaAutoResize($('#title')); // Resizes text area for a lot of text
M.textareaAutoResize($('#body'));
