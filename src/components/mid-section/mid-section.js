const http = new XMLHttpRequest;

class midsec extends HTMLElement {

  static get observedAttributes() {
        return ["selectedview"];
      }

  constructor() {
      super();
      var search = document.querySelector('search-sort');
      search.addEventListener('change', (ev) => {
        const searchVal = ev.target.value;
        this.attributeChangedCallback(undefined,undefined,this.changedView,searchVal)
      });

      search.addEventListener('click',(ev) => {
        const sortVal = ev.target.value;
        console.log(sortVal,'jjjj')
        this.attributeChangedCallback(undefined,undefined,this.changedView,undefined,sortVal)
      })  

      var page = document.querySelector('pagination-chip');
      page.addEventListener('click',(ev) => {
        console.log(ev.detail,'page');
        let start = ev.detail * 20;
        let limit = ev.detail * 20 + 20;
        this.attributeChangedCallback(undefined,undefined,this.changedView,undefined,undefined,start,limit)
      })
    }

    attributeChangedCallback(name,oldValue,newValue,searchVal,sortVal,start,limit) {
      this.changedView = newValue;
      let url;
      if(searchVal == undefined){
        url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${newValue}&start=0&limit=20&sort_on=&sort_by=&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
      }else if(searchVal){
        url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${newValue}&start=0&limit=20&sort_on=&sort_by=&filters={"search":"${searchVal}"}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
      }
      if(sortVal){
        let sorton;let sortby;
      if(sortVal.indexOf('price') > -1){
        sorton = 'available_price'
      }
      if(sortVal.indexOf('discount') > -1){
        sorton = 'discount'
      }
      if(sortVal.indexOf('increase') > -1){
        sorton = 'price_opportunity_increase_by_percentage'
      }
      if(sortVal.indexOf('decrease') > -1){
        sorton = 'not_lowest_decrease_by_percentage'
      }
      if(sortVal.indexOf('HtoL') > -1){
          sortby = 'desc'
      }
      if(sortVal.indexOf('LtoH') > -1){
        sortby = 'asc'
      }
        url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${newValue}&start=0&limit=20&sort_on=${sorton}&sort_by=${sortby}&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
      }
      if(limit && start){
        url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${newValue}&start=${start}&limit=${limit}&sort_on=&sort_by=&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
      }
        http.open('GET',url)
        http.send();
        http.onreadystatechange = (e) =>{
            let data = http.responseText;
            if(data !== '' && data !== undefined){
            var viewData = JSON.parse(data);
            console.log(viewData.data,'viewdata');
            this.render(viewData.data);
            }
          }
      }
  
    connectedCallback() {
      this.render();
    }
    getbundleid(bundle_id){
      this.bundle_id = bundle_id;
    }
    render(viewData) {
      
      if(viewData !== undefined && viewData !== ''){
          let value = '';
          viewData.forEach(data => {
      value  +=  `
      <div class="container" style="width:550px;margin:-15px 0 50px 200px">
      <div class="card" id="card-box" value="${data.bundle_id}">
          <div class="card-body">
              <div class="row">
                  <div class="col-lg-9">
                      <span>&#8377;</span> <span style="color:cornflowerblue">${data.available_price}</span>
                      <div>${data.bundle_name}</div>
                      <span style="color:gray">${data.sku}</span><br>
                      <span style="color:cornflowerblue">  <span>&#8377;</span> Increases Upto <span style="color:red">${data.price_opportunity_increase_by} (${data.price_opportunity_increase_by_percentage})</span></span>
                      <span>opportunity Exists from last <span style="color:red">${data.price_opportunity_days}</span> days(s)</span>
                  </div>
                  <div class="col-lg-3">
                      <img style="border:1px solid #A9A9A9" src="${data.thumbnail}"  height="115" width="100"  alt="">
                  </div>
              </div>
          </div>
      </div>
  </div>
               `; 
               this.innerHTML = value;
                  });
      }
  var container = document.getElementsByClassName('card');
  if(container != null && container != undefined && container.length > 0){
    var arr = Array.prototype.slice.call( container )
    arr.forEach(element => {
      element.onclick = (evt) => {
        let productId = element.getAttribute('value');
        console.log(evt,'heyy');
          this.dispatchEvent(new CustomEvent("clicked", {
            detail: productId
          }));
        }
    })
  }
  }
   
}

  function searchCallback(searchValue,view){
    console.log(view,'lol');
    let url = `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${view}&start=0&limit=20&sort_on=&sort_by=&filters={"search":"${searchValue}"}&api_key=38430b87ac715c5858b7de91fb90b3f7`;
    http.open('GET',url)
    http.send();
    http.onreadystatechange = (e) =>{
        let data = http.responseText;
        if(data !== '' && data !== undefined){
        let viewData = JSON.parse(data);
        console.log(viewData.data,'viewdata');
        render(viewData.data)
        }
      }
  }

customElements.define("mid-section", midsec);
  