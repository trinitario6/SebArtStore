# 🚀 Sebastian's Space Art Gallery — Firebase Edition

A kid-friendly, space-themed art gallery backed by **Firebase Firestore + Storage**,
so every visitor sees the same live pledge totals and supporter comments in real time.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🖼️ Gallery | Live artwork grid, loaded from Firestore |
| 🚀 Progress bar | Real-time rocket bar — updates for every visitor instantly |
| 💬 Comments | Supporters leave messages on each artwork pledge page |
| 🛸 Admin panel | Upload artwork + images, manage pledges, see all comments |
| 🔒 Password-protected admin | Simple client-side password (`space2024`) |

---

## 🔥 Step-by-Step Firebase Setup

### 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it (e.g. `sebastians-space-art`)
3. Disable Google Analytics if you want (not required)

---

### 2 — Enable Firestore

1. In Firebase Console, go to **Build → Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll add rules next)
4. Pick a region close to you → **Done**

---

### 3 — Enable Firebase Storage

1. Go to **Build → Storage**
2. Click **Get started** → **Start in test mode** → **Done**

---

### 4 — Set Firestore Security Rules

In **Firestore → Rules**, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artworks/{doc} {
      allow read: if true;
      allow write: if false;
    }
    match /pledges/{doc} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
    match /stats/global {
      allow read: if true;
      allow write: if true;
    }
    match /settings/{doc} {
      allow read: if true;   // goal + about visible to all
      allow write: if true;  // admin writes via password-protected panel
    }
  }
}
```

> **Note:** For a production site you'd add proper Firebase Auth for the admin.
> These rules are appropriate for a kid's gallery with a client-side admin password.

---

### 5 — Set Storage Security Rules

In **Storage → Rules**, paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /artworks/{allPaths=**} {
      allow read: if true;
      allow write: if true;  // Admin uploads images
    }
  }
}
```

---

### 6 — Get your Firebase Config

1. In Firebase Console → ⚙️ **Project Settings**
2. Scroll to **Your apps** → click **Web** (`</>`)
3. Register app (name it anything) → copy the config object

It looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123..."
};
```

---

### 7 — Add your config to the site

Open `public/app.js` and replace the placeholder values:

```javascript
export const FIREBASE_CONFIG = {
  apiKey:            "AIza...",          // ← your values here
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123..."
};
```

---

### 8 — Deploy to Firebase Hosting

```bash
# Install Firebase CLI (once)
npm install -g firebase-tools

# Login
firebase login

# In the sebastian-art folder:
firebase init hosting
# → Select your project
# → Public directory: public
# → Single-page app: No
# → Don't overwrite existing files

firebase deploy
```

Your site goes live at `https://YOUR-PROJECT-ID.web.app` 🚀

---

## 📁 File Structure

```
sebastian-art/
├── firebase.json
├── README.md
└── public/
    ├── app.js           ← Firebase config + shared helpers
    ├── index.html       ← Gallery (live Firestore)
    ├── about.html       ← About Sebastian
    ├── checkout.html    ← Pledge + Comments page
    ├── style.css        ← All styles
    └── admin/
        └── index.html   ← Admin panel (password: space2024)
```

---

## 🔑 Admin Password

The default password is **`space2024`**.

To change it, open `public/admin/index.html` and find:
```javascript
const ADMIN_PASSWORD = "space2024";
```

---

## 💡 How Data Flows

```
Visitor pledges → Firestore "pledges" collection
                → Firestore "stats/global" doc updated (transaction)
                → All open browser tabs see new total instantly (onSnapshot)

Admin uploads artwork → Firebase Storage (image)
                      → Firestore "artworks" collection
                      → Gallery updates live for all visitors
```

---

Made with ❤️ and stardust for Sebastian 🌟
