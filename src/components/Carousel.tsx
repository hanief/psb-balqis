import { useFileContents } from "@/data/fileContents"
import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'

export default function CarouselComponent() {
  const { slides } = useFileContents()

  return (
    <Carousel autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
      {slides?.map(slide => {
        const url = `https://cfubtesizbmwfhtuzzav.supabase.co/storage/v1/object/public/contents/slide/${slide.name}`
        return (
          <Image key={slide.name} className="bd-placeholder-img rounded" src={url} width={768} height={431} alt="Santri Balqis Jogja"></Image>
        )
      })}
    </Carousel>
  )
}