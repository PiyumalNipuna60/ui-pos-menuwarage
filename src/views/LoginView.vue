<template>
  <div class="login-form-container">
    <Toast />
    <div class="login-form-container-left-side">
      <img class="left-side-image" src="/src/assets/images/login-image.jpg" alt="main-logo" />
    </div>
    <div class="login-form-container-right-side">
      <form class="form" @submit.prevent="handleLogin">
        <div class="login-header mb-5">
          <h2>USER LOGIN</h2>
        </div>
        <section class="username-field-container mb-4">
          <FloatLabel variant="on">
            <InputText id="username" v-model="userDetails.data.userName" />
            <label for="username">Enter your username</label>
          </FloatLabel>
        </section>

        <section class="password-field-container mb-3">
          <FloatLabel variant="on">
            <Password v-model="userDetails.data.password" :feedback="false" toggleMask />
            <label for="password">Enter your password</label>
          </FloatLabel>
        </section>

        <!-- <div class="mb-2">
          <Checkbox v-model="checked" binary class="mr-2" />
          <span class="span">Is Admin?</span>
        </div> -->

        <div class="mb-5">
          <span class="span forget-password" @click="forgetPassword">Forgot password?</span>
        </div>
        <Button label="LOGIN" icon="pi pi-lock" iconPos="right" @click="userLogin"></Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserAuthStore } from '@/stores/userAuth'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
// const checked = ref(false)

const { userDetails, hasError } = storeToRefs(useUserAuthStore())
const userAuthStore = useUserAuthStore()

onMounted(() => {})
const userLogin = async () => {
  try {
    // userDetails.data.userType = checked.value ? 'admin' : 'user'
    await userAuthStore.userLogin()
    if (hasError.value) {
      console.log('user logged in-', hasError.value, userAuthStore.hasError)
      toast.add({
        severity: 'error',
        summary: userDetails.value.error.title,
        detail: userDetails.value.error.description,
        life: 3000,
      })
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Error: ', error)
    toast.add({
      severity: 'error',
      summary: 'Error!',
      detail: error,
      life: 3000,
    })
  }
}

const forgetPassword = async () => {
  userAuthStore.logout()
  // router.push('/')
}
</script>

<style lang="scss">
.login-form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .login-header {
    font-weight: 700;
  }
  .p-inputtext,
  .p-password {
    width: 100%;
    height: 3rem;
  }
  .p-button {
    width: 100%;
  }

  .forget-password {
    color: rgb(27, 27, 116);
  }

  .forget-password:hover {
    color: rgb(35, 35, 175);
    cursor: pointer;
  }

  .blink-border {
    animation: blinkBorder 0.5s ease-in-out 3; /* Blink 3 times */
  }

  @keyframes blinkBorder {
    0% {
      border-color: red;
    }
    50% {
      border-color: transparent;
    }
    100% {
      border-color: red;
    }
  }
  .login-form-container {
    background: white;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: #151717;
  }
  .login-login-form-container-left-side {
    object-fit: cover;
  }
  .left-side-image {
    height: 99vh;
  }
  .login-form-container-right-side {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 42%;
    backdrop-filter: blur(10px);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .form button {
    align-self: flex-end;
  }
}
</style>
