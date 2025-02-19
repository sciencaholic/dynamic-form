**Dynamic Form Rendering App**
---

This project is a **dynamic form rendering app** built with **Vite** and **React**. It allows users to configure and render forms based on a **JSON configuration**, with support for all possible **HTML input types**, **conditional rendering**, **state management**, and **input validation**.

---

#### **Styling**

Instead of using UI component libraries like **MUI** or **ShadCN**, form elements are styled using **Tailwind CSS**, following the [Flowbite input styling guide](https://flowbite.com/docs/forms/input-field/).

---

#### **Supported Input Types**

The following are all possible HTML input types & supported by this app (taken from [W3Schools HTML Form Input Types](https://www.w3schools.com/html/html_form_input_types.asp)):

1. `button`
1. `checkbox`
1. `color`
1. `date`
1. `datetime-local`
1. `email`
1. `file`
1. `hidden`
1. `image`
1. `month`
1. `number`
1. `password`
1. `radio`
1. `range`
1. `reset`
1. `search`
1. `submit`
1. `tel`
1. `text`
1. `time`
1. `url`
1. `week`

And other types:
1. `select`
1. `textarea`

---

#### **Possible Feature Additions**

- Country code dropdown with flag for `type="tel"` input with libs like `react-phone-number-input` or `react-international-phone`.
- Support for `onClick` functions for `type=button`.
- Data display on `Submit Form` (Currently, it logs the form data to console).
- Dark/Light Theme Toggle - Got issues with TailwindCSS, PostCSS & Vite with theme - need more time to debug.

---

#### **Tests**

- Comprehensive tests are written only for Text Inputs for now, using Jest & React Testing Library

---

#### **How to Run the Application**

1. **Clone the Repository**:
  `git clone https://github.com/sciencaholic/dynamic-form.git`
  `cd dynamic-form`

2. **Install Dependencies**:
  `npm i`

3. **Start the Development Server**:
  `npm run dev`
  The app will be available at <http://localhost:5173>.

Note: Use Node Version 22.12.0

The app is hosted at https://dynamic-form-five-alpha.vercel.app/