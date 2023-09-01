import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'

export default function CarouselComponent() {  
  return (
    <Carousel autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
      <Image className="bd-placeholder-img rounded" src="/slide1.jpg" width={768} height={431} alt="Santri"></Image>
      <Image className="bd-placeholder-img rounded" src="/slide2.jpg" width={768} height={431} alt="Santri"></Image>
      <Image className="bd-placeholder-img rounded" src="/slide3.jpg" width={768} height={431} alt="Santri"></Image>
      <Image className="bd-placeholder-img rounded" src="/slide4.jpg" width={768} height={431} alt="Santri"></Image>
    </Carousel>
  )
}