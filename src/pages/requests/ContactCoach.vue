<template>
  <form @submit.prevent="submit">
    <div class="form-control">
      <label for="email">Your email</label>
      <input id="email" type="email" v-model.trim="email"/>
    </div>
    <div class="form-control">
      <label for="message">Mssage</label>
      <textarea id="message" type="message" rows="5" v-model.trim="message"/>
    </div>
    <p v-if="!formIsValid" class="errors">Please enter a valid email and non-empty message</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true
    };
  },
  methods: {
    submit() {
      this.formIsValid = true;
      this.validateForm();
      
      if(!this.formIsValid) {
        return;
      }

      const contactData = {
        coachId: this.id,
        email: this.email,
        message: this.message
      };
      
      this.$store.dispatch('requests/contactCoach', contactData);
      this.$router.replace('/coaches');
    },
    validateForm() {
      if(this.email === '' || !this.email.includes('@') || this.message === '') {
        this.formIsValid = false;
      }
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>