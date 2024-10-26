document.getElementById('bmi-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the weight and height values
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Calculate BMI
    const bmi = weight / (height * height);
    let category = '';

    // Determine the BMI category
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    // Display the result
    document.getElementById('result').innerHTML = `
        <h2>Your BMI: ${bmi.toFixed(2)} (${category})</h2>
        <h3>Recommended Plans:</h3>
        <p>${getFitnessPlan(category)}</p>
    `;
});

// Function to suggest sports and yoga plans based on BMI category
function getFitnessPlan(category) {
    switch (category) {
        case 'Underweight':
            return 'Focus on strength training and a balanced diet to gain weight.';
        case 'Normal weight':
            return 'Maintain a balanced routine with a mix of cardio and yoga.';
        case 'Overweight':
            return 'Engage in aerobic activities and consider yoga for flexibility.';
        case 'Obesity':
            return 'Consult a healthcare provider for personalized plans.';
        default:
            return '';
    }
}
