import React, {useState ,useEffect} from "react"
import { Row,Card ,Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import fireBase from "../firebase";

var ch = "";

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const [message, setMessage] = useState("")
  const [active, setActive] = useState("All");
  const history = useHistory()
  const [data,setData] = useState({});
  const [supp, setSupp] = useState("")
  ch = "notes/"+currentUser.email;
  ch = ch.replace('.','@');
  ch = ch.replace('.','@');
  ch = ch.replace('.','@');
  ch = ch.replace('.','@');
  useEffect (()=> {
      fireBase.child(ch).on("value",(snapshot)=>{
          if(snapshot.val()!==null){
              setData({...snapshot.val()});
          }else{
              setData({});
          }
      });
      return()=>{
          setData({});
      };

  },[]);
  const onDelete = (id) =>{
    setSupp("")
    if(window.confirm("are you sure to delete that idea ?")){
        fireBase.child(`${ch}/${id}`).remove((err) => {
            if(err){
                console.log(err);
            }else{
               setMessage("Idea Deleted successfully")
            }
        });
    }
}
async function important(){
  setActive("Important")
}
async function all(){
  setActive("All")
}
async function normal(){
  setActive("Normal")
}
async function notimportant(){
  setActive("Not Important")
}
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  async function verifyEmailAd(){
    try{
    currentUser.sendEmailVerification();
    setMessage("Check your inbox for further instructions")    
    }catch{
      setError("Failed to send Verfication Email")
    }
  }
  return (
    <div className="container">
          {error && <Alert  className="notification is-danger is-light mt-5" variant="danger">{error}</Alert>}
          {message && <Alert className="mt-5" variant="success">{message}</Alert>}

            {currentUser.emailVerified ? 
            <article className="panel is-success mt-5">
              <p className="panel-heading">
                {currentUser.email}   
                </p> 
                <p className="panel-tabs">
                  <a  onClick={all} className={active==="All"?"is-active" : ""}>All</a>
    <a onClick={important} className={active==="Important"?"is-active" : ""}>Important</a>
    <a onClick={normal} className={active==="Normal"?"is-active" : ""}>Normal</a>
    <a onClick={notimportant} className={active==="Not Important"?"is-active" : ""}>Not_Important</a>
  </p>
  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
  <Link className="button is-primary is-rounded mt-5" to="/addnotes" >Add Idea </Link>
  </span>
  
                                        </article> 
                 : 
                 <article className="panel is-danger mb-3 mt-5">
                   <p className="panel-heading">{currentUser.email}
                    <span className="d-grid gap-2 d-md-flex justify-content-md-end"> 
                    <Button id="h2" className="button is-primary is-rounded mt-5" onClick={verifyEmailAd} > Verify your email address </Button>
                    </span></p> </article>  }
          <br></br> 
          <div className="row">
            {active === "All" ? Object.keys(data).map((id,index)=>{
                        return(
                          <div className="col-xl-3 col-lg-3 col-md-4">
                                <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{data[id].title.substr(0,20)}  <span className="badge bg-primary">{data[id].subject}</span></h5>
                                   
                                 </div>

                                 <div className="w-100">
                                 <Link to={`/update/${id}`}>
                                 <button className="button is-link is-outlined">Update</button>
                                  </Link>
                                  <Link to={`/view/${id}`}>
                                 <button className="button is-success is-outlined">View</button>
                                  </Link>
                                  <button className="button is-danger is-outlined" onClick={() => onDelete(id)}>Delete</button>
                                  </div>
                                 </div>
                                
                            </div>
                        )
                    }) : Object.keys(data).map((id,index)=>{
                      return(
                        active===data[id].subject?
                        <div className="col-xl-3 col-lg-3 col-md-4">
                              <div className="card mb-3">
                              <div className="card-body">
                                  <h5 className="card-title">{data[id].title.substr(0,20)}  <span className="badge bg-primary">{data[id].subject}</span></h5>
                                 
                               </div>

                               <div className="w-100">
                               <Link to={`/update/${id}`}>
                               <button className="button is-link is-outlined">Update</button>
                                </Link>
                                <Link to={`/view/${id}`}>
                               <button className="button is-success is-outlined">View</button>
                                </Link>
                                <button className="button is-danger is-outlined" onClick={() => onDelete(id)}>Delete</button>
                                </div>
                               </div>
                              
                          </div>
                    : "")
                  }) }
         
              
              </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  )
}
