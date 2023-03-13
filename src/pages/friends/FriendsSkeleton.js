import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"
import { Link } from 'react-router-dom';
const FriendsSkeleton = () => {
    return (
        <div className='friends'>
            <div className="friends_left">
                <div className="friends_left_header">
                    <Skeleton
                        width={150}
                        height={56}
                        containerClassName='avatar-skeleton'
                    />
                    <Skeleton height="36px" width="36px"
                        circle
                        containerClassName='avatar-skeleton' />
                </div>
                <div className="friends_left_wrap">
                    {
                        [1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                            <div className='menu_item' key={i}>
                                <Skeleton height="36px" width="36px"
                                    circle
                                    containerClassName='avatar-skeleton' />
                                <Skeleton
                                    width={200}
                                    height={40}
                                    containerClassName='avatar-skeleton'
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="friends_right scrollbar">
                <div className="friends_right_wrap" style={{ borderBottom: "none" }}>
                    <div className="friends_left_header">
                        <Skeleton
                            width={200}
                            height={40}
                            containerClassName='avatar-skeleton'
                        />
                        <Skeleton
                            width={70}
                            height={40}
                            containerClassName='avatar-skeleton'
                        />
                    </div>
                    <div className="flex_wrap" style={{ borderBottom: "none" }}>
                        {
                            [1, 2, 3].map((user, i) => (
                                <Skeleton
                                    key={i}
                                    width={210}
                                    height={250}
                                    containerClassName='avatar-skeleton'
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="friends_right_wrap" style={{ borderBottom: "none" }}>
                    <div className="friends_left_header">
                        <Skeleton
                            width={200}
                            height={40}
                            containerClassName='avatar-skeleton'
                        />
                        <Skeleton
                            width={70}
                            height={40}
                            containerClassName='avatar-skeleton'
                        />
                    </div>
                    <div className="flex_wrap" >
                        {
                            [1, 2, 3].map((user, i) => (
                                <Skeleton
                                    key={i}
                                    width={210}
                                    height={250}
                                    containerClassName='avatar-skeleton'
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="friends_right_wrap" style={{ borderBottom: "none" }}>
                    <div className="friends_left_header">
                        <Skeleton
                            width={200}
                            height={40}
                            containerClassName='avatar-skeleton'
                        />
                        <Skeleton
                            width={70}
                            height={40}
                            containerClassName='avatar-skeleton'
                        />
                    </div>
                    <div className="flex_wrap" >
                        {
                            [1, 2, 3, 4, 5].map((user, i) => (
                                <Skeleton
                                    key={i}
                                    width={210}
                                    height={250}
                                    containerClassName='avatar-skeleton'
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendsSkeleton