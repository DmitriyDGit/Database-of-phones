(function(){
    
    var ItemsModel = function() {
        
        this.testApi = function () {
            $.get("/testApi", function( data ) {
                console.log("API is working...");
                console.log(data);
            })
        }
        
        this.getDataPromise = function () {
            return $.get("data/list.json", function( data ) {
                return data;
            })            
        }
        
        this.getGalleryItemByName = function (name) {
            return $.get("/getGalleryItemByName", name);
        }
        
        this.getJsonData = function () {
            $.get("data/list.json", function( data ) {
                console.log("Default load");
                console.log(data);
            })            
        }
        
       this.saveData =  function (data) {
            return $.post('/saveGalleryItem', data);
        }

//......................end of server block ...............

        this.DOMElements = null; //object with DOM links
        this.serverData =[];     //data from server
        this.tableSize = null; // choise type of table 
        this.checkedValue = []; //choosed columns
        
        
        this.showHide = function (elem, status){
            elem.style.display = status;
        }

        this.chooseColumn = function () {
            var inputElements = document.querySelectorAll('.checkboxColumn');
            for(var i=0; i < inputElements.length; i++){
                  if(inputElements[i].checked){
                       this.checkedValue.push(inputElements[i].value);
                  }
            }
            console.log(this.checkedValue);
        }

        this.addNewTable = function (tableSize, checkedValue) {
            if(tableSize === 1) {
                this.showHide( this.DOMElements.columnsChoiсeBlock, "none");
                this.showHide(this.DOMElements.filterBlock, "block");
                this.DOMElements.info.innerHTML = "";
                var tableTemp;
                    this.DOMElements.table.innerHTML += `<tr>
                                                            <th>${this.serverData[0].id}</th>
                                                            <th>${this.serverData[0].name}</th>
                                                            <th>${this.serverData[0].price}</th>
                                                            <th>${this.serverData[0].quantity}</th>
                                                        </tr>`;

                for(var i = 1; i < this.serverData.length; i++){
                        tableTemp = `<tr id = "row_${this.serverData[i].id}">
                                        <td>${this.serverData[i].id}</td>
                                        <td>${this.serverData[i].name}</td>
                                        <td>${this.serverData[i].price} </td>
                                        <td>${this.serverData[i].quantity}</td>
                                    </tr>`
                        this.DOMElements.table.innerHTML += tableTemp;
                }
            }
            if(tableSize === 2) {
                this.showHide( this.DOMElements.columnsChoiсeBlock, "none");
                this.showHide(this.DOMElements.filterBlock, "none");
                this.DOMElements.info.innerHTML = "";
                var tableTemp;
                    this.DOMElements.table.innerHTML += `<tr>
                                                            <th>${this.serverData[0].name}</th>
                                                            <th>${this.serverData[0].price}</th>
                                                           
                                                        </tr>`;
                for(var i = 1; i < this.serverData.length; i++){
                        tableTemp = `<tr id = "row_${this.serverData[i].id}">
                                        <td>${this.serverData[i].name}</td>
                                        <td>${this.serverData[i].price} </td>
                                    </tr>`
                this.DOMElements.table.innerHTML += tableTemp;
                }
            }
            if(tableSize === 3) {
                this.DOMElements.info.innerHTML = "";
                this.showHide( this.DOMElements.columnsChoiсeBlock, "block");
                this.showHide(this.DOMElements.filterBlock, "none");
            }
        }.bind(this);

        this.choseTableSize = function(){
            if(event.target.value === "big"){
                this.tableSize = 1;
            } else if (event.target.value === "small") {
                this.tableSize = 2;
            }else if (event.target.value === "privat") {
                this.tableSize = 3;
                console.log(this.tableSize);
            }
        }

        this.showInfo = function(){
            if (event.target.tagName == "TD") {
               var row = event.target.parentElement.children;
               this.DOMElements.info.innerHTML += `Выбрано: ${row[1].innerText} (стоимость ${row[2].innerText} $, на складе ${row[3].innerText} шт. )<br>` 
            }
        }

//..........................add new table block 

        this.addNewBlock = function() {
        }

//.....................sort table block

        this.sortTable = function() {
            if(event.target.tagName == "TH") {
                var table, rows, switching, i, x, y, shouldSwitch, dir, n, switchcount = 0;
                table = document.querySelector("#table");
                var arrTemp =[];
                var hesh = table.querySelectorAll("TH");
                
                for (var j = 0; j < hesh.length; j++ ) {
                    arrTemp.push(hesh[j].innerHTML);
                }

                switching = true;
                dir = "asc"; 

                n =  arrTemp.indexOf(event.target.innerHTML);

                while (switching) {
                switching = false;
                    rows = table.querySelectorAll("TR");
                    for (i = 1; i < (rows.length - 1); i++) {
                      shouldSwitch = false;
                        x = rows[i].querySelectorAll("TD")[n];
                        y = rows[i + 1].querySelectorAll("TD")[n];
                      if (dir == "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                          shouldSwitch= true;
                          break;
                        }
                      } else if (dir == "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                          shouldSwitch= true;
                          break;
                        }
                      }
                    }
                    if (shouldSwitch) {
                      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                      switching = true;
                      switchcount ++;      
                    } else {
                      if (switchcount == 0 && dir == "asc") {
                        dir = "desc";
                        switching = true;
                      }
                    }
                }
            }
        }


//................end of..sort table block

//................filter block 

        this.filtration = function () {
          var input, filter, table, tr, td, i;
          input = document.querySelector("#myInput");
          filter = input.value.toUpperCase();
          table = document.querySelector("#table");
          tr = table.querySelectorAll("TR");

          for (i = 0; i < tr.length; i++) {
            td = tr[i].querySelectorAll("TD")[1];
            if (td) {
              if (td.innerHTML.toUpperCase().indexOf(filter) == -1) {
                
                tr[i].style.display = "none";
              } else {
                tr[i].style.display = "";
              }
            } 
          }
        }

/*
        this.clearFilter = function() {
            this.DOMElements.filter.value = "";
        }

*/


//........................code organization block

        this.init = function () {
            this.DOMElements.table.innerHTML = "";
            
            console.log(this.DOMElements);
            console.log("hehe");
            this.choseTableSize();
            this.addNewTable(this.tableSize);
        }

//..........................end 


        this.initListeners = function () {
            this.DOMElements.tableSizeBig.addEventListener("click", this.init.bind(this));
            this.DOMElements.tableSizeSmall.addEventListener("click", this.init.bind(this));
            this.DOMElements.tableSizePrivat.addEventListener("click", this.init.bind(this));
            this.DOMElements.columnsChoiсeBtn.addEventListener("click", this.chooseColumn.bind(this));
            this.DOMElements.table.addEventListener("click", this.showInfo.bind(this));
            this.DOMElements.addNewBlock.addEventListener("click", this.addNewBlock.bind(this));
            this.DOMElements.table.addEventListener("click", this.sortTable.bind(this));
            this.DOMElements.filter.addEventListener("keyup", this.filtration.bind(this));
          //  this.DOMElements.filterBtn.addEventListener("click", this.clearFilter.bind(this));

        }

         this.setFormData = function (form){ 
                this.DOMElements = form;
                console.log(this.DOMElements);
        }
        this.initValidator = function (form){
            this.initListeners();
        }
        
    }
    
    var model = new ItemsModel();

    model.setFormData({
        tableSizeBig:document.querySelector('[value="big"]'),
        tableSizeSmall:document.querySelector('[value="small"]'),
        tableSizePrivat:document.querySelector('[value="privat"]'),
        filter: document.querySelector('#myInput'),
        filterBlock:document.querySelector('#filter-wrapper'), 
        filterBtn: document.querySelector('#defaultFilter'), 
        resultBlock:document.querySelector("#result"),
        form: document.querySelector("#form-wrapper"),
        table: document.querySelector("#table"),
        columnsChoiсeBlock: document.querySelector("#columnsChoiсe"),
        columnsChoiсeBtn :document.querySelector("#columnsChoiсeBtn"),
        info:document.querySelector("#info"),
        addNewBlock: document.querySelector("#addNewBlock"),

    })

        model.initValidator();

        model.testApi();
//      model.getJsonData();

        model.getDataPromise().then(function(data){
        console.log("All data is loaded");
        console.log(data);
        model.serverData = data;
    });

}())




