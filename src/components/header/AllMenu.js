import React from 'react'
import { menu, create } from '../../utils/static'


const AllMenu = () => {
    return (
        <div className='all_menu scrollbar'>
            <div className="all_menu_header">Menu</div>
            <div className="all_menu_wrap scrollbar">
                <div className="all_left">
                    <div className="all_menu_search">
                        <i className="amm_s_ic"></i>
                        <input type="text" placeholder='Search menu' />
                    </div>
                    <div className="all_menu_group">
                        <div className="all_menu_group_header">Social</div>
                        {
                            menu.slice(0, 6).map((item, index) => (
                                <div key={index} className="all_menu_item hover1">
                                    <img src={`../../left/${item.icon}.png`} alt="" />
                                    <div className="all_menu_col">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="all_menu_group">
                        <div className="all_menu_group_header">Entertainment</div>
                        {
                            menu.slice(6, 9).map((item, index) => (
                                <div key={index} className="all_menu_item hover1">
                                    <img src={`../../left/${item.icon}.png`} alt="" />
                                    <div className="all_menu_col">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="all_menu_group">
                        <div className="all_menu_group_header">Shopping</div>
                        {
                            menu.slice(9, 11).map((item, index) => (
                                <div key={index} className="all_menu_item hover1">
                                    <img src={`../../left/${item.icon}.png`} alt="" />
                                    <div className="all_menu_col">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="all_menu_group">
                        <div className="all_menu_group_header">Personal</div>
                        {
                            menu.slice(11, 15).map((item, index) => (
                                <div key={index} className="all_menu_item hover1">
                                    <img src={`../../left/${item.icon}.png`} alt="" />
                                    <div className="all_menu_col">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="all_menu_group">
                        <div className="all_menu_group_header">Professional</div>
                        {
                            menu.slice(15, 17).map((item, index) => (
                                <div key={index} className="all_menu_item hover1">
                                    <img src={`../../left/${item.icon}.png`} alt="" />
                                    <div className="all_menu_col">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="all_menu_group">
                        <div className="all_menu_group_header">Community Resources</div>
                        {
                            menu.slice(17, 21).map((item, index) => (
                                <div key={index} className="all_menu_item hover1">
                                    <img src={`../../left/${item.icon}.png`} alt="" />
                                    <div className="all_menu_col">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="all_menu_group">
                        <div className="all_menu_group_header">More</div>
                        {
                            menu.slice(21, 23).map((item, index) => (
                                <div key={index} className="all_menu_item hover1">
                                    <img src={`../../left/${item.icon}.png`} alt="" />
                                    <div className="all_menu_col">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="all_right">
                    <div className="all_right_header">Create</div>
                    {create.slice(0, 7)
                        .map((item, index) => (
                        <div key={index} className="all_right_item hover1">
                            <div className="all_right_circle">
                                <i className={`${item.icon}`}></i>
                            </div>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllMenu