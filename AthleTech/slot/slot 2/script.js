const SbookedSlots = {
    badminton: {},
    basketball: {}
}; // Object to hold booked slots for each court

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

// Call the function to set date limits on page load
window.onload = setDateLimits;

// Event listener for booking a badminton court
document.getElementById('bookBadmintonButton').addEventListener('click', function() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const court = document.getElementById('badmintonCourt').value;

    if (!date || !time || !court) {
        alert('Please select date, time slot, and court.');
        return;
    }

    const endTime = new Date(`${date}T${time}:00`);
    endTime.setHours(endTime.getHours() + 1); // Add 1 hour for booking duration

    if (isCourtBooked('badminton', date, court, endTime)) {
        alert('This court is already booked for the selected time. Please choose another one.');
    } else {
        bookCourt('badminton', date, court, time, endTime);
        updateBookedSlots();
        alert('Slot booked successfully!');
    }
});

// Event listener for booking a basketball court
document.getElementById('bookBasketballButton').addEventListener('click', function() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value; // Using the same time input
    const court = document.getElementById('basketballCourt').value;

    if (!date || !time || !court) {
        alert('Please select date, time slot, and court.');
        return;
    }

    const endTime = new Date(`${date}T${time}:00`);
    endTime.setHours(endTime.getHours() + 1); // Add 1 hour for booking duration

    if (isCourtBooked('basketball', date, court, endTime)) {
        alert('This court is already booked for the selected time. Please choose another one.');
    } else {
        bookCourt('basketball', date, court, time, endTime);
        updateBookedSlots();
        alert('Slot booked successfully!');
    }
});

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
    const bookedBasketballSlotsList = document.getElementById('bookedBasketballSlots');

    bookedBadmintonSlotsList.innerHTML = '';
    bookedBasketballSlotsList.innerHTML = '';

    // Update booked badminton slots
    for (const court in SbookedSlots.badminton) {
        SbookedSlots.badminton[court].forEach(booking => {
            const li = document.createElement('li');
            li.textContent = `${booking.date} - ${court} - ${booking.time} (Booked until ${new Date(booking.endTime).toLocaleTimeString()})`;
            bookedBadmintonSlotsList.appendChild(li);
        });
    }

    // Update booked basketball slots
    for (const court in SbookedSlots.basketball) {
        SbookedSlots.basketball[court].forEach(booking => {
            const li = document.createElement('li');
            li.textContent = `${booking.date} - ${court} - ${booking.time} (Booked until ${new Date(booking.endTime).toLocaleTimeString()})`;
            bookedBasketballSlotsList.appendChild(li);
        });
    }
}
