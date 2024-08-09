import { useFileContents } from "@/data/fileContents"
import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'
import { Container } from "reactstrap"

export default function CarouselComponent() {
  const { slides } = useFileContents()

  return (
    <Container fluid>
      <Carousel className="my-3" autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
        {slides?.map(slide => (
          <Image 
            key={slide.id} 
            className="bd-placeholder-img rounded" 
            src={slide.url} 
            width={750} 
            height={400}
            alt="Santri Balqis Jogja" />
        ))}
      </Carousel>
    </Container>
  )
}