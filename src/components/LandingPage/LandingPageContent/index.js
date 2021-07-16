import React from "react";
import "./style.css";
import { IoIosPeople } from "react-icons/io";
import { MdNaturePeople, MdRecentActors } from "react-icons/md";
const LandingPageContent = () => {
  return (
    <>
      <div className="landing-background">
        <center className="top-title">
          <h4 className="text-light">
            A simple and accessible work management tool designed for
          </h4>
        </center>
        <br></br>
        <div class="main-timeline">

          <div class="timeline">
            <div class="date-content">
              <div class="date-outer">
                <span class="date">
                  <IoIosPeople font-size="4em" />
                </span>
              </div>
            </div>
            <div class="timeline-content">
              <h5 class="title">Application Development Teams</h5>
              <p class="description">
                Design in order to helps application development teams to
                planning, testing, analysis, programming,keep track on the
                project status, and deadline.
              </p>
            </div>
          </div>

          <div class="timeline">
            <div class="date-content">
              <div class="date-outer">
                <span class="date">
                  <MdRecentActors font-size="4em" />
                </span>
              </div>
            </div>
            <div class="timeline-content">
              <h5 class="title">Portfolio Managers</h5>
              <p class="description">
                A system helps them to plan, track,direct and manage better
                financial of the applications, development teams and their
                members.
              </p>
            </div>
          </div>

          <div class="timeline">
            <div class="date-content">
              <div class="date-outer">
                <span class="date">
                  <MdNaturePeople font-size="4em" />
                </span>
              </div>
            </div>
            <div class="timeline-content">
              <h5 class="title">Product Managers & Product Owner</h5>
              <p class="description">
                A better view for product manager and product owner as it show
                details of every application user engagement
              </p>
            </div>
          </div>
        </div>
        <div>
          <center>
            <h4 className="text-light pt-4">
              System also includes administration module to easily manage usage
              of the solution and its configuration.
            </h4>
          </center>
          <div
            className="btn-group bottom-padding"
            role="group"
            aria-label="actionButtons"
          >
            <div class="d-block btn btn-outline-light mt-3 ml-2 mr-2">
              Built-in notification when resource contract is about to expire
            </div>
            <br></br>
            <div class="d-block btn btn-outline-light mt-3 ml-2 mr-2">
              Built-in indication when skills of team members do not match your
              applications
            </div>
            <br></br>
            <div class="d-block btn btn-outline-light mt-3 ml-2 mr-2">
              Built-in indication when resources are insufficient
            </div>
            <br></br>
            <div class="d-block btn btn-outline-light mt-3 ml-2 mr-2">
              Built in indication when resources are assigned to multiple
              initiatives
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageContent;
