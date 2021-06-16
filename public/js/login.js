/* JS file handles client side for adding user and logging in user  */

const postUserData = async (e) => {
    e.preventDefault();
    let userName = $("#username").val().trim();
    let password = $("#password").val().trim();
    let email = $("#email").val().trim();
  
    if (userName === "" || password === "" || email === "") {
      alert("All values need to be filled.");
      } else {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
            userName,
            password,
            email
          }),
          headers: {
            "Content-Type": "application/json"
          }
          });
          if (response.ok) {
            document.location.replace('/dash');
          } else {
            alert("Invalid password or email. Please try again.")
        } 
    }
}

const userLogIn = async (e) => {
    e.preventDefault();
    let userName = $("#username").val().trim();
    let password = $("#password").val().trim();
  
    if (userName === "" || password === "") {
      alert("All values need to be filled.")
    } else {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          userName,
          password, 
        }),
        headers: {
          "Content-Type": "application/json"
        }
        })
        if (response.ok) {
          document.location.replace('/dash');
        } else {
          alert("Invalid username or email. Please try again.")
        }
    }
}


$("#signUpBtn").on('click', postUserData); // Creating new user
$("#logInBtn").on('click', userLogIn); // Logging in