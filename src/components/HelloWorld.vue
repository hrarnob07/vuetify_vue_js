<template>
    <div class="text-xs-center">
        <v-dialog v-model="getButtonClicked" width="600">
            <v-card>
                <v-card-title class="headline lighten-2" primary-title>
                    Image Title
                </v-card-title>

                <v-img :style="{transform:'rotate('+rotate+'deg)',maxHeight:'100%'}" :src="images[showingPosition]"/>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn @click.prevent="downloadImg" download="image.png" :href="images[showingPosition]"
                           color="primary" flat small>
                        <v-icon>cloud_download</v-icon>
                    </v-btn>
                    <v-btn color="primary" flat small @click="dialog = false">
                        <v-icon>cloud_upload</v-icon>
                    </v-btn>
                    <v-btn color="primary" flat small @click="rotateImage">
                        <v-icon>rotate_left</v-icon>
                    </v-btn>

                    <v-btn color="primary" :disabled="showingPosition===0" flat small @click="prevImg">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-btn color="primary" :disabled="showingPosition===(images.length-1)" flat small @click="nextImg">
                        <v-icon>chevron_right</v-icon>
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>

        <template>
            <v-btn flat @click="buttonClicked">{{getButtonClicked}} Me</v-btn>
            <p></p>
        </template>
    </div>
</template>

<script>
    import FileSaver from 'file-saver';
    import {getUser} from '../api/user'

    export default {
        data() {
            return {
                rotate: 0,
                images: [
                    'https://i.loli.net/2018/11/10/5be6852cdb002.jpeg',
                    'https://i.loli.net/2018/11/10/5be6852ce6965.jpeg',
                    'https://i.loli.net/2018/11/10/5be6852dec46e.jpeg',
                    'https://i.loli.net/2018/11/10/5be6852e1366d.jpeg'
                ],
                showingPosition: 0,
            }
        },
        methods: {
            rotateImage() {
                this.rotate -= 90;
            },
            prevImg() {
                if (this.showingPosition > 0) {
                    this.showingPosition--
                }
            },
            nextImg() {
                if (this.showingPosition < (this.images.length - 1)) {
                    this.showingPosition++
                }
            },
            downloadImg() {
                FileSaver.saveAs(this.images[this.showingPosition], "image.jpg");
            },
            buttonClicked() {

                this.$store.commit("SET_BUTTON_CLICKED", !this.getButtonClicked)
            }
        },
        computed: {
            getButtonClicked() {
                return this.$store.state.buttonClicked
            }
        },
        async mounted() {
            await getUser({name: 'name data'}).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
</script>
