const withAuth = (req, res, next) => { // If the user is not logged in, the user will be redirected to the log in page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next(); // When the user is authenticated
    }
  };
  
  module.exports = withAuth;
  