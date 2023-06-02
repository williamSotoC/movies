export interface IResponse {
    page: number
    results: Ifilm[]
    total_pages: number
    total_results: number
}

export interface Ifilm {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}




export interface IFilmAcquistato {
    id?: number;
    userId: number;//! mi identifica l'utente che si è loggato
    //!il nome della proprietà "userId" lo trovo nella documentazione del server locale

    film: Ifilm

}