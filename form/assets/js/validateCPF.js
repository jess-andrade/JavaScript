// CPF Validator:: 
// just to test ------> 705.484.450-52   070.987.720-03

class ValidateCPF{
    constructor(cpfSent){
        Object.defineProperty(this, 'cpfClean',{
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfSent.replace(/\D+/g, '')
        });
    }

    // check if it is a sequence
    sequence(){
        return this.cpfClean.charAt(0).repeat(11) === this.cpfClean;
    }

    // create a new CPF to compare with the original
    createNewCPF(){
        const cpfWithoutDigits = this.cpfClean.slice(0, -2);
        const digit1 = ValidateCPF.createDigit(cpfWithoutDigits);
        const digit2 = ValidateCPF.createDigit(cpfWithoutDigits + digit1);
        this.newCPF = cpfWithoutDigits + digit1 + digit2;
    }

    // to find digits :: multiply CPF w a regressive sequence 
    static createDigit(cpfWithoutDigits){
        let total = 0;
        let reverse = cpfWithoutDigits.length + 1;

        for(let i of cpfWithoutDigits ){
            total += reverse * Number(i);
         reverse--;
        }
        
        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
        //console.log(total);
    }

    validate(){
        if(!this.cpfClean) return false;
        if(typeof this.cpfClean !== 'string') return false;
        if(this.cpfClean.length !== 11) return false;
        if(this.sequence()) return false;
        this.createNewCPF();
        //console.log(this.newCPF);
        
        return this.newCPF === this.cpfClean;
    }
}

//const cpf = new ValidateCPF('070.987.720-03');
//console.log(cpf.validate());

/*
if (cpf.validate()){
    console.log('CPF válido');
}else{
    console.log('CPF inválido');
}*/