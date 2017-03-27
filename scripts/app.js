window.onload=function(){
const APIURL = "https://www.omdbapi.com/"

// register the grid component
Vue.component('movie-list', {
  template: '#list-template',
  props: {
    movies: Array,
    selectedMovie: [Object, Boolean],
    filterKey: String
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    fetchMovie: function (id) {
    	app.fetchMovie(id)
    }
  }
})

Vue.component('movie-detail', {
  template: '#detail-template',
  props: {
    movie: [Object, Boolean]
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    toLabels: function (str) {
			var ret = ""
      var labels = str.split(',')
      labels.forEach(function(val, idx){
      	ret += "<span class='label label-default'>" + val.trim() + "</span> "
      })
			return ret
    }
  }
})

// bootstrap the demo
var app = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    movies: [],
    selectedMovie: false
  },
  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', APIURL + "?s=" + self.searchQuery)
      xhr.onload = function () {
        self.movies = JSON.parse(xhr.responseText).Search
      }
      xhr.send()
    },
    fetchMovie: function (id) {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', APIURL + "?i=" + id)
      xhr.onload = function () {
      	self.selectedMovie = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  }
})
}