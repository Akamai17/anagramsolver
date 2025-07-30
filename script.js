document.addEventListener('DOMContentLoaded', () => {
    const letterInput = document.getElementById('letter-input');
    const solveButton = document.getElementById('solve-button');
    const resultsContainer = document.getElementById('results-container');
    const statusMessage = document.getElementById('status-message');
    let dictionary = [];

    // Fetch the dictionary file and prepare the application
    fetch('dictionary.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            // Split the text into an array of words, trim whitespace
            dictionary = text.split('\n').map(word => word.trim().toLowerCase()).filter(Boolean);
            solveButton.disabled = false;
            solveButton.textContent = 'Find Words';
            statusMessage.textContent = `Dictionary loaded with ${dictionary.length} words.`;
        })
        .catch(error => {
            console.error('Error loading dictionary:', error);
            statusMessage.textContent = 'Failed to load dictionary. Please refresh.';
        });

    // Helper function to create a frequency map of characters in a string
    const getFrequencyMap = (str) => {
        const map = {};
        for (const char of str) {
            map[char] = (map[char] || 0) + 1;
        }
        return map;
    };

    // Helper function to check if a word can be formed from the given letters
    const canFormWord = (word, lettersMap) => {
        const wordMap = getFrequencyMap(word);
        for (const char in wordMap) {
            if (!lettersMap[char] || wordMap[char] > lettersMap[char]) {
                return false;
            }
        }
        return true;
    };

    const solveAnagrams = () => {
        const inputLetters = letterInput.value.toLowerCase().replace(/[^a-z]/g, '');
        resultsContainer.innerHTML = '';
        
        if (inputLetters.length < 2) {
            statusMessage.textContent = 'Please enter at least 2 letters.';
            return;
        }

        statusMessage.textContent = 'Searching...';

        // Use a timeout to allow the UI to update before the heavy computation
        setTimeout(() => {
            const lettersMap = getFrequencyMap(inputLetters);
            const foundWords = new Set(); // Use a Set to avoid duplicates

            for (const word of dictionary) {
                // Pre-filter to improve performance
                if (word.length > 1 && word.length <= inputLetters.length) {
                    if (canFormWord(word, lettersMap)) {
                        foundWords.add(word);
                    }
                }
            }

            // Convert set to array and sort: primary by length (desc), secondary by alphabet (asc)
            const sortedWords = Array.from(foundWords).sort((a, b) => {
                if (a.length !== b.length) {
                    return b.length - a.length;
                }
                return a.localeCompare(b);
            });

            displayResults(sortedWords);
        }, 10);
    };

    const displayResults = (words) => {
        if (words.length === 0) {
            statusMessage.textContent = 'No words found.';
            return;
        }

        statusMessage.textContent = `Found ${words.length} words.`;

        const groupedByLength = words.reduce((acc, word) => {
            const len = word.length;
            if (!acc[len]) {
                acc[len] = [];
            }
            acc[len].push(word);
            return acc;
        }, {});

        // Sort groups by length descending
        const sortedGroups = Object.keys(groupedByLength).sort((a, b) => b - a);

        let html = '';
        for (const length of sortedGroups) {
            html += `
                <div class="result-group">
                    <h2>${length}-Letter Words</h2>
                    <div class="word-list">
                        ${groupedByLength[length].map(word => `<div class="word-item">${word}</div>`).join('')}
                    </div>
                </div>
            `;
        }
        resultsContainer.innerHTML = html;
    };

    // Event Listeners
    solveButton.addEventListener('click', solveAnagrams);
    letterInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            solveAnagrams();
        }
    });
});
