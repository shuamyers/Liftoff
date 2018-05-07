<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>

            <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="person" 
                        label="Email" 
                        type="text"
                        v-model="user.email"></v-text-field>
                    <v-text-field 
                        prepend-icon="lock" 
                        label="Password" 
                        type="password"
                        v-model="user.password"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    outline 
                    color="primary"
                    type="submit">Log in</v-btn>
            </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  }
};
</script>