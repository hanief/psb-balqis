import { useFileContents } from "@/data/fileContents"
import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'
import { Container } from "reactstrap"

export default function CarouselComponent() {
  const { slides } = useFileContents()

  return (
    <Container className="m-1 p-1" fluid>
      <Carousel autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
        {slides?.map(slide => 
          <Image 
            key={slide.id} 
            className="bd-placeholder-img rounded" 
            src={slide.url} 
            width={768} 
            height={431}
            alt="Santri Balqis Jogja" />
        )}
      </Carousel>
    </Container>
  )
}