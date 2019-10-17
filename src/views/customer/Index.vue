<template>

  <v-container pa-0 ma-0 style="max-width:100%">
    <v-layout pa-0 ma-0>
      <v-flex xs12>
        <v-card>
                 <v-toolbar flat color="white">
                     <v-toolbar-title>Customer List</v-toolbar-title>
                     <v-spacer></v-spacer>
        <v-flex xs4>
        <v-text-field  v-model="url" label="search">
          <v-btn flat small slot="append" >
            <v-icon  color="warning" >search</v-icon>
            
          </v-btn>
        </v-text-field>
      </v-flex>
               
             </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>


  <v-layout pa-0 ma-0>
    <v-flex xs12>
      <v-card>
         <v-data-table
                :headers="headers"
                :items="vehicleOwners.data"
                class="elevation-1">
                <template v-slot:items="props">
                  <td class="text-xs-left">{{props.index +1}}</td>
                <td class="text-xs-left"><span>{{ props.item.name }}</span> </td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.phone }}</td>
                <td class="text-xs-middle"> 
                    <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small color="teal darken-2" class="mr-2" @click="vehicleDetails(props.item)"  > info </v-icon>
                                          </span>
                                          </template>
                       <span>Vehicle detials</span>
                    </v-tooltip>
                    </td>
                <td class="text-xs-middle">
                   

                     <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small  class="mr-2" color="blue darken-2" @click="billDetails(props.item)"  >info </v-icon>
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
  </v-container>

  
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'SN.', sortable:false, value: '' },
          {
            text: 'Name',value: 'model'
          },

          { text: 'Email', value: 'brta_registration_no' },
          { text: 'Phone No', value: '' },
          { text: 'Vehicle Details', value: '' },
          { text: 'Bill Details', value: '' }
          
        ],
        
        vehicleOwners:{}
      }
    },

    methods: {

           index(page = 1) {
                this.axios.get('user/vehicle-owners?page=' + page)
                    .then(response => {
                        this.vehicleOwners = response.data.vehicleOwners;
                        console.log( this.vehicleOwners);
                    });
            },
            editItem(index){
              alert(index);

            },
           vehicleDetails(item)
           {
               this.$router.push({ name:'customer.vehicle_details', params:{id:item.vehicle_owners_id}});
           }
        },
        mounted() {
            this.index();
         
        }
  }
</script>
