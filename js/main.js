import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        data() {
            return {
                message: 'Hello Vue!'
            }
        },

        methods: {
            processMailFailure(result) {
                // show a failure message in the UI
                // use this.$refs to connect to the elements on the page and mark any empty fields/inputs with an error class
                //alert("failure! and if you keep using an alert, DOUBLE failure!");
                // show some errors in the UI here to let the user know the mail attempt was successful
                let fields = JSON.parse(result.message).message;
        
                fields.forEach(field => {
                  
                  this.$refs[field].classList.add('error');
                  this.$refs[field].placeholder = "this done broke, yo!";
                  
                });
        
                let errorPopper = document.querySelector("#error-container");
        
                errorPopper.textContent = "Fill out ALL the damn fields!!";
        
                errorPopper.classList.add("showme");
        
                setTimeout(function () {
                  errorPopper.classList.remove("showme");
                }, 4000);
              },
        
              processMailSuccess(result) {
        
                // show a success message in the UI
                //alert("success! but don't EVER use alerts. They are gross.");
                // show some UI here to let the user know the mail attempt was successful
                let passmail = document.querySelector("#success-container");
        
                passmail.textContent = "Your email success!!";
        
                passmail.classList.remove("showme");
              },


            processMail(event) {        
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();