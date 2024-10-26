<template>
    <div class="signup-container">
        <h1>Create Free Account</h1>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="">Email</label>
                <input type="email" v-model="email" placeholder="elonmusk@scrubby.com" required />
            </div>

            <div class="form-group">
                <label for="">Password</label>
                <input type="password" v-model="password" placeholder="********" required />
            </div>

            <button type="submit" class="btn-signup">Sign Up</button>
        </form>

        <p class="signin-text">
            Already have an account?
            <a href="/auth/login" class="signin-link">Sign in</a>
        </p>
    </div>
</template>

<script>
import { useAuthStore } from '../../stores/index'; // Make sure the path is correct

export default {
    data() {
        return {
            email: "",
            password: "",
            signupError: null // To capture any signup errors
        };
    },
    methods: {
        async handleSubmit() {
            const authStore = useAuthStore();
            this.signupError = null; // Reset error state

            try {
                // Make the signup request to the backend
                await authStore.signup({ email: this.email, password: this.password });
                // Optionally, redirect or show success message
                this.$router.push('/auth/login'); // Redirect to login after signup
            } catch (error) {
                this.signupError = error.response?.data?.error || "Signup failed.";
                console.error("Signup error:", this.signupError);
            }
        }
    }
};
</script>

<style scoped>
.signup-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    padding: 0px 40px;
}

h1 {
    font-size: 32px;
    letter-spacing: -2px;
    font-weight: 600;
    margin-bottom: 60px;
}

form {
    width: 100%;
    max-width: 500px;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px; 
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #111111;
    color: #fff;
    font-size: 1rem;
    outline: none;
    border: 1.5px solid #161616;
    transition: .2s ease-in-out;
}

input::placeholder {
    color: #888;
}

input:hover, input:focus {
    border: 2px solid #1b1b1b;
}

.btn-signup {
    background-color: #1ed45f;
    border: none;
    color: #000;
    padding: 12px 30px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    font-weight: 700;
}

.btn-signup:hover {
    background-color: #000;
    color: #fff;
}

.signin-text {
    font-size: 1rem;
    margin-top: 20px;
}

.signin-link {
    color: #1ed45f !important;
}


@media (max-width: 768px) {
    h1 {
        font-size: 30px;
    }

    .description {
        font-size: 18px;
        margin-bottom: 40px;
        color: #a0a0a0;
    }

    .btn-signup {
        padding: 10px 30px;
        font-size: 1.2rem;
    }
}
</style>