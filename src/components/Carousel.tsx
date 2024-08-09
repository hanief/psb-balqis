import { useFileContents } from "@/data/fileContents"
import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'
import { Container } from "reactstrap"

export default function CarouselComponent() {
  const { slides, slidesURL } = useFileContents()

  return (
    <Container className="m-1 p-1" fluid>
      <Carousel autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
        {slides?.map(slide => 
          <Image 
            key={slide.name} 
            className="bd-placeholder-img rounded" 
            src={`http://127.0.0.1:54321/storage/v1/object/public/contents/slide/${slide.name}`} 
            width={768} 
            height={431}
            alt="Santri Balqis Jogja" />
        )}
      </Carousel>
    </Container>
  )
}