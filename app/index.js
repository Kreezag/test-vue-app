var apiURL = 'https://api.github.com/search/repositories?q=""+language:javascript&sort=stargazers_count&order=desc';



const MAX_AVAILABLE_ITEM_COUNT = 1000; // NOTE: github default count
const DEFAULT_REQUEST_ELEMENTS_COUNT = 30; // NOTE: github default count

const mkRequestParams = (pageNumber) => {
  return pageNumber ? `page=${pageNumber}` : '';
};


new Vue({

  el: '#demo',

  data: {
    availablePages: 1,
    pages: 1,
    repos: [],
    itemsLength: null,
    loading: true
  },

  created: function () {
    this.fetchData();
  },

  watch: {
    pages: function () {
      this.fetchData();
    }
  },

  methods: {
    fetchData: function () {
      let xhr = new XMLHttpRequest();
      let self = this;

      self.loading = true;

      xhr.open('GET', `${apiURL}&${mkRequestParams(self.pages)}`);
      xhr.onload = function () {
        let response = JSON.parse(xhr.response);

        self.repos = response.items;
        self.loading = false;

        self.itemsLength = self.itemsLength || self.repos.length;

        self.availablePages = Math.ceil(MAX_AVAILABLE_ITEM_COUNT/self.itemsLength);

        console.log('response', xhr, response);
      };
      xhr.send()
    }
  }
});
