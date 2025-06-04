// --- NEW Comprehensive Reset Function ---
function resetAll() {
    // 1. Clear the birth date input
    const birthdateInput = document.getElementById('birthdate');
    if (birthdateInput) {
        birthdateInput.value = '';
    }

    // 2. Hide and clear the result div
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = ''; // Clear any previous error/result messages
    }

    // 3. Reset the main "Calculate" button to its original state
    const calculateBtn = document.getElementById('calculateBtn');
    const btnText = document.getElementById('btnText');
    if (calculateBtn && btnText) {
        calculateBtn.classList.remove('calculating', 'success');
        btnText.textContent = 'Calculate My Age';
    }

    // 4. Optional: Add a subtle animation to show the reset happened
    const container = document.querySelector('.container');
    if (container) {
        container.style.animation = 'resetPulse 0.3s ease';
        setTimeout(() => {
            container.style.animation = '';
        }, 300);
    }
}





// --- Function Definitions ---

function resetButton() {
    const calculateBtn = document.getElementById('calculateBtn');
    const btnText = document.getElementById('btnText');

    calculateBtn.classList.remove('calculating', 'success');
    btnText.textContent = 'Calculate My Age';
}

function refreshCalculator() {
    // clear the birth date input
    const birthdateInput = document.getElementById('birthdate');
    if (birthdateInput) {
        birthdateInput.value = '';
    }
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div class="error">${message}</div>`;
    resultDiv.style.display = 'block';
}

function getDetailedAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth;
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total days lived (more accurate without approximations)
    const diffTime = Math.abs(currentDate.getTime() - birthDate.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Use ceil to include partial days

    // Calculate total hours, minutes, seconds (from total days)
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    return {
        years: years,
        months: months,
        days: days,
        totalDays: totalDays,
        totalHours: totalHours,
        totalMinutes: totalMinutes,
        totalSeconds: totalSeconds
    };
}

function displayResults(ageData, birthDate, currentDate) {
    const resultDiv = document.getElementById('result');

    // Determine if it's their birthday
    const isBirthday = birthDate.getMonth() === currentDate.getMonth() &&
                       birthDate.getDate() === currentDate.getDate();

    const birthdayMessage = isBirthday ?
        '<div style="color: #e74c3c; font-weight: bold; margin-bottom: 15px;">🎉 Happy Birthday! 🎉</div>' : '';

    // Fun facts
    const funFacts = [
        `You've lived through approximately ${Math.floor(ageData.totalDays / 365.25 * 12)} full moons! 🌕`,
        `Your heart has beaten approximately ${(ageData.totalSeconds * 1.2).toLocaleString()} times! ❤️`,
        `You've experienced about ${Math.floor(ageData.years * 365.25 / 7)} weeks of life! 📅`,
        `You've seen approximately ${ageData.years * 365} sunrises and sunsets! 🌅`
    ];

    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

    resultDiv.innerHTML = `
        ${birthdayMessage}
        <div class="age-display">
            You are ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days old!
        </div>

        <div class="age-details">
            <div class="age-item">
                <span class="age-number">${ageData.years}</span>
                <span class="age-label">Years</span>
            </div>
            <div class="age-item">
                <span class="age-number">${ageData.months}</span>
                <span class="age-label">Months</span>
            </div>
            <div class="age-item">
                <span class="age-number">${ageData.days}</span>
                <span class="age-label">Days</span>
            </div>
            <div class="age-item">
                <span class="age-number">${ageData.totalDays.toLocaleString()}</span>
                <span class="age-label">Total Days</span>
            </div>
            <div class="age-item">
                <span class="age-number">${ageData.totalHours.toLocaleString()}</span>
                <span class="age-label">Total Hours</span>
            </div>
            <div class="age-item">
                <span class="age-number">${ageData.totalMinutes.toLocaleString()}</span>
                <span class="age-label">Total Minutes</span>
            </div>
        </div>

        <div class="fun-fact">
            💡 Fun Fact: ${randomFact}
        </div>
    `;

    resultDiv.style.display = 'block';
}

function calculateAge() {
    const birthdateInput = document.getElementById('birthdate');
    const resultDiv = document.getElementById('result');
    const calculateBtn = document.getElementById('calculateBtn');
    const btnText = document.getElementById('btnText');

    // Add calculating animation
    calculateBtn.classList.add('calculating');
    btnText.textContent = 'Calculating...';

    // Hide previous results
    resultDiv.style.display = 'none';

    // Simulate processing time for better UX
    setTimeout(() => {
        // Input validation
        if (!birthdateInput.value) {
            showError('Please enter your date of birth.');
            resetButton(); // Reset the calculate button state
            return;
        }

        const birthDate = new Date(birthdateInput.value);
        const today = new Date();

        // Check if birth date is in the future
        if (birthDate > today) {
            showError('Birth date cannot be in the future!');
            resetButton(); // Reset the calculate button state
            return;
        }

        // Check if birth date is too far in the past (more than 150 years)
        const maxAge = new Date(today.getFullYear() - 150, today.getMonth(), today.getDate());
        if (birthDate < maxAge) {
            showError('Please enter a valid birth date. (Max 150 years ago)'); // More descriptive error
            resetButton(); // Reset the calculate button state
            return;
        }

        // Calculate age
        const ageData = getDetailedAge(birthDate, today);

        // Show success state
        calculateBtn.classList.remove('calculating');
        calculateBtn.classList.add('success');
        btnText.textContent = '✓ Calculated!';

        // Display results
        displayResults(ageData, birthDate, today);

        // Reset the calculate button to original state after a short delay
        setTimeout(() => {
            resetButton();
        }, 1500);

    }, 1000); // 1 second delay for calculation animation
}


// --- Initial Setup and Event Listeners ---

// Get a reference to your reset button (using the corrected ID)
const resetButtonElement = document.getElementById('resetBtn'); // Changed to 'resetBtn'

// Add an event listener to call resetButton and refreshCalculator when clicked
if (resetButtonElement) {
    resetButtonElement.addEventListener('click', () => {
        // Clear input field
        refreshCalculator();

        // Hide result div and clear its content
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.style.display = 'none';
            resultDiv.innerHTML = '';
        }

        // Reset the main "Calculate" button state
        resetButton();

        // Optional: Add a subtle animation to show the reset happened
        const container = document.querySelector('.container');
        if (container) {
            container.style.animation = 'resetPulse 0.3s ease';
            setTimeout(() => {
                container.style.animation = '';
            }, 300);
        }
    });
}


// Set max date for birthdate input to today
document.addEventListener('DOMContentLoaded', () => {
    // This ensures the DOM is fully loaded before trying to access elements
    document.getElementById('birthdate').setAttribute('max', new Date().toISOString().split('T')[0]);
});


// Add enter key support to the birthdate input
document.getElementById('birthdate').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});

// Initial state setup when the page loads
// This part was executing before the DOM was guaranteed to be ready
// Moved into DOMContentLoaded for safer execution
document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
    }
    resetButton(); // Reset the main calculate button to its original state
});