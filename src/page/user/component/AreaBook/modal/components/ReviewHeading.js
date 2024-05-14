import React from 'react'

const ReviewHeading = ({ data }) => {
    return (
        <div>
            <h3 className="text-[22px] font-[400] mb-[10px]">{data?.tenSach}</h3>
        </div>
    )
}

export default ReviewHeading