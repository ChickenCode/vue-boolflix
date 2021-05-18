new Vue({
    el: '#root',

    data: {
        tmbdApiKey: "14a71724c6989940b458fd958cd75ba2",
        textToSearch: "",
        moviesList: [],
        tvShowList: []
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
                    if (searchType === "movie") {
                        this.moviesList = resp.data.results.map((movie) => {
                            movie.voto = (movie.vote_average / 2).toFixed(1)

                            return movie
                        })

                    } else if (searchType === "tv") {
                        this.tvShowList = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name
                            tvShow.voto = (tvShow.vote_average / 2).toFixed(1)

                            return tvShow
                        })
                    }
                    
                })
        },

        doSearch() {
            this.makeAxiosSearch("movie")
            this.makeAxiosSearch("tv")
        }
    }
})