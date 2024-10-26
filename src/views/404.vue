<template>
    <div class="landing-page">
        <div class="container">
            <!-- Main Heading -->

            <h1><span style="color: red;">404</span> Error</h1>

            <h2>Page not Found</h2>

            <!-- Subtext -->
            <p class="description mt-4">
                Sorry, the page you are looking for doesn’t exist or has been removed.
            </p>

            <!-- Sign Up Button -->
            <a href="/">
                <button class="signup-btn">Back to home</button>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPage",
};
</script>

<style scoped>
.landing-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0px 40px;
    text-align: center;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 750px;
}

h2 {
    font-size: 32px;
    letter-spacing: -2px;
    font-weight: 400;
}

.description {
    font-size: 1.2rem;
    margin-bottom: 40px;
    max-width: 800px;
    line-height: 1.5;
    color: #e0e0e0;
}

a {
    width: 100%;
}

.signup-btn {
    background-color: #1ed45f;
    border: none;
    color: #000;
    padding: 12px 30px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    font-weight: 700;
    cursor: pointer;
}

.signup-btn:hover {
    background-color: #000;
    color: #fff;
}


.signin-text {
    font-size: 1rem;
}

.signin-link {
    color: #1ED45F;
}

.signin-link:hover {
    text-decoration: underline !important;
}

@media (max-width: 768px) {
    h2 {
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .description {
        font-size: 18px;
        margin-bottom: 40px;
        max-width: 800px;
        line-height: 1.5;
        color: #A0A0A0;
    }

    .signup-btn {
        background-color: #1ED45F;
        /* Green background */
        border: none;
        color: #000;
        padding: 10px 30px;
        font-size: 1.2rem;
        width: 100%;
        max-width: 410px;
    }

}
</style>