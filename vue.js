new Vue({
    el: '#root',

    data: {
        baseImgURL: "https://image.tmdb.org/t/p/", 
        tmbdApiKey: "14a71724c6989940b458fd958cd75ba2",
        textToSearch: "",
        moviesList: [],
        tvShowList: [],        
    },

    methods: {
// Regola la chiamata API a seconda del testo inserito nel "input" che modifica textToSearch
        makeAxiosSearch(searchType) {

            const axiosOptions = {
                params: {
                    api_key: this.tmbdApiKey,
                    query: this.textToSearch,
                    language: "it-IT"
                }
            };

            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOptions)
                .then((resp) => {
                    baseURL = this.baseImgURL

                    if (searchType === "movie") {
                        this.moviesList = resp.data.results.map((movie) => {
                            movie.banana = Math.ceil(movie.vote_average / 2)
                            movie.flag = `Lingua: <span class="flag-icon flag-icon-${movie.original_language}"></span>`
                            movie.img = `<img src='${baseURL}w185/${movie.poster_path}'>`
                            
                            return movie
                        })

                    } else if (searchType === "tv") {
                        this.tvShowList = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name
                            tvShow.banana = Math.ceil(tvShow.vote_average / 2)
                            tvShow.flag = `Lingua: <span class="flag-icon flag-icon-${tvShow.original_language}"></span>`
                            tvShow.img = `<img src='${baseURL}w185/${tvShow.poster_path}'>`
                            
                            return tvShow
                        })
                    }
                    
                })
        },

// Accorpa la ricerca per film e serie tv in una funzione sola
        doSearch() {
            this.makeAxiosSearch("movie")
            this.makeAxiosSearch("tv")
        },

// Converte il voto da 1 a 5 in stelle
        starConverter(element) {

            let stars = ""

            for (i=0; i < element; i++) {
                stars += "&#11088"
            }

            return stars
        }
    }
})