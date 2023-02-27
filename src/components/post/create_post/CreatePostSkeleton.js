import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"

const CreatePostSkeleton = () => {
    return (
        <div className='create_post'>
            <div className="create_post_header">
                <Skeleton baseColor="#ddd" width={40}
                    height={40} circle containerClassName="avatar-skeleton" />
                <div className="open_post" >

                </div>
            </div>
            <div className="create_splitter"></div>
            <div className="create_post_body">
                <div className="create_post_icon hover1">
                    <Skeleton baseColor="#ddd" width={25}
                        height={25} containerClassName="avatar-skeleton" />
                    <Skeleton baseColor="#ddd" width={67}
                        height={19} containerClassName="avatar-skeleton" />
                </div>
                <div className="create_post_icon hover1">
                    <Skeleton baseColor="#ddd" width={25}
                        height={25} containerClassName="avatar-skeleton" />
                    <Skeleton baseColor="#ddd" width={67}
                        height={19} containerClassName="avatar-skeleton" />
                </div>

                <div className="create_post_icon hover1">
                    <Skeleton baseColor="#ddd" width={25}
                        height={25} containerClassName="avatar-skeleton" />
                    <Skeleton baseColor="#ddd" width={67}
                        height={19} containerClassName="avatar-skeleton" />
                </div>

            </div>
        </div>
    )
}

export default CreatePostSkeleton