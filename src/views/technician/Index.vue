<template>
  <v-container grid-list-md text-xs-center>
    <v-layout pa-2 ma-3>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat color="white">
            <v-toolbar-title>Technician List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="warning" small round outline @click="link">
                  <v-icon left dark>add</v-icon>
                   Add Technician
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout pa-2 ma-3>
      <v-flex xs12>
        <v-card>
          <v-data-table :headers="headers" :items="techinican.data" class="elevation-1">
            <template v-slot:items="props">
              <td class="text-xs-left">{{props.index +1}}</td>
              <td class="text-xs-left">
                <span>{{ props.item.name }}</span>
              </td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.emergency_contact }}</td>
              <td class="text-xs-left">{{ props.item.address1 }}</td>

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
          value: "model"
        },

        { text: "Email", value: "email" },
        { text: "Phone No", value: "emergency_contact" },
        { text: "Address", value: "address1" },
        { text: "Action", value: "" }
      ],

      techinican: {}
    };
  },

  methods: {
    technician(page = 1) {
      this.axios.get("user/technicians?page=" + page).then(response => {
        console.log(response.data.technicians);
        this.techinican = response.data.technicians;
      });
    },
    editItem(index) {
      alert(index);
    }
  },
  mounted() {
    this.technician();
  }
};
</script>
