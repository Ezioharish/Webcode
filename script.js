//  Inserting Search box;
const txtbox = document.createElement('input');
txtbox.setAttribute('id','Searchbox');
txtbox.setAttribute('name','Searchbox');
txtbox.setAttribute('class','textboxclass');    
txtbox.setAttribute('placeholder','Enter Something here');

const search = document.createElement('button');
search.setAttribute('id','Searchbutton');
search.setAttribute('name','Searchbutton');
search.setAttribute('class','searchbuttonclass');    
search.innerText = 'Submit';

const homebutton = document.createElement('button');
homebutton.setAttribute('id','homebtn');
homebutton.setAttribute('name','homebtn');
homebutton.style.height = '30px';
homebutton.style.width = '40px';
homebutton.style.borderRadius = '8px';
homebutton.innerHTML = '<i class="fa-solid fa-house-chimney"></i>';

const searchdiv = document.createElement('div');
searchdiv.setAttribute('class','searchdivclass');  
searchdiv.append(txtbox,search,homebutton);

document.body.style.backgroundColor = '#acacdb';

const parendiv = document.createElement('div');
parendiv.setAttribute('class','divclass');                 

const title = document.createElement('div');
title.setAttribute('class','titleclass');   
title.innerHTML = "<h1>Makeup API</h1>";    

//  Making API Call 
const product = async () => {

    try{
    const response =  await fetch('http://makeup-api.herokuapp.com/api/v1/products.json',{mode: 'cors'});
    const responsejson = await response.json();
    console.log(responsejson);
    homebutton.addEventListener('click',() =>{
        parendiv.innerHTML="";
        responsejson.forEach((product) => {
            if(product.name){
                const productdiv = document.createElement('div');     
                productdiv.setAttribute('class','child');                       
                
                const labelDiv = document.createElement('label');
                labelDiv.setAttribute('class','labelclass');
                labelDiv.innerHTML = `
                Name: ${product.name}<br />
                Brand: ${product.brand}<br />
                Descrirption: ${product.description}<br />
                Product Link: ${product.product_link}<br />
                Price:\x24${product.price}`
               
                const imgdiv = document.createElement('img');                          
                imgdiv.setAttribute('src',product.image_link);
                imgdiv.setAttribute('class','imgclass');
                imgdiv.classList.add('img-thumbnail');
    
                
                // Some images can' be loaded because it URL Incorrect
                productdiv.append(labelDiv,imgdiv);
                parendiv.append(productdiv);
    
                
        }})
        console.log(parendiv);
        document.body.appendChild(parendiv);
    })

    search.addEventListener('click',e =>{
        parendiv.innerHTML="";
        const value = document.getElementById('Searchbox').value;
        if(value === ""){
            return alert("Enter a Value");
        }
        responsejson.forEach(ele => {
            
                try{
                if(ele.name.includes(value) || ele.brand.includes(value)){
                    console.log(ele);
                    const productdiv = document.createElement('div');     
                    productdiv.setAttribute('class','child');                       
            
                    const labelDiv = document.createElement('label');
                    labelDiv.setAttribute('class','labelclass');
                    labelDiv.innerHTML = `
                    Name: ${ele.name}<br />
                    Brand: ${ele.brand}<br />
                    Descrirption: ${ele.description}<br />
                    Product Link: ${ele.product_link}<br />
                    Price: \x24${ele.price}`
                
                    const imgdiv = document.createElement('img');                          
                    imgdiv.setAttribute('src',ele.image_link);
                    imgdiv.setAttribute('class','imgclass');
                    imgdiv.classList.add('img-thumbnail');
                    productdiv.append(labelDiv,imgdiv);
                    parendiv.append(productdiv);
                }
            }
                catch(error){
                    console.log(error);
                }
        });
        console.log(parendiv);
        document.body.appendChild(parendiv);
    });
}
   catch(error){
        console.log(error);
    }
}

document.body.append(title,searchdiv);
product();  
