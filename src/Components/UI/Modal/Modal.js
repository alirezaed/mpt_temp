import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


export default function ModalEx({title,children,open,onToggle}){



    return <Modal isOpen={open} toggle={onToggle}>
      <ModalHeader>
        {title}
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
}