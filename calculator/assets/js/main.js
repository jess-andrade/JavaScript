//factory function
function createCalculator(){
    return{
       //objects
       display: document.querySelector('.display'),
       btnClear: document.querySelector('.btn-clear'),
    
       //methods
       start(){  
        this.clickButton();
        },

       clearDisplay(){
            this.display.value = '';
       },

       del(){
        this.display.value = this.display.value.slice(0, -1);
       },

       doCalculation(){
        let calc = this.display.value;

        try{
            calc = eval(calc);
            if(!calc){
                alert('n funciona');
                return;
            }
            this.display.value = String(calc);
        } catch(e){
            alert('n funciona');     
            return;      
        }
       },


        clickButton(){
            //this --> calculator
            document.addEventListener('click', function(e){
                const el = e.target;
                //console.log(this);

                if(el.classList.contains('btn-num')){
                    this.btnDisplay(el.innerText);
                } 
                if(el.classList.contains('btn-clear')){
                    this.clearDisplay();
                }
                if(el.classList.contains('btn-del')){
                    this.del();
                }
                if(el.classList.contains('btn-eq')){
                    this.doCalculation();
                }
            }.bind(this));
        },

        btnDisplay(valor){
            this.display.value += valor;
        },



    };
}

const calculator = createCalculator();
calculator.start();