# fullstack-blogsite-project  
https://blog-site-kftm.onrender.com/  

Used technologies: Node.js, Express.js, MongoDB, EJS, Javascipt, Html, Css  

I used express.js, which is a node.js framework. I used mongodb database.
With the bcrypt package, passwords are saved hashed in mongodb.
I used the cookie-parser package to keep user information in the cookie.
As html template engine, I used ejs.

## When registered
 + With the bcrypt package, the user's password is hashed and saved in the database.
## When logged in
 + Hashed password is compared with the entered password via bcrypt package
 + An encrypted token is generated with the jwt package and this token is saved in the cookie
## In the authorization check
 + The encrypted token in the cookie is verified using the jwt package
 + If the token cannot be verified, the user is redirected to the login page
## When logged out
 + The token in the cookie is deleted and thus authentication cannot be made

Every user can share a blog post by clicking the write button. There are delete, edit and hide/show buttons in the lower right corner of the user's own blog.  
Blogs consist of category, title and content. There is a comment section under each blog. Blogs have a favorite button. A list of users who favorite blogs can be displayed.  
On the home page, the blogs of the users followed by the logged-in user are displayed.  
On the left side of the pages, there are category options. Whichever category is clicked, blogs in that category will be displayed.  
On the right side of the pages, the most recently shared blogs of users who are not followed by the logged in user are shown.  
Users can follow each other. Each user has followers and following sections on their profile page. On the user profile page, there are followers and followings sections of that user.  
These users can be shown by clicking on the number of followers or the number of followings. The user profile page displays the blogs shared by that user.  
