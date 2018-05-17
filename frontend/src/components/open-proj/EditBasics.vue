<template>
  <section>
   <p class="info-title" style="width:90%">Make a good first impression: introduce your campaign objectives and entice people to learn more. This basic information will represent your campaign on your campaign page, on your campaign card, and in searches.</p>
   <v-container fluid class="pa-0 pt-2 pb-2" >
      <div>
        <p class="mb-2 edit-subtitle">Campaign Title <span class="red--text">*</span></p>
        <v-text-field
          name="input-2"
          label="What is the title of your campaign? "
          class="input-group--focused"
          @input="changedText($event,'title')"
        ></v-text-field>
      </div>
      <div>
        <p class="mb-2 edit-subtitle">Campaign Tagline <span class="red--text">*</span></p>
        <v-text-field
          name="input-2"
          label="Provide a short description that best describes your campaign to your audience. "
          class="input-group--focused"
          multi-line
          rows="2"
          @input="changedText($event,'tagLine')"
        ></v-text-field>
      </div>
      <div>
        <p class="mb-2 edit-subtitle" >Location <span class="red--text">*</span></p>
        <v-text-field 
          style="width:150px"
          name="input-2"
          label="City"
          @input="changedText($event,'location','city')"
        ></v-text-field>
        <v-text-field
          name="input-2"
          label="Country"
          style="width:150px"
          @input="changedText($event,'location','country')"
        ></v-text-field>
      </div>
      <div>
        <p class="mb-2 edit-subtitle">Category <span class="red--text">*</span></p>
        <v-select
          :items="categories"
          v-model="category"
          label="Select"
          style="width:200px"
          single-line
          @change="changedSelect($event.text)"
        ></v-select>
      </div>
      <div>
        <p class="mb-2 edit-subtitle" >Campaign Funding Goal <span class="red--text">*</span></p>
        <v-text-field 
        style="width:150px"
          name="input-2"
          placeholder="Funding Goal"
          type="number"
          @input="changedText(+$event,'fundingGoal')"
          
        ></v-text-field>
      </div>
      <div>
        <p class="mb-2 edit-subtitle" >Campaign Duration <span class="red--text">*</span></p>
        <v-text-field 
        style="width:150px"
          name="input-2"
          placeholder="Duration in days"
          type="number"
          @input="changedText(+$event,'duration')"
          max="30"
        ></v-text-field>
      </div>
    
      
  </v-container>
  </section>
  
</template>

<script>
import editProjStore,{UPDATE_EDITED_PROJ} from '../../store/EditProjStore.js'
export default {
  data() {
    return {
      category: 'Art',

      categories: [
        { text: "Art" },
        { text: "Music" },
        { text: "Tech" },
        { text: "Animals" }
      ]
    };
  },
  methods: {
    changedSelect(selected) {
      // console.log('clicked!',selected)
      this.saveToStore({category : selected})
    },
    changedText(value,key,nested){
      
      if(nested){
        this.saveToStore({[key] : {[nested]:value}})

        } else {
          this.saveToStore({[key] : value})
        }
    },
    saveToStore(proj){
      console.log(proj)
      this.$store.commit({type:UPDATE_EDITED_PROJ, proj})
      // console.log('basic got proj',this.$store.getters.editedProj)
      ;
    }
  }
};
</script>

<style scoped>
.info-title {
  font-size: 20px;
  font-weight: 500;
}
.edit-subtitle{

  font-size:20px;
}
</style>
