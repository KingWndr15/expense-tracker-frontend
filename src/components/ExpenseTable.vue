<template>
    <div class="expense-table">
        <div class="header-actions">
            <h2>Your Expenses</h2>
            <div class="cta">
                <button @click="openAddModal" class="btn-primary">Add Expense</button>
                <button @click="fetchExpenses(filters)" class="ml-2 btn-secondary">Refresh</button>
                <button @click="handleLogout" class="ml-2 btn-danger">Logout</button> <!-- New Logout Button -->
            </div>
        </div>

        <!-- Filters -->
        <div class="filters">
            <input type="date" v-model="filters.startDate" placeholder="Start Date" />
            <input type="date" v-model="filters.endDate" placeholder="End Date" />
            <select v-model="filters.category">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
            <button @click="applyFilters" class="btn-secondary">Apply Filters</button>
        </div>

        <div v-if="loading" class="loading">Loading expenses...</div>
        <div v-else-if="error" class="error">{{ error }}</div>

        <table v-if="showTable">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expense in expenses" :key="expense._id">
                    <td>{{ formatDate(expense.date) }}</td>
                    <td>{{ expense.description }}</td>
                    <td>{{ formatAmount(expense.amount) }}</td>
                    <td>{{ expense.category }}</td>
                    <td class="actions">
                        <button @click="editExpense(expense)" class="btn-edit">Edit</button>
                        <button @click="confirmDelete(expense._id)" class="btn-delete">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Add/Edit Modal -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>{{ editingExpense ? 'Edit' : 'Add' }} Expense</h3>
                <form @submit.prevent="saveExpense">
                    <div class="form-group">
                        <label>Amount:</label>
                        <input type="number" v-model="expenseForm.amount" required step="0.01" />
                    </div>
                    <div class="form-group">
                        <label>Category:</label>
                        <input type="text" v-model="expenseForm.category" required />
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <input type="text" v-model="expenseForm.description" />
                    </div>
                    <div class="form-group">
                        <label>Date:</label>
                        <input type="date" v-model="expenseForm.date" required />
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Save</button>
                        <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "../stores";
import { ref, onMounted } from 'vue';

export default {
    name: "ExpenseTable",

    data() {
        return {
            showModal: false,
            editingExpense: null,
            expenseForm: {
                amount: '',
                category: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
            },
            filters: {
                startDate: '',
                endDate: '',
                category: ''
            },
            authStore: useAuthStore(this.filters)
        };
    },

    computed: {
        categories() {
            return this.authStore.categories;
        },
        expenses() {
            return this.authStore.expenses;
        },
        showTable() {
            return this.expenses && this.expenses.length > 0;
        },
        loading() {
            return this.authStore.loading;
        },
        error() {
            return this.authStore.error;
        }
    },

    methods: {
        async fetchExpenses(filters) {
            await this.authStore.fetchExpenses(filters);
        },

        async fetchCategories() {
            await this.authStore.fetchCategories();
        },

        applyFilters() {
            this.fetchExpenses(this.filters);
        },

        openAddModal() {
            this.editingExpense = null;
            this.expenseForm = {
                amount: '',
                category: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
            };
            this.showModal = true;
        },

        editExpense(expense) {
            this.editingExpense = expense;
            this.expenseForm = {
                amount: expense.amount,
                category: expense.category,
                description: expense.description,
                date: new Date(expense.date).toISOString().split('T')[0]
            };
            this.showModal = true;
        },

        async saveExpense() {
            try {
                if (this.editingExpense) {
                    await this.authStore.updateExpense(this.editingExpense._id, this.expenseForm);
                } else {
                    await this.authStore.addExpense(this.expenseForm);
                }
                this.closeModal();
                await this.fetchExpenses(this.filters);
            } catch (error) {
                console.error('Error saving expense:', error);
            }
        },

        async confirmDelete(id) {
            if (confirm('Are you sure you want to delete this expense?')) {
                try {
                    await this.authStore.deleteExpense(id);
                } catch (error) {
                    console.error('Error deleting expense:', error);
                }
            }
        },

        closeModal() {
            this.showModal = false;
            this.editingExpense = null;
        },

        async handleLogout() {
            this.authStore.logout(); // Call the logout action in the auth store
            this.$router.push('/auth/login');
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString();
        },

        formatAmount(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        }
    },


    mounted() {
        this.fetchCategories().then(() => {
            this.fetchExpenses(this.filters);
        });
    }
};
</script>

<style scoped>
.expense-table {
    margin: 20px;
    position: relative;
}

.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #242424;
    font-weight: bold;
}

.actions {
    display: flex;
    gap: 8px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {

    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.btn-primary {
    background-color: #4CAF50;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-secondary {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
}

.btn-danger {
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}


.btn-edit {
    background-color: #2196F3;
    color: white;
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-delete {
    background-color: #f44336;
    color: white;
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.loading,
.error {
    text-align: center;
    padding: 20px;
}

.error {
    color: #f44336;
}
</style>