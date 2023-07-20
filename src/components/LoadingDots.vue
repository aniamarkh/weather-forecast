<template>
  <div class="loader">
    <div class="loader__dot"></div>
    <div class="loader__dot"></div>
    <div class="loader__dot"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_config.scss';
.loader {
  width: 100%;
  height: 100%;
  @include flex-row;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

.loader__dot {
  background: #ffffff;
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  animation: bounce 1.4s infinite ease-in-out;
  animation-fill-mode: both;
}

.loader div:nth-child(1) {
  animation-delay: -0.3s;
}

.loader div:nth-child(2) {
  animation-delay: -0.15s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0;
  }
  40% {
    transform: scale(1);
    opacity: 100;
  }
}
</style>
