const entryform = document.getElementById('entry');
const catalog = document.getElementById('catalog');
let entrylist = JSON.parse(localStorage.getItem('entries')) || [];
const deletebtn = document.getElementById('delete');
const editbtn = document.getElementById('edit');
const ownedcheck = document.getElementById('owned');
const finishedlabel = document.getElementById('fin')
const header = document.getElementById('head')


let finshow = true
let editingIndex = null;
ownedcheck.addEventListener('click',()=>{finishedlabel.style.display=(finshow ? 'block':'none') 
    finshow=!finshow});

const blank = {
    name:'',
    age:"",
    pieces:"",
    description:"",
    owned:"",
    finished: '',
    shown:false,
}

function addEntry (e){
    e.preventDefault();

       
    let newentry = {...blank};
   

    for (let key in newentry) {
       
               // Set each property from the form using the key
        if(key== 'owned' || key=='finished'){
            let checked = entryform.querySelector(`[id=${key}]`).checked
            
            if(checked){
                newentry[key]=true;
            }else{
                newentry[key]=false;
                            }
                            continue;
                        }

        if(key=='shown'){
            continue;
        }
        newentry[key] = entryform.querySelector(`[id=${key}]`).value;
    }
    
   

   
  

   if (editingIndex !== null) {
    entrylist[editingIndex] = newentry;
    editingIndex = null;
    header.innerText = 'Enter a new set:';
} else {
    entrylist.push(newentry);
}

update();

for (key in newentry) {
    if (key == 'owned' || key == 'finished') {
        entryform.querySelector(`[id=${key}]`).checked = false;
    }
    entryform.querySelector(`[id=${key}]`).value = "";
    
}
}

function update(){
    fillcatalog(entrylist,catalog);
    localStorage.setItem('entries', JSON.stringify(entrylist));
    
}

function fillcatalog(entrylist,catalog){
   
    if(entrylist.length==0){
        catalog.innerHTML = '<li>Your catalog is empty! Add some entries!</li>'
        return;
    }
    catalog.innerHTML = ""
    for(item in entrylist){
        catalog.innerHTML +=`
        <li>
            <h2>${entrylist[item].name}</h2>
            <!-- image -->
            <p style="display: ${entrylist[item].owned ? 'block':'none'}">Owned${entrylist[item].finished ? ' and finished':""}</p>
           
           <button onclick=showmore(${item})>show ${entrylist[item].shown ? 'less':'more'}</button>
           <br>
           <div style="display: ${entrylist[item].shown ? 'block':'none'};">
            <p>Age rating: ${entrylist[item].age}</p>
            <p>Number of pieces: ${entrylist[item].pieces}</p>
                <p>${entrylist[item].description}</p>
           </div>
           <button  onclick = editentry(${item})>Edit</buton>
           <button onclick=deleteentry(${item})>Delete</button>
        </li>
        
        
        `
       
    }

}

function editentry(i){
    
    header.innerText = 'Edit your set details:'
for(key in entrylist[i]){
    if (key == 'shown') continue; // Skip the shown property
        if (key == 'owned' || key == 'finished') {
            
            entryform.querySelector(`[id=${key}]`).checked = entrylist[i][key];
        } else {
            entryform.querySelector(`[id=${key}]`).value = entrylist[i][key];
        }
     
}
editingIndex = i;
}

function deleteentry(i){
    if(confirm("Are you sure you want to delete this entry?")){
        entrylist.splice(i,1);
        update();
    
    }
  }


  function showmore(i){
   entrylist[i].shown = !entrylist[i].shown
    update();
  }


entryform.addEventListener('submit',addEntry);
fillcatalog(entrylist, catalog);