import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => { 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/users", {
                name,  
                email,
                gender,
        });
        navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns">
            <div className="columns is-half">
                <form>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input type="text" className="input" placeholder='Name' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input type="text" className="input" placeholder='Email' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select>
                                    <option value="Male">Male</option>
                                    <option value="Feale">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser