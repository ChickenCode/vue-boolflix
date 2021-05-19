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
        makeAxiosSearch(searchType) {

            //prendere il testo da cercare this.textToSearch
            //comporre la query string da usare durante la chiamare alle api di TMDB.
            //eseguire la chiamata all'endpoint che mi serve, inviando la questystring appena creata.
            //nel then della risposta, salvo i dati ricevuti in una variabile locale

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

        doSearch() {
            this.makeAxiosSearch("movie")
            this.makeAxiosSearch("tv")
        },

        starConverter(element) {

            let stars = ""

            for (i=0; i < element; i++) {
                stars += "&#11088"
            }

            return stars
        }
    }
})