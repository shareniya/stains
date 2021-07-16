import Axios from "axios";

import GetCurrentLocalDateTime from "../GetCurrentLocalDateTime";
 
const PageTracker = () => {
  //geturl
  const currentURL = window.location.pathname;
 
  // getdate
  let dateString = GetCurrentLocalDateTime();
 
  let pagetrackerdata = {
    url: currentURL,
    date: dateString,
  };
 
  const systempagetracker = (pagetrackerdata) => {
    //fire request
    Axios.post("/systempagetracking/ins", {
      pagetrackerdata,
    })
      .then((res) => {
        if (res.status === 200) {
          pagetrackerdata.url = currentURL;
          pagetrackerdata.date = dateString;
          //console.log("Successfully tracking.");
          //console.log(pagetrackerdata);
        } else {
          // console.log("Something went wrong with tracking");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  systempagetracker(pagetrackerdata);
};
 
export default PageTracker;