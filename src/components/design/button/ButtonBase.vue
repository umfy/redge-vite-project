<template>
  <button>
      <slot></slot>
  </button>
</template>

<style scoped>
button {
    background: none;
    border: none;
    color: var(--color-primary-shade);
    font-size: 1rem;
}

button:hover {
    color: var(--color-primary);
    cursor: pointer;
}
</style>


