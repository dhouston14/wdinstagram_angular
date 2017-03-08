
let data = [
  {
    author: "Dom",
    body: "Anything you want to post?",
    photo_url: "http://bit.ly/2dZYr5a"
  },
  {
    author: "Random",
    body: "More More More More Louvre?",
    photo_url: "http://bit.ly/2n07rvf"
  },
  {
    author: "Extra",
    body: "Its really becoming like something",
    photo_url: "http://bit.ly/2mD3w6l"
  }
]


"use strict";

(function(){
  // angular
  //   .module("wdinstagram", [])

angular
  .module("wdinstagramApp", [ "ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .factory("EntryFactory", ["$resource", EntryFactoryFunction])
  .controller("EntryIndexController", ["EntryFactory", EntryIndexControllerFunction])
  .controller("EntryNewController", ["EntryFactory", "$state", EntryNewControllerFunction])
  .controller("EntryShowController", ["EntryFactory", "$stateParams", EntryShowControllerFunction])
  .controller("EntryEditController", ["EntryFactory", "$stateParams", "$state", EntryEditControllerFunction])

function RouterFunction($stateProvider){
  $stateProvider
  .state("entryIndex", {
    url: "/entries",
    templateUrl: "js/ng-views/index.html",
    controller: "EntryIndexController",
    controllerAs: "vm"
  })
  .state("entryNew", {
    url: "/entries/new",
    templateUrl: "js/ng-views/new.html",
    controller: "EntryNewController",
    controller: "vm"
  })
  .state("entryShow", {
    url: "/entries/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "EntryShowController",
    controllerAs: "vm"
  })
  .state("entryEdit", {
    url: "entries/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "EntryEditController",
    controller: "vm"
  })
}

})();


function EntryFactoryFunction($resource) {
  return $resource("http://localhost:3000/entries/:id")
}

function EntryIndexControllerFunction(EntryFactory){
  this.entries = EntryFactory.query()
}

function EntryNewControllerFunction(EntryFactory, $state) {
  this.entry = new EntryFactory()
  this.create = function() {
    this.entry.$save(function(entry) {
      $state.go("entryShow", {id: entry.id})
    })
  }
}

function EntryShowControllerFunction(EntryFactory, $stateParams) {
  this.entry = EntryFactory.get({id: $stateParams.id})
}

function EntryEditControllerFunction(EntryFactory, $stateParams, $state) {
  this.entry = EntryFactory.get({id: $stateParams.id})
  this.update = function() {
    this.entry.$update({id: $stateParams.id}), function(entry) {
      $state.go("entryShow", {id: entry.id})
      }
    }
  }
