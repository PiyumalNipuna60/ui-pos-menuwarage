<template>
  <fieldset>
    <div
      v-if="errortype !== 'unauthorized' && errortype !== 'something_went_wrong'"
      class="flex align-items-center justify-content-center m-4"
    >
      <img src="/assets/images/default_error.png" alt="Default Error" />
    </div>
    <div>
      <span v-if="errortype === 'unauthorized'">
        <div class="grid">
          <div class="col-12 sm:col-6">
            <p class="error-title ml-6 mt-6">Unauthorized Access</p>
            <p class="error-desc ml-6">You do not have permission to view this page.</p>
          </div>
          <div class="col-12 sm:col-6">
            <div class="flex align-items-center justify-content-center m-4">
              <img src="/assets/images/unauthorized.png" alt="Unauthorized Access" />
            </div>
          </div>
        </div>
      </span>
      <span v-if="errortype === 'access_denied'">
        <p class="text-center md:text-center pt-3 text-base font-semibold">Access Denied</p>
        <p class="text-center md:text-center m-5 text-sm">
          You do not have access to this feature.
        </p>
      </span>
      <span v-if="errortype === 'api_error'">
        <p class="text-center md:text-center pt-3 text-base font-semibold">API Error</p>
        <p class="text-center md:text-center m-5 text-sm">
          Something went wrong while processing your request. Please try again later.
        </p>
      </span>
      <span v-if="errortype === 'something_went_wrong'">
        <div class="grid error-message">
          <div class="col-12 sm:col-6">
            <p class="error-title ml-6 mt-6">Something Went Wrong</p>
            <p class="error-desc ml-6">An unexpected error occurred. Please refresh the page.</p>
            <button class="p-button-success ml-6 mt-5" @click="refreshPage">Refresh Page</button>
          </div>
          <div class="col-12 sm:col-6">
            <div class="flex align-items-center justify-content-center m-4">
              <img src="/assets/images/something_went_wrong.png" alt="Something Went Wrong" />
            </div>
          </div>
        </div>
      </span>
      <span
        v-if="
          !['unauthorized', 'access_denied', 'api_error', 'something_went_wrong'].includes(
            errortype,
          )
        "
      >
        <p class="text-center md:text-center pt-3 text-base font-semibold">{{ errorTitle }}</p>
        <p class="text-center md:text-center m-5 text-sm">{{ errorDesc }}</p>
      </span>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Error Occurred',
    },
    description: {
      type: String,
      default: 'An unexpected error occurred.',
    },
    type: {
      type: String,
      default: 'unknown',
    },
  },
  data() {
    return {
      errortype: this.type,
      errorTitle: this.title,
      errorDesc: this.description,
    }
  },
  methods: {
    refreshPage() {
      window.location.reload()
    },
  },
}
</script>

<style lang="scss">
.error-message .p-button-success {
  font-size: 16px;
  font-weight: 500;
  width: 170px;
}
.error-title {
  font-size: 36px;
  font-weight: 400;
}
.error-desc {
  font-size: 18px;
  color: #555555;
}
@media screen and (max-width: 576px) {
  .error-title {
    font-size: 24px;
  }
  .error-desc {
    font-size: 16px;
  }
}
</style>

