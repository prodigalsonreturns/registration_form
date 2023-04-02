const firebaseConfig = {
    apiKey: "AIzaSyBidoneUkwSzIhU4oipgMcoku8DvMDl55o",
    authDomain: "registration-8e0a1.firebaseapp.com",
    projectId: "registration-8e0a1",
    storageBucket: "registration-8e0a1.appspot.com",
    messagingSenderId: "382056147936",
    appId: "1:382056147936:web:13fe4e50aa54de016d1985"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // initialize variables
  const auth = firebase.auth();
  const database = firebase.database();

  //setup register function
  function register(){
    //get all input fields
    const name= document.getElementById('name');
    const email= document.getElementById('email');
    const password= document.getElementById('password');
    const gender= document.getElementById('gender');
    const birthdate= document.getElementById('birthdate');

    if (validate_email(email)==false|| validate_password(password)==false){
        alert('email or password is wrong');
        return
    }
    if (validate_field(name)==false|| validate_field(gender)==false ||validate_field(birthdate)==false) {
        alert('one of the field is outta line');
        return
    }


    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){

        var user = auth.currentUser

        //add this user to firebase database
        var database_ref= database.ref()

        //create user data
        var user_data={
            name:name,
            email:email,
            gender:gender,
            birthdate:birthdate,
            last_login:Date.now()

        }

        database_ref.child('users/'+ user.uid).set(user_data)

        alert('user created')

    })
    .catch(function(error){

        //firebase will use this to alert user of its error
        var error_code= error.code
        var error_message= error.message

        alert(error_message)
    })

  }



  //validate input fields
  function validate_email(email){
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email)==true){
        return true;
    }
    else{
        //email not good
        return false;

    }
  }

  function validate_password(password){
    if (password.length >=6){
        return true;
    }
    else{
        return false;
    }
        
  }

  function validate_fields(field){
    if (field==null|| field.length<=0){
        return false;
    }
    else {
        return true;
    }
  }