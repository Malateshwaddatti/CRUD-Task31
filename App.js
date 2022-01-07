import logo from './logo.svg';
import './App.css';
import{useState,useEffect}from "react";

function App() {
  const [name, setName] = useState("");
  const [pic, setpic] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((people) => setUser(people));
  };

  const addUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        pic: pic
      })
    }).then(() => getUsers());
  };

  return (
    <div className="App">
      {/*<Plans/>*/}
      <div className="user-form">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <input
          value={pic}
          onChange={(event) => setpic(event.target.value)}
          placeholder="Enter your url"
        />

        {/*<button
          className="button"
        onClick={() => setNames([...names, { name: name, pic: pic }])}</button>*/}
        <button onClick={addUsers}>Add User</button>
      </div>
      {/* <Users usersname={name} />*/}
      {user.map((ur) => (
        <Users
          key={ur.id}
          usersname={ur.name}
          userspic={ur.pic}
          userid={ur.id}
          getUsers={getUsers}
        />
      ))}
      ;

    </div>
  );
}
function Users({ usersname, userspic, userid, getUsers }) {
  const deletUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users/" + userid, {
      method: "DELETE"
    }).then(() => getUsers());
  };
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div className="user-container">
        <img className="user-image" height="100px" src={userspic} alt={usersname} />
        <div>
          <p className="user-name"> {usersname}</p>
          <button className="delete" onClick={deletUsers}>
            {" "}
            Delete
          </button>
          <button className="edit" onClick={() => setEdit(!edit)}>
            Edit
          </button>
        </div>
      </div>
      {edit ? (
        <EditUser
          usersname={usersname}
          userspic={userspic}
          getUsers={getUsers}
          userid={userid}
        />
      ) : (
        ""
      )}
    </>
  );
}

function EditUser({ usersname, userspic, userid, getUsers }) {
  const [name, setName] = useState(usersname);
  const [pic, setPic] = useState(userspic);

  const editUsers = () => {
    fetch("https://6154014b2473940017efab25.mockapi.io/users/" + userid, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        pic: pic
      })
    }).then(() => getUsers());
  };

  return (
    <>
      <div className="user-form">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <input
          value={pic}
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter your url"
        />

        {/*<button
          className="button"
        onClick={() => setNames([...names, { name: name, pic: pic }])}</button>*/}
        <button className="add" onClick={editUsers}>
          Add User
        </button>
      </div>
    </>
  );
}
















function Plans(){
  const Plans = [
    {name:"FREE",price:0,features:[
      "Single User",
      "5GB Storage",
      "Unlimited Public Projects",
      "Community Access",
      "Unlimited Private Projects",
      "Dedicated Phone Support",
      "Free Subdomain",
      "Monthly Status Reports",
        ],},

    {name:"PLUS",price:9,features:[
"5 Users",
"50GB Storage",
"Unlimited Public Projects",
"Community Access",
"Unlimited Private Projects",
"Dedicated Phone Support",
"Free Subdomain",
"Monthly Status Reports",
    ],},

    {name:"PRO",price:49,features:[
"Unlimited Users",
"150GB Storage",
"Unlimited Public Projects",
"Community Access",
"Unlimited Private Projects",
"Dedicated Phone Support",
"Unlimited Free Subdomains",
"Monthly Status Reports",
    ],},
    
  ];
  return(
<div>
  {Plans.map((plan)=>(
    <Card name={plan.name} price={plan.price} features={plan.features}/>

  ))}
  
</div>
  );
}

function Card(props){
 
  return(
  <div className='card'>
    <p className='plan-name'>{props.name}</p>
    <p className="price">${props.price}<span className='price-duration'>/month</span></p>
   <ul className="features">
     {props.features.map((feature)=>(<li>{feature}</li>))}
   </ul>
   <button className='buy'>BUY</button>
  </div>
  );

}

export default App;
