import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Input, Ripple, initMDB } from "mdb-ui-kit";


export default function UpdateUser() {
  initMDB({ Input, Ripple });
  const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const [userInput, setUserInput] = useState({});


    async function fetchEdit() {
      try {
        const { data } = await axios({
          url: `/users/${id}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
  
        setUserInput(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      fetchEdit();
    }, [id]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserInput({ ...userInput, [name]: value });
    };
  
    async function handlerEdit(e) {
      e.preventDefault();
      try {
        const { data } = await axios.put(`/lodging/${id}`, userInput, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        console.log(data, 'ini data');
        navigate("/lodging");
        fetchEdit(); 
      } catch (error) {
        console.log(error, 'error ini');
      }
    }
    return(
        <>
        <form>
  <div className="row mb-4">
    <div className="col">
    <div data-mdb-input-init className="form-outline mb-4">
    <input type="text" id="form6Example3" className="form-control" />
    <label className="form-label" htmlFor="form6Example3">Company name</label>
  </div>
    </div>
  </div>
  <div data-mdb-input-init className="form-outline mb-4">
    <input type="text" id="form6Example3" className="form-control" />
    <label className="form-label" htmlFor="form6Example3">Company name</label>
  </div>
  <div data-mdb-input-init className="form-outline mb-4">
    <input type="text" id="form6Example4" className="form-control" />
    <label className="form-label" htmlFor="form6Example4">Address</label>
  </div>
  <div data-mdb-input-init className="form-outline mb-4">
    <input type="email" id="form6Example5" className="form-control" />
    <label className="form-label" htmlFor="form6Example5">Email</label>
  </div>
  <div data-mdb-input-init className="form-outline mb-4">
    <input type="number" id="form6Example6" className="form-control" />
    <label className="form-label" htmlFor="form6Example6">Phone</label>
  </div>
  <div data-mdb-input-init className="form-outline mb-4">
    <textarea className="form-control" id="form6Example7" rows={4} defaultValue={""} />
    <label className="form-label" htmlFor="form6Example7">Additional information</label>
  </div>
  <div className="form-check d-flex justify-content-center mb-4">
    <input className="form-check-input me-2" type="checkbox" defaultValue id="form6Example8" defaultChecked />
    <label className="form-check-label" htmlFor="form6Example8"> Create an account? </label>
  </div>
  <button data-mdb-ripple-init type="button" className="btn btn-primary btn-block mb-4">Place order</button>
</form>

        </>
    )
}