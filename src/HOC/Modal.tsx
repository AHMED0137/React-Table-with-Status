import { Modal, ModalProps } from '@mantine/core';
import React from "react";

export function MyModal<T extends Object>(  
    Component: React.ComponentType<T & ModalProps>
) {
return function ModalWrapper({
    opened,
    onClose,
    size,
    title,
    padding,
    ...rest
  }: T & ModalProps){
    
return (
    <> 
        <Modal 
            centered  
            opened={opened} 
            onClose={onClose} 
            title={title}
            >
             <Component  {...(rest as T & ModalProps)} />
        </Modal>
    </>
    )
  }


  
};