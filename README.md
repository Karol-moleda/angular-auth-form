# AppVerk - Authentication System

A robust authentication system built with Angular that features custom form controls, validators, and route protection.

## Features

- **Secure Login System**: Complete user authentication flow with email and password validation
- **Custom Form Controls**: Reusable text input components with integrated error handling
- **Custom Validators**: Email pattern validation using custom validators
- **Route Protection**: Guards for authenticated and non-authenticated routes
- **User Profile**: Display user information fetched from API after successful login
- **Token-based Authentication**: User sessions managed via token stored in local storage

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   └── home/
│   ├── shared/
│   │   └── custom-input/
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── login.guard.ts
│   ├── validators/
│   │   └── email-validator.ts
│   └── services/
│       └── auth.service.ts
└── assets/
    └── user-data.json
```

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Authentication Flow

1. User navigates to the login page
2. User enters email and password
3. Form validates input with custom validators
4. On successful validation:
   - A random token is generated and stored in local storage
   - User is redirected to the home page
   - User data is fetched from the JSON file in assets
5. Route guards prevent:
   - Logged-in users from accessing the login page
   - Non-logged-in users from accessing the home page

## Custom Components

### Custom Text Input

The application features a reusable text input component that:
- Integrates seamlessly with Angular's Reactive Forms
- Displays validation error messages
- Adapts to different input types (email, password, etc.)

### Custom Email Validator

The email validator ensures proper email format without relying on Angular's built-in pattern validator.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with [Karma](https://karma-runner.github.io), use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
