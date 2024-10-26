<!-- src/views/ExpenseDashboard.vue -->
<template>
    <div>
        <h1>Expense Dashboard</h1>
        <ExpenseTable />
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useAuthStore } from "../stores";
import ExpenseTable from "../components/ExpenseTable.vue";

export default {
    components: {  ExpenseTable },
    setup() {
        const authStore = useAuthStore();

        onMounted(() => {
            authStore.fetchExpenses(); // Fetch expenses on component load
        });
    },
};
</script>