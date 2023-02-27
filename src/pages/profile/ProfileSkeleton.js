import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"
const ProfileSkeleton = () => {
    return (
        <>
            <div className="profile_cover">
                <Skeleton
                    height="350px" width="100%"
                    containerClassName='avatar-skeleton' />
            </div>
            <div className="profile_image_wrap">
                <div className="profile_w_left">
                    <div className="profile_w_img">
                        <div className="profile_w_bg">
                            <Skeleton height="180px" width="180px"
                                circle
                                containerClassName='avatar-skeleton' />
                        </div>
                        <div className="profile_circle">
                            <Skeleton
                                circle
                                containerClassName='avatar-skeleton'
                            />
                        </div>
                    </div>
                    <div className="profile_w_col">
                        <div className="profile_name">
                            <Skeleton
                                width={150}
                                height={56}
                                containerClassName='avatar-skeleton'
                            />
                            <div className="other_name">
                                <Skeleton
                                    width={172}
                                    height={54}
                                    containerClassName='avatar-skeleton'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_w_right">
                    <div className="">
                        <Skeleton
                            width={109}
                            height={55}
                            containerClassName='avatar-skeleton'
                        />
                    </div>
                    <div className="">
                        <Skeleton
                            width={101}
                            height={55}
                            containerClassName='avatar-skeleton'
                        />
                    </div>
                </div>
            </div>
            <div className="profile_menu_wrap">
                <div className="profile_menu">
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ marginRight: "20px" }}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ marginRight: "20px" }}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ marginRight: "20px" }}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ marginRight: "20px" }}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ marginRight: "20px" }}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ marginRight: "20px" }}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ marginRight: "20px" }}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton
                        height="34px"
                        width="78px"
                        style={{ position: "absolute", top: "2px", right: "0" }}
                        containerClassName='avatar-skeleton'
                    />

                </div>
            </div>

        </>
    )
}

export default ProfileSkeleton