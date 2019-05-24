<template>
  <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Vehicle Type Edit</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout justify-center>
            <v-flex flat xs10 sm10>
              <v-card justify-center>
                <v-form @submit.prevent="store_vehicle_type">
                  <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="vehicle type"
                        v-model="vehicle.title"
                        v-validate="'required|alpha|min:2'"
                        data-vv-as="Vehicle type" 
                        data-vv-name="vehicle_type"
                        :error-messages="errors.collect('vehicle_type')"
                      >
                        
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex sm6 xs12 md12 offset-sm1 offset-xm1>
                      <v-btn right class="primary" type="submit">Update</v-btn>
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
                response:"",
                id: this.$route.params.id,
                snackbar:false,
                color:"success",
                timeout:6000,
                

            }
        },
  methods: {

       edit()
            {
                this.axios
                .get(`vehicle-types/edit/${this.id}`)
                .then(response => {
                    this.vehicle.title = response.data.vehicleType.title;
                    console.log(this.vehicleType);
                })
                .catch(error => {
                    console.warn('API ! ' + error)
                })
            },
    store_vehicle_type() {
        if(this.vehicle.title==""){
            this.text="Please enter vehicle type";
            this.snackbar=true;
            this.color="error";
        }
        else{
             this.axios
                    .post(`vehicle-types/update/${this.id}`, this.vehicle)
                    .then(response => {
                       
                        this.response = response.data;
                        if(this.response.status !== 400){
                         this.text="Please enter vehicle type";
                         this.snackbar=true;
                         this.color="success";
                         alert("updated");
                         this.$router.push({  name: "vehicleType.index" }); 

                        }else {
                           this.text=" Vehicle type not updated.";
                           this.snackbar=true;
                           this.color="error";
                        }
                    })
                    .catch(error => {
                        console.warn('API ! ' + error)
                    })
                     
        }     
    }
  },
  mounted()
  {
      this.edit();
  }
};
</script>
