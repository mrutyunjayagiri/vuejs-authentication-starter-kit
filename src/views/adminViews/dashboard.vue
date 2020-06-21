<template>
    <div>
        <h1>
            Hi, I am {{this.$store.state.authenticatedData.name}}
            <br>
            Welcome To Dashboard
        </h1>

        <h2>
            This is an authenticated page.
        </h2>
    </div>
</template>