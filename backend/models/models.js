let Orders = []

let Meals = [
    {
        name: "Chicken Meal",
        required: 0,
        prepared: 0
    },
    {
        name: "Spicy Chicken Meal".replace(/\t/g, ''),
        required: 0,
        prepared: 0
    },
    {
        name: "Fish Meal",
        required: 0,
        prepared: 0
    },
    {
        name: "Spicy Fish Meal".replace(/\t/g, ''),
        required: 0,
        prepared: 0
    },
    {
        name: "Fries",
        required: 0,
        prepared: 0
    }
];

let Sandwiches = [
    {
        name: "Chicken Sandwich",
        required: 0,
        prepared: 0
    },
    {
        name: "Spicy Chicken Sandwich".replace(/\t/g, ''),
        required: 0,
        prepared: 0
    },
    {
        name: "Fish Sandwich",
        required: 0,
        prepared: 0
    },
    {
        name: "Spicy Fish Sandwich".replace(/\t/g, ''),
        required: 0,
        prepared: 0
    },
    {
        name: "Chicken Burger",
        required: 0,
        prepared: 0
    }
];



module.exports = { Orders, Meals, Sandwiches };
