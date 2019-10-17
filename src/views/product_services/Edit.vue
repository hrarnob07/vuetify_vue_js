<template>
  <v-container pa-0 ma-0 style="max-width:100%">
    <v-layout>
      <v-flex xs12 md12 >
        <v-card>
          <v-card-title primary-title>
            <div>
              <h5 class="headline mb-0">Products and services edit</h5>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout justify-center>
            <v-flex flat xs10 sm10>
              <v-card justify-center flat >
                <v-form @submit.prevent="update" method="post">
                  <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                      <v-text-field
                      
                        type="text"
                        label="Product Name"
                        v-model="product.name"
                        v-validate="'required|min:2'"
                        data-vv-as="Product name" 
                        data-vv-name="name"
                        :error-messages="errors.collect('name')"
                      > 
                       <v-icon slot="append" small color="black" >edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                     <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                       <v-select
                         v-model="product.type"
                        :items="items"
                         label="Product Type"
                    ></v-select>
                    </v-flex>
                  </v-layout>

                   <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
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
                       <v-icon slot="append" small color="black" >edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  

                   
                   <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
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
                       <v-icon slot="append" small color="black" >edit</v-icon>
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs10  offset-xs1 offset-xm1>
                        <v-layout align="end" class="justify-end">
                                <v-btn right :loading="loading" :disabled="loading" class="primary" type="submit">Submit</v-btn>
                        </v-layout>
                     
                    </v-flex>
                    <v-flex sx6>
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
        data() {
            return {
                product:{
                    name:'',
                    type:'',
                    price:''
                },
                 items: ['hardware_product', 'service'],
                id: this.$route.params.id,
            }
        },
        methods: {

            edit()
            {
                this.axios
                    .get(`product/edit/${this.id}`)
                    .then(response => {

                        this.product = response.data.product;
                        console.log(this.product)

                    })
                    .catch(error => {
                        console.warn('API ! ' + error)
                    });

            },
            update(){
                console.log(this.product)
                this.axios
                    .post(`product/update/${this.id}`, this.product)
                    .then(response => {
                        this.response = response.data;
                        // console.log(this.response);
                        if(this.response.status !== 400){
                            this.$toast.success(this.response.message);
                            this.$router.push({name:"product-services.index"});

                        }else {
                            /* Error messages store in vuex state */
                            this.$store.commit('mute_errors', this.response.message);
                        }
                    })
                    .catch(error => {
                        console.warn('API ! ' + error)
                    })
            }
        },
        mounted() {
            this.edit();
        }
    }
</script>
