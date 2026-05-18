
const express = require('express');
const app = express();
app.use(express.json());

// In-memory database with realistic expiration dates for May 2026
let fridge = [
    { id: 1, name: "Milk", expiry_date: "2026-05-20", category: "Dairy" },
    { id: 2, name: "Spinach", expiry_date: "2026-05-28", category: "Produce" },
    { id: 3, name: "Chicken", expiry_date: "2026-05-19", category: "Meat" }
];

// 1. Root route
app.get('/', (req, res) => {
    res.send("Welcome to the Green Plate API! 🥗 Tracking food waste like a pro.");
});

// 2. Get all fridge items
app.get('/api/items', (req, res) => {
    res.json(fridge);
});

// 3. Smart Alert: Find items expiring in the next 3 days
app.get('/api/alerts', (req, res) => {
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);

    const expiringSoon = fridge.filter(item => {
        const expiry = new Date(item.expiry_date);
        return expiry >= today && expiry <= threeDaysFromNow;
    });

    res.json({
        message: "Cook these items immediately to prevent waste!",
        count: expiringSoon.length,
        items: expiringSoon
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Green Plate is running on port ${PORT}`));
    