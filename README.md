# Weathy 🌤️

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

A mobile app for logging and tracking your personal weather history. Users capture daily weather conditions with a photo, store them to the cloud, and can share or export their history as a PDF report via email or SMS.

---

## Features

- **Daily Weather Logging** — Submit a photo along with weather conditions (sunny, cloudy, rainy, etc.) for each day
- **Home Screen Summary** — Displays the current day's submitted photo and conditions at a glance
- **Past Reports** — Browse your full weather history and share any report directly from the list
- **PDF Export** — Generate a PDF of your weather history and send it via email or SMS
- **Haptic Feedback** — Device vibration confirms every database interaction for tactile clarity
- **Base64 Image Storage** — Photos are encoded as base64 strings and stored directly in Firestore, working around Firebase Storage limitations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo) |
| Language | JavaScript |
| Database | Firebase Firestore |
| Image Handling | expo-image-picker + base64 encoding |
| Sharing | expo-mail-composer, expo-sms-composer |
| Feedback | expo-haptics |

---

## Screens

| Screen | Description |
|---|---|
| **Home** | Shows today's weather photo and conditions if a report has been submitted |
| **Submit Report** | Pick a photo and select weather conditions to log the current day |
| **Past Reports** | View and share previously submitted weather reports |
| **Download Report** | Generate and send a PDF of your weather history via email or SMS |

---

## Installation

> Requires [Node.js](https://nodejs.org/) and the [Expo CLI](https://docs.expo.dev/get-started/installation/).

```bash
# Clone the repository
git clone https://github.com/your-username/weathy.git
cd weathy

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with [Expo Go](https://expo.dev/client) on your iOS or Android device.

### Firebase Setup

1. Create a project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable **Firestore Database**
3. Copy your Firebase config and create a `firebaseConfig.js` file in the project root:

```js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## Notable Implementation Details

**Image storage without Firebase Storage** — Firebase Storage proved incompatible with the Expo environment, so images are encoded as base64 strings before being written to Firestore documents. This keeps all data in a single database while avoiding a dependency on a second Firebase service.
