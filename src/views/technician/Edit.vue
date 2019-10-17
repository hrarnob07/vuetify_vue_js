<template>
  <v-container pa-0 ma-0 style="max-width:100%">
    <v-layout>
      <v-flex xs12 md12 >
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Technician Edit</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout justify-center>
            <v-flex flat xs12 sm12>
              <v-card justify-center flat>
                <v-form @submit.prevent="store" method="post">
                  <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Name"
                        v-model="techinican.name"
                        v-validate="'required|min:2'"
                        data-vv-as="Technician name" 
                        data-vv-name="name"
                        :error-messages="errors.collect('name')"
                      > 
                       <v-icon slot="append" small color="black" >edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                   <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Email"
                        v-model="techinican.email"
                        v-validate="'required|email'"
                        data-vv-as="Technician email" 
                        data-vv-name="email"
                        placeholder="zz@zz.com"
                        :error-messages="errors.collect('email')"
                      > 
                      <v-icon slot="append" small color="black" >edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                   <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Mobile No"
                        v-model="techinican.emergency_contact"
                        v-validate="'required|numeric|min:10'"
                        data-vv-as="Mobile Number" 
                        data-vv-name="emergency_contact"
                        placeholder="+880"
                        :error-messages="errors.collect('emergency_contact')"
                      > 
                      <v-icon slot="append" small color="black" >edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                   <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Address"
                        v-model="techinican.address1"
                        v-validate="'required|min:5'"
                        data-vv-as="Vehicle type" 
                        data-vv-name="address1"
                        :error-messages="errors.collect('address1')"
                        placeholder="Dhaka -bangladesh"
                      > 
                      <v-icon slot="append" small color="black" >edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                        <v-layout align="end" class="justify-end">
                                <v-btn right :loading="loading" :disabled="loading" class="primary" type="submit">Submit</v-btn>
                        </v-layout>
                     
                    </v-flex>
                    <v-flex sx6>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
 
    <v-snackbar
      v-model="snackbar" :color="color" bottom right :timeout=timeout >
      {{ text }}
      <v-btn  color="white" flat @click="snackbar = false"> Close </v-btn>
    </v-snackbar>


  </v-container>
</template>

<script>
export default {
  data() {
    return {
      techinican: {
        users_id: "",
        name: "",
        email: "",
        emergency_contact: "",
        address1: "",
        role_name: "technician"
      },

      id: this.$route.params.id
    };
  },
  methods: {
    edit() {
      this.techinican.users_id = this.id;
      this.axios
        .get(`technician/edit/${this.id}`)
        .then(response => {
          console.log(response.data.technician);
          this.techinican.name = response.data.technician.name;

          this.techinican.email = response.data.technician.email;
          this.techinican.emergency_contact =
            response.data.technician.emergency_contact;
          this.techinican.address1 = response.data.technician.address1;
        })
        .catch(error => {
          console.warn("API ! " + error);
        });
    },

    store() {
      console.log(this.techinican);

      this.axios
        .post("technician/update", this.techinican)
        .then(response => {
          console.log(response);
          if (response.status !== 400) {
            this.$toast.success("Successfully update");
            // this.resetForm(this.techinican);
            this.$router.push({name:"technician.index"});
             }
         else {
            this.$toast.error("Try again");
          }
        })
        .catch(error => {
          this.$toast.error(error);
          console.warn("API ! " + error);
        });
    }
  },
  mounted() {
    this.edit();
  }
};
</script>
