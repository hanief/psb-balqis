export interface Wilayah {
  code: string
  province: string
  slug: string
  cities: {
    code: string
    city: string
    slug: string
    districts: {
      code: string
      district: string
      slug: string
      villages: {
        code: string
        postal: number
        village: string
        slug: string
        latitude: number
        longitude: number
        elevation: number
        geometry: boolean
      }[]
    }[]
  }[]
}