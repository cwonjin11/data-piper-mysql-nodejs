import './App.css';
import axios from 'axios'  //libray to request to an API
import { useEffect, useState } from "react"
import Clients from "./components/clients"

function App() {

  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [urgency, setUrgency] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [skills, setSkills] = useState("")
  const [candidate, setCandidate] = useState("")
  const [email, setEmail] = useState("")

  const [employeeList, setEmployeeList] = useState([])

  const [clients, setClients] = useState([])
  const [input, setInput] = useState("")
  const [output, setOutput] = useState([])

  const [show, setShow] = useState(false)
  const [buttonText, setButtonText] = useState(false)

  useEffect( ()=> { //component needs to do something after render.
    let mounted = true //assuming component is mounted
    getEmployees()
      .then((employees) => {
        if(mounted){
          setClients(employees)
        }
    })
    return () =>(mounted = false)  // (If component is called or When cleanup is called, toggle he variable mounted to false
  }, [clients])



  const addEmployee = () => {
    axios.post('http://localhost:3001/create', {
      company: company,
      role: role,
      urgency: urgency,
      quantity: quantity,
      skills: skills,
      candidate: candidate,
      email: email 
    }).then(() => {
      setEmployeeList([...employeeList, {
        company: company,
        role: role,
        urgency: urgency,
        quantity: quantity,
        skills: skills,
        candidate: candidate,
        email: email 
      }])
    })
  }


  const getEmployees = () => { 
    //axios.get('http://localhost:3001/employees')
    return axios.get('http://localhost:3001/employees')
    .then((response) => {
      setEmployeeList(response.data)
    })
  }


  useEffect( () => {
    setOutput([])
  //   // eslint-disable-next-line array-callback-return
    // console.log(input)
    employeeList.filter( (val) => {  // JS filter method to have a search function
      if(val.candidate.toLowerCase().includes(input.toLowerCase()) || //make input lower case and check if val.candidate includes it.
      val.company.toLowerCase().includes(input.toLowerCase()) ||
      val.email.toLowerCase().includes(input.toLowerCase()))
      {
        setOutput(output => [...output, val])
      }
      return false;
    })
  
  }, [employeeList, input])

  return (
    <div className="App">
       
       <div className="Search">
            <input 
              type="text"
              placeholder="Search by clients / candidates / email..." 
              onChange={ e => setInput(e.target.value)}
            />
             <button className='addBtn' onClick={() => { setShow(!show); setButtonText(!buttonText);}}>{buttonText ? "-" : "+"}</button>
          </div>

        { show? <div className="add-form">
          <label>Company:</label>
          <input 
            type="text" 
            onChange={(event) => {
              setCompany(event.target.value)
            }}
          />
          <label>Role:</label>
          <input 
            type="text" 
            onChange={(event) => {
              setRole(event.target.value)
            }}
          />
          <label>Urgency:</label>
          <input 
            type="text" 
            onChange={(event) => {
              setUrgency(event.target.value)
            }}
          />
          <label>Quantity:</label>
          <input 
            type="number" 
            onChange={(event) => {
              setQuantity(event.target.value)
            }}
          />
          <label>Skills Needed:</label>
          <input 
            type="text"
            onChange={(event) => {
              setSkills(event.target.value)
            }}
            />
          <label>Candidate:</label>
          <input 
            type="text"
            onChange={(event) =>{
              setCandidate(event.target.value)
            }}
          />
          <label>Email:</label>
          <input 
            type="text"
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            />
          <button onClick={addEmployee}>Add Employee</button>
        </div>  : null}
        {/* <button onClick={()=>setShow(!show)}>Toggle</button> */}




          <Clients clients={output}/>

    </div>
  );
}

export default App;





  // {/* <Clients clients={employeeList}/> */}

        // {/* <button onClick={getEmployees}> show list</button>
        // {employeeList.map((val,key)=> {
        //   return (
        //     <Clients clients={employeeList}/>
        //   )
        // })} */}