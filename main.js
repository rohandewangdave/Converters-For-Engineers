from = "";
to="";
value = "";

class NumberSystemConverter{
    constructor(){
        this.hexadecimal = {10: "A" , 11: "B" , 12: "C", 13:"D",14:"E",15:"F"};
    }

    perform_operation(){ //for number-system
        if(from == "decimal"){
            switch(to){
                case "binary":
                    this.decimal_to_(2);
                    break;
                
                case "ternary":
                    this.decimal_to_(3);
                    break;
    
                case "octal":
                    this.decimal_to_(8);
                    break;
    
                case "decimal":
                    this.decimal_to_(10);
                    break;
    
                case "hex":
                    this.decimal_to_(16);
                    break;
            }
        }
        else
        alert("Not yet developed!");
    }

    decimal_to_(base){
        var decimal = parseInt(value);
        var arr = [];
        while(decimal > 0){
            var m = decimal%base;
            if(base == 16 && m >= 10){
                m = this.hexadecimal[m];
            }
            arr.push(m);
            decimal = parseInt(decimal/base);
        }
        var res_text = document.getElementById("number-system-result");
        res_text.value = "";
        //console.log(arr);
        for(var j =arr.length-1; j>=0;j--)
        res_text.value+=""+arr[j];
    }
}

class CurrencySystemConverter{
    constructor(){
        this.rates = {"dollars": 1,"rupees": 73.69, "pounds": 0.77 };
    }

    convert_to_dollars(x){ //dollars is standard
        var ans = parseFloat(value) / this.rates[x];
        return ans; 
    }

    convert_from_dollars(value_in_dollars,x){
        var ans = this.rates[x]*value_in_dollars;
        console.log(ans);
        return ans;
    }

    main_conversion(){
        //var to_dollars = this.convert_to_dollars(to);
        var from_in_dollars = this.convert_to_dollars(from);
        var res = this.convert_from_dollars(from_in_dollars,to);
        var res_text = document.getElementById("currency-system-result");
        res_text.value = "";
        res_text.value = res;
        console.log(res);
    }
}

class TemperatureSystemConverter{
    constructor(){
        this.resource = {"cel": [0,100] , "far":[32,212] , "kel":[273,373]};
    }

    convert(){
        var ans = (value - this.resource[from][0])/(this.resource[from][1] - this.resource[from][0])
        ans = ans * (this.resource[to][1] - this.resource[to][0]) + this.resource[to][0];
        var res_text = document.getElementById("temperature-system-result");
        res_text.value="";
        res_text.value = ans;

    }
}

class ComputerMemorySystemConverter{
    constructor(){
        this.prefixes = ["_","k","m","g","t","p"];
        this.byte_conversions = ["_B","kB","mB","gB","tB","pB"];
        this.bit_conversisons = ["_b","kb","mb","gb","tb","pb"];
        this.suffix_transformation = false;
        this.prefix_transformation = false;
        //{"byte":1, "kb": parseFloat(1/1024) , "mb": 1/(1024*1024) , "gb": 1/(1024*1024*1024) , "tb": 1/(1024*1024*1024*1024) , "pb": 1/(1024*1024*1024*1024*1024)};
    }
    perform_conversion(){
        this.prefix_transformation = from.charAt(0) != to.charAt(0) ? true : false;
        this.suffix_transformation = from.charAt(1) == to.charAt(1) ? false : true;  //false if no transformation required     
        var ans = value;
        if(this.suffix_transformation){//meaning bits to byte transformation required
            ans = from.charAt(1) == 'B' ? ans*8 : ans/8;                        
        }
        if(this.prefix_transformation){ //means they dont have the same index
            var from_index = this.prefixes.indexOf(from.charAt(0));
            var to_index = this.prefixes.indexOf(to.charAt(0));
            ans = from_index < to_index ? ans/Math.pow(1024,(to_index - from_index)) : ans*Math.pow(1024, (from_index - to_index));
        }

        var  res_text = document.getElementById("computer-memory-system-result");
        res_text.value = "";
        res_text.value = ans;
    }
}

systems = [new NumberSystemConverter(), new CurrencySystemConverter(),new TemperatureSystemConverter(), new ComputerMemorySystemConverter()];

function call_required_system(system){
    switch(system){
        case "number-system":
            systems[0].perform_operation();
            break;
        
        case "currency-system":
            systems[1].main_conversion();
            break;

        case "temperature-system":
            systems[2].convert();
            break;

        case "computer-memory-system":
            systems[3].perform_conversion();
            break;
    }
}

function convert(system){
    var from_select = document.getElementById(system+"-initial-select");
    from = from_select.value;

    var to_select = document.getElementById(system+"-final-select");
    to = to_select.value;

    value = parseInt(document.getElementById(system+"-value").value);
    
    call_required_system(system);
}