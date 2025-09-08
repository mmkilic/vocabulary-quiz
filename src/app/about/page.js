"use client"; 

import { useState } from "react";


export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About Vocabulary Quiz</h1>
      <p className="text-lg mb-4">
        Vocabulary Quiz is a web application designed to help users improve their English vocabulary in a fun and interactive way.
      </p>
      <p className="text-lg mb-4">
        Users can take quizzes, search for words, and track their progress over time. The app is built using modern web technologies like Next.js, React, Tailwind CSS, and Ant Design.
      </p>
      <p className="text-lg mb-4">
        This project is developed by <strong>Mehmet KILIC</strong>. For any questions or suggestions, feel free to contact me at <a href="mailto:mkilic.other@gmail.com" className="text-blue-500 underline">mkilic.other@gmail.com</a>.
      </p>
      <p className="text-lg mb-4">
        We hope this app helps you learn new words and expand your vocabulary effectively!
      </p>
    </div>
  );
}