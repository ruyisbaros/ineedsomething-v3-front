import React from 'react'
import { ArrowRight, Plus } from '../../../svg'
import { stories } from "../../../utils/static"
import StoryComp from './StoryComp'
import { useMediaQuery } from 'react-responsive';
import "./stories.css"

const Stories = () => {
    const query1175px = useMediaQuery({
        query: "(max-width:1175px)"
    })
    const query870px = useMediaQuery({
        query: "(max-width:870px)"
    })
    const query820px = useMediaQuery({
        query: "(max-width:820px)"
    })
    const max = query820px ? 4 : query870px ? 3 : query1175px ? 4 : 5
    //console.log(query870px, max)
    return (
        <div className='stories'>
            <div className="create_story_card">
                <img className="create_story_img" src="../../../images/default_pic.png" alt="" />
                <div className="plus_story">
                    <Plus color="#fff" />
                </div>
                <div className="story_create_text">Create story</div>
            </div>
            {stories.slice(0, max).map((story, i) => (
                <StoryComp key={i} story={story} />
            ))}
            <div className="white_circle">
                <ArrowRight color="#65676b" />
            </div>
        </div>
    )
}

export default Stories