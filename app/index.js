var apiURL = 'https://api.github.com/search/repositories?q=""+language:javascript&sort=stargazers_count&order=desc';

/**
 * Actual demo
 */

const MAX_AVAILABLE_ITEM_COUNT = 1000;

const demo = new Vue({

  el: '#demo',

  data: {
    availablePages: 1,
    pages: 1,
    repos: null,
    itemsLength: null,
    isLoaded: false
  },

  created: function () {
    this.fetchData()
  },

  methods: {
    fetchData: function () {
      let xhr = new XMLHttpRequest();
      let self = this;

      self.isLoaded = false;

      xhr.open('GET', `${apiURL}&page=${self.availablePages}`);
      xhr.onload = function () {
        let response = JSON.parse(xhr.response);

        self.repos = response.items;
        self.isLoaded = true;

        self.itemsLength = self.itemsLength || self.repos.length;

        self.availablePages = Math.ceil(MAX_AVAILABLE_ITEM_COUNT/self.itemsLength);

        console.log('response', xhr);
      };
      xhr.send()
    }
  }
});
