/* 
        > no field can be empty
        > the username can only contain letters or numbers
        > the username must be between 3 and 12 characters
        > password must be between 6 and 12 characters
*/

class ValidateForm{
    constructor(){
        this.form = document.querySelector('.form');
        this.events();
    }

    events(){
        //capture submit event
        this.form.addEventListener('submit', e =>{
            this.handleSubmit(e);
        });
    }


    handleSubmit(e){
        e.preventDefault(); //do not send 
        const validField = this.isValidField(); 
        const validPassword = this.isValidPassword();

        // if 'validField' and 'validPassword' return "true" the form is sent
        if(validField && validPassword){
            alert('the form has been sent');
            this.form.submit();
        }
    }

    isValidPassword(){
        //valid = flag
        let valid = true;

        const password = this.form.querySelector('.password');
        const confirmPassword = this.form.querySelector('.confirm-password');

        if(password.value !== confirmPassword.value){
            valid = false;
            this.createError(password, '• Fields "password" and "confirm password" must be the same');
            this.createError(confirmPassword, '• Fields "password" and "confirm password" must be the same');
        }
        if(password.value.length < 6 || password.value.length > 12){
            valid = false;
            this.createError(password,'• Password must be between 6 and 12 characters');
        }
        return valid;
    }

    isValidField(){
        //valid = flag 
        let valid = true;
        
        //when i submit the form it will remove the previous errors
        for(let errorText of this.form.querySelectorAll('.error-text')){
            errorText.remove();
        }

        //select all fields w "ok"
        for(let field of this.form.querySelectorAll('.ok')){
            const label = field.previousElementSibling.innerText;
            
            if(!field.value){
                this.createError(field, `• Field "${label}" can not be empty`);
                valid = false;
            }

            if(field.classList.contains('cpf')){
                if(!this.validateCPF(field)) valid = false;
            }

            if(field.classList.contains('user')){
                if(!this.validateUser(field)) valid = false;
            }
        }
        return valid;
    }

       
    validateCPF(field){
        const cpf = new ValidateCPF(field.value);

        if(!cpf.validate()){
            this.createError(field, '• Invalid CPF');
            return false;
        }
        return true;
    }

    validateUser(field){
        const user = field.value;
        let valid = true;

        if(user.length <3 || user.length > 12){
            this.createError(field, '• The username must be between 3 and 12 characters');
            valid = false;            
        }
        if(!user.match(/[a-zA-Z0-9]+/g)){
            this.createError(field, '• The username must contain only letters and/or numbers');  
        }
        return valid;
    }

    // create error warning
    createError(field, text){
        const div = document.createElement('div');
        div.innerHTML = text;
        div.classList.add('error-text');

        //add div after the field
        field.insertAdjacentElement('afterend', div);
    }

}

const validate = new ValidateForm();