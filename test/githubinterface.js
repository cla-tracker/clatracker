var config = require("../config.js");

var chai = require("chai");

var expect = require("chai").expect;

var githubInterface = require("../models/GitHubInterface")
var testGithubStatusParameters = require("./data/testGithubStatusParameters")
var testPayloadContributor = require("./data/testPayloadContributor")
var githubListener = require("../routes/githublistener")


describe("it successfully sets a github status when sent a valid datapayload object and status parameters", function(){

  it("returns status set", function(){
      return githubInterface.setPullRequestStatusAsync(testPayloadContributor["repository"]["full_name"], testPayloadContributor["pull_request"]["head"]["sha"], testGithubStatusParameters)
        .then(function(response){
          expect(response).to.equal("status set")
        })
  })
})
