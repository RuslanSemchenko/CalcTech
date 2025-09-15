# CalcTech - The Modern Calculator

Welcome to CalcTech, a versatile and modern calculator application built with Next.js, React, and Tailwind CSS. This application provides standard & scientific calculation, unit conversion, currency conversion, and AI-powered formula solving.

## Features

- **Standard & Scientific Calculator**: All the functions you need for basic arithmetic or complex scientific calculations.
- **Unit Converter**: Easily convert between different units for length, weight, and temperature.
- **AI Formula Solver**: Solves mathematical formulas like the Quadratic equation and provides step-by-step solutions.

## Setup & Configuration

To use the AI-powered features (like the Formula Solver), you need to configure your Gemini API key.

1.  **Get your API Key**: Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Create an environment file**: In the root of the project, create a new file named `.env`.
3.  **Add the key to `.env`**: Add the following line to your `.env` file, replacing `YOUR_API_KEY` with the key you obtained:

    ```
    GEMINI_API_KEY=YOUR_API_KEY
    ```

Your application is now configured to use the AI features.

## How to Use

The calculator is divided into four main tabs:

1.  **Calculator**: For all your basic and scientific calculation needs.
    -   Use the number and operator buttons for standard arithmetic.
    -   Toggle the "Sci" switch to access scientific functions like sine, cosine, tangent, logarithms, and more.
    -   Use the history button (clock icon) to view your recent calculations.

2.  **Unit Converter**: Convert between different units of measurement.
    -   Enter the value you want to convert.
    -   Select the "From" and "To" units from the dropdown menus.
    -   The converter supports Length, Weight, and Temperature.
    -   Click "Convert" to see the result.

3.  **Formula Solver**: Solve equations using formulas.
    -   Select a formula from the dropdown (e.g., Quadratic Formula).
    -   Enter the values for the required variables.
    -   Click "Solve with AI" to get the result and a step-by-step breakdown of the solution.

## How to Build and Deploy

This is a Next.js web application. Building for different platforms involves using web technologies to create platform-specific packages.

### Web (Default)

The application is a standard web app and can be deployed to any modern web hosting platform that supports Node.js.

**Development:**

To run the app locally for development:

```bash
npm run dev
```

**Production Build:**

To build the application for production:

```bash
npm run build
```

This will create an optimized build in the `.next` directory. You can then start the production server with `npm run start`.

### PC App (Windows, macOS, Linux)

You can package the web application as a desktop app using a framework like **Electron** or **Tauri**. These tools wrap your web app in a native desktop window.

**Example using Electron:**

1.  **Add Electron to your project:**
    ```bash
    npm install --save-dev electron electron-builder
    ```
2.  **Configure Electron:** You will need to create a main Electron process file (`main.js` or similar) to create a browser window and load your Next.js application.
3.  **Build the app:** Configure `electron-builder` in your `package.json` to build distributable packages (`.exe`, `.dmg`, `.deb`, etc.).

### Mobile App (Android, iOS)

To build for mobile, you can use a framework like **Capacitor** or **React Native for Web**. These tools allow you to wrap your web application in a native mobile shell and access native device features.

**Example using Capacitor:**

1.  **Add Capacitor to your project:**
    ```bash
    npm install @capacitor/core @capacitor/cli
    npx cap init
    ```
2.  **Add native platforms:**
    ```bash
    npm install @capacitor/android @capacitor/ios
    npx cap add android
    npx cap add ios
    ```
3.  **Build your web app:**
    ```bash
    npm run build
    npx next export # If using static export
    ```
4.  **Sync and run:**
    ```bash
    npx cap sync
    npx cap open android # Opens in Android Studio
    ```
From Android Studio or Xcode, you can build the native `.apk` (for Android) or `.ipa` (for iOS) file.
