import React, {useState } from "react"
import { Link , useParams} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import {database} from "../firebase";
import { Card  } from "react-bootstrap";

var title = "";
 var subject = "";
 var idea = "";
var ch = "";

const View = () =>{
    const [user,setUser] = useState({});
    const {id} = useParams();
    const { currentUser } = useAuth()
    if(id){
        ch = "notes/"+currentUser.email;
        ch = ch.replace('.','@');
        ch = ch.replace('.','@');
        ch = ch.replace('.','@');
        ch = ch.replace('.','@');
        database.ref(ch).on("value",(snapshot)=>{
try{
    title = snapshot.val()[id]["title"];
    subject = snapshot.val()[id]["subject"];
    idea = snapshot.val()[id]["idea"];
}catch{}
        })
    
      }//if(id)
      return (

        <div>

<Link  to="/">  <button className="button is-link is-light w-100">Back To Dashboard</button>  </Link>
{title==="" ?<Card> <Card.Body>
    <h2 className="text-danger">Idea does not exist</h2></Card.Body> </Card> :<Card className="mt-5">
    <Card.Body>
<div className="field">
  <label className="label">Title</label>
  <div className="control">
  {title}
  </div>
</div>

<div className="field">
  <label className="label">Subject</label>
  <div className="control">
    {subject}
  </div>
</div>

<div className="field">
  <label className="label">Idea</label>
  <div className="control">
   {idea} 
  </div>
</div>


 
</Card.Body>
</Card>  }
            
        </div>

)}
export default View;