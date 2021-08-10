class page extends HTMLElement {

  static get observedAttributes() {
    return ["productscount"];
  }
  constructor() {
    super();
  }
  attributeChangedCallback(name,oldValue,newValue){
    console.log(name,newValue,'nnnnn')
    var productCount = this.getAttribute('productscount')
    this.render(productCount)
  }
  connectedCallback() {
        this.render();
  }
  render(count) {
    this.innerHTML = `
      <div style="width:200px;margin-left:320px">
      <button type="button" id="page-btn" class="btn btn-link">
      <span class="badge rounded-pill bg-primary" style="width:200px;height:20px">${count} Product(s) more</span>
      </button>
      </div>
      `;
      this.clicked = 0;
    var page = document.getElementById('page-btn');
    page.onclick = (evt) => {
      this.clicked++;
      if(this.clicked > 0){
        count = count - (this.clicked * 20)
        this.render(count)
      }
      this.dispatchEvent(new CustomEvent("click", {
        detail: this.clicked
      }));
    }
  }
}

customElements.define("pagination-chip", page);