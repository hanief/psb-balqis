import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'

export default function CarouselComponent() {  
  return (
    <Carousel autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true}>
      <Image className="bd-placeholder-img" src="/slide2.jpg" width={768} height={431} alt="Santri putri"></Image>
      <Image className="bd-placeholder-img" src="/slide1.jpg" width={768} height={431} alt="Santri putra"></Image>
    </Carousel>
  )
}