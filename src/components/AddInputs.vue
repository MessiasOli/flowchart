<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Registrar Insumo</md-dialog-title>
    
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">

          <md-card-content>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('idmaterial')">
                <label for="id">Identificação</label>
                <md-input name="id" id="idmaterial" autocomplete="given-description" v-model="form.idmaterial" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.idmaterial.required">Indentificação é necessária</span>
                <span class="md-error" v-else-if="!$v.form.idmaterial.minlength">Identificação invalida</span>
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
                <md-field :class="getValidationClass('price')">
                  <label for="price">Preço</label>
                  <md-input name="price" id="price" autocomplete="family-name" v-model.number="form.price" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.price.required">Valor específico é necessário</span>
                  <span class="md-error" v-else-if="!$v.form.price.minlength">Invalid last name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-50">
                <md-field :class="getValidationClass('unitmensurement')">
                  <label for="unitmensurement">Unidade</label>
                  <md-input name="unitmensurement" id="unitmensurement" autocomplete="family-name" v-model="form.unitmensurement" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.unitmensurement.required">Valor específico é necessário</span>
                  <span class="md-error" v-else-if="!$v.form.unitmensurement.minlength">Invalid last name</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-50">
                <md-field :class="getValidationClass('specificValue')">
                  <label for="specific-value">Valor específico</label>
                  <md-input name="specific-value" id="specific-value" autocomplete="family-name" v-model.number="form.specificvalue" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.specificvalue.required">Valor específico é necessário</span>
                  <span class="md-error" v-else-if="!$v.form.specificvalue.minlength">Invalid last name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-50">
                <md-field :class="getValidationClass('specificunit')">
                  <label for="specific-unit">Unidade específico</label>
                  <md-input type="specific-unit" name="specific-unit" id="specific-unit" autocomplete="specific-unit" v-model="form.specificunit" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.specificunit.required">Unidade específica é necessária.</span>
                  <span class="md-error" v-else-if="!$v.form.specificunit.specificUnit">Unidade específica invalida</span>
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
        <md-button class="md-primary" @click="saveMaterial">Save</md-button>
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

    props: ["register, idArea"],

    data: () => ({
      showDialog: false,
      form: {
        idarea: null,
        idmaterial: null,
        description: null,
        price: null,
        unitmensurement: null,
        specificvalue: null,
        specificunit: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        idmaterial:{
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
        unitmensurement: {
          required: true,
          minLength: 3
        },
        specificvalue: {
          required: true,
          minLength: 3
        },
        specificunit: {
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
        this.form.idmaterial = null
        this.form.description = null
        this.form.price = null
        this.form.unitmensurement = null
        this.form.specificvalue = null
        this.form.specificunit = null
      }, 

      saveMaterial () {
        this.$emit("register", this.form);
        this.clearForm();
        this.showDialog = false;
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