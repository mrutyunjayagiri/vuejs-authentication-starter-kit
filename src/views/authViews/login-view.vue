<template>
  <div class="loginPage">
    <h1>Login Here</h1>

    <div>
      <p v-if="errorMessage !=''" class="erroText">{{errorMessage}}</p>

      <label for="fname">User Name:</label>
      <br />
      <input type="text" name="username" v-model="user.username" />
      <br />
      <br />
      <label for="lname">Password:</label>
      <br />
      <input type="password" name="password" v-model="user.password" />
      <br />
      <br />
      <button @click.stop="onLogin" v-if="!isLoading">LOGIN</button>
      <h2 v-else>Loading....</h2>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    user: {
      username: "",
      password: "",
      autoLogin: true
    },
    errorMessage: "",
    isLoading: false
  }),
  methods: {
    async onLogin() {
      this.errorMessage = "";
      if (this.user.username != "" && this.user.password != "") {
        console.log(this.user);
        this.isLoading = true
        // Dispatched To onLogin()
        await this.$store.dispatch("onLogin", this.user);

        // Get Response=> Contains Either user or error
        const userResponse = this.$store.getters.userResponse;
        console.log(userResponse);
        this.isLoading = false;
        this.reset();
         if (userResponse.error) {
          this.errorMessage = userResponse.error.errorMessage;
          return;
        }
        console.log("User Data: ", userResponse.user);
        this.$router.push('/dashboard')
      } else {
        this.errorMessage = "Fields can not be blank";
      }
    },
    reset() {
      this.user.username = ''
      this.user.password = ''
    }
  }
};
</script>

<style>
.erroText {
  color: firebrick;
}
</style>