let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let Search = document.getElementById("search");
let Category = document.getElementById("Category");
let area = document.getElementById("area");
let ingredients = document.getElementById("ingredients");
let contact = document.getElementById("contact");
let innerLoading = document.querySelector('.inner-loading');
let loading = document.querySelector('.loading');

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


function openSideNav() {
    $(".nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    $(".nav-menu").animate({
                //   width nav-content 
        left: -$(".nav-menu .nav-content").outerWidth()
    }, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".nav-menu i.open-close-icon").on('click' , function(){
    if ($(".nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})




function showSearchInputs(){
    searchContainer.innerHTML = `
    <div class="row py-4">
    <div class="col-md-6 ">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
</div>`
rowData.innerHTML="";
}


async function getCategory(){
    rowData.innerHTML = ""
    
    innerLoading.classList.replace('d-none' , 'd-flex');

    searchContainer.innerHTML = "";
    const api = await fetch( `https://www.themealdb.com/api/json/v1/1/categories.php
` );
                const response = await api.json();
                displayCategories(response.categories);
                innerLoading.classList.replace('d-flex' , 'd-none')
} 

function displayCategories (arr){
    console.log(arr);
    var container =``;
    for (i=0; i< arr.length ; i++){
        container += `
    <div class="col-md-3 ">
        <div class="meal position-relative cursor-pointer rounded-2 overflow-hidden " onclick="getCategoryMeals('${arr[i].strCategory}')">
            <img src="${arr[i].strCategoryThumb}" alt="category img" class="w-100">
            <div class="meal-layer position-absolute text-center text-black p-2 truncate">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>
        `
        rowData.innerHTML = container;
        
    }
}



async function getArea() {
    rowData.innerHTML = ""
    
    innerLoading.classList.replace('d-none' , 'd-flex');

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    
    innerLoading.classList.replace('d-flex' , 'd-none');
    displayArea(respone.meals)

}

function displayArea(area){
    var container =``
    for (i=0 ; i < area.length ; i++){
        container += `
        <div class="col-md-3">
        <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area[i].strArea}</h3>
        </div>
</div>
        `
        rowData.innerHTML = container;
    }
}

async function getIngredients() {
    rowData.innerHTML = ""
    innerLoading.classList.replace('d-none' , 'd-flex');
    

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    innerLoading.classList.replace('d-flex' , 'd-none');


}
function displayIngredients(data){
    var container =``
    for (i=0 ; i < data.length ; i++){
        container += `
        <div class="col-md-3">
        <div  class="rounded-2 text-center cursor-pointer truncate" onclick="getIngredientsMeals('${data[i].strIngredient}')" >
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${data[i].strIngredient}</h3>
                <p>${data[i].strDescription}</p>
        </div>
</div>
        `
        rowData.innerHTML = container;
    }
}

    async function getCategoryMeals(category) {
        rowData.innerHTML = ""
        innerLoading.classList.replace('d-none' , 'd-flex');
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        response = await response.json()
        console.log(response);
    
    
        displayMeals(response.meals.slice(0, 20))
        innerLoading.classList.replace('d-flex' , 'd-none');
    
    }

    function displayMeals(data){
        var container=``
        for(i = 0 ; i< data.length ; i++){
            container += `
            <div class="col-md-3">
    <div class="meal position-relative cursor-pointer rounded-2 overflow-hidden" onclick="getMealDetails('${data[i].idMeal}')">
        <img src="${data[i].strMealThumb}" alt="" class="w-100">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${data[i].strMeal}</h3>
        </div>
    </div>
</div>
            `
            rowData.innerHTML = container;
        }
    }

    async function getIngredientsMeals(ingredients) {
        rowData.innerHTML = ""
        
        innerLoading.classList.replace('d-none' , 'd-flex');
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
        response = await response.json()
    
    
        displayMeals(response.meals.slice(0, 20))
        innerLoading.classList.replace('d-flex' , 'd-none');
    
    }


    async function getMealDetails(mealID) {
        closeSideNav()
        rowData.innerHTML = ""
        innerLoading.classList.replace('d-none' , 'd-flex');
    
        searchContainer.innerHTML = "";
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        respone = await respone.json();
        console.log(respone);
        displayMealsDitals(respone.meals[0]);
        innerLoading.classList.replace('d-flex' , 'd-none');
    
    }


    function displayMealsDitals(data){

        let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    // let tags = data.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



        var container=`
        <div class="col-md-4">
        <img src="${data.strMealThumb}" alt="meal image" class="w-100 rounded-3">
        <h2>${data.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>L${data.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
            ${ingredients}
                    </ul>

                    <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        
        ${tagsStr}
                    </ul>
                    <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>

    </div>
        `
            rowData.innerHTML = container;
        }
    

        async function getAreaMeals(area) {
            rowData.innerHTML = ""
            
            innerLoading.classList.replace('d-none' , 'd-flex');
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            response = await response.json()
        
        
            displayMeals(response.meals.slice(0, 20))
            innerLoading.classList.replace('d-flex' , 'd-none');
        
        }

        async function searchByName(term) {
            closeSideNav()
            rowData.innerHTML = ""
            
            innerLoading.classList.replace('d-none' , 'd-flex');

            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            response = await response.json()
        
            response.meals ? displayMeals(response.meals) : displayMeals([])
            
            loading.classList.replace('d-flex' , 'd-none');
            innerLoading.classList.replace('d-flex' , 'd-none');
        
        }
        async function searchByFLetter(term) {
            closeSideNav()
            rowData.innerHTML = ""
            innerLoading.classList.replace('d-none' , 'd-flex');
        
            term == "" ? term = "a" : "";
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
            response = await response.json()
        
            response.meals ? displayMeals(response.meals) : displayMeals([])
            innerLoading.classList.replace('d-flex' , 'd-none');
        
        }

        function getContact(){
            searchContainer.innerHTML = ""
            rowData.innerHTML = `
            <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid repassword 
                            </div>
                        </div>
                    </div>
                    <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
                </div>
            </div>
            `
            submitBtn = document.getElementById("submitBtn");
            document.getElementById("nameInput").addEventListener("focus", () => {
                nameInputTouched = true
            })
        
            document.getElementById("emailInput").addEventListener("focus", () => {
                emailInputTouched = true
            })
        
            document.getElementById("phoneInput").addEventListener("focus", () => {
                phoneInputTouched = true
            })
        
            document.getElementById("ageInput").addEventListener("focus", () => {
                ageInputTouched = true
            })
        
            document.getElementById("passwordInput").addEventListener("focus", () => {
                passwordInputTouched = true
            })
        
            document.getElementById("repasswordInput").addEventListener("focus", () => {
                repasswordInputTouched = true
            })
        }

        let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}



            function nameValidation() {
                return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
            }
            
            function emailValidation() {
                return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
            }
            
            function phoneValidation() {
                return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
            }
            
            function ageValidation() {
                return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
            }
            
            function passwordValidation() {
                return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
            }
            
            function repasswordValidation() {
                return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
            }





Search.addEventListener('click' , function(){
    closeSideNav();
    showSearchInputs();
})
ingredients.addEventListener('click' , function(){
    closeSideNav();
    getIngredients();
})
area.addEventListener('click' , function(){
    closeSideNav();
    getArea();
})
Category.addEventListener('click' ,function(){
    closeSideNav();
    getCategory();
})
contact.addEventListener('click' ,function(){
    closeSideNav();
    getContact();
})



