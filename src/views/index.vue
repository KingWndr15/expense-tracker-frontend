<template>
  <div class="landing-page">
    <div class="container">
      <!-- Main Heading -->
      <h1>Expense vs Income Calculator</h1>

      <!-- Subtext -->
      <p class="description">
        Track your expenses and income effortlessly. Gain insights to improve your financial health with personalized
        tools and simple, intuitive features.
      </p>

      <!-- Sign Up Button -->
      <a href="/auth">
        <button class="signup-btn">Sign Up</button>
      </a>

      <!-- Sign In Text -->
      <p class="signin-text mt-1">
        Already have an account?
        <a href="#" class="signin-link">Sign in</a>
      </p>
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

h1 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 40px;
  max-width: 800px;
  line-height: 1.5;
  color: #A0A0A0;
}

a {
  width: 100%;
}

.signup-btn {
  background-color: #1ED45F;
  /* Green background */
  border: none;
  color: #000;
  padding: 12px 30px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  font-weight: 700;
  max-width: 410px;
  outline: none;
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
  h1 {
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
