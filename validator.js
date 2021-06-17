
/**
 * Form validator to check form fields
 */
class Validator {

    /**
     * Constructor
     * @param {string} formId - Target form id
    */
    constructor(formId)
    {
        this.form = document.getElementById(formId);
        this.fields = this.form.querySelectorAll("input[data-rules]");

        this.errorMessages = {
            hu: {
                required: 'A mező kitöltése kötelező!',
                email: 'Érvénytelen email cím!',
                number: 'A mező csak számot tartalmazhat!',
                required_cb: 'A jelölőnégyzet bepipálás kötelező!',
                file: 'A kiválasztott fájl nem megfelelő! Kérem ellenőrizze a fájl méretét és típusát!',
                password: 'A két jelszó mező különbözik!',
                minlength: 'A mező hossza minimum {min} karakter!'
            },
        };
        this.lang = 'hu';
        
        this.fields.forEach((element)=>{
            element.addEventListener('focus', this.removeErrors);
        });
        
        this.validateForm();
    }
     
    /**
     * Handle form validation
     */
    validateForm()
    {
        this.form.addEventListener('submit',(event)=>{
            event.preventDefault();
            
            this.removeAllErrors();
    
            if (this.isFormHasError() === false) {
                this.disableForm();
                this.submitForm();
            }
        });   
    }

    /**
     * Test all form fields
     * @returns {boolean} - Is there an error in the form
     */
    isFormHasError()
    {
        let error = false;

        for (const input of this.fields){
            let rules = input.dataset.rules.split('|');
            
            for (const [index,rule] of rules.entries()){
                if (this.isFieldValid(input, rule, index) === false){
                    error = true;
                    break;
                }
            }
        }
        return error;
    }

    /**
     * Test a form field
     * @param {HTMLInputElement} input - Form input field
     * @param {string} rule - Rule for which the form field is to be tested
     * @param {number} index - Rules array current index
     * @returns {boolean} - Field is valid or not
     */
     isFieldValid(input, rule, index)
     {
        let errorMessage;
        let value = this.clearString(input.value);
        
        if (rule == 'required' && value.length > 0) {
            return true;
            
        }else if (rule == 'email' && this.isValidEmail(value) === true) {
            return true;

        }else if(rule == 'number' && isNaN(value) === false && value.length > 0){
            return true;

        }else if (rule == 'required_cb' && input.checked === true){
            return true;
        
        }else if( rule == 'file' ){
            let fileError = false;

            let fileInput = document.getElementById('file-upload');
            let allowedExtensions = fileInput.dataset.extension.split('|');

            for ( const file of fileInput.files ){

                var fileName = file.name;
                var fileSize = file.size;       
                var ext      = fileName.split('.').pop().toLowerCase();
                
                if ( allowedExtensions.indexOf(ext) === -1 || fileSize > fileInput.dataset.size ){
                    fileError = true;        
                }
            }
            if ( !fileError ) return true;
        
        }else if( rule == 'password' ){
            
            let password = document.getElementById('password');
            let passwordAgain = document.getElementById('password-again');
            if ( this.clearString(password.value) == this.clearString(passwordAgain.value)  ){   
                return true;
            }
        
        }else if( rule == 'minlength' ){
            if ( value.length >= input.dataset.length ){
                return true;
            }else{
                this.errorMessages[this.lang][rule] = this.errorMessages[this.lang][rule].replace('{min}', input.dataset.length);
            }
        }

        if ( input.dataset.messages === undefined ){
            errorMessage = this.errorMessages[this.lang][rule];
        }else{
            let errorMessages = input.dataset.messages.split('|');
            errorMessage = errorMessages[index];
        }
        
        this.validationFailed(input, errorMessage);

        return false;
     }

    /**
     * Check is email address is valid or not
     * @param {string} email - Email address to teszt
     * @returns {boolean} - Return true if email is valid
     */
    isValidEmail(email)
    {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * Form field not valid, an error condition must be set
     * @param {HTMLInputElement} input - Form input field
     * @param {string} msg - Error message
     * @param {*} position - Error message div positioning (absolute/relative)
     */
    validationFailed(input, msg, position = '') 
    {
        input.classList.add("validation-failed");
        this.setErrorMessage(input, msg, position);
    }

    /**
     * Add error message div next to failed input field
     * @param {HTMLInputElement} input - Form input field
     * @param {string} msg - Error message
     * @param {string} position - Error message div positioning (absolute/relative)
     */
     setErrorMessage(input, msg, position) 
     {
         let parent = input.closest('.input-item');
         let errorDiv = document.createElement('div');
         errorDiv.classList.add('error-message');
         errorDiv.append(msg);
         parent.append(errorDiv);
     }
 

    /**
     * Set form submit button to disabled state
     * Add loader layer above the form
     */
    disableForm()
    {
        let layer = `
            <div class="loader-layer">
                <div class="spinner">
                    <div class="spinner-sector spinner-sector1"></div>
                    <div class="spinner-sector spinner-sector2"></div>
                </div>
            </div>`;

        this.form.insertAdjacentHTML('beforeend', layer);
    }

    /**
     * If form has reCaptcha submit form with reCaptcha, else submit form
     */
    submitForm()
    {
        if ( this.form.querySelector('#recaptcha') ){
            setTimeout(
                ()=> {
                    grecaptcha.execute();
                }, 300);
        }else{
            setTimeout(
                ()=> {
                    this.form.submit();
                }, 300);
        }
    }

    /**
     * Removes errors from focused input field
     * Removes validation-failed class from input
     * Removes .error-message div
     * @param {Object} element - Focus event or input object
     */
     removeErrors(element)
     { 
        if (element.target){
            element = element.target;
        } 

        if ( element.classList.contains('validation-failed') ){
            const parent = element.closest('.input-item');
            element.classList.remove('validation-failed');
            parent.querySelector('.error-message').remove();
        }
     }

     /**
      * Remove all error messages from the form
      */
     removeAllErrors()
     {
        this.fields.forEach((element)=>{
            this.removeErrors(element);
        });
     }

     clearString(string) {
        if (!string) return '';
        return string.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    };
};
