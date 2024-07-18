<template>
  <header class="container add-city">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i class="fas fa-edit"></i>
        <i class="fas fa-sync"></i>
        <i class="fas fa-plus"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
}
header {
  nav {
    display: flex;
    color: white;
    padding: 30px 0;
    justify-content: space-between;
  }

  .right {
    i {
      font-size: 20px;
    }

    i:nth-child(2),
    i:nth-child(3) {
      margin-left: 16px;
    }
  }
}
</style>
