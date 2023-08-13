import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import Info from '@/posts/Info.mdx'
import Jadwal from '@/posts/Jadwal.mdx'
import TesSeleksi from '@/posts/TesSeleksi.mdx'
import Pengumuman from '@/posts/Pengumuman.mdx'
import MateriTes from '@/posts/MateriTes.mdx'
import BiayaSMP from '@/posts/BiayaSMP.mdx'
import BiayaSMA from '@/posts/BiayaSMA.mdx'
import ProgramUnggulan from '@/posts/ProgramUnggulan.mdx'
import ProgramPenunjang from '@/posts/ProgramPenunjang.mdx'
import JadwalKegiatanHarian from '@/posts/JadwalKegiatanHarian.mdx'
import Fasilitas from '@/posts/Fasilitas.mdx'
import { useState } from "react";

export default function InfoPage() {
  const [active, setActive] = useState(0)

  const posts = [
    {
      title: 'Brosur',
      component: <Info/>,
    },
    {
      title: 'Timeline',
      component: <Jadwal/>,
    },
    {
      title: 'Pilihan Kelas',
      component: <TesSeleksi/>,
    },
    {
      title: 'Jalur Masuk',
      component: <Pengumuman/>,
    },
    {
      title: 'Beasiswa',
      component: <MateriTes/>,
    },
    {
      title: 'Prestasi',
      component: <BiayaSMP/>,
    },
    {
      title: 'Biaya Pendidikan dan rinciannya',
      component: <BiayaSMA/>,
    },
    {
      title: 'List Seragamyang didapatkan',
      component: <ProgramUnggulan/>,
    },
    {
      title: 'Sarana dan Prasarana',
      component: <ProgramPenunjang/>,
    },
    {
      title: 'Program Pesantren dan Akademik',
      component: <JadwalKegiatanHarian/>,
    },
    {
      title: 'Tes Seleksi dan Materi',
      component: <Fasilitas/>,
    },
    {
      title: 'Pengumuman dan Daftar Ulang',
      component: <Fasilitas/>,
    },
    {
      title: 'Jadwal Kegiatan Harian',
      component: <Fasilitas/>,
    }
  ]

  return (
    <Container>
      <Row>
        <Col md="3">
          <ListGroup>
            {posts.map((post, index) => (
              <ListGroupItem 
                key={index} 
                action
                active={index === active} 
                tag="a" 
                href="#"
                onClick={() => setActive(index)}
              >
                {post.title}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col>
          {posts[active].component}
        </Col>
      </Row>
      
    </Container>
  )
}