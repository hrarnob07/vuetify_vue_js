<template>

  <v-container grid-list-md text-xs-center>
    <v-layout pa-2 ma-3>
      <v-flex xs12>
        <v-card>
                 <v-toolbar flat color="white">
                     <v-toolbar-title>Repairable vehicle list</v-toolbar-title>
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


  <v-layout pa-2 ma-3>
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
                <td class="text-xs-left">{{ props.item.condition }}</td>
                <td class="text-xs-left">{{ props.item.problem_details}}</td>
                <td class="justify-center layout pt-3">
                    <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small color="teal darken-2" class="mr-2" @click="editItem(props.item)"  >edit </v-icon>
                                          </span>
                                          </template>
                       <span>Edit vehicle</span>
                    </v-tooltip>

                     <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small  class="mr-2" color="blue darken-2" @click="billDetails(props.item)"  >info </v-icon>
                                          </span>
                                          </template>
                       <span>Vehicle  details </span>
                    </v-tooltip>

                     <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small  class="mr-2" color="blue darken-2" @click="billDetails(props.item)"  >redeem </v-icon>
                                          </span>
                                          </template>
                       <span>Voucher  details </span>
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
            text: 'Model Name',value: 'model'
          },

          { text: 'BRTA registration no', value: 'brta_registration_no' },
          { text: 'Condition', value: 'condition' },
          { text: 'Problem', value: 'problem_details' },
          { text: 'Action', value: '' }
          
        ],
        
        vehicles:{}
      }
    },

    methods: {

            index(page = 1) {
                 this.axios.get('vehicle-entries/repairable-vehicles?page=' + page)
                    .then(response => {
                        this.vehicles = response.data.vehicles;
                        console.log(response);
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
