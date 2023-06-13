import React, { useRef, useState } from 'react'

enum Operadores {
    sumar,restar,multiplicar,dividir
}

export const useCalculadora = () => {
    const [numero, setnumero] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const memsajeEntreCero = 'No se puede dividir entre cero';
    

    const limpiar = ()=>{
        setnumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = (numeroTexto: string)=>{
        //Verificar si ya existe un punto decimal
        if(numero.includes('.') && numeroTexto === '.') return;

        if(numero.startsWith('0') || numero.startsWith('-0')){
            //Primer punto decimal
            if(numeroTexto === '.'){
                setnumero(numero + numeroTexto);

                //Evaluar si es otro cero y hay un punto
            } else if(numeroTexto === '0' && numero.includes('.')){ 
                setnumero(numero + numeroTexto);

                //Evaluar si es diferente de cero y no tiene un punto
            } else if(numeroTexto !== '0' && !numero.includes('.')){
                setnumero(numeroTexto);

                //Evaluar el 0000.0
            }else if(numeroTexto === '0' && !numero.includes('.')){
                setnumero(numero);
            }else{
                setnumero(numero + numeroTexto);
            }
        }else if(numero !== memsajeEntreCero){
            setnumero(numero + numeroTexto);
        }else{
            setnumero(numeroTexto);

        }
    }

    const positivoNegativo = () =>{
        if(numero.includes('-')){
            setnumero(numero.replace('-',''));
        }else{
            setnumero('-'+numero);
        }
    }

    const btnDelete = () =>{
        if(numero.includes('-') && numero.length === 2){
            setnumero('0');
        }else if(numero.length === 1){
            setnumero('0');
        }else{
            // setnumero(numero.substring(0,numero.length-1));
            setnumero(numero.slice(0,-1));
        }
    }

    const cambiarNumPorAnt = () =>{
        if(numero.endsWith('.')){
            setNumeroAnterior(numero.slice(0,-1));
        }else if (numero === memsajeEntreCero){
            setNumeroAnterior('0');
        }else{
            setNumeroAnterior(numero);
        }
        setnumero('0');
    }

    const btnDividir = ()=>{
        cambiarNumPorAnt();
        if(numeroAnterior !== '0'){
            btnResultado(false);
        }
        ultimaOperacion.current = Operadores.dividir;
        
    }
    const btnMultiplicar = ()=>{
        cambiarNumPorAnt();
        if(numeroAnterior !== '0'){
            btnResultado(false);
        }
        ultimaOperacion.current = Operadores.multiplicar;
    }
    const btnRestar = ()=>{
        cambiarNumPorAnt();
        if(numeroAnterior !== '0'){
            btnResultado(false);
        }
        ultimaOperacion.current = Operadores.restar;
    }
    const btnSumar = ()=>{
        cambiarNumPorAnt();
        if(numeroAnterior !== '0'){
            btnResultado(false);
        }
        ultimaOperacion.current = Operadores.sumar;
    }
    const btnResultado = (resFinal: boolean)=>{

        const numero1 = Number(numero);
        const numero2 = Number(numeroAnterior);
        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumeroAnterior(`${numero1 + numero2}`);
                if (resFinal) {
                    setnumero(`${numero1 + numero2}`);
                    setNumeroAnterior('0');
                }else{
                    setnumero('0');
                }
                break;
            case Operadores.restar:
                setNumeroAnterior(`${numero2 - numero1}`);
                if (resFinal) {
                    setnumero(`${numero2 - numero1}`);
                    setNumeroAnterior('0');
                }else{
                    setnumero('0');
                }
                break;
            case Operadores.multiplicar:
                setNumeroAnterior(`${numero1 * numero2}`);
                if (resFinal) {
                    setnumero(`${numero1 * numero2}`);
                    setNumeroAnterior('0');
                }else{
                    setnumero('0');
                }
                break;
            case Operadores.dividir:
                if(numero1 === 0 || numero === memsajeEntreCero){
                    setnumero(memsajeEntreCero);
                }else{
                    setNumeroAnterior(`${numero2 / numero1}`);
                    if (resFinal) {
                        setnumero(`${numero2 / numero1}`);
                        setNumeroAnterior('0');
                    }else{
                        setnumero('0');
                    }
                }
                break;
        }
        

    }

    return {
        numeroAnterior,
        numero,
        limpiar,
        positivoNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        btnResultado,
        armarNumero

    }
}
