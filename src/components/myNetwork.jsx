import React, {Component} from 'react';
import {dummyUsers} from './user';

import talkjs from 'talkjs';
import './myNetwork.css';
import '../App.css'




class MyNetwork extends Component{
    constructor(props){
        super(props);
        let recentUser;
        const recentTalkJsUser = localStorage.getItem('recentTalkJsUser');
        if(recentTalkJsUser){
            recentUser = JSON.parse(recentTalkJsUser)
            console.log(recentUser)
        }
        this.state={
            recentUser
        }
    }

    handleClick(userId){
        // Retrive two user that will participate in conversation
        const {recentUser} = this.state;
        const user = dummyUsers.find(user => user.id === userId)

        // Initialize session
        talkjs.ready
        .then(()=>{
            // Create two users that will aprticipate in conversation
            const me = new talkjs.User(recentUser)
            const other = new talkjs.User(user)

            // Create a talk session if this does not exist
            if(!window.talkSession){
                window.talkSession = new talkjs.Session({
                    appId: "tG17Rxjk",
                    me: me
                })
            }

            // Get conversationId or create One
            const conversationId = talkjs.oneOnOneId(me, other)
            const conversation = window.talkSession.getOrCreateConversation(conversationId)

            // Set participants in the conversations
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            // Create or mount chatbox
            this.chatbox = window.talkSession.createChatbox(conversation)
            this.chatbox.mount(this.container)
        })
        .catch(e =>console.error(e))
    }

    render(){
        const {recentUser} = this.state
    return(
        <div className="mainDiv">
            <div className="recent-user-container">
                <div className="recent-users">
                    {recentUser && 
                        <div>
                            <picture className="recent-user-picture">
                                <img src={recentUser.photoUrl} alt={recentUser.name} />
                            </picture>
                            <div className="recent-user-info-container">
                                <div className="recent-user-info">
                                    <h3>{recentUser.name}</h3>
                                    <p>{recentUser.info}</p>
                                </div>
                                <div className="recent-user-action">
                                    <button>Message</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="users-container">
                <div className="users">
                    <ul className="users-items">
                        {dummyUsers.map((user)=>(
                            <li className="user" key={user.id}>
                                <picture className="user-picture">
                                    <img src={user.photoUrl} alt={`${user.name}`} />
                                </picture>
                                <div className="user-info-container">
                                    <div className="user-info">
                                        <h4>{user.name}</h4>
                                        <p>{user.info}</p>
                                    </div>
                                    <div className="user-action">
                                        <button onClick={(userId)=> this.handleClick(user.id)}>Message</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="chatbox-container" ref={c => this.container = c}>
                            <div id="talkjs-container" style={{height:"300px"}}><i></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}}

export default MyNetwork;