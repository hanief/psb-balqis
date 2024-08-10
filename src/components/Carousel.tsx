import { useFileContents } from "@/data/fileContents"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Carousel } from 'react-responsive-carousel'
import { Button, Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"

export default function CarouselComponent() {
  const { slides } = useFileContents()
  const router = useRouter()

  return (
    <Container className="position-relative">
      <Carousel 
        className="my-3" 
        autoPlay={true} 
        showArrows={true} 
        showStatus={false} 
        infiniteLoop={true} 
        showThumbs={false}>
        {slides?.map(slide => (
          <Image 
            key={slide.id} 
            className="bd-placeholder-img rounded" 
            src={slide.url} 
            width={750} 
            height={400}
            alt="Santri Balqis Jogja" 
          />
        ))}
      </Carousel>
      <div className="d-none d-sm-flex d-flex flex-column flex-sm-row row-gap-1 column-gap-5 position-absolute bottom-15 start-50 translate-middle-x">
        <Button tag="a" href="/daftar/sd" className="btn btn-balqis">Daftar SD</Button>
        <Button tag="a" href="/daftar/smp" className="btn btn-balqis">Daftar SMP</Button>
        <Button tag="a" href="/daftar/sma" className="btn btn-balqis">Daftar SMA</Button>
        <Button tag="a" href="/status" className="btn btn-balqis">Cek Status</Button>
      </div>
    </Container>
  )
}