'use client';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyD-bXYuVYnVUIw1Vjqy2cTnf4BiwPKQJX8",
  authDomain: "studio-931581063-87f5e.firebaseapp.com",
  projectId: "studio-931581063-87f5e",
  storageBucket: "studio-931581063-87f5e.firebasestorage.app",
  messagingSenderId: "548580907731",
  appId: "1:548580907731:web:d0fb7e6b446c56e9689226"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication
export const auth = getAuth(app);

export default app;
