import React, { useState } from 'react'
import { Icon } from '../../../../assets/icon';

export const ButtonMenu = (props) => {

    // Props
    const { data } = props;

    // State
    const [hangover, setHangover] = useState(false);

    // Method
    const handleClick = () => {
        data.method();
    }

    const hangoverItemChild = () => {
        setHangover(prev => !prev)
    }

    return (
        <>
            {
                data?.child
                    ?
                    <button className={`h-[40px] rounded-[10px] flex items-center justify-center duration-200 hover:text-[#3790c7] hover:font-[500] px-[20px] relative`} onClick={hangoverItemChild}>
                        <span className='font-[400]'>
                            {data.name}
                        </span>
                        <div className={`absolute top-full left-0 min-w-full min-h-[40px] bg-[red] ${hangover && 'hidden'}`}>
                            {
                                data?.child?.map((menuChild) => {
                                    return (
                                        <button className={`h-[40px] rounded-[10px] flex items-center justify-center duration-200 hover:text-[#3790c7] hover:font-[500] px-[20px] relative`} onClick={menuChild.handleClick}>
                                            <span className='font-[400]'>
                                                {menuChild.name}
                                            </span>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </button>
                    :
                    <button className={`h-[40px] rounded-[10px] flex items-center justify-center duration-200 hover:text-[#3790c7] hover:font-[500] px-[20px]`} onClick={handleClick}>
                        <span className='font-[400]'>
                            {data.name}
                        </span>
                    </button>
            }
        </>
    )
}
