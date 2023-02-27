import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"
import { Link } from 'react-router-dom';
/*  <Skeleton baseColor="#ddd" width={40}
                    height={40} circle containerClassName="avatar-skeleton" /> */
const HomeLeftSkeleton = () => {
    return (
        <div className='left_home scrollbar'>
            <Link to="/profile" className="left_link hover1">
                <Skeleton baseColor="#fff" width={36}
                    height={36} circle containerClassName="avatar-skeleton" />
                <Skeleton baseColor="#fff" width={100}
                    height={15} containerClassName="avatar-skeleton" />
            </Link>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                    <div className='left_link hover1'>
                        <Skeleton baseColor="#fff" width={36}
                            height={36} circle containerClassName="avatar-skeleton" />
                        <div className='col'>
                            <div className="col_1">
                                <Skeleton baseColor="#fff" width={100}
                                    height={15} containerClassName="avatar-skeleton" />
                            </div>

                        </div>
                    </div>
                ))
            }


            <div className="splitter"></div>
            <div className="shortcut">
                <div className="heading">
                    <Skeleton baseColor="#fff" width={100}
                        height={15} containerClassName="avatar-skeleton" />
                </div>

            </div>
            <div className="shortcut_list">
                <a className='hover1' href="https://github.com/ruyisbaros" target="_blank" rel="noreferrer">
                    <Skeleton baseColor="#fff" width={36}
                        height={36} circle containerClassName="avatar-skeleton" />
                    <span>
                        <Skeleton baseColor="#fff" width={100}
                            height={15} containerClassName="avatar-skeleton" />
                    </span>
                </a>
                <a className='hover1' href="https://www.linkedin.com/in/ahmet-erdonmez-085bb8141/" target="_blank" rel="noreferrer">
                    <Skeleton baseColor="#fff" width={36}
                        height={36} circle containerClassName="avatar-skeleton" />
                    <span>
                        <Skeleton baseColor="#fff" width={100}
                            height={15} containerClassName="avatar-skeleton" />
                    </span>
                </a>
            </div>
            <div className="fb_copyright">
                <Skeleton baseColor="#fff" width={100}
                    height={15} containerClassName="avatar-skeleton" />
            </div>
        </div>
    )
}

export default HomeLeftSkeleton