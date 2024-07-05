import Swal from 'sweetalert2';

const NotificationService = {
    success: (title, text) => {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                content: 'swal2-content'
            }
        });
    },
    error: (title, text) => {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                content: 'swal2-content'
            }
        });
    },
    warning: (title, text) => {
        return Swal.fire({
            icon: 'warning',
            title: title,
            text: text,
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                content: 'swal2-content'
            }
        });
    }
};

export default NotificationService;
