# Daily-Post 

Welcome to Daily-Post! This is a MERN stack project designed to allow users to create, edit, and delete posts. Users can specify whether their posts are visible to all users or only to themselves. The project also includes authentication with email verification using Google API, session management, and integration with the TinyMCE editor for post description editing.

## Features

1. **Post Management:**
   - Create new posts.
   - Edit existing posts.
   - Delete posts.

2. **Visibility Settings:**
   - Specify whether a post is visible to all users or only to the creator.

3. **Authentication:**
   - Sign up and log in using Google API.
   - Email verification required for login.

4. **Session Management:**
   - Users remain logged in until they manually log out.

5. **Editor Integration:**
   - Utilizes TinyMCE editor for post description editing.
   - Allows users to change text formatting, such as name, font style, font size, etc.
   - Post descriptions are stored in HTML format in the database.

6. **Image Support:**
   - Posts can contain images.
   - Images are stored in the database in Base64 format.

## Technologies Used

- **MERN Stack:**
  - MongoDB: NoSQL database for storing user data and posts.
  - Express.js: Backend framework for handling HTTP requests and routes.
  - React.js: Frontend library for building user interfaces.
  - Node.js: JavaScript runtime environment for server-side logic.

- **Google API:**
  - Utilized for authentication and email verification.

- **TinyMCE Editor:**
  - Integrated for post description editing.

- **HTML-React-Parser:**
  - Used for parsing HTML content retrieved from the database.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone [<repository-url>](https://github.com/Gagan20-vis/Daily-Latest-Post)`
2. Navigate to the project directory: `cd <project-folder>`
3. Install dependencies:
   - Navigate to the server directory: `cd server`
   - Run `npm install && nodemon`
   - Go Back to main directory : `cd ../`
   - Navigate to the client directory: `cd client`
   - Run `npm install && npm run dev`
5. Configure environment variables:
   - Create a `.env` file in the both the sub-directory server and client.
   - Add necessary environment variables such as MongoDB URI, Google API credentials, etc.
6. You are done now , Enjoy the app.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.
