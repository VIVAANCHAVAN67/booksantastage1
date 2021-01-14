import React,{Component} from "react"
import {View,Text,TextInput,TouchableOpacity, 
Alert,StyleSheet,Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import Animation from '../Components/animation'


export default class LoginScreen extends Component{
    constructor(){
        super()
        this.state={
        email:"",
        password:"",
        isModalVisible:'false',
        firstName:"",
        lastName:"",
        address:"",
        contact:"",
        confirmedPassword:""
        }
    }
showModal=()=>{
return(
    <Modal 
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}>
    <View style={styles.modalContainer}>
        <ScrollView style={{
            width:"100%"
        }}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text style={styles.modalTitle}>Registration</Text>
        <TextInput style={styles.formTextInput}
        placeholder="First Name"
        maxLength={15}
        onChangeText={(text)=>{this.setState({
            firstName:text
        })}}/>
        <TextInput style={styles.formTextInput}
        placeholder="Last Name"
        maxLength={15}
        onChangeText={(text)=>{this.setState({
            lastName:text
        })}}/>
        <TextInput style={styles.formTextInput}
        placeholder="Contact no."
        maxLength={10}
        keyboardType={"numeric"}
        onChangeText={(text)=>{this.setState({
            contact:text
        })}}/>
        <TextInput style={styles.formTextInput}
        placeholder="Address"
        maxLength={20}
        onChangeText={(text)=>{this.setState({
            address:text
        })}}/>
         <TextInput style={styles.formTextInput}
               placeholder="abc@gmail.com"
               keyboardType="email-address"
               onChangeText={(text)=>{
                   this.setState({
                       email:text
                   })
        
               }}/>
               <TextInput style={styles.formTextInput}
               placeholder="password"
               secureTextEntry={true}
               onChangeText={(text)=>{
                   this.setState({
                       password:text
                   })
        
               }}/>  
                <TextInput style={styles.formTextInput}
        placeholder="Confirmed Password"
        secureTextEntry={true}
        onChangeText={(text)=>{this.setState({
            confirmedPassword:text
        })}}/>
           <View> 

<TouchableOpacity style ={styles.registerButton}
onPress={()=>{
    this.userSignUp(this.state.email,this.state.password,this.state.confirmedPassword)
}}>
            <Text style={styles.registerButtonText}>Register</Text>
</TouchableOpacity>   
    </View>
    <View> 

<TouchableOpacity style ={styles.cancelButton}
onPress={()=>{
    this.setState({
        isModalVisible:false
    })
}}>
            <Text style={{color:"red"}}>Cancel</Text>
</TouchableOpacity>   
    </View>
        </KeyboardAvoidingView>
        </ScrollView>
    </View>
   
    </Modal>
)
}
userLogin=async(email,password)=>{
firebase.auth().signInWithEmailAndPassword(email,password)
.then((response)=>{
    return(
        Alert.alert("succesful login")
    )
})
.catch(error=>{
    var errorCode = error.code
    var errorMessage = error.message
    Alert.alert(errorMessage)
})
}

userSignUp=async(email,password,confirmedPassword)=>{
   if(password !== confirmedPassword){
       return Alert.alert("passwords not matching")
       
   }
   else{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((response)=>{
        return(
            Alert.alert(
                "user added to database",
                "",
                [
                    {text:"ok",
                    onPress:()=>{
                        this.setState({
                            isModalVisible:false
                        })
                    }}
                ])
        )
    })
    .catch(error=>{
        var errorCode = error.code
        var errorMessage = error.message
        Alert.alert(errorMessage)
    })
    db.collection("users").add({
    first_name:this.state.firstName,
    last_name:this.state.lastName,
    Contact:this.state.contact,
    email_id:this.state.email,
    Address:this.state.address
    })
}
    }

    render(){
        return(
<View syle={styles.container}>
    <View style={{justifyContent:"center",
                  alignItems:"center"}}>{this.showModal()}</View>
    <View style={styles.profileContainer}>
        <Text style={styles.title}>Book Santa</Text>
        <Animation/>
    </View>
        <View style={styles.buttonContainer}>
            
<TouchableOpacity style ={[styles.button,{marginTop:20,marginBottom:20}]}
onPress={()=>{
    this.userLogin(this.state.email,this.state.password)
}}>
            <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>   

<TouchableOpacity style ={styles.button}
onPress={()=>{
    this.setState({
        isModalVisible:true
    })
}}>
            <Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>   

        </View>

</View>
        )
    }
}

const styles = StyleSheet.create({
     container:{ 
         flex:1, 
         backgroundColor:'#F8BE85',
         marginTop:100
         },
     profileContainer:{ 
         flex:1,
          justifyContent:'center',
           alignItems:'center',
           marginTop:200
         }, 
         title :{
              fontSize:65, 
              fontWeight:'300',
               paddingBottom:30,
                color : '#ff3d00'
             }, 
             loginBox:{
                  width: 300, 
                  height: 40,
                   borderBottomWidth: 1.5,
                    borderColor : '#ff8a65',
                     fontSize: 20,
                      margin:10,
                       paddingLeft:10 ,
                    marginTop:50},
                        button:{ 
                            width:300,
                             height:50,
                              justifyContent:'center',
                               alignItems:'center',
                                borderRadius:25,
                                 backgroundColor:"#ff9800",
                                  shadowColor: "#000",
                                   shadowOffset: { width: 0, height: 8, },
                                    shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, }, buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 }, buttonContainer:{ flex:1, alignItems:'center' },
                                    modalTitle :{ justifyContent:'center', alignSelf:'center', fontSize:30, color:'#ff5722', margin:50 }, modalContainer:{ flex:1, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:"#ffff", marginRight:30, marginLeft : 30, marginTop:80, marginBottom:80, }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10 }, registerButton:{ width:200, height:40, alignItems:'center', justifyContent:'center', borderWidth:1, borderRadius:10, marginTop:30 }, registerButtonText:{ color:'#ff5722', fontSize:15, fontWeight:'bold' }, cancelButton:{ width:200, height:30, justifyContent:'center', alignItems:'center', marginTop:5, }, })
