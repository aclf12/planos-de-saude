
function receberDados(){
    return {
        nome: document.getElementById('name').value,
        idade: document.getElementById('age').value,
        peso: document.getElementById('weight').value,
        altura: document.getElementById('height').value
    }
}
function simular(){
    const nome = receberDados().nome;
    const idade = parseInt(receberDados().idade);
    const peso = parseFloat(receberDados().peso);
    const altura = parseFloat(receberDados().altura);
    
    //validação dos dados
    if(!nome || nome.length < 3){
        alert('Digite pelo menos 3 caracteres');
        exit();
    }else if (!idade || isNaN(idade) || idade > 120){
        alert('Idade dever ser um numero entre 1 e 120');
        exit();
    }else if (!peso || isNaN(peso) || peso <= 0 || peso > 200){
        alert('Peso tem que ser positivo');
        exit();
    }else if(!altura || isNaN(altura) || altura <=0){
        alert('Idade tem que ser positivo');
        exit();
    }

    //calcular imc
    const imc = peso /(altura*altura);

    //Calculo Plano A
    let {basicoA, standardA, premiumA} = planoA(idade, imc);
    
    //Calculo Plano B
    const fatorComorbidade = calculo_comorbidade(imc);
    
    let {basicoB, standardB, premiumB}=planoB(fatorComorbidade, imc);

    //comparação basico
    var plan_A = 0;
    var plan_B = 0;

    const valueBasic = comparacaoBasic(basicoA, basicoB);
    var basico_vantajoso;
    
    if(valueBasic == 0){
        basico_vantajoso = 'Operador A';
        plan_A = plan_A + 1;
    }else{
        basico_vantajoso = 'Operador B';
        plan_B = plan_B + 1;
    }

    //comparacao standard
    const valueStandard = comparacaoStandard(standardA, standardB);
    var standard_vantajoso;

    if(valueStandard == 0){
        standard_vantajoso = 'Operador A';
        plan_A = plan_A + 1;
    }else{
        standard_vantajoso = 'Operador B';
        plan_B = plan_B + 1;
    }

    //comparacao premium
    const valuePremium = comparacaoPremium(premiumA, premiumB);
    var premium_vantajoso;

    if(valuePremium == 0){
        premium_vantajoso = 'Operador A';
        plan_A = plan_A + 1;
    }else{
        premium_vantajoso = 'Operador B';
        plan_B = plan_B + 1;
    }

    // comparacao de todos juntos
    var operador_m_vant;
    var valueoperator;

    if (plan_A > plan_B){
        if (basicoA < standardA && basicoA < premiumA){
            operador_m_vant = 'Operador A: Básico';
            valueoperator = basicoA;
        }else if (standardA < basicoA && standardA < premiumA){
            operador_m_vant = 'Operador A: Standard';
            valueoperator = standardA;
        }else{
            operador_m_vant = 'Operador A: Premium';
            valueoperator = premiumA;
        }
    }else{
        if (basicoB < standardB && basicoB < premiumB){
            operador_m_vant = 'Operador B: Básico';
            valueoperator = basicoB;
        }else if (standardB < basicoB && standardB < premiumB){
            operador_m_vant = 'Operador B: Standard';
            valueoperator = standardB;
        }else{
            operador_m_vant = 'Operador B: Premium';
            valueoperator = premiumB;
        }
    }
    const name = 'Aqui o seu resultado '+ nome + '!'
    //Validação de valores negativos
  let valores = [basicoA, basicoB, standardA, standardB, premiumA, premiumB];
   let maior = 0;
   let menor = 999;
    if(valueoperator < 0){
        for(let i = 0; i < 6; i++){
            if(valores[i] < menor && valores[i]>=0 ){
                menor = valores[i];
            }else if(valores[i] > menor && valores[i]>=0){
                maior=valores[i]
            }
        }
        if(basicoA<0){
            basicoA = menor;
            valueoperator = menor;
        }
        if(basicoB<0 ){
            basicoB = menor;
            valueoperator = menor;
        }
        if(standardA<0){
            standardA = menor;
            valueoperator = menor;
        }
        if (standardB<0){
            standardB = menor;
            valueoperator = menor;
        }
        if(premiumA<0){
            premiumA = menor;
            valueoperator = menor;
        }
        if(premiumB<0){
            premiumB = menor;
            valueoperator = menor;
        }
    }
    mostrarResultado(name, basicoA, basicoB, basico_vantajoso, standardA, standardB, standard_vantajoso, premiumA, premiumB, premium_vantajoso, operador_m_vant, valueoperator);
    
   

}

function planoA(idade,imc){
    return {
        basicoA: 100+(idade*10*(imc/10)),
        standardA: (150+(idade*15))*(imc/10),
        premiumA: (200-(imc*10)+(idade*20))*(imc/10)
    }
}
function calculo_comorbidade(imc){
    var comorbidade;
    if(imc<18.5){
        comorbidade = 10;
        return comorbidade;
    }else if (imc>=18.5 || imc<=24.9){
        comorbidade = 1;
        return comorbidade;
    }else if(imc>=25 || imc<=29.9){
        comorbidade = 6;
        return comorbidade;
    }else if(imc>=30 || imc<=34.9){
        comorbidade = 10;
        return comorbidade;
    }else if(imc>=35 || imc<=39.9){
        comorbidade = 20;
        return comorbidade;
    }else{
        comorbidade = 30;
        return comorbidade;
    }
}
function planoB (fatorComorbidade, imc){
    return {
        basicoB:100+(fatorComorbidade*10*(imc/10)),
        standardB:(150+(fatorComorbidade*15))*(imc/10),
        premiumB:(200-(imc*10)+(fatorComorbidade*20))*(imc/10)
    }
}
//Basico
function comparacaoBasic(basicoA, basicoB){
    var valor;
    if(basicoA<basicoB){
        valor = 0;
        return valor
    }else{
        valor = 1;
        return valor
    }
}
//Standard
function comparacaoStandard(standardA, standardB){
    var valor;
    if(standardA<standardB){
        valor = 0;
        return valor
    }else{
        valor = 1;
        return valor
    }
}
//Premium
function comparacaoPremium(premiumA, premiumB){
    var valor;
    if(premiumA<premiumB){
        valor = 0;
        return valor
    }else{
        valor = 1;
        return valor
    }
}

function mostrarResultado(nome, basicoA, basicoB, basico_vantajoso, standardA, standardB, standard_vantajoso, premiumA, premiumB, premium_vantajoso, operador_m_vant, valueoperator){
    document.getElementById('show-me').style.display='block';
    document.getElementById('result').style.display='block';
    document.getElementById('nameClient').innerHTML=nome;
    document.getElementById('basicoA').innerHTML='R$ '+ basicoA.toFixed(2);
    document.getElementById('basicoB').innerHTML='R$ ' + basicoB.toFixed(2);
    document.getElementById('basictext').innerHTML=basico_vantajoso;
    document.getElementById('standardA').innerHTML='R$ ' + standardA.toFixed(2);
    document.getElementById('standardB').innerHTML='R$' + standardB.toFixed(2);
    document.getElementById('standardtext').innerHTML=standard_vantajoso;
    document.getElementById('premiumA').innerHTML='R$ ' + premiumA.toFixed(2);
    document.getElementById('premiumB').innerHTML='R$ ' + premiumB.toFixed(2);
    document.getElementById('premiumtext').innerHTML=premium_vantajoso;
    document.getElementById('operador_m_vant').innerHTML=operador_m_vant;
    document.getElementById('valueoperator').innerHTML='R$ ' + valueoperator.toFixed(2);
}