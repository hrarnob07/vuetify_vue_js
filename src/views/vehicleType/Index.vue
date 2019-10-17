<template>

  <v-container pa-0 ma-0 style="max-width:100%">
    <v-layout pa-0 ma-0>
      <v-flex xs12>
        <v-card>
                 <v-toolbar flat color="white">
                     <v-toolbar-title>Vehicle Type</v-toolbar-title>
                     <v-spacer></v-spacer>
               <v-btn color="warning"  round outline  :to="{name:'vehicleType.create'}" >
                  <v-icon left>add</v-icon>
                   Add New Vehicle Type
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
                :items="vehicleTypes.data"
                class="elevation-1">
                <template v-slot:items="props">
                  <td class="text-xs-left">{{props.index +1}}</td>
                <td class="text-xs-left"><span>{{ props.item.title }}</span> </td>
                
                <td class="text-xs-left"> 
                    <v-tooltip top >  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small color="teal darken-2" class="mr-2" @click="EditVehicleType(props.item)"  > edit </v-icon>
                                          </span>
                                          </template>
                       <span>Edit Vehicle type</span>
                    </v-tooltip>

                </td>
                <td class="text-xs-left"> 

                       <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small  class="mr-2" color="blue darken-2" @click="billDetails(props.item)"  >delete </v-icon>
                                          </span>
                                          </template>
                       <span>Delete Vehicle Type </span>
                    </v-tooltip>

                    </td>
                
                
                </template>
            </v-data-table>
    </v-card>

    </v-flex>
  </v-layout>

<v-dialog
      v-model="dialog"
      width="30%"
    >
     

     <v-layout >
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
              <v-card justify-center flat pa-5>
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
            text: 'Name',value: 'title'
          },

          { text: 'Edit', sortable:false,value: '' },
           { text: 'Delete', sortable:false,value: '' }
          
        ],
        loading: false,
        dialog:false,
        id:'',
        
        vehicleTypes:{},
        vehicle:{
          title:'',
        },

      }
    },

    methods: {

            index() {
                this.axios.get('vehicle-types/index')
                    .then(response => {
                        console.log(response.data.vehicleTypes.data)
                        this.vehicleTypes=response.data.vehicleTypes;
                    });
            },
            EditVehicleType(item){
                   this.dialog = true;
                   this.id = item.vehicle_types_id;
                   this.vehicle.title = item.title;
                  

                // this.$router.push({name:"vehicleType.edit",params:{id:index}});

            },
      store_vehicle_type() {
        this.loading = true;
        if(this.vehicle.title==""){
           
            this.loading = false;
        }
        else{
             this.axios
                    .post(`vehicle-types/update/${this.id}`, this.vehicle)
                    .then(response => {
                       
                        this.response = response.data;
                         this.loading = false;
                        if(this.response.status !== 400){
                         this.dialog = false;
                          this.$toast.success("updated");
                          this.index();
                          this.vehicle.title="";

                        
                        //  this.$router.push({  name: "vehicleType.index" }); 

                        }else {
                           this.text=" Vehicle type not updated.";
                           this.snackbar=true;
                           this.color="error";
                        }
                    })
                    .catch(error => {
                       this.loading = false;
                        console.warn('API ! ' + error)
                    })
                     
        }     
    }
        },
        mounted() {
            this.index();
         
        }
  }
</script>
