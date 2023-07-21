"use strict"

const btn_search = document.getElementsByClassName('btn-search')[0];
const input_search = document.getElementById('input-search');

function flatIngredients(json){
    
    let arr = [];
    let num = 1;
    Object.keys(json).forEach(e => {
        
        let k = `${e}`; // Chiave oggetto
        let v = `${json[e]}`; // Valore della chiave
        
        let name = "strIngredient" + num;
        if(k === name && v !== "null") {
            arr.push(json[e]);
            num++;
            name = name + num;
        }    
    });
    return arr;
}



function fnSearchCocktail() {
    const value = input_search.value;
    console.log("Btn clicked!", input_search.value);

    if(value !== ""){
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then(response => response.json())
        .then(dati => {

            const div_wrappComponents = document.getElementsByClassName('wrappComponents')[0];
            div_wrappComponents.innerHTML = "";
            if(dati.drinks !== null){
                const d = dati.drinks.map( el =>{
            
                    const objResponse = {
                        nome: el.strDrink,
                        img: el.strDrinkThumb,
                        categoria: el.strCategory,
                        tipo: el.strAlcoholic,
                        glass: el.strGlass,
                        istruzioni: el.strInstructionsIT,
                        ingredienti: flatIngredients(el)
                    }
                    return objResponse;
                });
                d.map( (el) => {
                    fnCreaComponent(el);
                })
            }
        });
    }
}

// Funzione crea component

const fnCreaComponent = (obj) => {

    const div_wrappComponents = document.getElementsByClassName('wrappComponents')[0];
    

    console.log(obj);
    const div_component = document.createElement('div');
    div_component.classList.add('component');

    const div_wrapp_img_cocktail = document.createElement('div');
    div_wrapp_img_cocktail.classList.add('wrapp_img_cocktail');

    

    const img_cocktail = document.createElement('img');
    img_cocktail.src = obj.img;
    div_wrapp_img_cocktail.appendChild(img_cocktail);

    div_component.appendChild(div_wrapp_img_cocktail);




    const div_cocktail_name = document.createElement('div');
    div_cocktail_name.classList.add('cocktail-name');

    const span_name = document.createElement('span'); 
    span_name.classList.add('italic');
   
    span_name.innerText = obj.nome;
    
    div_cocktail_name.appendChild(span_name);

    div_component.appendChild(div_cocktail_name);

    const div_indredients_cocktail = document.createElement('div');
    div_indredients_cocktail.classList.add('indredients-cocktail');


    const ul_ingredients = document.createElement('ul');
    const li_intestazione = document.createElement('li');
    li_intestazione.classList.add('italic');
    li_intestazione.innerText = 'Ingredienti:';
    ul_ingredients.appendChild(li_intestazione);
    obj.ingredienti.forEach( (el) =>{
        const li_indredient = document.createElement('li');
        li_indredient.classList.add('italic');
        li_indredient.innerText = el + ",";
        ul_ingredients.appendChild(li_indredient);
    })

    div_indredients_cocktail.appendChild(ul_ingredients);

    div_component.appendChild(div_indredients_cocktail);
     
    const div_istruction_cocktail = document.createElement('div');
    div_istruction_cocktail.classList.add('istruction-cocktail');
  
    const span_istruzioni = document.createElement('span');
    span_istruzioni.classList.add('italic');
    
    span_istruzioni.innerText = "Istruzioni: \n" + obj.istruzioni;
    div_istruction_cocktail.appendChild(span_istruzioni);
    div_component.appendChild(div_istruction_cocktail);

    
    
    div_wrappComponents.appendChild(div_component);
}

btn_search.addEventListener('click', fnSearchCocktail);

input_search.addEventListener('change', fnSearchCocktail);

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
        .then(response => response.json())
        .then(dati => {

            const div_wrappComponents = document.getElementsByClassName('wrappComponents')[0];
            div_wrappComponents.innerHTML = "";
            if(dati.drinks !== null){
                const d = dati.drinks.map( el =>{
            
                    const objResponse = {
                        nome: el.strDrink,
                        img: el.strDrinkThumb,
                        categoria: el.strCategory,
                        tipo: el.strAlcoholic,
                        glass: el.strGlass,
                        istruzioni: el.strInstructionsIT,
                        ingredienti: flatIngredients(el)
                    }
                    return objResponse;
                });
                d.map( (el) => {
                    fnCreaComponent(el);
                })
            }
        });