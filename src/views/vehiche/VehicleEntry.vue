<template>
  <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Vehicle Entries *</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout justify-center>
            <v-flex flat xs10 sm10>
              <v-card justify-center>
                <v-form @submit.prevent="store_vehicle" method="post">
                  

                   
                  <v-layout>
                    <v-flex xs10 sm10 offset-sm1 offset-xm1>
                     <v-menu style="width:100%"
                        offset-y
                        content-class="dropdown-menu"
                        >
                        <v-text-field
                            slot="activator"
                            label="Enter BRTA Registration No"
                            v-model="vehicle.brta_registration_no"
                            v-on:keyup="getdata()"
                            v-validate="'required|'"
                            data-vv-as="Vehicle brta registration no"
                            data-vv-name="brta_registration_no"
                            :error-messages="errors.collect('brta_registration_no')"
                          >
                         </v-text-field>
                        <v-card >
                           <v-list subheader  expand>
                              
                            <v-list-tile btn @click="vehicle.brta_registration_no=item.brta_registration_no;" v-for="(item, index) in seletedVehicle" :key="index">
                             
                            <v-list-tile-title btn @click="registration(index)">{{ item.brta_registration_no }}</v-list-tile-title>
                             
                          </v-list-tile>
                        </v-list>
                        </v-card>
                        </v-menu>
                    </v-flex>
                  </v-layout>

                  <!-- vehicle type and model -->
                  <v-layout>
                    <v-flex xs4 sm4 offset-sm1 offset-xm1>
                        <v-select
                        :items="vehicletype"
                        v-model="vehicle.vehicle_types_id"
                        label="Vehicle Type"
                        ></v-select>                      
                    </v-flex>

                    <v-flex xs4 sm4 offset-sm2 offset-xm2>
                      <v-text-field
                        type="text"
                        label="Model Name"
                        v-model="vehicle.model"
                        v-validate="'required|min:2'"
                        data-vv-as="Vehicle Model Name"
                        data-vv-name="model"
                        placeholder="BMW"
                        :error-messages="errors.collect('model')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <!-- Color  and model year -->
                  <v-layout>
                    <v-flex xs4 sm4 offset-sm1 offset-xm1>
                      <v-text-field
                        type="text"
                        label="Color"
                        v-model="vehicle.color"
                        v-validate="'required|min:2'"
                        data-vv-as="Vehicle color"
                        data-vv-name="color"
                        placeholder="white"
                        :error-messages="errors.collect('color')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>

                    <v-flex xs4 sm4 offset-sm2 offset-xm2>
                      <v-text-field
                        type="text"
                        label="Model Year"
                        v-model="vehicle.year"
                        v-validate="'required|numeric:2'"
                        data-vv-as="Vehicle Model year"
                        data-vv-name="year"
                        placeholder="2019"
                        :error-messages="errors.collect('year')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <!-- problem details -->
                  <v-layout>
                    <v-flex xs10 sm10 offset-sm1 offset-xm1>
                      <v-text-field
                        type="text"
                        label="Peoblem Details"
                        v-model="vehicle.problem_details"
                        v-validate="'required|min:2'"
                        data-vv-as="Vehicle problem details"
                        data-vv-name="problem_detials"
                        :error-messages="errors.collect('problem_detials')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <!-- mobile no  and Brought By -->
                  <v-layout>
                    <v-flex xs4 sm4 offset-sm1 offset-xm1>
                      <v-text-field
                        type="text"
                        label="Mobile NO"
                        v-model="vehicle.mobile_no"
                        v-validate="'required|numeric|min:10'"
                        data-vv-as="Vehicle owner Mobile No."
                        data-vv-name="mobile_no"
                        placeholder="+880"
                        :error-messages="errors.collect('mobile_no')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>

                    <v-flex xs4 sm4 offset-sm2 offset-xm2>
                      <v-text-field
                        type="text"
                        label="Brought By"
                        v-model="vehicle.brought_by"
                        v-validate="'required|min:2'"
                        data-vv-as="Vehicle Brought By Name"
                        data-vv-name="brought_by"
                        :error-messages="errors.collect('brought_by')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <!-- Assign to no  and Customer Name -->
                  <v-layout>
                    <v-flex xs4 sm4 offset-sm1 offset-xm1>
                       <v-select
                        :items="technicians"
                        v-model="vehicle.mechanic_id"
                        label="Assign to Technician"
                        ></v-select> 
                    </v-flex>

                    <v-flex xs4 sm4 offset-sm2 offset-xm2>
                      <v-text-field
                        type="text"
                        label="Customer Name"
                        v-model="vehicle.customer_name"
                        v-validate="'required|min:2'"
                        data-vv-as="Customer Name"
                        data-vv-name="customer_name"
                        :error-messages="errors.collect('customer_name')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs10 sm10 offset-sm1 offset-xm1>
                      <v-text-field
                        type="text"
                        label="Customer Email (optional)"
                        v-model="vehicle.email"
                        placeholder="xx@gmail.com"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs8 sm8 offset-sm1 offset-xm1></v-flex>
                    <v-flex xs3 sm3>
                      <v-btn
                        justify-end
                        :loading="loading"
                        :disabled="loading"
                        class="primary"
                        type="submit"
                      >Submit</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar" :color="color" bottom right :timeout="timeout">
      {{ text }}
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      
      vehicle: {
        vehicles_id: "",
        vehicle_types_id:'',
        condition: "",
        problem_details: "",
        brought_by: "",
        other_info: "",
        mechanic_id: "",
        model: "",
        year: "",
        color: "",
        remarks: "",
        brta_registration_no:'',
        customer_name:"",
        mobile_no:'',
        fk_vehicles_types_id:'',
        email:'',
         

      },
      seletedVehicle:{},
      technicians:[],
      vehicletype:[],

      response: "",
      snackbar: false,
      color: "success",
      text: "",
      timeout: 6000,
      loading: false
    };
  },
  methods: {
    registration(index) {

      console.log(this.seletedVehicle[index]);
      this.vehicle.brta_registration_no=this.seletedVehicle[index].brta_registration_no;
      this.vehicle.color=this.seletedVehicle[index].color;
      this.vehicle.model=this.seletedVehicle[index].model;
      this.vehicle.remarks=this.seletedVehicle[index].remarks;
      this.vehicle.year=this.seletedVehicle[index].year;
      this.vehicle.vehicles_id=this.seletedVehicle[index].vehicles_id;
      this.vehicle.fk_vehicles_types_id=this.seletedVehicle[index].fk_vehicles_types_id;
      this.vehicle.vehicle_types_id=this.seletedVehicle[index].fk_vehicles_types_id;
      this.vehicle.brta_registration_no=this.seletedVehicle[index].brta_registration_no;
      this.vehicle.mobile_no=this.seletedVehicle[index].phone;
      this.vehicle.customer_name=this.seletedVehicle[index].name;
      this.seletedVehicle=[];
    },
      getdata(){
        
         console.log(this.vehicle.brta_registration_no);
         if(this.vehicle.brta_registration_no !=''){ 
            this.axios
                .get("vehicle/search?brta_registration_number="+this.vehicle.brta_registration_no)
                .then(response => {
                this.seletedVehicle=response.data.vehicles
                console.log(response.data.vehicles);
                })
                .catch(error => {
                console.warn("API ! " + error);
                });
            }
     },
      technician() {
      this.axios.get("user/technicians-all").then(response => {
        this.technicians = response.data.technicians;
        console.log(this.technicians);
      });
    },

    vehicleType(){
        this.axios
                .get("vehicle-types/index_search")
                .then(response => {
                this.vehicletype=response.data.vehicleTypes;
                // console.log(this.vehicletype);
                })
                .catch(error => {
                console.warn("API ! " + error);
                });

     },

    store_vehicle() {
        console.log(this.vehicle);
      this.loading = true;
      if (this.vehicle.brta_registration_no == "") {
        this.text = "Please enter valid data";
        this.snackbar = true;
        this.color = "error";
        this.loading = false;
      } else {
        this.axios
          .post("vehicle-entries/store", this.vehicle)
          .then(response => {
            this.loading = false;
           this.response = response.data;

          if(this.response.status =="exist"){
              // console.log(response.data.data)
              this.text = "Vehicle is in repairing state";
              this.snackbar = true;
              this.color = "info";

              if(confirm("Vehicle is in repairing state.\nAre you want to see voucher details?")){
                //  this.$router.push({name:"vehicle.voucher.show",params: { id: response.data.data.vouchers_id}});
                }
            
             
           }
           
          else if (this.response.status == "ok") {
              alert("added.");
            // console.log(this.response.data.vehicle_entries_id);
            // this.$toast.success(this.response.message);
            // this.resetForm(this.vehicleEntries);
            // {name:'vehicle.voucher',params:{id:vehicletypeItem.vehicle_entries_id}}" class="btn btn-primary btn-xs btn-flat "> <i class="fa fa-edit">
            // this.$router.push({name:"vehicle.voucher",params:{id:this.response.data.vehicle_entries_id}});
            
          } else {
              
              this.text = "Please Try again later !";
              this.snackbar = true;
              this.color = "error";
           
           }

            
          })
          .catch(error => {
            this.text = "Please Try agian latter";
            this.snackbar = true;
            this.color = "error";
          });
      }
    }
  },

  mounted(){
   
   this.technician()
   this.vehicleType()
 }

};
</script>
