import React, {useState } from "react"
import { Link , useParams} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import {database} from "../firebase";
import { Card ,Alert } from "react-bootstrap";

var title = "";
 var subject = "";
 var idea = "";
var ch = "";
export default function Add() {
    const [error, setError] = useState("")
    const [state , setState]= useState({title:"",
    subject : "",
   idea : "",})
    const { currentUser } = useAuth()
    const [message, setMessage] = useState("")
    const {id} = useParams ();
    if(id){
      ch = "notes/"+currentUser.email;
      ch = ch.replace('.','@');
      ch = ch.replace('.','@');
      ch = ch.replace('.','@');
      ch = ch.replace('.','@');
      database.ref(ch).on("value",(snapshot)=>{

  title = snapshot.val()[id]["title"];
  subject = snapshot.val()[id]["subject"];
  idea = snapshot.val()[id]["idea"];
      })
  
    }
    if(!id){
      title = "";
      subject = "";
      idea = "";
    }
    const change = (e) =>{
      const {name,value} = e.target; 
      setState({...state,[name]:value});
  };
     async function addidea(){
      
    try{
   const h = document.getElementById("title").value;
   const lm=document.getElementById("idea").value;
   const s = document.getElementById("su").value;
   if (h!=="" && lm!==""){
    
       try{
           setError("")
           setMessage("")
         ch = "notes/"+currentUser.email;
         ch = ch.replace('.','@');
         ch = ch.replace('.','@');
         ch = ch.replace('.','@');
         ch = ch.replace('.','@');
         if(!id){
    database.ref(ch).push({
        "title":h,
        "idea":lm,
        "subject":s})
        setMessage("Your Idea is added")
        document.getElementById("title").value=""
   document.getElementById("idea").value=""
    
    }else{

    var state={
        "idea":lm,
        "subject":s,
        "title":h

      }
      database.ref(`${ch}/${id}`).set(state,(err)=> {
        if(err){
    setError("Error")
        }else{
          setMessage("Idea Updated successfully")
        }
    });
    }}catch(e){
setError("Error Of Connexion , Try again")
console.error(e)
        }
   }else{
    setError("Fill All The Blanks")
   }
}catch(e ){
console.log(e);
}
}
return (
<div>

{error && <Alert  className="notification is-danger is-light mt-5" variant="danger">{error}</Alert>}
          {message && <Alert className="mt-5" variant="success">{message}</Alert>}
          <Link  to="/">  <button className="button is-link is-light w-100">Back To Dashboard</button>  </Link>

    <Card className="mt-5">
    <Card.Body>
<div className="field">
  <label className="label">Title</label>
  <div className="control">
    <input className="input" id="title" type="text" required placeholder="Title" defaultValue={title || ""} />
  </div>
</div>

<div className="field">
  <label className="label">Subject</label>
  <div className="control">
    <div className="select">
      <select id="su" defaultValue={subject || ""}>
        <option value="Important">Important</option>
        <option value="Normal">Normal</option>
        <option value="Not Important">Not Important</option>
        {id ?  <option value="Completed">Completed</option> : ""}
      </select>
    </div>
  </div>
</div>

<div className="field">
  <label className="label">Idea</label>
  <div className="control">
    <textarea className="textarea" id="idea" placeholder="Idea" defaultValue={idea || ""}  onChange={change}></textarea>
  </div>
</div>


    <button onClick={addidea} className="button is-link w-100">{id ? "Update" : "Save" }</button>
 
</Card.Body>
</Card>
</div>
)
}