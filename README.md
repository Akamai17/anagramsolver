# Anagrams Solver 📝

A simple, fast, and powerful anagram solver designed for word games. This tool runs entirely in your browser and is hosted on GitHub Pages.

<br>

## 🚀 [**Launch the Solver**](https://akamai17.github.io/anagramsolver/)

<br>

---

## About This Project

This is a straightforward, no-frills application created to solve anagrams from games like the popular GamePigeon "Anagrams". Just enter the scrambled letters, and the tool will provide a list of all possible words, conveniently ranked from longest to shortest.

### Key Features

*   **✨ Simple & Clean:** A minimal interface that's easy to use.
*   **📚 Comprehensive Results:** Uses a very large English word list to find more words than standard Scrabble dictionaries.
*   **🥇 Ranked by Length:** The highest-scoring (longest) words are always displayed at the top.
*   **💻 Client-Side Logic:** Built with pure HTML, CSS, and JavaScript. There's no server-side processing, which means your data stays private and the tool is highly efficient.

---

## ⚠️ Performance Disclaimer

This solver uses an extremely large dictionary file (over 370,000 words) to provide the most comprehensive results. Because of this:

*   **The initial page load may take a few seconds** as your browser downloads and processes the dictionary for the first time.
*   **The search itself can be intensive.** After you click "Find Words," please allow a moment for the script to check all possible combinations.
*   **Some words may not work.** The dictionary used in this program is considerably larger than the one in Gamepigeon, and as such, some words shown here may not score points. 

The application is designed to be as fast as possible, but this trade-off for a better dictionary is a necessary consideration.

---

## How It Works

1.  The browser fetches a large `dictionary.txt` file on page load.
2.  Your input letters are converted into a "frequency map" (e.g., `testing` becomes `{t: 2, e: 1, s: 1, i: 1, n: 1, g: 1}`).
3.  The script iterates through every word in the dictionary, checking if it can be formed with the letters you provided.
4.  All valid words are collected, sorted, and displayed.
