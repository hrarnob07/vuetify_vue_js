<template>
  <v-app>
    <v-container fluid pa-0 fill-height>
      <v-layout>
        <v-flex>
          <v-navigation-drawer permanent v-if="drawer">
            <v-toolbar flat>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="title">Application</v-list-tile-title>
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
              <v-toolbar>
                <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
                <v-toolbar-title>Title</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                  <v-btn flat>Link One</v-btn>
                  <v-btn flat>Link Two</v-btn>
                  <v-btn flat>Link Three</v-btn>
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
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Home",
          icon: "dashboard",
          route: "home"
        },
        {
          title: "Vehicle",
          icon: "question_answer",
          route: "vehiche"
        },
        {
          title: "About",
          icon: "question_answer",
          route: "about"
        }
      ],
      right: null
    };
  }
};
</script>
