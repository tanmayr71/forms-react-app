
# Forms React App

## Introduction

The Forms React App is a dynamic and interactive form builder that allows users to create custom forms with drag-and-drop functionality. This application enables you to add, reorder, and validate form elements, providing an intuitive way to design forms without coding.

## Features

- **Drag-and-Drop Interface**: Easily drag form elements into the form area and reorder them as needed.
- **Form Elements**: Supports a variety of form elements including text boxes, radio buttons, checkboxes, and dropdown menus.
- **Validation**: Built-in validation to ensure all fields and options are filled correctly before submission.
- **Customizable**: Flexible options for each form element, including default values and required fields.
- **Clean Repository**: Excludes unnecessary files from tracking with an updated `.gitignore`.

## Installation

To get started with the Forms React App, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/forms-react-app.git
   ```
   
2. **Navigate to the project directory**:
   ```bash
   cd forms-react-app
   ```

3. **Install dependencies**:
   Ensure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

## Usage

1. **Start the development server**:
   ```bash
   npm start
   ```
   This will launch the app in your default browser at `http://localhost:3000`.

2. **Build your form**:
   - Drag elements from the toolbox to the drop zone.
   - Click and drag elements within the drop zone to reorder them.
   - Edit the labels and options as needed.
   - Ensure all fields are filled to validate the form.

3. **Save the form**:
   - Click the "Save Form" button.
   - If any fields are empty, they will be highlighted, and an error message will be displayed.

## Development

For developers looking to contribute or modify the app:

1. **Code Structure**:
   - The source code is organized into components, each handling specific parts of the form functionality.
   - Core elements like `DraggableItem`, `DropZone`, and `ToolBox` are in the `components` directory.
   - Form element cards and utilities are further organized under `components/cards` and `components/formElements`.

2. **Branching**:
   - Use feature branches for development.
   - Follow standard Git practices for commits and pull requests.

3. **Testing**:
   - Ensure all changes are tested thoroughly.
   - Add new tests for new features or components.

4. **Dependencies**:
   - The project uses `react-dnd` for drag-and-drop functionality.
   - Keep the dependencies up to date.

## Contact

For questions or support, please open an issue in the repository or contact the maintainers.
Tanmay Anil Rathi - tr2452@nyu.edu
