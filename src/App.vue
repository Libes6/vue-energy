<template>
  <div class="container">
    <nav class="navigation">
      <router-link to="/">Список баночек</router-link>
      <router-link to="/add">Добавить баночку</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: var(--color-text);
  font-size: 16px;
}
nav a:hover {
  color: #42b983;
}
.navigation {
}
</style>
