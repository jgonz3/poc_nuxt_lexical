<!--suppress CssUnusedSymbol -->

<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/preview">Preview</NuxtLink>
    </nav>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid gray;
}

nav a {
  text-decoration: none;
  color: #003c8f;

  &.router-link-exact-active {
    color: #1976d2;
    text-decoration: underline;
  }
}
</style>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
}
</style>
