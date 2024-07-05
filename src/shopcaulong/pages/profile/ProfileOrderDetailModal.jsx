import React from 'react';
import Modal from 'react-modal';
import ProfileOrderDetail from './ProfileOrderDetail';

Modal.setAppElement('#root');

export default function ProfileOrderDetailModal({ isOpen, onRequestClose, orderId }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1050,
                    padding: '20px',
                    width: '90%',
                    maxWidth: '1100px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1040,
                },
            }}
        >
            {orderId && <ProfileOrderDetail orderId={orderId} />}
        </Modal>
    );
}
