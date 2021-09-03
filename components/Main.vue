<template>
  <div class="main">
    <TopBar />
    <Agenda />
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  padding: 24px 125px;
  max-width: 1500px;

  .logo {
    width: 300px;
  }
  .title {
    color: black;
  }

  .text {
    margin-bottom: 1rem;
    max-width: 400px;
  }
}
@media (max-width: 1200px) {
  .main {
    padding: 24px;
  }
}
</style>
