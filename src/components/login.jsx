import React from 'react';
import './login.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            description:""
        }
    }

    handleChange=(e)=>{
        const target = e.target
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const{name, email, description} = this.state;

        // Generating random number which will act as id of user
        const randomNum = Math.ceil(Math.random() * 10000);
        const userData={
            name,
            email,
            description,
            id:randomNum,
            role:'Member',
            photoUrl: "https://talkjs.com/docs/img/ronald.jpg"
        }

        // Store to localstorage
        localStorage.setItem("recentTalkJsUser", JSON.stringify(userData))
        // Redirecting to my network page
        this.props.history.push("/mynetwork");
    }

    render(){
    return(
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    className="inputName" 
                    onChange={this.handleChange}/>
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email"
                    className="inputName" 
                    onChange={this.handleChange} />
                    <input 
                    type="textarea" 
                    name="description" 
                    placeholder="Describe About Yourself" 
                    className="textareaDesc"
                    onChange={this.handleChange}/>
                    <input 
                    type="submit" 
                    value="submit"
                    className="button"/>
                </form>
            </div>
        </div>
    )
}}

export default Login;
