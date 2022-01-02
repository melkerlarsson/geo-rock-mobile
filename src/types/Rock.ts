export interface NewRock {
    latitude: number,
    longitude: number,
    description: string,
    lake: string,
}

export interface Rock extends NewRock {
    isVerified: boolean,
    _id: string,
    imageUrl: string,
}