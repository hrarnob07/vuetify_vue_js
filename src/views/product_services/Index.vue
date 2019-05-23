<template>
  <v-container grid-list-md text-xs-center>
    <v-layout pa-2 ma-3>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat color="white">
            <v-toolbar-title>Products and services</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="warning" small round outline @click="link()">
                  <v-icon left dark>add</v-icon>
                   Add Products and Services
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout pa-2 ma-3>
      <v-flex xs12>
        <v-card>
          <v-data-table  :headers="headers" :items="products.data" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-left">{{props.index +1}}</td>
              <td class="text-xs-left">
                <span>{{ props.item.name }}</span>
              </td>
              <td class="text-xs-left">{{ props.item.type }}</td>
              <td class="text-xs-left">{{ props.item.price }}</td>
              

              <td class="text-xs-left">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">
                      <v-icon
                        small
                        color="teal darken-2"
                        class="mr-2"
                        @click="vehicleDetails(props.item)"
                      >edit</v-icon>
                    </span>
                  </template>
                  <span>Edit Technician</span>
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
  data() {
    return {
      headers: [
        { text: "SN.", sortable: false, value: "" },
        {
          text: "Name",
          value: "name"
        },

        { text: "Type", value: "type" },
        { text: "price", value: "price" },
        { text: "Action", value: "" }
      ],

      products: {}
    };
  },

   methods: {

            index(page = 1) {
                this.axios.get('product/index?page=' + page)
                    .then(response => {
                        this.products = response.data.products;
                        console.log(this.products);
                    });
            },

            link()
            {

            }
        },
        mounted() {
            this.index();
           // console.log(this.s3);
        }
};
</script>
