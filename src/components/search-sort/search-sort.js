class searchsort extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }
    render() {
        this.innerHTML  =  `
        <div style="width:300px;margin-left:225px">
        <div class="row">
        <div class="col-lg-9">
        <div class="input-group mb-3">
        <input type="text" onchange="searchCall(event)" class="form-control" placeholder="Search">
                <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">
                <span class="material-icons">
                    search
                 </span>
        </span>
        </div>
        </div>
        </div>
        <div class="col-lg-3">

<div class="dropdown">
  <button style="height:38px" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
  <span class="material-icons">
  sort
  </span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <li><button class="dropdown-item" onclick="sortCall(event)" id="pricesort" value="price-HtoL" type="button">PRICE - HIGH TO LOW</button></li>
    <li><button class="dropdown-item" onclick="sortCall(event)" id="discountsort" value="discount-HtoL" type="button">DISCOUNT% - HIGH TO LOW</button></li>
    <li><button class="dropdown-item" onclick="sortCall(event)" id="increasesort" value="increase-HtoL" type="button">INCREASE% - HIGH TO LOW</button></li>
    <li><button class="dropdown-item" onclick="sortCall(event)" id="decreasesort" value="decrease-HtoL" type="button">DECREASE% - HIGH TO LOW</button></li>
  </ul>
</div>

        </div>  
        </div>
        <p id="activesort"><p>
        </div>
                 `; 
    }
  }
  function searchCall(event){
    let searchVal = event.target.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: searchVal
    }))
  }
  function sortCall(event){
    document.getElementById("activesort").innerHTML = event.target.innerHTML;
    let menuItem = event.target.id;
    let val = document.getElementById(menuItem).getAttribute('value');
    let html = document.getElementById(menuItem).innerHTML;
    if(html.indexOf('HIGH TO LOW') > -1){
      document.getElementById(menuItem).innerHTML = html.replace('HIGH TO LOW','LOW TO HIGH');
      let order = val.replace('LtoH','HtoL')
      document.getElementById(menuItem).setAttribute('value',order) 
    }
    if(html.indexOf('LOW TO HIGH') > -1){
      document.getElementById(menuItem).innerHTML = html.replace('LOW TO HIGH','HIGH TO LOW');
      let order = val.replace('HtoL','LtoH')
      document.getElementById(menuItem).setAttribute('value',order) 
    }

    this.dispatchEvent(new CustomEvent('click', {
      detail: event
    }))
  }
  customElements.define("search-sort", searchsort);
  