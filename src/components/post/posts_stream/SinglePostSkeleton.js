import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"
import { Link } from 'react-router-dom';

const SinglePostSkeleton = () => {
    return (
        <div className='post' >
            <div className="post_header">
                <Link to="" className='post_header_left'>
                    <Skeleton baseColor="#ddd" width={40}
                        height={40} circle containerClassName="avatar-skeleton" />
                    <div className="header_col">
                        <div className="post_profile_name">
                            <Skeleton baseColor="#ddd" width={114}
                                height={19} containerClassName="avatar-skeleton" />
                            <div className="updated_p">

                            </div>
                        </div>
                        <div className="post_profile_privacy_date">
                            <Skeleton baseColor="#ddd" width={100}
                                height={15} containerClassName="avatar-skeleton" />
                        </div>
                    </div>
                </Link>
                <div className="post_header_right hover1" >
                    <Skeleton baseColor="#ddd" width={37}
                        height={35} containerClassName="avatar-skeleton" />
                </div>
            </div>

            <div className="post_grid">
                <Skeleton baseColor="#ddd" width={685}
                    height={610} containerClassName="avatar-skeleton" />
            </div>
            <div className="post_infos">
                <div className="reacts_count">
                    <div className="react_count_images"></div>
                    <div className="react_count_num"></div>
                </div>
                <div className="to_right">
                    <div className="comments_count"></div>
                    <div className="share_count"></div>
                </div>
            </div>
            <div className="post_actions">

                <div className="post_action hover1">
                    <Skeleton baseColor="#ddd" width={20}
                        height={20} containerClassName="avatar-skeleton" />
                    <Skeleton baseColor="#ddd" width={100}
                        height={15} containerClassName="avatar-skeleton" />
                </div>
                <div className="post_action hover1">
                    <Skeleton baseColor="#ddd" width={20}
                        height={20} containerClassName="avatar-skeleton" />
                    <Skeleton baseColor="#ddd" width={100}
                        height={15} containerClassName="avatar-skeleton" />
                </div>
                <div className="post_action hover1">
                    <Skeleton baseColor="#ddd" width={20}
                        height={20} containerClassName="avatar-skeleton" />
                    <Skeleton baseColor="#ddd" width={100}
                        height={15} containerClassName="avatar-skeleton" />
                </div>
            </div>

        </div>
    )
}

export default SinglePostSkeleton