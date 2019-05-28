<template>
  <v-container grid-list-md text-xs-center>
    <v-layout pa-2 ma-1>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat color="white">
            <v-toolbar-title>Bill List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-flex xs4>
            <v-text-field  v-model="vehicles.brta_registration_no" label="search" placeholder="Registration No">
              <v-btn flat small slot="append" >
                <v-icon  color="warning" >search</v-icon>
                
              </v-btn>
            </v-text-field>
          </v-flex>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout pa-2 ma-1>
      <v-flex xs12>
        <v-card>
          <v-data-table :headers="headers" :search="search" :items="vehicles.data" class="elevation-1"  hide-actions :pagination.sync="pagination">
            <template v-slot:items="props">
             
              <td class="text-xs-left" v-if="props.item.vouchers_id!=null">{{ props.index + 1}}</td>
              <td class="justify-center layout pt-3 " v-if="props.item.vouchers_id!=null">
                <span small >{{ props.item.model }}</span> - <span small>{{ props.item.color }}</span> - <span small>{{ props.item.year }}</span>
              </td>
              <td class="text-xs-left" v-if="props.item.vouchers_id!=null">{{ props.item.brta_registration_no }}</td>
              <td class="text-xs-left" v-if="props.item.vouchers_id!=null"><span v-if="props.item.amount >=(props.item.totalAmount-props.item.discount)" style="color:green">Paid</span>  <span v-if="props.item.amount <(props.item.totalAmount-props.item.discount)" style="color:red">Due</span></td>
              <td class="text-xs-left" v-if="props.item.vouchers_id!=null"><span v-if="props.item.status<=0" style="color:red">Repairng</span>  <span v-if="props.item.status>0" style="color:green">Repaired</span></td>
              <td class="text-xs-left" v-if="props.item.vouchers_id!=null">{{ props.item.created_at}} </td>
                <td class="text-xs-left" v-if="props.item.vouchers_id!=null"><span>{{props.item.amount>0?props.item.amount:"0"}}</span> / <span >{{props.item.totalAmount>0?props.item.totalAmount:"0"}}</span></td>
              <td class="text-xs-left" v-if="props.item.vouchers_id!=null">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">
                      <v-icon
                        small
                        color="teal darken-2"
                        class="mr-2"
                        @click="OnVoucherReport(props.item.vouchers_id)"
                      >slideshow</v-icon>
                    </span>
                  </template>
                  <span>Voucher Information</span>
                </v-tooltip>
              </td>
             
            </template>
          </v-data-table>
          <v-layout row justify-center>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>


          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "SN.", sortable: false, value: "" },
        {
          text: "Model Name",
          value: "model"
        },

        { text: "BRTA Registration No", value: "brta_registration_no" },
        { text: "Bill Status", sortable:false, value: "" },
        { text: "Repair status", sortable:false, value: "" },
        { text: "Update date", value: "crated_at" },
        { text: "Paid/Bill amount", sortable:false, value: "" },
        { text: "Details",sortable:false, value: "" },
      ],
      search: '',
      pagination: {
        rowsPerPage: 10
      },
      selected: [],
      vehicles: {},
      storeVehicles:{},
      registration_no:"",
    };
  },

  
        methods: {

            index(page = 1) {
                this.axios.get('voucher/details?page=' + page)
                    .then(response => {
                        this.vehicles = response.data.voucher;
                        this.storeVehicles=response.data.voucher.data;
                        console.log(response.data.voucher.data);
                    });
            },

          OnVoucherReport(voucherId)
          {

            this.$router.push({name:"voucher.report",params:{id:voucherId}});
          },

            vehicleFilter()
            {
        
                var searchTerm = this.registration_no;
                console.log(searchTerm)
                var person=this.vehicles.data;
                // console.log(person)
                var response=[];
                var vm=this;
                var results = person.filter(function(person) {
                return person.brta_registration_no.indexOf(searchTerm) > -1;
                
                });
                if(results.length ==0){
                    // console.log("empty")

                }
                if(results.length !=0){
                this.vehicles.data=results;
                // console.log(this.vehicles.data)

                }

        // console.log(results);
            },
            serachVehicle(){
      
                if(this.registration_no ==""){
                        alert("Please Enter BRTA Registration number.");
                }
                else{
                    
                    this.axios.get('voucher/details-search?brta_registration_no= '+this.registration_no )
                                .then(response => {
                                    this.vehicles = response.data;

                                    // this.storeVehicles=response.data.voucher.data;
                                    console.log(this.vehicles);
                                });
                    }

                },

            refreshData(){
                this.index();
            }

        },
        mounted()
        {

        this.index();
            
        },

  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null)
      {return 0}
      else{
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }

    }
  }
};
</script>
