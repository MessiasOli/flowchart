<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Registrar Insumo</md-dialog-title>
    
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">

          <md-card-content>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('id')">
                <label for="id">Identificação</label>
                <md-input name="id" id="id" autocomplete="given-description" v-model="form.id" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.id.required">Indentificação é necessária</span>
                <span class="md-error" v-else-if="!$v.form.id.minlength">Identificação invalida</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('description')">
                <label for="description">Descrição</label>
                <md-input name="description" id="description" autocomplete="given-name" v-model="form.description" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.description.required">Descrição é necessária</span>
                <span class="md-error" v-else-if="!$v.form.description.minlength">Descrição inválida</span>
              </md-field>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-50">
                <md-field :class="getValidationClass('specificValue')">
                  <label for="specific-value">Preço</label>
                  <md-input name="specific-value" id="specific-value" autocomplete="family-name" v-model="form.specificValue" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.specificValue.required">Valor específico é necessário</span>
                  <span class="md-error" v-else-if="!$v.form.specificValue.minlength">Invalid last name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-50">
                <md-field :class="getValidationClass('unitMensurement')">
                  <label for="specific-value">Unidade</label>
                  <md-input name="specific-value" id="specific-value" autocomplete="family-name" v-model="form.unitMensurement" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.unitMensurement.required">Valor específico é necessário</span>
                  <span class="md-error" v-else-if="!$v.form.unitMensurement.minlength">Invalid last name</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-50">
                <md-field :class="getValidationClass('specificValue')">
                  <label for="specific-value">Valor específico</label>
                  <md-input name="specific-value" id="specific-value" autocomplete="family-name" v-model="form.specificValue" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.specificValue.required">Valor específico é necessário</span>
                  <span class="md-error" v-else-if="!$v.form.specificValue.minlength">Invalid last name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-50">
                <md-field :class="getValidationClass('specificUnit')">
                  <label for="specific-unit">Unidade específico</label>
                  <md-input type="specific-unit" name="specific-unit" id="specific-unit" autocomplete="specific-unit" v-model="form.specificUnit" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.specificUnit.required">Unidade específica é necessária.</span>
                  <span class="md-error" v-else-if="!$v.form.specificUnit.specificUnit">Unidade específica invalida</span>
                </md-field>
              </div>
          </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />
        </md-card>

        <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      </form>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button @click="showDialog = true" class="md-fab md-primary">
      <md-icon>+</md-icon>
    </md-button>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'

  export default {
    name: 'DialogCustom',
    mixins: [validationMixin],
    data: () => ({
      showDialog: false,
      form: {
        id: null,
        description: null,
        price: null,
        unitMensurement: null,
        specificValue: null,
        specificUnit: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        id:{
          require: true,
        },
        description: {
          required: true,
          minLength: 3
        },
        price: {
          required: true,
          minLength: 3
        },
        unitMensurement: {
          required: true,
          minLength: 3
        },
        specificValue: {
          required: true,
          minLength: 3
        },
        specificUnit: {
          required: true,
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      clearForm () {
        this.$v.$reset()
        this.form.description = null
        this.form.specificValue = null
        this.form.age = null
        this.form.gender = null
        this.form.specificUnit = null
      }, 

      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.description} ${this.form.specificValue}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style>
  .md-dialog,.md-dialog-container {
    max-width: 768px;
  }

.md-dialog-container{
  margin: auto -200px auto 450px;
}

</style>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

</style>