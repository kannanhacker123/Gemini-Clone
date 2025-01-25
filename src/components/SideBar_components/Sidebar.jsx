import { useState, useContext } from 'react'
import './Sidebar.css'
import { assets } from "../../assets/assets"
import { ChatContext } from "../../context/context"; // Updated context name


const Sidebar = () => {
    const {onSend, previousPrompt, setRecentPrompt} = useContext(ChatContext);
    const [extended, setExtended] = useState(false)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSend(prompt)
    }
    return (
        <div className='sidebar'>
            <div className='top'>
                <img onClick={()=>setExtended(perv=>!perv)} className='menu' src={assets.menu_icon} alt="menu_icon" />
                <div className='new-chat'>
                    <img src={assets.plus_icon} alt="plus_icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended
                    ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {previousPrompt.map((prompt, index) => (
                            <div key={index} className="recent-entry" onClick={loadPrompt}>
                                <img src={assets.message_icon} alt="message_icon" />
                                <p>{prompt.slice(0,15)}...</p>
                            </div>
                        ))}
                    </div>
                    : null
                }

            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="question_icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="history_icon" />
                    {extended ? <p>History</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="setting_icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar