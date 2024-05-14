import { Icon } from 'assets/icon'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { COLOR } from '../shareComponent/constant'
import { checkLogin } from '../shareComponent/Function/checkLogin';
import toast from 'react-hot-toast';

const Favourite = (props) => {

    const { styles } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        if (checkLogin()) {
            navigate('/favourite');
        } else {
            // Swal.fire({
            //     icon: 'info',
            //     text: 'Rất tiếc! Bạn chưa đăng nhập',
            //     showConfirmButton: false,
            //     timer: 3000,
            //     timerProgressBar: true
            // })
            toast.error('Rất tiếc! Bạn chưa đăng nhập');
        }
    }

    return (
        <button onClick={handleClick} style={styles}>
            <Icon name="heart" fill={COLOR.primaryColor} color={COLOR.primaryColor} />
        </button>
    )
}

export default Favourite