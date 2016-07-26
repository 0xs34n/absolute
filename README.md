# High Roll Multi-level Marketing Solution

## Folder Structure
* controllers/ – defines your app routes and their logic
* helpers/ – code and functionality to be shared by different parts of the project
* middlewares/ – Express middlewares which process the incoming requests before handling them down to the routes
* models/ – represents data, implements business logic and handles storage
* public/ – contains all static files like images, styles and javascript
* views/ – provides templates which are rendered and served by your routes
* tests/ – tests everything which is in the other folders
* app.js – initializes the app and glues everything together
* package.json – remembers all packages that your app depends on and their versions

## Setting up
1. **Install nodemon:** This will automatically restart the node application when files are changed.

  ```
  npm install -g nodemon
  ```
2. **Install node packages:**  Go to the highroll project folder directory

  ```
  npm install .
  ```
3. **Run the server:** Make sure it specifies EJS changes

  ```
  nodemone -e ejs
  ```
