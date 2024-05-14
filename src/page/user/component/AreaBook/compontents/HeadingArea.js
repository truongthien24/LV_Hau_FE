import { COLOR } from 'page/user/shareComponent/constant';
import React from 'react'

const HeadingArea = (props) => {
    // Props;
    const { title } = props;
    return (
        <div className='border-b-[1px] border-[gray] border-solid'>
            <h5 className='text-[16px] lg:text-[18px] text-[#fff] max-w-fit px-[15px] py-[8px] inline-block' style={{backgroundColor: `${COLOR.primaryColor}`, transform: 'skew(10deg)'}}>
                <a style={{transform: 'skew(-10deg)'}} className="uppercase inline-block">{title}</a>
            </h5>
        </div>
    )
}

export default HeadingArea