<template>
   <section>
     <p class="info-title" style="width:90%">Campaign Overview</p>
     <v-container fluid class="pa-0 pt-2 pb-2" >
      <p class="mb-2 edit-subtitle">Overview Image <span class="red--text">*</span></p>
      <p class="mb-2 edit-subtitle-small">Choose an image for the overview section of your campaign page. Pick an image that shows off your product or the benefit of your campaign. PNG or JPG. 320 x 240 recommended resolution. </p>
      <div class="overview-img-preview">
      <img class="uploaded"/>

      </div>
      <form class="mt-2" action="" method="post" enctype="multipart/form-data" @submit.prevent="AJAXSubmit">
          <input v-show="false" value="xsvz0m5i" type="text" name="upload_preset"/>
          <input class="inputfile" type="file" name="file" @change="clickUpload" />
          <!-- <label for="file">Please Choose a file</label> -->
          <input v-show="false" class="submit-btn" type="submit" value="Submit" />
      </form>
     </v-container>

    <div class="pitch-wrapper mt-5">
      <p class="mb-2 edit-subtitle">Campaign Pitch <span class="red--text">*</span></p>
      <p class="mb-2 edit-subtitle-small">Tell potential contributors more about your campaign. Provide details that will motivate people to contribute. A good pitch is compelling, informative, and easy to digest.</p>
      <quill-editor
                ref="editableQuill"
                v-model="editContent"
                @change="changedText($event.html,'story')"
                style="background-color:white"
             >
      </quill-editor>
    </div>
 

  </section>
</template>

<script>
import editProjStore,{UPDATE_EDITED_PROJ} from '../../store/EditProjStore.js'
// cloudinary.config({ 
//   cloud_name: 'dlhs7xpgp', 
//   api_key: '139543215892619', 
//   api_secret: 'iYXUACVhmYRNqQ12f57JgqqqOfQ' 
// });

export default {
     data () {
      return {
        editContent: "<h1>Short Summary</h1><p><br></p><p>Contributors fund ideas they can be passionate about and to people they trust. Here are some things to do in this section:</p><ul><li>Introduce yourself and your background.</li><li>Briefly describe your campaign and why it's important to you.</li><li>Express the magnitude of what contributors will help you achieve.</li></ul><p><br></p><p>Remember, keep it concise, yet personal. Ask yourself: if someone stopped reading here would they be ready to make a contribution?</p><h2>What We Need &amp; What You Get</h2><p><br></p><p>Break it down for folks in more detail:</p><ul><li>Explain how much funding you need and where it's going. Be transparent and specific-people need to trust you to want to fund you.</li><li>Tell people about your unique perks. Get them excited!</li><li>Describe where the funds go if you don't reach your entire goal.</li></ul><h2>The Impact</h2><p><br></p><p>Feel free to explain more about your campaign and let people know the difference their contribution will make:</p><ul><li>Explain why your project is valuable to the contributor and to the world.</li><li>Point out your successful track record with projects like this (if you have one).</li><li>Make it real for people and build trust.</li></ul><p><br></p><h2>Risks &amp; Challenges</h2><p><br></p><p>People value your transparency. Be open and stand out by providing insight into the risks and obstacles you may face on the way to achieving your goal.</p><ul><li>Share what qualifies you to overcome these hurdles.</li><li>Describe your plan for solving these challenges.</li></ul><h2>Other Ways You Can Help</h2><p><br></p><p>Some people just can't contribute, but that doesn't mean they can't help:</p><ul><li>Ask folks to get the word out and make some noise about your campaign.</li><li>Remind them to use the Indiegogo share tools!</li></ul><p><br></p><h1>And that's all there is to it.</h1><p><br></p><p><br></p>",
                editorOption: {
          theme: 'snow',
          placeholder: "输入任何内容，支持html",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
            ]
          }
        }
      
      }
    },
    methods : {
       onEditorChange(html) {
        console.log('editor html!', html)
      },
      clickUpload() {
        document.querySelector('.submit-btn').click();
      },
      changedText(value,key,nested){
          if(nested){
            this.saveToStore({[key] : {[nested]:value}})

            } else {
              this.saveToStore({[key] : value})
            }
      },
      saveToStore(proj){
      this.$store.commit({type:UPDATE_EDITED_PROJ, proj})
      ;
    },

      AJAXSubmit(formElement) {
        var that = this;
        var ajaxSuccess = function () {
        console.log('succecs!',this.responseText)
        var response = JSON.parse(this.responseText);
        console.log("ajaxSuccess", typeof this.responseText);
        document.querySelector('.uploaded').setAttribute("src", response["secure_url"]);
        document.querySelector('.uploaded').style.width = "296px";
        document.querySelector('.uploaded').style.height = "296px";
        that.changedText(response["secure_url"],'featuredImgUrl')
      },
        formElement= formElement.target
        // console.log("starting AJAXSubmit",formElement);
        if (!formElement.action) { return; }
        // console.log('formelement',formElement)
        var xhr = new XMLHttpRequest();
        xhr.onload = ajaxSuccess;
        xhr.open("post", "https://api.cloudinary.com/v1_1/dlhs7xpgp/image/upload");
        xhr.send(new FormData(formElement));
      }
      // uploadImage(fileSource){
      //   // console.log(typeof fileSource.srcElement.value)
      //   // cloudinary.uploader.upload(fileSource.srcElement.value, function
      //   //  (error, result) { console.log(result)});
      //     let url = `https://api.cloudinary.com/v1_1/dlhs7xpgp/image/upload`
      //     let formData = new FormData();
      //     formData.append("api_key",'139543215892619');
      //     formData.append("file", fileSource.srcElement);
      //     // formData.append("public_id", "sample_image");
      //     // formData.append("timestamp", timeStamp);
      //     formData.append("upload_preset", 'xsvz0m5i');

      //     axios
      //     .post(url, formData)
      //     .then((result) => {
      //         console.log(result);
      //     })
      //     .catch((err) => {
      //         console.log(err);
      //     })    
      // },
      

    },
    mounted(){
    //  this.$refs.myQuillEditor.quill.enable(false)
    }

}
// var inputs = document.querySelectorAll( '.inputfile' );
// Array.prototype.forEach.call( inputs, function( input )
// {
// 	var label	 = input.nextElementSibling,
// 		labelVal = label.innerHTML;
//     console.log(input.value.split( '\\' ).pop())
// 	input.addEventListener( 'change', function( e )
// 	{
//     var fileName = '';
// 		if( this.files && this.files.length > 1 )
// 			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
// 		else
// 			fileName = e.target.value.split( '\\' ).pop();

// 		if( fileName )
// 			label.querySelector( 'span' ).innerHTML = fileName;
// 		else
// 			label.innerHTML = labelVal;
// 	});
// });
</script>

<style scoped>
.info-title {
  font-size: 24px;
  /* font-weight: 550; */
}
.edit-subtitle{

  font-size:18px;
}
.edit-subtitle-small{
  color:grey;
  font-size:16px;
}
.overview-img-preview{
  width:300px;
  height:300px;
  background-color:white;
  border: 2px dashed grey;
}
/* .inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: black;
    display: inline-block;
    cursor:pointer
}

.inputfile:focus + label,
.inputfile + label:hover {
    background-color: red;
} */
</style>
