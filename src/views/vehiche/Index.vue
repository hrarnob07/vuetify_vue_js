<template>

  <v-container pa-0 ma-0 style="max-width:100%">
    <v-layout pa-0 ma-0>
      <v-flex xs12>
        <v-card>
                 <v-toolbar flat color="white">
                     <v-toolbar-title>Vehicle List</v-toolbar-title>
                     <v-spacer></v-spacer>
              <v-btn color="warning" small round outline :to="{name:'repairable.index'}">
                  <v-icon left >list</v-icon>
                    Repairable vehicles
               </v-btn>
               <v-btn color="warning" small round outline :to="{name:'vehiche.create'}">
                 <v-icon left >add</v-icon>
                      New vehicle entry
               </v-btn>
             </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>


  <v-layout pa-0 ma-0>
    <v-flex xs12>
      <v-card>
         <v-data-table
                :headers="headers"
                :items="vehicles.data"
                class="elevation-1">
                <template v-slot:items="props">
                  <td class="text-xs-left">{{props.index +1}}</td>
                <td class="text-xs-left"><span>{{ props.item.model }}</span> -  <span pl-2>{{ props.item.color }}</span>  - <span>{{ props.item.year }}</span></td>
                <td class="text-xs-left">{{ props.item.brta_registration_no }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.created_at}}</td>
                <td class="justify-center layout pt-3">
                    <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small color="teal darken-2" class="mr-2" @click="editItem(props.item)"  >edit </v-icon>
                                          </span>
                                          </template>
                       <span>Edit vehicle</span>
                    </v-tooltip>

                     <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small  class="mr-2" color="blue darken-2" @click="billList(props.item)"  >info </v-icon>
                                          </span>
                                          </template>
                       <span>Vehicle Bill details </span>
                    </v-tooltip>


                  
                 </td>
                
                </template>
            </v-data-table>
    </v-card>

    </v-flex>
  </v-layout>


 <v-dialog
      v-model="dialog"
      width="70%"
    >
     

      <v-card>
        <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Vehicle Entries *</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
      
            <v-flex flat xs10 sm10>
              
                <v-form @submit.prevent="updateVehicle" method="post">
                  <v-layout>
                    <v-flex xs5 sm45 offset-sm1 offset-xm1>
                      <v-text-field
                        type="text"
                        label="Model Name"
                        v-model="singleVehicle.model"
                        v-validate="'required|min:2'"
                        data-vv-as="Vehicle Model Name"
                        data-vv-name="model"
                        placeholder="BMW"
                        :error-messages="errors.collect('model')"
                      >
                        <v-icon slot="append" small color="black">edit</v-icon>
                      </v-text-field>
                    </v-flex>
                    
                     <v-flex xs4 sm4 offset-sm2 offset-xm2>
                      <v-text-field
                        type="text"
                        label="Model Year"
                        v-model="singleVehicle.year"
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
                  <v-layout>

                     <v-flex xs5 sm45 offset-sm1 offset-xm1>
                      <v-text-field
                        type="text"
                        label="Color"
                        v-model="singleVehicle.color"
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
                            slot="activator"
                            label="Enter BRTA Registration No"
                            v-model="singleVehicle.brta_registration_no"
                            v-validate="'required|'"
                            data-vv-as="Vehicle brta registration no"
                            data-vv-name="brta_registration_no"
                            :error-messages="errors.collect('brta_registration_no')"
                          >
                         </v-text-field>
                    </v-flex>
                  </v-layout>

                  <!-- vehicle type and model -->
                  <v-layout>
                    <v-flex xs4 sm4 offset-sm1 offset-xm1>
                        <v-select
                        item-text="name"
                        item-value="id"
                        :items="vehicleTypes"
                        v-model="singleVehicle.vehicle_types_id"
                        label="Vehicle Type"
                        ></v-select>                      
                    </v-flex>

                  </v-layout>
                
                  <!-- Color  and model year -->
                
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
            </v-flex>
              
      </v-card>
    </v-dialog>


  </v-container>

  
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'SN.', sortable:false, value: '' },
          {
            text: 'Model Name',value: 'model'
          },

          { text: 'BRTA registration no', value: 'brta_registration_no' },
          { text: 'Customer Name', value: '' },
          { text: 'Registration Date', value: '' },
          { text: 'Action', value: '' }
          
        ],
        dialog: false,
        loading: false,
        id:"",
        
        vehicles:{},
        vehicleTypes:[],
        singleVehicle:{
          brta_registration_no:'',
          model:'',
          year:'',
          color:'',
          vehicle_types_id:'',
        },
      }
    },

    methods: {

            index(page = 1) {
                this.axios.get('vehicle/index?page=' + page)
                    .then(response => {
                        this.vehicles = response.data.vehicles;
                        console.log(this.vehicles);
                    });
            },
            editItem(item){
              this.dialog = true;
              this.id = item.vehicles_id;
              this.singleVehicle.brta_registration_no = item.brta_registration_no;
              this.singleVehicle.model = item.model;
              this.singleVehicle.color = item.color;
              this.singleVehicle.year = item.year;
              this.singleVehicle.vehicle_types_id = item.fk_vehicles_types_id;
             

            },
            vehicleType()
            {
                
                this.axios.get('vehicle-types/index')
                    .then(response => {
                        
                        let data =response.data.vehicleTypes;
                       

                        this.vehicleTypes = data.data.map(item=>{
                          return { name: item.title,
                                   id:item.vehicle_types_id};
                        });
                       console.log(this.vehicleTypes);
                        
                    });
           
            },
            billList(item)
            {
              this.$router.push({name:'vehicle.bill',params:{id:item.vehicles_id}})
            },
            updateVehicle()
            {
              this.loading = true;
               this.axios
                    .post(`vehicle/update/${this.id}`, this.singleVehicle)
                    .then(response => {
                      this.loading = false;
              
                        this.response = response.data;
                      
                        if(this.response.status !== 400){
                          this.dialog = false;
                          this.$toast.success(this.response.message);
                          this.index();

                        }else {
                            /* Error messages store in vuex state */
                            this.$store.commit('mute_errors', this.response.message);
                        }
                    })
                    .catch(error => {
                       this.loading = false;
                        console.warn('API ! ' + error)
                    })
            }
        },
        mounted() {
            this.index();
            this.vehicleType();
         
        }
  }
</script>
