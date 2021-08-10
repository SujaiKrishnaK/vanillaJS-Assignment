const xhr = new XMLHttpRequest;
class mainsec extends HTMLElement {
    constructor() {
      super();
        var product = document.querySelector("mid-section");
        product.addEventListener("clicked", (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            let ProductID = evt.detail;
        let url = `https://app.dataweave.com/v6/app/retailer/bundle_overview/?&api_key=38430b87ac715c5858b7de91fb90b3f7&base_view=all_products&bundle_id=${ProductID}`;
        xhr.open('GET',url)
        xhr.send();
        xhr.onreadystatechange = (e) =>{
            let data = xhr.responseText;
            if(data !== '' && data !== undefined){
            var viewData = JSON.parse(data);
            console.log(viewData.data,'productData');
            this.render(viewData.data);
            }
          }
        });
    }
  
    connectedCallback() {
          this.render();
    }
  
    render(data) {
        let highestPrice;let yourPrice;let lowestPrice;
        if(data !== undefined && data !== null && data !== null){
        data.your_price == 'NA' ? yourPrice = "-" : yourPrice = data.your_price;
        data.lowest_price_value == 'NA' ? lowestPrice = "-" : lowestPrice = data.lowest_price_value;
        data.highest_price_value == 'NA' ? highestPrice = "-" : highestPrice = data.highest_price_value;
      this.innerHTML = `
      <div style="width:200px;">
      <div class="container" id="card-box" style="width:550px;margin:0 0 0 70px;">
      <div class="card">
          <div class="card-body">
              <div class="row">
              <span style="color:gray">${data.stock.toUpperCase()}</span>
                      <div style="color:cornflowerblue"><strong>${data.bundle_name}</strong></div>
                      <span style="color:gray">${data.sku}</span><br>
                  <div class="col-lg-5">
                      <img style="border:1px solid #A9A9A9" src="${data.thumbnail}"  height="200" width="200"  alt="">
                  </div>
                  <div class="col-lg-7">
                  <div class="row">
                          <div class="col-lg-4" style="padding-left:20px;border-right:1px solid #A9A9A9">
                              <p>Your Price</p>
                              <p style="color:#6495ed">${yourPrice}</p>
                          </div>
                          <div class="col-lg-4" style="padding-left:20px;border-right:1px solid #A9A9A9">
                              <p>Lowest Price</p>
                          <p style="color:#6495ed">${lowestPrice}</p>
                          </div>
                          <div class="col-lg-4" style="padding-left:20px">
                              <p>Highest Price</p>
                              <p style="color:#6495ed">${highestPrice}</p>
                          </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
      </div>
        `;
    }
}
  }
  
  customElements.define("main-section", mainsec);