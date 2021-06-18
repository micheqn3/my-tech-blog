/* JS file handles client side for logging out user */

const userLogOut = async () => {
    const response = await fetch('/api/user/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert("Failed to log out.");
    }
}

$("#logOutBtn").on('click', userLogOut) // Logging out
$("#logOutBtn2").on('click', userLogOut)