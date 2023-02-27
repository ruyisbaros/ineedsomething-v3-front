import React from 'react'
import { Dots } from '../../svg'
import { stories2 } from '../../utils/static';
import AddFriendSmallCard from './AddFriendSmallCard';

const PeopleYouMayKnow = () => {
    return (
        <div className='ppl_you_mayKnow'>
            <div className="ppl_you_mayKnow_header">
                People You May Know
                <div className="post_header_right ppl_circle hover1">
                    <Dots />
                </div>
            </div>
            <div className="ppl_you_mayKnow_list">
                {
                    stories2.map((item, i) => (
                        <AddFriendSmallCard key={i} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default PeopleYouMayKnow