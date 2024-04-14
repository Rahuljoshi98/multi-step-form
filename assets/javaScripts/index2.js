const formValidation = formSelector =>{

    const selectFormElement = document.querySelector(formSelector);
    const formStep = Array.from(selectFormElement.querySelectorAll("[formStep]"));

    const validationOption = [
        {
            attribute : 'required',
            errorMessage : (input,label) => `${label.textContent} is required`
        }
    ];

    const validateEachGroup = a =>{
        const label = a.querySelector('label');
        const inputFields = a.querySelector('input');
        const errorMessageDiv = a.querySelector('.errorMessage');
        const errorIconDanger = a.querySelector('errorDanger');
        const errorIconSuccess = a.querySelector('errorSuccess');

        let formError = false;
        for(let val of validationOption){
            if(inputFields && inputFields.hasAttribute(val.attribute)){
                errorMessageDiv.textContent = val.errorMessage(inputFields,label);
                formError = true;
            }
        }
        if( !formError){
            console.log("in")
            errorMessageDiv.textContent ="";
        }

    }

    let currentPage = formStep.findIndex( (step)=>{
        return step.classList.contains("isActive");
    });

    if(currentPage<0){
        currentPage=0;
        showCurrentPage()
    }

    selectFormElement.setAttribute('novalidate','');

    const nextBtn = formStep[currentPage].querySelector('.nextButton');
    console.log(nextBtn);
    nextBtn.addEventListener('click',function (e){
        let increment;
        if(e.target.matches("[nextPage]")){
            // currentPage += 1;
            increment = 1;
        }
        else if(e.target.matches("[prevPage]")){
            // currentPage -= 1;
            increment = -1;
        }
        console.log(currentPage++)

        if(increment == null)   return;
        // if(checkValidation(formStep[currentPage])){
            currentPage += increment;
            showCurrentPage()
        // }
    })

    // selectFormElement.addEventListener('click',function(e){
    //     e.preventDefault();
    //     // checkValidation(selectFormElement);
    //     console.log("btn clicked");
    //     let increment;
    //     if(e.target.matches("[nextPage]")){
    //         // currentPage += 1;
    //         increment = 1;
    //     }
    //     else if(e.target.matches("[prevPage]")){
    //         // currentPage -= 1;
    //         increment = -1;
    //     }
    //     console.log(currentPage++)

    //     if(increment == null)   return;
    //     if(checkValidation(formStep[currentPage])){
    //         currentPage += increment;
    //         showCurrentPage()
    //     }
    // });



    const checkValidation = pageToValidate =>{
        const formGroups = Array.from(pageToValidate.querySelectorAll('.inputFieldDiv'))
        formGroups.forEach(val=>{
            validateEachGroup(val);
        })
    }



    function showCurrentPage(){
        formStep.forEach( (step,index)=>{
            step.classList.toggle("isActive",index === currentPage);
        })
    }

}
formValidation('#registrationForm');

