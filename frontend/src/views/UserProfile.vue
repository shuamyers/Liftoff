<template>
  <section>

    <v-layout row wrap justify-end class="mt-1">
      <v-btn flat>Edit Profile</v-btn>
    </v-layout>
    <v-layout column justify-center align-center>
      <v-flex align-center>
        <v-avatar size="150px" color="grey lighten-4" class="mx-auto mt-4">
          <img src="http://www.avglobalservices.in/img/testimonial/02.jpg" alt="avatar">
        </v-avatar>

        <h2 class="pl-4 mt-2"> Shua Myers</h2>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center class="mt-5 ">
      <v-tabs color="transparent" grow centered v-tabs-item>
        <v-tab :to="`tab-my-proj`">My Projects</v-tab>
        <v-tab :to="`tab-pledge`">My Pledgs</v-tab>
        <v-tab :to="`tab-favorites`"> Favorites</v-tab>
        <v-tab-item :id="`tab-my-proj`">
          <div class="my-proj">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card color="transparent">
                  <v-container grid-list-md>
                    <v-layout>
                      <v-flex xs5>
                        <v-card-media src="https://ksr-ugc.imgix.net/assets/021/057/608/7eb31893f9290bf30a1f5d0988717312_original.jpg?w=680&fit=max&v=1525027427&auto=format&q=92&s=8d7d1c31d877d70eb58e3f270518bf41'" height="125px" contain>
                        </v-card-media>
                      </v-flex>
                      <v-flex xs7>
                        <v-card-title primary-title>
                          <div class="headline">proj title</div>
                          <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
                          <v-layout justify-end row>
                            <v-btn 
                              outline 
                              small 
                              :block="$vuetify.breakpoint.smAndDown">
                              See more
                            </v-btn>
                          </v-layout>
                        </v-card-title>
                      </v-flex>

                      <!-- <v-card-actions>
                      <v-btn flat>Listen now</v-btn>
                    </v-card-actions> -->

                    </v-layout>
                  </v-container>
                </v-card>

              </v-flex>
            </v-layout>
          </div>
        </v-tab-item>
        <v-tab-item :id="`tab-pledge`">
          <h1>COMMENTS</h1>
        </v-tab-item>
        <v-tab-item :id="`tab-favorites`">
          <h1>BACKERS</h1>
        </v-tab-item>
      </v-tabs>
    </v-layout>

  </section>

</template>

<script>
export default {};
</script>

<style scoped>
.my-proj {
	border: 1px solid lightgrey;
	border-radius: 3px;
}
.featuredImg {
	width: 30%;
	height: 125px;
	background-size: cover;
	background-image: url('https://ksr-ugc.imgix.net/assets/021/057/608/7eb31893f9290bf30a1f5d0988717312_original.jpg?w=680&fit=max&v=1525027427&auto=format&q=92&s=8d7d1c31d877d70eb58e3f270518bf41');
}
</style>
