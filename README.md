This project is a dynamic form rendering system built with Vite and React. It allows users to configure and render forms based on a JSON configuration, with support for all possible HTML input types, conditional rendering, state management, and input validation.

Instead of UI component libraries like mui or shadcn, elements are styled using Tailwind CSS, following the input styling guide from Flowbite.

All possible input types you can use in HTML & supported by this app:
- button
- checkbox
- color
- date
- datetime-local
- email
- file
- hidden
- image
- month
- number
- password
- radio
- range
- reset
- search
- submit
- tel
- text
- time
- url
- week


Possible Feature Additions - 
- Country code dropdown with flag for type="tel" input - `react-phone-number-input` or `react-international-phone` lib

How to Run the Application
Clone the Repository:
git clone <repository-url>
cd <repository-folder>

Install Dependencies:
npm install

Start the Development Server:
npm run dev

The app will be available at http://localhost:5173.




App Reqs - 
  - [x] System must accept a JSON configuration that defines the structure of the form.
  - [x] System must support any input types
  - [x] Conditional Rendering Logic: Form fields
  - [x] Implement state management to handle form data and visibility of child elements dynamically.
  - [x] Provide clear feedback when fields are rendered or hidden based on user interaction.
  - [x] Implement basic validation for required fields and provide appropriate error messages.
  - [ ] Include unit tests to validate the functionality of dynamic rendering and conditional logic.
  - [x] Source code hosted in a public repository (e.g., GitHub).
  - [ ] Deploy your application on any free hosting platform
  - [ ] A brief README file explaining how to run the application and add any additional notes regarding implementation choices.
  
TODO:
- color input
- disabled state