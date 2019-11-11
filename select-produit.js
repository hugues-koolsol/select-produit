"use strict";
var listeDesLignes=[];
var libellesColonnes=[];
var listeDesChoixPris=[];
var listeDesChoixSelectionnes=[];
//============================================================================     
function init0(){
 var r = new XMLHttpRequest();
 r.open("POST",thisPage+'?init0',true);
 r.timeout=6000;
 r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
 r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
  try{
   var jsonRet=JSON.parse(r.responseText);
   if(jsonRet.status=='OK'){
    if(libellesColonnes.length==0){
     libellesColonnes=jsonRet.libellesColonnes;
     listeDesLignes=jsonRet['output'];
     var count=0;     
     for(var elem in libellesColonnes){
      var element = document.createElement('div');
      element.id='maNav_'+count;
      document.getElementById('listeDesChoix').appendChild(element);
      count++;
      listeDesChoixSelectionnes.push('');
     }
    
    }    
    if(libellesColonnes.length>0){
     var t='';
     var count=0;
     t='<div class="titre0">'+libellesColonnes[0]+'</div>'+
       '<div>'+
         '<select class="custom-select" id="select0" onchange="selectChange1(0)" data-selectname="'+libellesColonnes[0].replace(/ /g,'_')+'">'+
            '<option selected>Selectionnez '+libellesColonnes[0]+'</option>';
            for(elem in listeDesLignes){
              var trouve=false;
              for(var j=0;j<listeDesChoixPris.length;j++){
                if(listeDesLignes[elem][0]==listeDesChoixPris[j]){
                  trouve=true;
                  break;
                }
              }
              if(trouve==false){
               listeDesChoixPris.push(listeDesLignes[elem][0]);
              
               t+='<option>'+ent1(listeDesLignes[elem][0])+'</option>';
               count++;
              }
            }
     t+=''+            
         '</select>'+
       '</div>';
     if(count==0){
      t='';
     }
     document.getElementById('maNav_0').innerHTML=t;
     initParValues();     
     
    }
    
    return;
   }else{
    console.error(r.responseText);
   }
  }catch(e){
   console.error(e);
  }
 };
 r.onerror=function(e){
  console.error('e=',e);
 }
 var data={
  funct          : 'init0',
 }
 r.send('data='+encodeURIComponent(JSON.stringify(data)));
}    
    
//============================================================================     
    
    
function selectChange1(numeroSelect){
 
 for(var i=numeroSelect+1;i<libellesColonnes.length;i++){
  document.getElementById('maNav_'+i).innerHTML='';
  listeDesChoixSelectionnes[i]='';
 }
 
 var select01=document.getElementById('select'+numeroSelect);
 var index=select01.selectedIndex;
 var libelle = select01.children[index].innerHTML.trim();
 listeDesChoixSelectionnes[numeroSelect]=libelle;
 
 if(numeroSelect==libellesColonnes.length-2){
   // si on est sur le dernier select
  
   for(elem in listeDesLignes){
    
     var trouve=[];
     var url='';
     
     for(var i=0;i<=numeroSelect;i++){
      trouve[trouve.length]=false;
     }
     for(var i=0;i<=numeroSelect;i++){
       if(listeDesChoixSelectionnes[i]==listeDesLignes[elem][i]){
         trouve[i]=true;
         url+='&'+libellesColonnes[i].replace(/ /g,'_')+'='+encodeURI(listeDesChoixSelectionnes[i]);
       }
     }
     var toutTrouve=true;
     for(var i=0;i<=numeroSelect;i++){
      if(trouve[i]==false){
       toutTrouve=false;
       break;
      }
     }
     if(toutTrouve==true){
      listeDesChoixPris.push(listeDesLignes[elem][numeroSelect+1]);
      var t='<div style="font-size:2em;font-weight:bold;">'+listeDesLignes[elem][numeroSelect+1]+'</div>';
      url=url.substr(1);
      t+='<hr />Cette url=<br /><span style="word-break: break-word;">'+thisPage+'?'+url+'</span>';
      document.getElementById('maNav_'+(numeroSelect+1)).innerHTML=t; // affichage du produit
      return;
     }
   }
  
   return;
 }
 
// console.log('index=',index , libelle);
 listeDesChoixPris=[];
 var t='';
 var count=0;
 t='<div class="titre'+(numeroSelect+1)+'">'+libellesColonnes[numeroSelect+1]+'</div>'+
    '<div>'+
      '<select class="custom-select" id="select'+(numeroSelect+1)+'" onchange="selectChange1('+(numeroSelect+1)+')" data-selectname="'+libellesColonnes[numeroSelect+1].replace(/ /g,'_')+'">'+
         '<option selected>Selectionnez '+libellesColonnes[numeroSelect+1]+'</option>';
         for(var elem in listeDesLignes){
          
           var trouve=false;
           for(var i=0;i<=numeroSelect;i++){
            if(listeDesChoixSelectionnes[i]!=listeDesLignes[elem][i]){
             trouve=true;
             break;
            }
           }
           if(trouve==false){
            for(var j=0;j<listeDesChoixPris.length;j++){
              if(listeDesLignes[elem][numeroSelect+1]==listeDesChoixPris[j]){
                trouve=true;
                break;
              }
            }
           }
            
           if(trouve==false){
            listeDesChoixPris.push(listeDesLignes[elem][numeroSelect+1]);
           
            t+='<option>'+ent1(listeDesLignes[elem][numeroSelect+1])+'</option>';
            count++;
           }
         }
 t+=''+            
      '</select>'+
    '</div>';
 if(count==0){
  t='';
 }
 if(count==1){
  setTimeout(
   function(){
    var selectId=document.getElementById('select'+(numeroSelect+1));
    selectId.selectedIndex=1;
    selectChange1(numeroSelect+1);
//    alert(numeroSelect+1);
   },16
  );
 }
 document.getElementById('maNav_'+(numeroSelect+1)).innerHTML=t;
}    
     
     
     
//=====================================================================================================================
function ent1(s){
 var x=s.replace(/</g,'&lt;');
 x=x.replace(/>/g,'&gt;');
 x=x.replace(/"/g,'&quot;');
 return x;
}

//=====================================================================================================================


init0(); // Initialisation de la première dropdown
     
//=====================================================================================================================
var countRedir=0;
function initParValues(){
  for(var param in initPar){
    // permet d'appeler une url avec des paramètres pré remplis : http://www.your-domain.com/index.php?la_catégorie=categorie%205&le_type=Type%2003&le_produit=produit%20206
    // alert(param + ' ' + initPar[param]);
    var lst=document.getElementsByTagName('select');
    for(var i=0;i<lst.length;i++){
      if(lst[i].getAttribute('data-selectname')){
        if(lst[i].getAttribute('data-selectname')==param){
          var lstOpts=lst[i].getElementsByTagName('option');
          for(var j=0;j<lstOpts.length;j++){
            if(lstOpts[j].innerHTML==initPar[param]){
              lst[i].selectedIndex=j;
              selectChange1(countRedir);
              countRedir++;
              var count=0;
              var newPar={};
              for(var elem in initPar){
                count++;
                if(count>1){
                  newPar[elem]=initPar[elem];
                }
              }
              initPar=newPar;
              setTimeout(initParValues,150);
              return;
            }
          }
        }
      }
    }
  }
}