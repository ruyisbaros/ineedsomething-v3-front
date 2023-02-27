import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"
import { Link } from 'react-router-dom';
/*  <Skeleton baseColor="#ddd" width={40}
                    height={40} circle containerClassName="avatar-skeleton" /> */

const HomeRightSkeleton = () => {
    return (
        <div className='right_home'>
            <div className="heading">
                <Skeleton baseColor="#fff" width={140}
                    height={20} containerClassName="avatar-skeleton" />
            </div>
            <div className="splitter1"></div>
            <div className="contacts_wrap">
                <div className="contacts_header">
                    <div className="contacts_header_left">
                        <Skeleton baseColor="#fff" width={100}
                            height={20} containerClassName="avatar-skeleton" />
                    </div>
                    <div className="contacts_header_right">
                        <div className="contact_circle">
                            <Skeleton baseColor="#fff" width={20}
                                height={20} containerClassName="avatar-skeleton" />
                        </div>
                        <div className="contact_circle">
                            <Skeleton baseColor="#fff" width={20}
                                height={20} containerClassName="avatar-skeleton" />
                        </div>
                        <div className="contact_circle">
                            <Skeleton baseColor="#fff" width={20}
                                height={20} containerClassName="avatar-skeleton" />
                        </div>
                    </div>
                </div>
                <div className="contacts_list">
                    <div className='contact hover3'>
                        <div className="contact_img">
                            <Skeleton baseColor="#fff" width={36}
                                height={36} circle containerClassName="avatar-skeleton" />
                        </div>
                        <Skeleton baseColor="#fff" width={140}
                            height={15} containerClassName="avatar-skeleton" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeRightSkeleton