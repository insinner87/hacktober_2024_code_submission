const SbookedSlots = {
    football: {}
};

// Set min and max date for the date input
function setDateLimits() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const todayString = today.toISOString().split('T')[0];
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    const dateInput = document.getElementById('date');
    dateInput.setAttribute('min', todayString);
    dateInput.setAttribute('max', tomorrowString);
}

// Function to set up booking for football
function setupFootballBooking() {
    document.getElementById('bookFootballButton').addEventListener('click', function() {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const court = document.getElementById('footballCourt').value;

        if (!date || !time || !court) {
            alert('Please select date, time slot, and court.');
            return;
        }

        const endTime = new Date(`${date}T${time}:00`);
        endTime.setHours(endTime.getHours() + 1);

        if (isCourtBooked('football', date, court, endTime)) {
            alert('This court is already booked for the selected time. Please choose another one.');
        } else {
            bookCourt('football', date, court, time, endTime);
            updateBookedSlots();
            alert('Slot booked successfully!');
        }
    });
}

// Function to check if a court is already booked
function isCourtBooked(sport, date, court, endTime) {
    const bookings = SbookedSlots[sport][court] || [];
    return bookings.some(booking => {
        const bookingEndTime = new Date(booking.endTime);
        return booking.date === date && bookingEndTime > new Date();
    });
}

// Function to book a court
function bookCourt(sport, date, court, time, endTime) {
    if (!SbookedSlots[sport][court]) {
        SbookedSlots[sport][court] = [];
    }
    SbookedSlots[sport][court].push({
        date: date,
        time: time,
        endTime: endTime.toISOString()
    });
}

// Function to update the list of booked slots
function updateBookedSlots() {
    const bookedFootballSlotsList = document.getElementById('bookedFootballSlots');
    bookedFootballSlotsList.innerHTML = '';

    for (const court in SbookedSlots.football) {
        SbookedSlots.football[court].forEach(booking => {
            const li = document.createElement('li');
            li.textContent = `${booking.date} - ${court} - ${booking.time} (Booked until ${new Date(booking.endTime).toLocaleTimeString()})`;
            bookedFootballSlotsList.appendChild(li);
        });
    }
}

// Call the setup function on page load
window.onload = function() {
    setupFootballBooking();
    setDateLimits();
};
