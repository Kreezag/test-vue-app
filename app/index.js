var apiURL = 'https://api.github.com/search/repositories?q=""+language:javascript&sort=stargazers_count&order=desc';

/**
 * Actual demo
 */

var demo = new Vue({

  el: '#demo',

  data: {
    // branches: ['master', 'dev'],
    // currentBranch: 'master',
    repos: null
  },

  created: function () {
    this.fetchData()
  },

  // watch: {
  //   currentBranch: 'fetchData'
  // },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n');
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', apiURL);
      xhr.onload = function () {
        self.repos = JSON.parse(xhr.response).items;
        console.log('repos', self.repos);
        console.log('repos', xhr, JSON.parse(xhr.response));
      };
      xhr.send()
    }
  }
});
