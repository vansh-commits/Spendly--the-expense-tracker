// Fetch stored data from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
let totalExpense = 0; 
let totalSavings = parseFloat(localStorage.getItem('totalSavings')) || 0;

// Function to update the total expense
function updateTotalExpense(amount, isAdding = true) {
    // If adding expense, increase the total expense
    if (isAdding) {
        totalExpense += parseFloat(amount);
    } 
    // If deleting expense, decrease the total expense
    else {
        totalExpense -= parseFloat(amount);
    }

    // Store the updated totalExpense in localStorage
    localStorage.setItem('totalExpense', totalExpense);
    
    // Update the expense display on the page
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
    
    // Update total savings as well
    updateTotalSavings();
}

// Function to update total savings (Income - Expense)
function updateTotalSavings() {
    totalSavings = totalIncome - totalExpense;
    localStorage.setItem('totalSavings', totalSavings); // Save to localStorage
    document.getElementById('total-savings').textContent = totalSavings.toFixed(2);
}

// Function to update the total income from local storage
function updateTotalIncome() {
    totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
}

// Function to ask and store total income
function setTotalIncome() {
    let income = prompt("Please enter your total income:");
    if (income && !isNaN(income)) {
        totalIncome = parseFloat(income);
        localStorage.setItem('totalIncome', totalIncome);
        document.getElementById('total-income').textContent = totalIncome.toFixed(2);
        updateTotalSavings();
    } else {
        alert("Please enter a valid number for income.");
    }
}

// Function to add expense
function addExpense() {
    let expName = document.getElementById("expense-name").value;
    let expAmount = document.getElementById("expense-amount").value;
    let expenseType = document.getElementById("expenseType").value;

    // Make sure that all fields are filled in
    if (expenseType !== "none" && expName && expAmount) {
        // Add the expense to the expense cards section
        let par = document.getElementById("expense-cards");
        par.innerHTML += `
            <div class="card">
                <div class="formSec">
                    <label for="expense-name">Expense Name</label><br>
                    <input type="text" name="expense-name" disabled="true" value="${expName}"><br>
                    <label for="expense-amount">Expense Amount</label><br>
                    <input type="number" name="expense-amount" disabled="true" value="${expAmount}"><br>
                    <label for="expense-type">Type of Expense</label><br>
                    <select name="expenseType" disabled="true">
                        <option value="food" ${expenseType === "food" ? "selected" : ""}>Food</option>
                        <option value="transportation" ${expenseType === "transportation" ? "selected" : ""}>Transportation</option>
                        <option value="utilities" ${expenseType === "utilities" ? "selected" : ""}>Utilities</option>
                        <option value="rent" ${expenseType === "rent" ? "selected" : ""}>Rent</option>
                        <option value="entertainment" ${expenseType === "entertainment" ? "selected" : ""}>Entertainment</option>
                        <option value="healthcare" ${expenseType === "healthcare" ? "selected" : ""}>Healthcare</option>
                        <option value="education" ${expenseType === "education" ? "selected" : ""}>Education</option>
                        <option value="subscriptions" ${expenseType === "subscriptions" ? "selected" : ""}>Subscriptions</option>
                        <option value="shopping" ${expenseType === "shopping" ? "selected" : ""}>Shopping</option>
                    </select>
                    <button onclick="deleteExpense(this)" id="delete_expense">Delete Expense</button>
                </div>
            </div>`;

        // Save the new expense to the expenses array and store it in localStorage
        expenses.push({ expName, expAmount, expenseType });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Update the total expense and total savings
        updateTotalExpense(expAmount);
    }
}

// Function to delete expense
function deleteExpense(button) {
    let card = button.closest('.card'); // Find the parent card of the button clicked
    let expName = card.querySelector('input[name="expense-name"]').value;
    let expAmount = card.querySelector('input[name="expense-amount"]').value;

    // Remove the expense from the expenses array
    expenses = expenses.filter(exp => exp.expName !== expName || exp.expAmount !== expAmount);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Remove the card from the UI
    card.remove();

    // Update the total expense and total savings
    updateTotalExpense(expAmount, false); // Decrease the total expense when deleted
}

// Function to create the stored expenses on page load
function loadStoredExpenses() {
    let expenseCardsContainer = document.getElementById("expense-cards");

    // Reset totalExpense to 0 before recalculating
    totalExpense = 0;

    // Create and display expense cards from stored expenses
    expenses.forEach(exp => {
        expenseCardsContainer.innerHTML += `
            <div class="card">
                <div class="formSec">
                    <label for="expense-name">Expense Name</label><br>
                    <input type="text" name="expense-name" disabled="true" value="${exp.expName}"><br>
                    <label for="expense-amount">Expense Amount</label><br>
                    <input type="number" name="expense-amount" disabled="true" value="${exp.expAmount}"><br>
                    <label for="expense-type">Type of Expense</label><br>
                    <select name="expenseType" disabled="true">
                        <option value="food" ${exp.expenseType === "food" ? "selected" : ""}>Food</option>
                        <option value="transportation" ${exp.expenseType === "transportation" ? "selected" : ""}>Transportation</option>
                        <option value="utilities" ${exp.expenseType === "utilities" ? "selected" : ""}>Utilities</option>
                        <option value="rent" ${exp.expenseType === "rent" ? "selected" : ""}>Rent</option>
                        <option value="entertainment" ${exp.expenseType === "entertainment" ? "selected" : ""}>Entertainment</option>
                        <option value="healthcare" ${exp.expenseType === "healthcare" ? "selected" : ""}>Healthcare</option>
                        <option value="education" ${exp.expenseType === "education" ? "selected" : ""}>Education</option>
                        <option value="subscriptions" ${exp.expenseType === "subscriptions" ? "selected" : ""}>Subscriptions</option>
                        <option value="shopping" ${exp.expenseType === "shopping" ? "selected" : ""}>Shopping</option>
                    </select>
                    <button onclick="deleteExpense(this)" id="delete_expense">Delete Expense</button>
                </div>
            </div>`;

        // Update total expense for the added expenses on reload
        totalExpense += parseFloat(exp.expAmount);
    });

    // Store the updated totalExpense in localStorage
    localStorage.setItem('totalExpense', totalExpense);

    // Display the current total expense after loading the expenses
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);

    // Update total savings after loading expenses
    updateTotalSavings();
}

// Initial setup when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Check if the total income is set, if not prompt user to set it
    if (!localStorage.getItem('totalIncome')) {
        setTotalIncome(); // Ask the user for total income if not already stored
    } else {
        // Update total income from local storage if available
        updateTotalIncome();
    }

    // Load stored expenses
    loadStoredExpenses();
});