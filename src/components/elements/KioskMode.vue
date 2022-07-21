<template>
  <ModalView
    :visible="isInactive"
    :heading="$t('elements.kiosk-mode.heading')"
    :description="$tc('elements.kiosk-mode.description', secondsTilReset)"
    :buttons="[
      {
        caption: this.$t('elements.kiosk-mode.reset'),
        theme: 'neutral',
        eventName: 'reset',
      },
      {
        caption: this.$t('elements.kiosk-mode.resume'),
        theme: 'primary',
        eventName: 'resume',
      },
    ]"
    icon="undo"
    width="slim"
    @reset="reset"
    @resume="resume"
  >
  </ModalView>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  name: 'KioskMode',
  props: {
    threshold: {
      type: Number,
      default: 1000 * 60 * 3, // 3 min
    },
    countdown: {
      type: Number,
      default: 60, // seconds
    },
  },
  data() {
    return {
      isInactive: false,
      userActivityTimeout: null,
      countdownInterval: null,
      secondsTilReset: null,
    };
  },
  methods: {
    resetUserActivityTimeout: throttle(function resetUserActivity() {
      clearTimeout(this.userActivityTimeout);
      if (this.isInactive) {
        return; // already visible
      }
      this.userActivityTimeout = setTimeout(() => {
        this.isInactive = true;
        this.startCountdown();
      }, this.threshold);
    }, 250),
    startCountdown(seconds = null) {
      if (seconds) {
        this.secondsTilReset = seconds;
      } else {
        this.secondsTilReset = this.countdown;
      }
      this.countdownInterval = setInterval(() => {
        this.secondsTilReset -= 1;
        if (this.secondsTilReset <= 0) {
          this.reset();
        }
      }, 1000);
    },
    clearCountdown() {
      clearInterval(this.countdownInterval);
    },
    reset() {
      window.scrollTo({
        top: 0,
      });
      window.location.reload();
    },
    resume() {
      this.clearCountdown();
      this.isInactive = false;
    },
  },
  beforeMount() {
    window.addEventListener('mousemove', this.resetUserActivityTimeout);
    window.addEventListener('scroll', this.resetUserActivityTimeout);
    window.addEventListener('keydown', this.resetUserActivityTimeout);
    window.addEventListener('resize', this.resetUserActivityTimeout);
    window.addEventListener('touchstart', this.resetUserActivityTimeout);
    this.bus.on('reset', ({ seconds }) => {
      if (typeof seconds === 'number' && seconds > 0) {
        this.isInactive = true;
        return this.startCountdown(seconds);
      }
      return this.reset();
    });
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.userActivityThrottler);
    window.removeEventListener('scroll', this.userActivityThrottler);
    window.removeEventListener('keydown', this.userActivityThrottler);
    window.removeEventListener('resize', this.userActivityThrottler);
    window.removeEventListener('touchstart', this.resetUserActivityTimeout);
    clearTimeout(this.userActivityTimeout);
  },
};
</script>
