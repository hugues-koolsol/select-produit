<?php
// some old php configs still have this !
if(get_magic_quotes_gpc()==1){
 $_GET    =hmq1($_GET);
 $_POST   =hmq1($_POST);
 $_COOKIE =hmq1($_COOKIE);
 $_REQUEST=hmq1($_REQUEST);
}

if(isset($_POST['data'])){ // gestion des post
 $ret=array(
  'status' => 'KO',
  'message' => array(),
  'output' => array(),
 ); 
 $ret['input']=json_decode($_POST['data'],true);
 $nbColonnes=0;
 if(isset($ret['input']['funct'])&&$ret['input']['funct']!=''){
   if($ret['input']['funct']=='init0'){
     $dataout=array();
     $row = 0;
     if (($handle = fopen("select-produit.csv", "r")) !== FALSE) {
       while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
         $num = count($data);
         $row++;
         if($row==1){
           $cols=array();
           $founded=false;
           foreach($data as $k1=>$v1){
            if($founded==false){
             if(substr($v1,0,1)!='*'){ // on prend toutes les colonnes avant celle dont l'entête commence par *
              $cols[]=$v1;
             }else{
              $founded=true;
              $nbColonnes=count($cols);
             }
            }
           }
           $libellesColonnes=$cols;
         }else if($row>1){
           $theData=array();
           for($i=0;$i<$nbColonnes;$i++){
            $theData[$i]=$data[$i];
           }
           $dataout[]=$theData;
         }
       }
       fclose($handle);
     }
     $ret['libellesColonnes']=$libellesColonnes;
     $ret['output']=$dataout;
     $ret['status']='OK';
   }
 }
 header('Content-Type: application/json');
 echo json_encode($ret);
 exit(0);
}

?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="select-produit">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>select-produit</title>
    <style type="text/css">
    .titre0{font-size:1.3em;color:red;}
    .titre1{font-size:1.3em;color:green;margin-top:20px;}
    .titre2{font-size:1.3em;color:blue;margin-top:20px;}
    </style>
  </head>
  
  
  <body style="max-width:800px;border:0px red solid;" class="mx-auto">
  

    <div class="sticky-top alert alert-primary">
     <a href="?">select-produit</a>
    </div>    
    
    <div id="content" class="container" style="padding-bottom:50px;"> <!-- padding bottom à cause du fixed bottom plus bas -->
    
        <h1 class="mx-auto display-5" style="text-align:center;">select-produit !</h1>
     
        <div id="listeDesChoix"></div>
        
        
        <br /><br /><br /><br /><br /><br />
        
        
        <p>
         Cette page permet d'afficher des produits en fonction d'une catégorie et d'un type
         <br />
         - Quand la catégorie est choisie, une liste de types est proposée.
         <br />
         - Quand le type est choisi, une liste des produits est proposée.
         <br />
         - Quand le produit est choisi, les informations sur le produit sont affichées.
         <br /><br />
         Dans le fichier exemple, la catégorie 0 n'a qu'un seul type et qu'un seul produit donc le informations ce dernier sont affichées directement
        </p>
        
        <p>
         Les catégories, les types et les produits sont décrits dans un fichier de type tableur qui est convertit en csv.
         <br />
         <a href="select-produit.csv">Cliquez ici pour le télécharger au format .csv</a>
         <br />
         <a href="select-produit.ods">Cliquez ici pour le télécharger au format .ods</a>
         <br />
         <br />
         Les colonnes du fichier csv qui sont prises en comptes sont les premières à partir de la première colonne et jusqu'à la colonne avant celle contenant une "*" en première position de titre
        </p>
        
        
        <hr />
        
        
    </div>
    
    
    
    <div class="mx-auto fixed-bottom alert alert-success" style="margin-bottom:0;max-width:800px;border:1px green solid;">
     <a href="https://www.koolsol.app/">&copy;koolsol menu du bas</a>
    </div>
    
    
<script type="text/javascript">
var thisPage='<?php echo basename(__FILE__); ?>';
var initPar=<?php echo json_encode($_GET,true);?>;
</script>
<script type="text/javascript" src="select-produit.js"></script>
  </body>
</html>