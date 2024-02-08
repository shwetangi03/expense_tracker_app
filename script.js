document.addEventListener('DOMContentLoaded', function () {
    // Remove existing expenses data on page refresh
    localStorage.removeItem('expenses');

    // Function to render expenses in the list
    function renderExpenses() {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.ExpenseAmount} - ${expense.Description} - ${expense.category}`;

            const deleteButton = document.createElement('input');
            deleteButton.type = 'button';
            deleteButton.value = 'Delete';
            deleteButton.onclick = () => {
                expenses.splice(index, 1);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                renderExpenses();
            };

            const editButton = document.createElement('input');
            editButton.type = 'button';
            editButton.value = 'Edit';
            editButton.onclick = () => {
                expenses.splice(index, 1);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                renderExpenses();

                document.getElementById('ExpenseAmount').value = expense.ExpenseAmount;
                document.getElementById('Description').value = expense.Description;
                document.getElementById('category').value = expense.category;
            };

            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
            userList.appendChild(listItem);
        });
    }

    // Function to handle expense form submission
    function handleFormSubmit(event) {
        event.preventDefault();

        const expenseAmount = document.getElementById('ExpenseAmount').value;
        const description = document.getElementById('Description').value;
        const category = document.getElementById('category').value;

        if (expenseAmount && description && category) {
            const newExpense = {
                ExpenseAmount: expenseAmount,
                Description: description,
                category: category
            };

            expenses.push(newExpense);

            // Save expenses to local storage
            localStorage.setItem('expenses', JSON.stringify(expenses));

            // Render the updated list
            renderExpenses();

            // Clear the form fields
            document.getElementById('ExpenseAmount').value = '';
            document.getElementById('Description').value = '';
            document.getElementById('category').selectedIndex = 0;
        }
    }

    // Load existing expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Initial render of expenses
    renderExpenses();

    // Attach the expense form submission handler
    document.querySelector('form').addEventListener('submit', handleFormSubmit);
});