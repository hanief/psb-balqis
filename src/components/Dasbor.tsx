import { Button, Card, CardBody, Col, Container, FormGroup, Input, InputGroup, InputGroupText, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { useEffect, useState } from "react";
import { useRegistrations } from "@/data/registrations";
import dynamic from "next/dynamic"
import { useUser } from "@supabase/auth-helpers-react";

const DasborData = dynamic(() => import('@/components/DasborData'), { ssr: false })
const DasborArtikel = dynamic(() => import('@/components/DasborArtikel'), { ssr: false })
const DasborKonten = dynamic(() => import('@/components/DasborKonten'), { ssr: false })
const DasborSlide = dynamic(() => import('@/components/DasborSlide'), { ssr: false })
const DataViewerModal = dynamic(() => import('@/components/DataViewerModal'), { ssr: false })
const DeleteConfirmationModal = dynamic(() => import('@/components/DeleteConfirmationModal'), { ssr: false })

export default function Dasbor() {
  const user = useUser()
  const [activeTab, setActiveTab] = useState("1")

  const [dataViewerProps, setDataViewerProps] = useState({
    isOpen: false,
    registration: null,
  })

  const [deleteConfirmationProps, setDeleteConfirmationProps] = useState({
    isOpen: false,
    onConfirm: null,
  })

  const { registrations, update, refreshData, remove, downloadBukti, downloadAsXLSX } = useRegistrations()

  if (user?.email !== 'admin@utama.app') {
    return (
      <Container>
        <Row>
          <Col>
            Sorry, you don&apos;t have access rights to this page.
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink href="#" active={activeTab === "1"} onClick={() => setActiveTab("1")}>
            Data
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" active={activeTab === "2"} onClick={() => setActiveTab("2")}>
            Artikel
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" active={activeTab === "3"} onClick={() => setActiveTab("3")}>
            Konten
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" active={activeTab === "4"} onClick={() => setActiveTab("4")}>
            Slide
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="mt-2">
        <TabPane tabId="1">
          <DasborData 
            setDataViewerProps={setDataViewerProps}
            setDeleteConfirmationProps={setDeleteConfirmationProps}
          />
        </TabPane>
        <TabPane tabId="2">
          <DasborArtikel 
            setDeleteConfirmationProps={setDeleteConfirmationProps}
          />
        </TabPane>
        <TabPane tabId="3">
          <DasborKonten />
        </TabPane>
        <TabPane tabId="4">
          <DasborSlide 
            setDeleteConfirmationProps={setDeleteConfirmationProps}
          />
        </TabPane>
      </TabContent>
      
      {dataViewerProps.isOpen && (
        <DataViewerModal
          initialRegistration={dataViewerProps.registration}
          isOpen={dataViewerProps.isOpen}
          toggle={() => {
            setDataViewerProps({
              isOpen: !dataViewerProps.isOpen,
              registration: dataViewerProps.registration ? null : dataViewerProps.registration})
          }}
          onUpdate={refreshData}
        />
      )}

      {deleteConfirmationProps.isOpen && (
        <DeleteConfirmationModal
          isOpen={deleteConfirmationProps.isOpen}
          toggle={() => setDeleteConfirmationProps({...deleteConfirmationProps, isOpen: !deleteConfirmationProps.isOpen})}
          onConfirm={deleteConfirmationProps.onConfirm}
          title={'Konfirmasi hapus'}
          description={'Apakah Anda yakin ingin menghapus data ini?'}
        />
      )}
    </>
  )
}