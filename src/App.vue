<template>
  <v-app>
    <v-container fluid pa-0 fill-height v-if="!authLayout">
      <v-layout>
        <v-flex>
          <v-navigation-drawer width="275px" permanent v-if="drawer">
            <v-toolbar flat dark>
              <v-list >
                <v-list-tile >
                  <v-list-tile-title  class="title">Application</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list dense class="pt-0">
              <v-list-tile v-for="item in items" :key="item.title" :to="item.route">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex xs12>
          <v-layout row>
            <v-flex>
              <v-toolbar dark>
                <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
                
                <v-spacer></v-spacer>
                <v-toolbar-items dark class=" hidden-sm-and-down">
                  <v-btn flat small  >Profile</v-btn>
                    
                 <v-spacer></v-spacer>
                  <v-btn flat small  > Logout 
                    <v-icon flat small >arrow_forward_ios</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid pa-2 v-else-if="authLayout">
      <v-layout>
         <v-flex xs12>
           <router-view></router-view>
         </v-flex>
      </v-layout>
    </v-container>

  </v-app>
</template>

<script>
import EventBus from './event-bus'
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      authLayout:false,
      items: [
        {
          title: "Home",
          icon: "dashboard",
          route: "/"
        },
        {
          title: "Bill Create",
          icon: "present_to_all",
          route: "/bill-create"
        },
        {
          title: "Bill List",
          icon: "collections",
          route: "/bill-list"
        },
        {
          title: "Vehicle",
          icon: "directions_car",
          route: "/vehiche"
        },
         {
          title: "Customer",
          icon: "perm_identity",
          route: "/customer"
        },
        
         {
          title: "Products and services",
          icon: "business_center",
          route: "/product-services"
        },
         {
          title: "Technician",
          icon: "supervisor_account",
          route: "/technician"
        },
        {
          title: "Vehicle Type",
          icon: "motorcycle",
          route: "/vehicle-type"
        },
        {
          title: "Transactions",
          icon: "credit_card",
          route: "/transactions"
        },
        {
          title: "About",
          icon: "info",
          route: "/about"
        }
      ],
      right: null
    };
  },
  methods:{
     changeRoute(routeName) {
      return this.$router.push({ name: routeName });
    }

  },
  created()
    {
        EventBus.$on('authLayout',function(data){
            this.authLayout = data
            
        }.bind(this));
    }

};
</script>
