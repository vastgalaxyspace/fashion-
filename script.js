const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const cart = document.getElementById('Addcart');

if(bar){
    bar.addEventListener('click', ()=> {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelectorAll('.cart-icon span');
    const cartItemList = document.querySelector('.cart-item');
    const cartTotal= document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('.sidebar');


    let cartItem = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button,index) => {
        button.addEventListener('click' , () => {
            const item ={
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                    ),
                    quantity: 1,
            };
            const exisitingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );
            if(exisitingItem){
                exisitingItem.quantity++;
            }else{
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });

        function updateCartUI(){
            updateCartItemCount(cartItems.length);
            updateCartItemList();
            updateCartTotal();
        }

        function updateCartItemCount(count){
            updateCartItemCount.textContent = count;
        }

        function updateCartItemList(){
            cartItemList.innerHTML = '';
            cartItems.forEach((item, index)=>{
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'individual-cart-item');
                cartItem.innerHTML=`
               <span>(${item.quantity}x)${item.name}</span>
               <span class="cart-item-price">$${(item.price * item.quantitiy).toFixed(2,)}
               <button class="remove-btn" data-index=""${index}><i class="fa-solid .fa-times"></i></button>
               </span>
                `;

                cartItemList.append(cartItem);
            });
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button) => {
                button.addEventListener('click',(event) =>{
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);
                });
            });
        }
        function removeItemFromCart(index){
            const removeItem = cartItem.slice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI;
        }
        function updateCartTotal() {
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }
        cartIcon.addEventListener('click', () =>{
            sidebar.classList.toggle('open');
        });
        const closeButton = document.querySelector('.sidebar-close');
        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        })
    });

});

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the database
  const database = firebase.database();
  
  // Function to handle user signup
  $("#signupForm").submit(function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get user input values
    const fullName = $("#fullName").val();
    const email = $("#email").val();
    const phoneNumber = $("#phoneNumber").val();
    const password = $("#password").val();
  
    // Sign up the user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        // Save user data to admin database
        database.ref("admin/users/" + user.uid).set({
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber
        });
  
        // Send success message to user
        $("#signupMessage").text("Signup successful. You will receive a confirmation message shortly.");
  
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        $("#signupMessage").text(errorMessage);
      });
  });
  
  // Function to handle user login
  $("#loginForm").submit(function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get user login credentials
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();
  
    // Sign in the user with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Redirect or perform actions after successful login
        window.location.href = "dashboard.html"; // Redirect to dashboard
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        $("#loginMessage").text(errorMessage);
      });
  });
  

  /* */
