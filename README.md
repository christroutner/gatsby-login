# gatsby-login
This is a front end boilerplate based on Gatsby. It started from the Gatsby
[auth tutorial](https://www.gatsbyjs.org/docs/authentication-tutorial/), using
the [gatsby-starter-photo template](https://github.com/codebushi/gatsby-starter-photon), and
was customized to work with
the [koa boilerplate](https://github.com/christroutner/babel-free-koa2-api-boilerplate) back
end. It demonstrates the basic auth capability of the koa boilerplate.

## Installation and Usage
- Install and run the [koa boilerplate](https://github.com/christroutner/babel-free-koa2-api-boilerplate)
- Clone this repository `git clone https://github.com/christroutner/gatsby-login`
- Install dependencies: `npm install`
- Run development server: `npm run develop`

This is a simple demo. The homepage is a login form. And a profile page is accessible
only if the user is logged in. The profile page displays the username and JWT of
the logged in user.
- Click on the _Profile_ link in the nav bar. You will be redirected back to the
home page, and can not access the private _Profile_ page unless logged in.
- Add a username and password then click the _Create_ button to create a new user.
- You will be logged in and take to the _Profile_ page.
- Log Out. You will be redirected to the Homepage with the login screen.
- Log In. You will be redirected to the _Profile_ page.
