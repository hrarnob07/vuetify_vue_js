<template>
  <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex xs12 md12 >
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Technician Registration</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout justify-center>
            <v-flex flat xs10 sm10>
              <v-card justify-center>
                <v-form @submit.prevent="store_technician" method="post">
                  <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Name"
                        v-model="techinican.name"
                        v-validate="'required|min:2'"
                        data-vv-as="Technician name" 
                        data-vv-name="name"
                        :error-messages="errors.collect('name')"
                      > 
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                   <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
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
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                   <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Mobile No"
                        v-model="techinican.emergency_contact"
                        v-validate="'required|numeric|min:10'"
                        data-vv-as="Mobile Number" 
                        data-vv-name="mobile_no"
                        placeholder="+880"
                        :error-messages="errors.collect('mobile_no')"
                      > 
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                   <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Address"
                        v-model="techinican.address1"
                        v-validate="'required|min:5'"
                        data-vv-as="Vehicle type" 
                        data-vv-name="address"
                        :error-messages="errors.collect('address')"
                        placeholder="Dhaka -bangladesh"
                      > 
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex sm6 xs12 md12 offset-sm1 offset-xm1>
                      <v-btn right class="primary" type="submit">Submit</v-btn>
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
  data()
        {
            return {
                techinican:{
                    name:'',
                    email:'',
                    emergency_contact:'',
                    address1:'',
                    role_name: 'technician',

                },

                response:'',
                snackbar:false,
                color:"success",
                text:"",
                timeout:6000,


                

            }
        },
  methods: {
    store_technician() {
        if(this.techinican.name==""){
            this.text="Please enter valid data";
            this.snackbar=true;
            this.color="error";
        }
        else{
             this.axios
                 .post('technician/create', this.techinican)
                 .then(response => {
                       this.response = response.data;
           
                       if(this.response.status !== 400)
                       {
                         this.color="success"; 
                         this.text="successfully vehicle type added";
                         this.snackbar=true;
                         
                         this.$router.push({ name: "technician.index"});      
                       }
              
                        else
                        {
                            this.text="Please Try agian latter";
                            this.snackbar=true;
                            this.color="error";
                       }
                     })
                    .catch(error => {
                            this.text="Please Try agian latter";
                            this.snackbar=true;
                            this.color="error";
                    })


           
           
        }
        
      
     
    }
  }
};
</script>
