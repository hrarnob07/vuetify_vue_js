<template>

  <v-container grid-list-md text-xs-center>
    <v-layout pa-2 ma-3>
      <v-flex xs12>
        <v-card>
                 <v-toolbar flat color="white">
                     <v-toolbar-title>Vehicle Type</v-toolbar-title>
                     <v-spacer></v-spacer>
               <v-btn color="warning"  round outline  @click="link">
                  <v-icon left>add</v-icon>
                   Add New Vehicle Type
               </v-btn>
               
             </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>


  <v-layout pa-2 ma-3>
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
                    <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small color="teal darken-2" class="mr-2" @click="vehicleDetails(props.item)"  > edit </v-icon>
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
        
        vehicleTypes:{}
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
            editItem(index){
              alert(index);

            }
        },
        mounted() {
            this.index();
         
        }
  }
</script>
