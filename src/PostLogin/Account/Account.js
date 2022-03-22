import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useDispatch, connect} from "react-redux";
import { account } from '../../_actions';
import Grid from "@material-ui/core/Grid";
import "./Account.css";

const Account = (props)=>{

const [enterInput, setEnterInput]= useState({
    fname:"",
    lname:"",
    email:"",
    phoneNumber:"",
    address:""

});

const [isSubmited, setIsSubmited]=useState(false);

   const dispatch = useDispatch();

    const formHandler = (event)=>{
        event.preventDefault();
        setIsSubmited(true);
        const validate= validation(true);
        if(validate.isValid===true){
        setEnterInput({
            fname:"",
            lname:"",
            email:"",
            phoneNumber:"",
            address:""
        })
        setIsSubmited(false);
        dispatch(account(enterInput));
    }
    }


    const handleInputChange = (event) =>{
        setEnterInput({
            ...enterInput,
            [event.target.name]:event.target.value
        })
    }

    const validation = (isSubmit) =>{
        let isValid = true;
        const validObj ={
            isValid: true,
            message:""
        }
        let retData={
            fname:validObj,
            lname:validObj,
            email:validObj,
            phoneNumber:validObj,
            address:validObj
        }

        if(isSubmit=== true){
            if(!enterInput.fname){
                retData.fname={message:"First Name is required.",
                isValid: false}
                isValid = false
            }else if (!/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(enterInput.fname)){
                retData.fname={message:"Please Enter Valid Name",
                isValid : false }
                isValid = false
            }
            if(!enterInput.lname){
                retData.lname={message:"Last Name is required",
                isValid: false}
                isValid = false
            }else if(!/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(enterInput.lname)){
                retData.lname={message:"Please enter correct name",
                isValid: false}
                isValid = false
            }

            if(!enterInput.email){
                retData.email={message:"Email is required",
                isValid: false}
                isValid = false
            }else if (!/\S+@\S+\.\S+/.test(enterInput.email)){
                retData.email={message:"Please enter valid email ",
                isValid:false}
                isValid = false
            }
            if(!enterInput.phoneNumber){
                retData.phoneNumber={message:"Phone number is required.",
                isValid: false}
                isValid = false
            }else if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(enterInput.phoneNumber)){
                retData.phoneNumber={message:"Please enter valid phone number",
                isValid:false}
                isValid = false
            }
            if(!enterInput.address){
                retData.address={message:"Address is required.",
                isValid: false}
                isValid = false
            }
            /*else if(!/^([\w',-\\/.\s])$/.test(enterInput.address)){
                retData.address={message:"Please enter valid address",
                isValid:false}
                isValid = false
            }*/
        }
        retData.isValid=isValid
        return retData;

    }

    let errorNote=validation(isSubmited)


    return(
        <div className="account-wrapper">
            <div id = "accountformContent">
           
            <div className="paper">
        <form onSubmit={formHandler} >
            <div className="text-inline">
            <TextField  label="First Name" name ="fname" variant="outlined" value={enterInput.fname} onChange={handleInputChange}  
             />
            <p> {errorNote.fname.message}</p>
            </div>
            <TextField  label="Last Name" name ="lname" variant="outlined" value={enterInput.lname} onChange={handleInputChange} 
            />
            <p> {errorNote.lname.message}</p>
            
            <TextField id="outlined-basic" label="Email" name ="email" variant="outlined" value={enterInput.email} onChange={handleInputChange} style={{ width: 460 }}
            />
            <p> {errorNote.email.message}</p>
             
            <TextField id="outlined-basic" label="Phone Number" name ="phoneNumber" variant="outlined" value={enterInput.phoneNumber} onChange={handleInputChange} style={{ width: 460 }}
            />
            <p> {errorNote.phoneNumber.message}</p>
            
            <TextField id="outlined-basic" label="Address" name ="address" variant="outlined" value={enterInput.address} onChange={handleInputChange} style={{ width: 460 }}
            />
            <p> {errorNote.address.message}</p>
            
            <Button type="submit" variant="contained" color="primary" className="submit" style={{ width: 460 }} >
                    submit  
            </Button>
        </form>
            </div>
         
          </div>
        </div>
    )
};

/*const mapStateToProps = (state)=>{
    const {items} =state;
    return{
        items
    };
};
 export default connect(mapStateToProps, null)(Account);*/
 export default Account;