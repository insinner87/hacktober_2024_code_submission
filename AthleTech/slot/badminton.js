const SbookedSlots = {
    badminton: {}
};

// Function to set up booking for badminton
function setupBadmintonBooking() {
    document.getElementById('bookBadmintonButton').addEventListener('click', function() {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const court = document.getElementById('badmintonCourt').value;

        if (!date || !time || !court) {
            alert('Please select date, time slot, and court.');
            return;
        }

        const endTime = new Date(`${date}T${time}:00`);
        endTime.setHours(endTime.getHours() + 1);

        if (isCourtBooked('badminton', date, court, endTime)) {
            alert('This court is already booked for the selected time. Please choose another one.');
        } else {
            bookCourt('badminton', date, court, time, endTime);
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
    const bookedBadmintonSlotsList = document.getElementById('bookedBadmintonSlots');
    bookedBadmintonSlotsList.innerHTML = '';

    for (const court in SbookedSlots.badminton) {
        SbookedSlots.badminton[court].forEach(booking => {
            const li = document.createElement('li');
            li.textContent = `${booking.date} - ${court} - ${booking.time} (Booked until ${new Date(booking.endTime).toLocaleTimeString()})`;
            bookedBadmintonSlotsList.appendChild(li);
        });
    }
}

// Call the setup function on page load
window.onload = function() {
    setupBadmintonBooking();
    setDateLimits(); // Ensure this function is defined elsewhere or include it here
};
