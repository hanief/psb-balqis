import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import DataEdit from "./DataEdit";
import { useState } from "react";
import HasilTesEdit from "./HasilTesEdit";
import PasswordEdit from "./PasswordEdit";

export default function DataViewerModal({isOpen, toggle, initialRegistration, updateSpecificRegistrationData, onUpdate}) {
  const [activeTab, setActiveTab] = useState('1')
  
  function handleSave() {
    toggle()
  }

  return (
    <Modal 
      centered 
      size="xl" 
      isOpen={isOpen} 
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        <span>Data Viewer</span>
      </ModalHeader>
      <ModalBody>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={activeTab === '1'}
              onClick={() => setActiveTab('1')}
            >
              Data Pendaftar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '2'}
              onClick={() => setActiveTab('2')}
            >
              Hasil Tes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '3'}
              onClick={() => setActiveTab('3')}
            >
              Akun & Password
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="mt-2" activeTab={activeTab}>
          <TabPane tabId="1">
            <DataEdit
              initialRegistration={initialRegistration} 
              updateSpecificRegistrationData={updateSpecificRegistrationData} 
              onUpdate={onUpdate}
            />
          </TabPane>
          <TabPane tabId="2">
            <HasilTesEdit
              initialRegistration={initialRegistration}
              updateSpecificRegistrationData={updateSpecificRegistrationData} 
              onUpdate={onUpdate}
            />
          </TabPane>
          <TabPane tabId="3">
            <PasswordEdit />
          </TabPane>
        </TabContent>
        
      </ModalBody>
    </Modal>
  )
}