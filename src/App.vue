<template >
  <body>
    <div>
      <!-- layout prior exercise: prompts user to login -->
      <div class="is-vhcentered has-text-centered pt-6">
        <!--p v-if="!VMAssigned" class="pt-6" style="font-size:48px;text-align:center">👋</p-->
        <div v-if="!VMAssigned" class="is-json title mb-6">
          Welcome 👋 to IRCR! 
          <div class="subtitle mb-6 pb-6"> A Cyber Range for Incident Response Training. </div> </div> <br>
        

        
          <form @submit.prevent="validateId()" v-if="!VMAssigned">
            <input
              class="input input-label-long is-size-6"
              :value="'Your NDS Account: '"
            />
            <span>
              <input
                class="input input-short is-size-6 blank-input"
                v-model="userID"
                :placeholder="'e.g. glr02738'"
              />
            </span>
            <div class="has-text-danger" v-if="emptyInput">
              User ID cannot be empty.
            </div>
             <div class="has-text-danger" v-if="userExists">
              User ID was already used. 
            </div>

            <div class="buttons is-centered mt-5">
              <button
                class="button submit-button is-rounded "
                type="submit"
                value="Submit"
                @click="validateId()"
              >
                <span>Submit</span>
              </button>
    
            </div>
          </form>
          <div v-else> 
 <div class="title mt-6 pt-6"> Hello <strong class="has-text-primary"> {{this.pseudonym}} </strong>. </div>
        
          <div class="small">(this will be your pseudonym on the cyber range)  </div>  <br> 
          Thank you for registration. We registered your user ID <strong class="has-text-primary"> {{this.userID}} </strong> and set up the cyber range for you. 

            <div class="buttons is-centered mt-5">
              <button
                class="button submit-button is-rounded mt-5"
                type="submit"
                value="Submit"
                @click="proceedToCR()"
              >
                <span>PROCEED TO CYBER RANGE → </span>
              </button>
    
            </div>


          </div>

        
        <div class="mt-6">
        <h2 class="is-json mt-6">
          A master's project 🎓 at the University of Regensburg.
        </h2>
        </div>
      </div>

        </div>
  </body>
</template>


<script>


import { userDashboard } from "@/firebase"; // TODO rename to userScoreboard
import { VM_db } from "@/firebase"; 

export default {
  name: "App",

  data() {
    return {
      
      gameCompleted: false,
      gameStarted: false,
      userID: null,
      emptyInput: false,
      inputGiven: false,
      userExists: false,
      VMData: null,
      VMAssigned: false
 };
  },

  methods: {
    proceedToCR() {
        window.open(this.url); 
    }, 
    validateId() {
      var message = localStorage.getItem("storedData");
      console.log(message);
      if (this.userID == null) {
        this.userExists = false;
        this.emptyInput = true;
      } else {
        this.emptyInput = false;
        this.inputGiven = true;
        this.userExists = false;
        this.assignVM();

      } },
      

        //randomly retrieve combination of yet unassigned VM/pseudonym
        //create link for user, store userID in localStorage
      
          assignVM() {
        //create document in user database (cyberrangeDashboard)
         var docRef = userDashboard.doc(String(this.userID));
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) { //check if pseudonym was used before
            this.userExists=true;
          } 
          
          else{ //register user 
            this.getFreeVM();
        

          }} ); 
        
          
      },

      async getFreeVM(){
          const snapshot = await VM_db.where("userName", "==", "").limit(1).get();
          this.VMData=snapshot.docs.map((doc) => doc.data())
          console.log(this.VMData[0].ip)
          userDashboard.doc(this.userID).set({
              round: 1,
              level: 0,
              points: 0,
              ip: this.VMData[0].ip,
              pseudonym: this.VMData[0].pseudonym 
              } );
              
              VM_db.doc(this.ip).update( {
                userName : this.userID }
              )
              this.pseudonym = this.VMData[0].pseudonym;
              this.url="http://"+this.VMData[0].ip+":7080";
              this.ip= this.VMData[0].ip
              this.VMAssigned = true;
              
              } 

              
      },

/*
    getUserPoints() {
      var docRef = userDashboard.doc(String(this.userID));
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.round = doc.data().round; //in order to only show the trainees from the same round on the dashboard
            if (doc.data().startTime != null) {
              //get data from user who logged in before
              this.points = doc.data().points;
              this.tasksCompleted = doc.data().level;
              this.startTime = doc.data().startTime;
              if (doc.data().taskTimes != null) {
                this.taskTimes = JSON.parse(doc.data().taskTimes);
              }
            } else {
              //registered player who didn't log in before
              console.log(doc.data().startTime);
              this.tasksCompleted = 0;
              this.startTime = new Date();
              userDashboard.doc(this.userID).update({
                startTime: this.startTime,
              });
              var blanksCompleted = { task2: 0, task3: 0, task4: 0 };
              localStorage.setItem("storedData", JSON.stringify(storedTries));
              localStorage.setItem(
                "blanksCompleted",
                JSON.stringify(blanksCompleted)
              );
            }
          } else {
            // if not only played with preset users
            this.points = 0;
            this.tasksCompleted = 0;
            this.startTime = new Date();
            userDashboard.doc(this.userID).set({
              startTime: this.startTime,
              round: 1,
              level: 0,
              points: 0,
      
              
            });
            console.log(this.getVM()); 
            
          } 
          this.getMarker();
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },   */


    
    async getVM(){
      const snapshot = await VM_db.where("userName", "==", "").limit(1).get();
          console.log(snapshot.docs.map((doc) => doc.data()));
          return JSON.stringify(snapshot.docs.map((doc) => doc.data().pseudonym)) //funktioniert so nicht
    },

    async getMarker() {
      const snapshot = await userDashboard
        .where("round", "==", this.round)
        .orderBy("points", "desc")
        .get();
      //const snapshot = await userDashboard.orderBy("points", "desc").get();
      this.dashboard = snapshot.docs.map((doc) => doc.data());
     
    },

 /*   async uploadPoints() {
      await userDashboard.doc(this.userID).update({
        points: this.points,
        level: this.tasksCompleted,
        startTime: this.startTime,
      });
      this.getMarker();
    },

    async uploadEvaluationData() {
      await userDashboard.doc(this.userID).update({
        taskTimes: JSON.stringify(this.taskTimes),
      });
    },

*/
    

};
</script>


<style>
@import "./../css/bulma.css";
@import "./../css/bulma-tooltip.css";
</style>