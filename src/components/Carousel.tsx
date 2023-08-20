import Image from "next/image"
import { Carousel } from 'react-responsive-carousel'

export default function CarouselComponent() {  
  return (
    <Carousel autoPlay={true} showArrows={true} showStatus={false} infiniteLoop={true}>
      <Image className="bd-placeholder-img" src="/slide1.jpg" width={768} height={431} alt="Santri"></Image>
      <Image className="bd-placeholder-img" src="/slide2.jpg" width={768} height={431} alt="Santri"></Image>
      <Image className="bd-placeholder-img" src="/slide3.jpg" width={768} height={431} alt="Santri"></Image>
      <Image className="bd-placeholder-img" src="/slide4.jpg" width={768} height={431} alt="Santri"></Image>
    </Carousel>
  )
}