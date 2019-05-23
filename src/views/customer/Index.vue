<template>

  <v-container grid-list-md text-xs-center>
    <v-layout pa-2 ma-3>
      <v-flex xs12>
        <v-card>
                 <v-toolbar flat color="white">
                     <v-toolbar-title>Customer List</v-toolbar-title>
                     <v-spacer></v-spacer>
               <!-- <v-btn color="primary" dark @click="link">
                  <v-icon left dark>list</v-icon>
                    Repairable vehicles
               </v-btn> -->
               
             </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>


  <v-layout pa-2 ma-3>
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

            }
        },
        mounted() {
            this.index();
         
        }
  }
</script>
