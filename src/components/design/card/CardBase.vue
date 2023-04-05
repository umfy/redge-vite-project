<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  background-color: var(--color-light);
  box-shadow: 0px 5px 10px var(--color-shadow-light);
  margin-block: 1rem;
}
</style>
