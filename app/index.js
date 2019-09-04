var apiURL = 'https://api.github.com/search/repositories?q=""+language:javascript&sort=stargazers_count&order=desc';



const MAX_AVAILABLE_ITEM_COUNT = 1000; // NOTE: github default count

const mkRequestParams = (pageNumber) => {
  return pageNumber ? `page=${pageNumber}` : '';
};


new Vue({
  el: '#demo',
  data: {
    currentPage: 1,
    repos: [],
    itemsLength: null,
    loading: true,
    hasAvailablePages: false,
  },

  created: function () {
    this.fetchData();
  },

  computed: {
    availablePages: function () {
      console.log('this', this);
      return this.itemsLength ? Math.ceil(MAX_AVAILABLE_ITEM_COUNT/this.itemsLength) : 1;
    }
  },

  watch: {
    currentPage: function () {
      this.fetchData();
    }
  },

  methods: {
    fetchData: function () {
      let xhr = new XMLHttpRequest();
      let self = this;

      self.loading = true;

      xhr.open('GET', `${apiURL}&${mkRequestParams(self.currentPage)}`);
      xhr.onload = function () {
        let response = JSON.parse(xhr.response);
        self.hasAvailablePages = true;

        self.repos = response.items;
        self.loading = false;

        self.itemsLength = self.itemsLength || self.repos.length;

        console.log('response', xhr, response);
      };
      xhr.send()
    }
  }
});
