<template>
    <v-container pa-0 ma-0 style="max-width:100%">
        <v-layout pa-0 ma-0>
            <v-flex xs12>
                <v-card>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Vehicle Bill Details</v-toolbar-title>

                    </v-toolbar>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout pa-0 ma-0>
            <v-flex xs12>
                <v-card>
                    <v-data-table
                            :headers="headers"
                            :items="vehiclesDetails"
                            class="elevation-1">
                        <template v-slot:items="props">
                            <td class="text-xs-left">{{props.index +1}}</td>
                            <td class="text-xs-left">{{ props.item.brta_registration_no }}</td>
                            <td class="text-xs-left"><span>{{ props.item.model }}</span> -  <span pl-2>{{ props.item.color }}</span>  - <span>{{ props.item.year }}</span></td>
                            <td class="text-xs-left">{{ props.item.totalAmount }}</td>
                            <td class="text-xs-left">{{ props.item.created_at | moment(" Do MMM  YY - h:mm a" )}}</td>
                            <td class="justify-center layout pt-3">

                                <v-tooltip top>  <template v-slot:activator="{ on }">
                                         <span v-on="on"> <v-icon  small  class="mr-2" color="blue darken-2" @click="voucherShow(props.item)"  >info </v-icon>
                                          </span>
                                </template>
                                    <span>show boucher </span>
                                </v-tooltip>



                            </td>

                        </template>
                    </v-data-table>
                </v-card>

            </v-flex>
        </v-layout>


        <!-- <v-dialog
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

                         &lt;!&ndash; vehicle type and model &ndash;&gt;
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

                         &lt;!&ndash; Color  and model year &ndash;&gt;

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
 -->

    </v-container>


</template>


<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                vehiclesDetails:[],
                id:this.$route.params.id,
                name:'',
                phone:'',
                brta_registration_no:"",
                headers:[
                        { text: 'SN.', sortable:false, value: '' },
                        { text: 'BRTA registration no', value: 'brta_registration_no' },
                        {
                            text: 'Model Name',value: 'model'
                        },
                        { text: 'Total amount', value: 'total_amount' },
                        { text: 'Created at', value: 'crated_at' },
                        { text: 'Details', value: '',sortable:false },
                ]
            }
        },
        methods: {

            index() {
                // console.log(this.id)
                this.axios.get(`user/owner-cars/${this.id}`)
                    .then(response => {
                        this.vehiclesDetails = response.data.vehicleOwners;
                        this.name=this.vehiclesDetails[0].name;
                        this.phone=this.vehiclesDetails[0].phone;
                        // console.log(this.vehiclesDetails);
                    });
                // console.log(this.id)
            },
            customerFilter(){
                var searchTerm = this.brta_registration_no;
                // console.log(searchTerm)
                var person=this.vehiclesDetails;
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
                    this.vehiclesDetails=results;
                    // console.log(this.vehicles.data)

                }
            },
            refreshData(){
                this.index();
            },
            serachTechinician(){

                if(this.brta_registration_no ==""){
                    alert("Please Enter BRTA Registration number.");
                }
                //  else{
                //       this.axios.get('user/technicians-search?phone= '+this.TechinicianMobile )
                //     .then(response => {
                //          this.techinican.data = response.data.data;

                //         // this.storeVehicles=response.data.voucher.data;
                //         // console.log(this.vehicles);
                //     });
            }

        },


        mounted() {
            this.index();
            // console.log(this.s3);
        }
    }
</script>
