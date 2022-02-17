interface Beatmap {
    id: number,
    artist: string,
    average_length: number,
    bpm: number,
    covers: {
        beatmapset_id: number,
        cover: string,
        coverx2: string,
        card: string,
        cardx2: string,
        list: string,
        listx2: string,
        slimcover: string,
        slimcoverx2: string
    },
    creator: string,
    preview_url: string,
    title: string,
    user_id: number,
    unique_id: string,
}

export default Beatmap;