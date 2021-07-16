import Axios from "axios";

const IsProfileCompleted = (props) => {
  Axios.post("/profile/sel", {
    email: props
  }).then((res) => {
    if (res.status === 200) {
      let user = res.data[0][0];

      // check if these fields are null or empty
      if (user.firstname !== null && user.firstname !== "" &&
        user.lastname !== null && user.lastname !== "" &&
        user.phonenumber !== null && user.phonenumber !== "" &&
        user.employmenttypeid !== null &&
        // not checking contract end date because user might be permanent employee which has no contract end date
        user.contractstartdate !== null && user.contractstartdate !== "") {
        // set isComplete boolean value into local storage
        localStorage.setItem("isProfileCompleted", true);
      }
      else {
        // set isComplete boolean value into local storage
        localStorage.setItem("isProfileCompleted", false);
      }
    }
  }).catch((err) => {
    console.log("Failed to retrieve user profile", err);
  })

  // check user's tech stacks (primary skills only)
  Axios.post("/userstechstacks/sel", {
    email: props
  }).then((res) => {
    if (res.status === 200) {
      let usertechstacks = res.data[0].map((obj) => {
        let newObj = {};
        newObj["techstackid"] = obj.techstackid;
        newObj["skilllevel"] = obj.skilllevel;
        return newObj;
      });

      let primarySkillList = usertechstacks
        .filter((usersTechStacks) => usersTechStacks.skilllevel === 1)
        .map((primarySkills) => primarySkills.techstackid);

      if (primarySkillList.length > 0) {
        // set isComplete boolean value into local storage
        localStorage.setItem("isProfileCompleted", true);
      }
      else {
        // set isComplete boolean value into local storage
        localStorage.setItem("isProfileCompleted", false);
      }

    }
  }).catch((err) => {
    console.log("Failed to retrieve user tech stacks", err);
  })

};

export default IsProfileCompleted;