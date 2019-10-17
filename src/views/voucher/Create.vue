<template>
<v-container pa-0 ma-0 style="max-width:100%">
    <v-layout pa-0 ma-0 row warp>
        <v-flex xs12>
            <v-card>
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



                                </div>
                            </v-flex>
                        </v-layout>

                        <v-divider></v-divider>
                    </v-flex>

                </v-layout>
                <v-layout  justify-space-between row>
                    <v-flex xs12 sm12 md12>
                        <v-layout pa-3 mt-2 >
                            <v-flex xs4 sm4 md4 pl-3 >
                                <div>
                                    From
                                    <br>
                                        <strong>Manager Garage soft</strong><br>
                                        uttara dhaka<br>
                                        1236<br>
                                        Phone: (804) 123-5432<br>
                                        Email: info@garage.com

                                </div>

                            </v-flex>

                            <v-flex xs4 sm4 md4 >
                                <div >
                                    Bill To
                                    <br>
                                        <strong>Customer Name :</strong> <span>{{vehicle_owner_info.name}}</span><br>
                                        <strong>BRTA Reginstration No:</strong> <span>{{vehicle_owner_info.brta_registration}}</span><br>
                                        <strong>Phone No:</strong> <span>{{vehicle_owner_info.phone}}</span><br>
                                        <strong>Problem Details:</strong> <span>{{vehicle_owner_info.problem_details}}</span><br>
                                </div>
                            </v-flex>
                            <v-flex xs4 sm4 md4 pl-5 justify-end>
                                <div >
                                    <b>Invoice #{{voucher.vouchers_id }}</b><br>
                                    <br>
                                    <b>Date:</b> {{voucher.created_at}}<br>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs9 sm9 md9 offset-sm1 offset-xm1>
<!--                        <v-select-->
<!--                                v-model="arr"-->
<!--                                label="Select several"-->
<!--                                tags-->
<!--                                chips-->
<!--                                :items="seletedproduct"-->
<!--                                item-text="label"-->
<!--                                item-value="value"-->
<!--                                outline-->
<!--                                @change="getVoucherChange()"-->
<!--                        ></v-select>-->

<v-combobox
        v-model="select"
        :items="seletedproduct"
        label="I use a scoped slot"
        item-text="label"
        item-value="value"
        multiple
        @change="getVoucherChange"
        chips
        outline
>
    <template v-slot:selection="data">
        <v-chip
                :key="JSON.stringify(data.item)"
                :selected="data.selected"
                :disabled="data.disabled"
                class="v-chip--select-multi"
                @input="data.parent.selectItem(data.item)"
        >
            <v-avatar
                    class="accent white--text"

            ></v-avatar>
            {{ data.item.label }}
        </v-chip>
    </template>
</v-combobox>


                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs9 sm9 md9 offset-sm1 offset-xm1>
                        <v-data-table :headers="headers"
                                      :items="product_collection"
                                      class="elevation-1"
                                      hide-actions
                        >
                            <template v-slot:items="props">


                                <td  class="text-xs-left" > {{props.index+1}}</td>
                                <td class="text-xs-left" >{{props.item.created_at}}</td>
                                <td class="text-xs-left" >{{props.item.name}}</td>
                                <td class="text-xs-left" >{{props.item.price}}</td>
                                <td class="text-xs-left" >{{props.item.amount}}</td>


                            </template>

                        </v-data-table>

                    </v-flex>
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
                vehicles: "",
                product: "",
                itemquantity: [],
                id: this.$route.params.id,
                voucher: {
                    sub_total: 0,
                    total_price: 0,
                    depositedAmount: 0,
                    vehicle_entries_id: "",
                    discount: 0,
                    succeed: 0,
                    remarks: "",
                    voucher_items: ""
                },
                seletedproduct: [],
                select: [],
                product_collection: [],
                response: "",
                vehicle_owner_info: {
                    name: "",
                    brta_registration: "",
                    phone: "",
                    problem_details: ""
                },
                arr:{},
                headers:[
                    { text: "SN.", sortable: false, value: "" },
                    {
                        text: "Item",
                        value: "item_name"
                    },
                    { text: "Quantity", value: "quantity" },
                    { text: "Rate", value: "quantity" },
                    { text: "Amount (Tk)", sortable:false, value: "" },
                    { text: "Action", sortable:false, value: "" }

                ],

                date: "",

            };
        },
        methods: {
            getVoucherChange(){
                console.log(this.select);
            },
            vehicle_details() {
                this.axios
                    .get("vehicle-entries/repairable-vehicles-detail?id= " + this.id)
                    .then(response => {
                        this.vehicles = response.data.vehicle;
                        // console.log(response);
                    });

                this.date = new Date().toISOString().slice(0, 10);
            },
            get_all_product() {
                this.axios.get("product/all-products").then(response => {
                    this.seletedproduct = response.data.products;

                    console.log(this.seletedproduct);
                });
                for (var i = 0; i <= 500; i++) {
                    this.itemquantity[i] = 1;
                }
            },
            update_product() {
                // console.log(this.select.value)
                var value_product = this.select.value;
                if (value_product != null) {
                    value_product.quantity = 1;
                    this.product_collection.push(value_product);
                    // console.log(this.product_collection);
                }
            },
            quantityChange(index) {
                this.product_collection[index].quantity = this.itemquantity[index];
                this.subTotalPrice();
            },

            store() {
                this.voucher.vehicle_entries_id = this.id;
                this.voucher.succeed = 1;
                this.voucher.voucher_items = JSON.stringify(this.product_collection);
                // console.log(this.voucher)
                this.axios
                    .post("voucher/store", this.voucher)
                    .then(response => {
                        // console.log(response);
                        this.response = response.data;
                        if (this.response.status === "ok") {
                            this.$toast.success(this.response.message);
                            if (this.response.voucher_id != null) {
                                // console.log(this.response.voucher_id);
                                this.$router.push({
                                    name: "vehicle.voucher.show",
                                    params: { id: this.response.voucher_id }
                                });
                            }
                            this.resetForm(this.voucher);
                        } else {
                            this.$toast.error(this.response.message);
                        }
                    })
                    .catch(error => {
                        this.$toast.error("illegal operation.Please try again.");
                        console.warn("API ! " + error);
                    });
            },

            subTotalPrice() {
                // console.log("product added");
                // console.log(this.product_collection.length);
                var total = 0;
                for (var i = 0; i < this.product_collection.length; i++) {
                    total =
                        total +
                        this.product_collection[i].price *
                        this.product_collection[i].quantity;
                }
                this.voucher.sub_total = total;
                this.findTotalPrice();
            },
            deleteSelectedItem(index) {
                this.product_collection.splice(index, 1);
                this.subTotalPrice();
            },
            findTotalPrice() {
                // console.log("total");
                if (this.voucher.total_price < this.voucher.discount) {
                    alert("invalid discount");
                    this.voucher.discount = 0;
                    this.voucher.total_price =
                        this.voucher.sub_total - this.voucher.discount;
                } else {
                    this.voucher.total_price =
                        this.voucher.sub_total - this.voucher.discount;
                }
            },
            get_customer_info() {
                this.axios.get(`vehicle/owner/${this.id}`).then(response => {
                    this.vehicle_owner_info.name = response.data.data[0].name;
                    this.vehicle_owner_info.phone = response.data.data[0].phone;
                    this.vehicle_owner_info.brta_registration =
                        response.data.data[0].brta_registration_no;
                    this.vehicle_owner_info.problem_details =
                        response.data.data[0].problem_details;
                    // console.log(this.vehicle_owner_info);
                });
            }
        },
        mounted() {
            this.vehicle_details();
            this.get_all_product();
            this.get_customer_info();
        }
    };
</script>
