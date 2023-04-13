# Quiz Taker App

This is a quiz application built with Next JS and TypeScript. The application allows users to create quizzes, edit quizzes, and take quizzes with immediate feedback on their score.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install all dependencies.
3. Create a Firebase project and configure it for your app by updating the values in `firebase/firebase.ts`.
4. Run `npm run dev` to start the development server.
5. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Features

### Create a Quiz

To create a new quiz, click on the create quiz button on the homepage. Provide the quiz name and press create quiz to get redirected to the edit form.

### Edit a Quiz

To edit an existing quiz, navigate to the "editquiz" page and select the quiz you want to edit. From there, you can add or delete questions, add or delete options, edit the time limit, the title, the description and points and grading system.

### Take a Quiz

To take a quiz, click on the "attempt quiz" button on the home page and select the quiz you want to take. The application will display each question one at a time, and you can select your answer from the multiple choice options. Your score will be displayed at the end of the quiz. Quiz gets auto-submitted when time limit is over.

## Technologies Used

- React JS
- TypeScript
- Firebase
- Material-UI
- Next.js
