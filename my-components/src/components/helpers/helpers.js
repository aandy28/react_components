var axios = require('axios');
var allBranches = require('../map/branches.json');

function getAllBranches(){
  // get all retailers from api
  // return axios.get('https://api.github.com/users/' + username + '/repos');
  let branches = [];
  allBranches.branches.map((branch, index) => {
      if (branch.longitude) {
        branches.push(branch);
      }
      return branches;
    });

  return {branches: branches };
    
};


var custom_helper = {

  getAllBranches: function(){
    return axios.all([getAllBranches()])
      .then(function(arr){
        return {
          branches: arr[0].branches
        }
      })
  },
}

module.exports = custom_helper;