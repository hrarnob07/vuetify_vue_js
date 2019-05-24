<template>
  <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex xs12 md12 >
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Product and services create</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout justify-center>
            <v-flex flat xs10 sm10>
              <v-card justify-center>
                <v-form @submit.prevent="store_product_services" method="post">
                  <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Product Name"
                        v-model="product.name"
                        v-validate="'required|min:2'"
                        data-vv-as="Product name" 
                        data-vv-name="name"
                        :error-messages="errors.collect('name')"
                      > 
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                     <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                       <v-select
                         v-model="product.type"
                        :items="items"
                         label="Product Type"
                    ></v-select>
                    </v-flex>
                  </v-layout>

                   <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Price"
                        v-model="product.price"
                        v-validate="'required|numeric'"
                        data-vv-as="Product price" 
                        data-vv-name="price"
                        placeholder="TK"
                        :error-messages="errors.collect('price')"
                      > 
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  

                   
                   <v-layout>
                    <v-flex xs12 sm6 offset-sm1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Remarks"
                        v-model="product.remarks"
                        v-validate="'required|min:2'"
                        data-vv-as="Product remarks" 
                        data-vv-name="remarks"
                        placeholder="NA"
                        :error-messages="errors.collect('remarks')"
                      > 
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex sm6 xs12 md12 offset-sm1 offset-xm1>
                      <v-btn right :loading="loading" :disabled="loading" class="primary" type="submit">Submit</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
 
    <v-snackbar
      v-model="snackbar" :color="color" bottom right :timeout=timeout >
      {{ text }}
      <v-btn  color="white" flat @click="snackbar = false"> Close </v-btn>
    </v-snackbar>


  </v-container>
</template>

<script>
export default {
  data()
        {
            return {
                 product:{
                    name:'',
                    type:'',
                    price:'',
                    remarks:'',

                },
                 items: ['hardware_product', 'service'],

                response:'',
                snackbar:false,
                color:"success",
                text:"",
                timeout:6000,
                loading:false,


                

            }
        },
  methods: {
    store_product_services() {
        if(this.product.name==""){
            this.text="Please enter valid data";
            this.snackbar=true;
            this.color="error";
        }
        else{
              this.loading=true;
              this.axios
                    .post('product/store', this.product)
                    .then(response => {
                        this.response = response.data;
                        if(this.response.status !== 400){
                            this.$router.push({ name: "product-services.index"});
                        }else {
                            this.text="Please Try again later!";
                            this.snackbar=true;
                            this.color="error";
                        }
                    })
                    .catch(error => {
                       this.text="Please Try again later!";
                            this.snackbar=true;
                            this.color="error";
                    })
           
        }
        
      
     
    }
  }
};
</script>
