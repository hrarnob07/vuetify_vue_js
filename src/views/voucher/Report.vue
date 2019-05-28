<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm12 md12>
                <v-card >
                    <v-layout>
                        <v-flex xs12 sm12 md12>
                            <v-layout pa-0>
                                <v-flex xs6 sm6 md6>
                                    <v-card-title>
                                        <v-icon large left> stars</v-icon> <span class="title font-weight-light">Garage soft ltd.</span>
                                    </v-card-title>
                                </v-flex>

                                <v-flex xs6 sm6 md6 pl-5>
                                    <div left>

                                        <v-btn  color="warning">Change State</v-btn>
                                        <v-btn color="success">Payment Clear</v-btn>
                                        <v-btn color="success">Print Invoice</v-btn>

                                    </div>
                                </v-flex>
                            </v-layout>


                        </v-flex>

                    </v-layout>

                    <v-layout  justify-space-between row>
                        <v-flex xs12 sm12 md12>
                            <v-layout pa-3 mt-2 >
                                <v-flex xs4 sm4 md4 pl-3 >
                                    <div>


                                    From
                                    <address>
                                        <strong>Manager Garage soft</strong><br>
                                        uttara dhaka<br>
                                        1236<br>
                                        Phone: (804) 123-5432<br>
                                        Email: info@garage.com
                                    </address>
                                    </div>

                                </v-flex>

                                <v-flex xs4 sm4 md4 >
                                    <div >

                                        Bill To
                                        <address>
                                            <strong>Customer Name :</strong> <span>{{customer_information.name}}</span><br>
                                            <strong>BRTA Reginstration No:</strong> <span>{{customer_information.brta_registration}}</span><br>
                                            <strong>Phone No:</strong> <span>{{customer_information.phone}}</span><br>
                                            <strong>Problem Details:</strong> <span>{{customer_information.problem_details}}</span><br>
                                            <strong>Vehicle status:</strong> <span v-if="status <=0" style="color:red"> Repairing</span> <span v-if="status >0" style="color:green"> Repaired</span><br>


                                        </address>

                                    </div>
                                </v-flex>
                                <v-flex xs4 sm4 md4 pl-5 justify-end>
                                    <div >

                                        <b>Invoice #{{voucher.vouchers_id }}</b><br>
                                        <br>
                                        <b>Total Amount : </b> {{total_price}} Tk<br>
                                        <b>Deposited : </b> {{voucher.dipositedAmount ==null?"0":voucher.dipositedAmount}} Tk<br>
                                        <b>Due : </b> <span style="color:red"> {{due =0?"Paid":due}}</span>Tk<br>
                                        <b>Date:</b> {{voucher.created_at}}<br>

                                    </div>
                                </v-flex>
                            </v-layout>


                            <v-divider></v-divider>
                        </v-flex>

                    </v-layout>


                    <v-layout row>

                        <v-flex xs12 sm12 md12 pa-5>
                            <v-data-table :headers="headers"
                                          :items="voucher.voucher_items"
                                          class="elevation-1"
                                          hide-actions
                                          >
                                <template v-slot:items="props">
                                    <tr>
                                    <td class="text-xs-left">{{ props.index + 1}}</td>
                                    <td class="text-xs-left">{{ props.item.item_name}}</td>
                                    <td class="text-xs-left">{{ props.item.quantity}}</td>
                                    <td class="text-xs-left">{{ props.item.price}}</td>
                                    </tr>

                                </template>

                            </v-data-table>

                            <v-data-table :headers="headers_1"
                                          :items="subtotallist"
                                          class="elevation-1"
                                          hide-actions
                                          >
                                <template v-slot:items="props">

                                     <tr>
                                        <td colspan="4" class="text-xs-right">subtotal :</td>
                                        <td class="text-xs-left" >{{subtotal}}</td>
                                     </tr>

                                </template>

                            </v-data-table>

                            <v-data-table :headers="headers_deposit"
                                          :items="voucherDeposit"
                                          class="elevation-1"
                                          hide-actions
                                          >
                                <template v-slot:items="props">


                                        <td  class="text-xs-left" > {{props.index+1}}</td>
                                        <td class="text-xs-left" >{{props.item.created_at}}</td>
                                        <td class="text-xs-left" >{{props.item.remarks==null?"Na":props.item.remarks}}</td>
                                        <td class="text-xs-left" >{{props.item.amount}}</td>


                                </template>

                            </v-data-table>

                            <v-data-table :headers="headers_1"
                                          :items="subtotallist"
                                          class="elevation-1"
                                          hide-actions
                                          >
                                <template v-slot:items="props">

                                    <tr>
                                        <td colspan="4" class="text-xs-right">Discount :</td>
                                        <td class="text-xs-left" >{{ voucher.discount}}</td>
                                    </tr>

                                    <tr>
                                        <td colspan="4" class="text-xs-right">Total :</td>
                                        <td class="text-xs-left" >{{total_price}}</td>
                                    </tr>



                                </template>

                            </v-data-table>






                        </v-flex>
                    </v-layout>

                    <v-layout  justify-space-between row>
                        <v-flex xs12 sm12 md12 pa-5>
                            <v-form @submit.prevent="depositePayment" method="post">
                            <v-layout  >
                                <v-flex xs4 sm4 md4 pl-3 >
                                    <div>
                                        <v-text-field

                                                type="text"
                                                label="Deposit"
                                                v-model="deposit_amount"
                                                v-validate="'required|numeric|min:1'"
                                                data-vv-as="voucher deposit"
                                                data-vv-name="deposit"
                                                :error-messages="errors.collect('deposit')"
                                        >
                                            <v-icon slot="append" small color="black" >edit</v-icon>
                                        </v-text-field>


                                    </div>

                                </v-flex>

                                <v-flex xs6 sm6 md6 >
                                    <div >

                                        <v-text-field

                                                type="text"
                                                label="Remarks"
                                                v-model="comments"
                                                v-validate="'required'"
                                                data-vv-as="voucher remarks"
                                                data-vv-name="remarks"
                                                :error-messages="errors.collect('remarks')"
                                        >
                                            <v-icon slot="append" small color="black" >edit</v-icon>
                                        </v-text-field>

                                    </div>
                                </v-flex>
                                <v-flex xs2 sm2 md2 >
                                    <v-btn type="submit" color="success">submit</v-btn>
                                </v-flex>
                            </v-layout>

                                </v-form>

                        </v-flex>

                    </v-layout>

                </v-card>

            </v-flex>

        </v-layout>
    </v-container>

</template>

<script>
    // import * as jsPDF from 'jspdf';
    // import html2canvas from "html2canvas";
    // import printDOM from "print-dom";

    export default {

        data()
        {
            return {
                voucher:{},
                subtotal:0,
                subtotallist:[{'name':'A'}],
                id: this.$route.params.id,
                total_price:0,
                deposite:"",
                due:0,
                customer_information:{
                    name:"",
                    brta_registration:"",
                    phone:"",
                    problem_details:""
                },
                response:"",
                deposit_amount:"",
                status:"",
                comments:"",
                voucherDeposit:[],
                headers: [
                    { text: "SN.", sortable: false, value: "" },
                    {
                        text: "Item",
                        value: "item_name"
                    },
                    { text: "Quantity", value: "quantity" },
                    { text: "Amount (Tk)", sortable:false, value: "" }

                ],
                headers_1: [
                    { text: "", sortable: false, value: "" },
                    { text: "", value: "",sortable:false},
                    { text: "",sortable:false, value: "" },
                    { text: "", sortable:false, value: "" }

                ],
                headers_deposit: [
                    { text: "SN", sortable: false, value: "" },
                    { text: "Deposit Date", value: "",sortable:false},
                    { text: "Comments",sortable:false, value: "" },
                    { text: "Deposit Amount(tk)", sortable:false, value: "" }

                ],
                pagination: { rowsPerPage: 50},

            }
        },
        methods: {


            downloadWithCSS(quality=4) {
                document.getElementById('contentPrint').style.width='210mm';
                const filename  = 'ThisIsYourPDFFilename.pdf';

                html2canvas(document.querySelector('#contentPrint'),
                    {scale: quality}
                ).then(canvas => {
                    let pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
                    pdf.save(filename);
                });

            },
            PrintInvoice(){
                //   console.log("sure print")


                printDOM(document.querySelector("#contentPrint"), {
                    noPrint: [".headers",".print",".payment",".icons"],
                    documentTitle: "Garage soft",
                    //  wrapClass: ".box box-primary",

                });
            },

            voucherInfo(){
                this.axios.get('voucher/' +`${this.id}`)
                    .then(response => {
                        this.voucher = response.data.voucher;
                        // console.log(this.voucher.voucher_items)
                        this.sub_total_price()
                        this.status=this.voucher.voucher_items[0].status;
                    });

                // this.repaireing()
            },

            voucherDepositInfo(){
                this.axios.get('voucher/deposit/' +`${this.id}`)
                    .then(response => {
                        this.voucherDeposit = response.data.data;
                        console.log(this.voucherDeposit)
                    });
            },

            repaireing(){
                alert(this.voucher.voucher_items[0].status);
                this.status=this.voucher.voucher_items[0].status;
            },
            vehicleStatusChange(){
                var vehicleEntryId= this.voucher.voucher_items[0].vehicle_entries_id;

                this.axios.get("vehicle-entries/status-change?entryVehicleId="+vehicleEntryId)
                    .then(response=>{
                        this.$toast.success("Vehicle status changed to Repaired.");
                        this.voucherInfo();
                        this.$router.push({name:"departure.show",params:{id:this.id}});

                    });

            },
            sub_total_price(){
                // console.log("subtotal")
                var sub_total=0;
                for(var i=0;i<this.voucher.voucher_items.length;i++)
                {
                    sub_total=sub_total+this.voucher.voucher_items[i].price*this.voucher.voucher_items[i].quantity;

                }
                this.subtotal=sub_total;
                this.total_price_info();
                this.due_price();
            },
            total_price_info(){
                this.total_price=this.subtotal-this.voucher.discount;
            },
            due_price(){

                this.due=this.total_price-(this.voucher.dipositedAmount);
            },
            customer_info(){
                // console.log("customer");
                this.axios.get('voucher/owner/' +`${this.id}`)
                    .then(response => {
                        this.customer_information.name = response.data.data[0].name;
                        this.customer_information.brta_registration = response.data.data[0].brta_registration_no;
                        this.customer_information.problem_details = response.data.data[0].problem_details;
                        this.customer_information.phone = response.data.data[0].phone;
                        // console.log(response)


                    });
            },

            paymentClear(){

                let Paymentdata={
                    voucher_id:this.id,
                    amount:this.due
                }
                if(this.due<=0){
                    this.PrintInvoice();


                }
                else{
                    this.axios.post('voucher/deposit',Paymentdata )
                        .then(response => {
                            this.$toast.success("Payment is clear.");
                            this.voucherInfo();
                            this.total_price_info();
                            this.due_price();
                            this.customer_info();
                            this.deposit_amount="";
                            this.due=0;
                            this.stateChange()
                            console.log(response.data.status)
                            // if(response.data.status =="OK"){
                            //     this.PrintInvoice();
                            // }


                        });
                }
                //  this.PrintInvoiceClear();
            },
            PrintInvoiceClear(){
                printDOM(document.querySelector("#contentPrint"), {
                    noPrint: [".headers",".print",".payment",".icons"],
                    documentTitle: "Garage soft",
                    //  wrapClass: ".box box-primary",

                });
            },
            depositePayment(){


                let Paymentdata={
                    voucher_id:this.id,
                    amount:this.deposit_amount,
                    remarks:this.comments
                }

                if(this.deposit_amount ==""){
                    alert("Please Enter your deposit amount.");
                }
                else if(this.due<this.deposit_amount){

                    this.$toast.error("Deposit is getter than due ");
                }
                else{
                    this.axios.post('voucher/deposit',Paymentdata )
                        .then(response => {

                                this.$toast.success("Deposit successfull.");
                                this.voucherInfo();
                                this.total_price_info();
                                this.due_price();
                                this.customer_info();
                                this.deposit_amount="";
                                this.voucherDepositInfo();
                                console.log(response);


                            }

                        );
                }
            },
            stateChange() {

                setTimeout(()=> {
                    this.PrintInvoiceClear()
                }, 2000);
            }



        },
        mounted() {

            this.voucherInfo()
            this.total_price_info()
            this.due_price()
            this.customer_info()
            this.voucherDepositInfo()

        }
    };
</script>