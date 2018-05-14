<template>
   <section>
   
    <p class="display-1">Write and design your story</p>
    <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                
                @change="onEditorChange($event)"
             >
  </quill-editor>
    <quill-editor
                ref="editableQuill"
                v-model="editContent"
                @change="onEditorChange($event)"
             >
  </quill-editor>
 

  </section>
</template>

<script>
export default {
     data () {
      return {
        content: "<h1>Short Summary</h1><p><br></p><p>Contributors fund ideas they can be passionate about and to people they trust. Here are some things to do in this section:</p><ul><li>Introduce yourself and your background.</li><li>Briefly describe your campaign and why it's important to you.</li><li>Express the magnitude of what contributors will help you achieve.</li></ul><p><br></p><p>Remember, keep it concise, yet personal. Ask yourself: if someone stopped reading here would they be ready to make a contribution?</p><h2>What We Need &amp; What You Get</h2><p><br></p><p>Break it down for folks in more detail:</p><ul><li>Explain how much funding you need and where it's going. Be transparent and specific-people need to trust you to want to fund you.</li><li>Tell people about your unique perks. Get them excited!</li><li>Describe where the funds go if you don't reach your entire goal.</li></ul><h2>The Impact</h2><p><br></p><p>Feel free to explain more about your campaign and let people know the difference their contribution will make:</p><ul><li>Explain why your project is valuable to the contributor and to the world.</li><li>Point out your successful track record with projects like this (if you have one).</li><li>Make it real for people and build trust.</li></ul><p><br></p><h2>Risks &amp; Challenges</h2><p><br></p><p>People value your transparency. Be open and stand out by providing insight into the risks and obstacles you may face on the way to achieving your goal.</p><ul><li>Share what qualifies you to overcome these hurdles.</li><li>Describe your plan for solving these challenges.</li></ul><h2>Other Ways You Can Help</h2><p><br></p><p>Some people just can't contribute, but that doesn't mean they can't help:</p><ul><li>Ask folks to get the word out and make some noise about your campaign.</li><li>Remind them to use the Indiegogo share tools!</li></ul><p><br></p><h1>And that's all there is to it.</h1><p><br></p><p><br></p>",
        editContent: "<h1>Short Summary</h1><p><br></p><p>Contributors fund ideas they can be passionate about and to people they trust. Here are some things to do in this section:</p><ul><li>Introduce yourself and your background.</li><li>Briefly describe your campaign and why it's important to you.</li><li>Express the magnitude of what contributors will help you achieve.</li></ul><p><br></p><p>Remember, keep it concise, yet personal. Ask yourself: if someone stopped reading here would they be ready to make a contribution?</p><h2>What We Need &amp; What You Get</h2><p><br></p><p>Break it down for folks in more detail:</p><ul><li>Explain how much funding you need and where it's going. Be transparent and specific-people need to trust you to want to fund you.</li><li>Tell people about your unique perks. Get them excited!</li><li>Describe where the funds go if you don't reach your entire goal.</li></ul><h2>The Impact</h2><p><br></p><p>Feel free to explain more about your campaign and let people know the difference their contribution will make:</p><ul><li>Explain why your project is valuable to the contributor and to the world.</li><li>Point out your successful track record with projects like this (if you have one).</li><li>Make it real for people and build trust.</li></ul><p><br></p><h2>Risks &amp; Challenges</h2><p><br></p><p>People value your transparency. Be open and stand out by providing insight into the risks and obstacles you may face on the way to achieving your goal.</p><ul><li>Share what qualifies you to overcome these hurdles.</li><li>Describe your plan for solving these challenges.</li></ul><h2>Other Ways You Can Help</h2><p><br></p><p>Some people just can't contribute, but that doesn't mean they can't help:</p><ul><li>Ask folks to get the word out and make some noise about your campaign.</li><li>Remind them to use the Indiegogo share tools!</li></ul><p><br></p><h1>And that's all there is to it.</h1><p><br></p><p><br></p>",
                editorOption: {
          theme: 'bubble',
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
       onEditorChange({ quill, html, text }) {
        // console.log('editor quill!', quill)
        console.log('editor html!', html)
        // console.log('editor text!', text)
        // quill.enable(false);
        // this.content = html
      }
    },
    mounted(){
     this.$refs.myQuillEditor.quill.enable(false)
    }

}
</script>

<style>

</style>
