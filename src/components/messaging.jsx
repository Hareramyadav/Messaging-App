import React, {Component, Fragment} from 'react';

import talkJs from 'talkjs';


class Messaging extends Component{
    constructor(props){
        super(props);
        this.inbox = undefined
        let recentUser
        let recentTalkJsUser = localStorage.getItem('recentTalkJsUser')
        if(recentTalkJsUser){
            recentUser = JSON.parse(recentTalkJsUser)
        }
        this.state={
            recentUser
        }
    }

    componentDidMount(){
        talkJs.ready
        .then(()=>{
            const me = new talkJs.User(this.state.recentUser)

            if(!window.talkSession){
                window.talkSession = new talkJs.Session({
                    appId:"tG17Rxjk",
                    me:me
                })
            }

            this.inbox = window.talkSession.createInbox();
            this.inbox.mount(this.container)
        })
        .catch((e)=>{
            console.error(e)
        })
    }
    render(){
        return(
            <Fragment>
                <div className="inbox-container" ref={c => this.container = c} style={{height:"500px"}}>
                    Loading.............
                </div>
            </Fragment>
        )
    }
}


export default Messaging;