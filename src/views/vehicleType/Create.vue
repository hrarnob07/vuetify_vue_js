<template>
  <v-container pa-0 ma-0 style="max-width:100%" >
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Vehicle Type Create</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout justify-center>
            <v-flex flat xs10 sm10>
              <v-card justify-center flat>
                <v-form @submit.prevent="store_vehicle_type" method="post">
                  <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="vehicle type"
                        v-model="vehicle.title"
                        v-validate="'required|alpha|min:2'"
                        data-vv-as="Vehicle type" 
                        data-vv-name="vehicle_type"
                        placeholder="new"
                        :error-messages="errors.collect('vehicle_type')"
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
                
                vehicle:
                {
                    title:'',
                },

                response:'',
                snackbar:false,
                color:"success",
                text:"",
                timeout:6000,


                

            }
        },
  methods: {
    store_vehicle_type() {
        if(this.vehicle.title==""){
            this.text="Please enter vehicle type";
            this.snackbar=true;
            this.color="error";
        }
        else{
             this.axios
                 .post('vehicle-types/store', this.vehicle)
                 .then(response => {
                       this.response = response.data;
           
                       if(this.response.status !== 400)
                       {
                         this.color="success"; 
                         this.text="successfully vehicle type added";
                         this.snackbar=true;
                         
                         this.$router.push({
                                  name: "vehicleType.index"});      
                       }
              
                        else
                        {
                            this.text="Please Try agian latter";
                            this.snackbar=true;
                            this.color="error";
                       }
                     })
                    .catch(error => {
                        console.warn('API ! ' + error)
                    })


           
           
        }
        
      
     
    }
  }
};
</script>
