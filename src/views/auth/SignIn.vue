<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 dark>
          <v-card class="elevation-12">
            <v-toolbar dark color="teal">
              <v-toolbar-title class="text-xs-center">Login form</v-toolbar-title>
            </v-toolbar>
            <v-form method="post" @submit.prevent="store">
            <v-card-text>
              
                <v-text-field prepend-icon="person" v-model="email" label="Email" type="text"></v-text-field>
                <v-text-field prepend-icon="lock" v-model="password" label="Password" id="password" type="password"></v-text-field>
              
            </v-card-text>
            <v-card-actions pa-2>
               <v-checkbox v-model="checkbox1" label="Remember me" ></v-checkbox>
              <v-btn
                :loading="loading"
                :disabled="loading"
                color="primary"
                round
                small
                @click.prevent="store"
              >
                Login
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </template>
              </v-btn>
              
              
            </v-card-actions>
            </v-form>
            <v-layout>
                <v-flex xs12 >
                    <v-layout>
                         <v-flex xs8>
                             
                         </v-flex>
                         <v-flex xs4>
                             <v-btn flat right round small class="font-weight-light"> Forget password?</v-btn>
                         </v-flex>

                    </v-layout>
                </v-flex>
            </v-layout>
            
            
           
          </v-card>
          
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import axios from 'axios';
  import EventBus from "../../event-bus";
  export default {
    data()
    {
      return {
        phone:'',
        password:'',
        loading: false
      }
    },
    methods:
      {
        store()
        {
          this.loading = true;
          if(confirm()){
                
          }
        //   this.axios.post('login', {phone:this.email, password:this.password})
        //     .then(response => {
        //       if(response.data.token)
        //       {
        //         localStorage.setItem('token', response.data.token);
        //         localStorage.setItem('_userRole', response.data.user.role);
        //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        //         setTimeout(_=>{
        //           this.$store.commit('SET_LAYOUT', 'master-layout');
        //           this.$router.push({name:'dashboard'});
        //           },500);
        //         this.loading = false;
        //       }
        //     });
        }
      },
mounted() {
    EventBus.$emit("authLayout", true);
  },
  beforeDestroy() {
    EventBus.$emit("authLayout", false);
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
