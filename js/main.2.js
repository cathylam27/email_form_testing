// import component first!!
import HeroThumb from "./components/TheHeroThumbnail.js";
import LightBox from "./components/TheLightbox.js";
import { SendMail } from "./components/mailer.js";

(() => {
  // create vue instance here
  const { createApp } = Vue;

  createApp({
    created() {
      // ALWAYS get your remote data here
      fetch("./data.json")
        .then((res) => res.json())
        .then((data) => (this.heroData = data))
        .catch((error) => console.error(error));
    },

    data() {
      return {
        heroData: {},
        lbData: {},
        showLB: false,
        message: "Hello Vue!",
      };
    },

    components: {
      theherothumb: HeroThumb,
      thelightbox: LightBox,
    },

    methods: {
      loadLightbox(hero) {
        //set the lightbox data / render it
        this.lbData = hero;

        //show the lightbox
        this.showLB = true;
      },

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

        let errorPopper = document.querySelector(".alert-container");

        errorPopper.textContent = "Fill out ALL the damn fields!!";

        errorPopper.classList.remove("showme");

        setTimeout(function () {
          errorPopper.classList.remove("showme");
        }, 4000);
      },

      processMailSuccess(result) {

        // show a success message in the UI
        //alert("success! but don't EVER use alerts. They are gross.");
        // show some UI here to let the user know the mail attempt was successful
        let passmail = document.querySelector(".alert-container");

        passmail.textContent = "Your email success!!";

        passmail.classList.remove("showme");
      },

      processMail(event) {
        debugger;

        // use the SendMail component to process mail
        SendMail(event.target.parentElement.parentElement)
          .then((data) => this.processMailSuccess(data))
          .catch((err) => this.processMailFailure(err));
      },
    },
  }).mount("#app");
})();
