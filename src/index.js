const http = new XMLHttpRequest();
var selectedView = '';
var productCounts = {};
var views = ['all_products','increase_opportunity']

document.getElementById('hammenu').addEventListener('click',function(){
openNav();
});

document.getElementById('closeSide').addEventListener('click',function(){
  closeNav();
});

document.getElementById('all_products').addEventListener('click',function(){
  document.getElementById('midtag').setAttribute('selectedview','all_products');
  document.getElementById('paging').setAttribute('productsCount',productCounts.all_products)
})

document.getElementById('increase_opportunity').addEventListener('click',function(){
  document.getElementById('midtag').setAttribute('selectedview','increase_opportunity')
  document.getElementById('paging').setAttribute('productsCount',productCounts.increase_opportunity)
})

function viewCall(selectedView){
    const url=`https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${selectedView}&start=0&limit=20&sort_on=&sort_by=&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
    http.open('GET',url)
    http.send();

    http.onreadystatechange = (e) =>{
      let data = http.responseText;
      if(data !== '' && data !== undefined){
        data = JSON.parse(data);
        productCounts[selectedView] = data.count;
        console.log(productCounts)
      }
    }
}

 function initialise() {
  openNav();
    viewCall(views[0]);
   setTimeout(() => {
      viewCall(views[1])
   }, 3000);
   setTimeout(() => {
    document.getElementById('all_productscount').innerHTML = productCounts.all_products;
    document.getElementById('increase_opportunity_count').innerHTML = productCounts.increase_opportunity;
    document.getElementById('all_products').click();
   }, 4000);
  }  

  function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
    document.getElementById("main").style.marginLeft = "100px"
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "-100px"
  }
initialise();