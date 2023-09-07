import { useFileContents } from "@/data/contents"
import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'

export default function CarouselComponent() {
  const { slidesURL } = useFileContents()

  return (
    <Carousel autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
      {slidesURL?.map(slide => {
        return (
          <Image key={slide} className="bd-placeholder-img rounded" src={slide} width={768} height={431} alt="Santri"></Image>
        )
      })}
    </Carousel>
  )
}