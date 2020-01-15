var SelectPopUP = function(target, settings){
    this.target      = null;
    this.options = []; // list of all selections
    this.selectedOptions = []; //list of selected options from selections
    this.selectedText = [];
    this.selectedValue = []; //list of selected values
    this.selectionContainer = null;


    this.init = function() {
		switch(typeof target) {
			case 'object':
				this.target = target;
				break;
			case 'string': 
				this.target = document.querySelector(target);
				break;
        }
        this.target.classList.add("hide");
        this.selectedOptions = this.getSelectedOptions();
        this.selectedValue = this.getSelectedValue();
        this.selectedText = this.getSelectedText();

        this.options = this.getOptions();
        this.settings = this.getSettings(settings);
        this.buildSelect();
        window.addEventListener("click", this.hideSelection.bind(this));
        this.selectionContainer.addEventListener("click", this.selectionOnClick.bind(this));

        // this.target.
		//this.target.parentNode.replaceChild(this.select, this.target);
		//this.target.style.display = 'none';
		//this.select.appendChild(this.target);

		//document.addEventListener('click', this.handleClickOff.bind(this));
		//this.positionList();
    };
    this.getSettings = function(settings) {
		var defaults = {
			title: 'Title'
		};

		for(var p in settings) {
			defaults[p] = settings[p];
		}

		return defaults;
    };
    this.buildSelect = function(){
        var select = document.createElement('div');
        select.type = "text";
        select.classList.add("select");

        //show selected item.
        for(var i = 0; i< this.selectedOptions.length; i++){
            select.appendChild(this.createSelectedItem(this.selectedOptions[i].text));
        }
        this.select = select;
        this.select.addEventListener("click", this.toggleSelection.bind(this));
        //create selectionList
        var selectionContainer = document.createElement('span');
        var selectionTitle = document.createElement("div");
        selectionTitle.innerHTML = this.settings.title;
        selectionTitle.classList.add("selectionTitle");
        selectionContainer.appendChild(selectionTitle);

        selectionContainer.classList.add("selectionContainer");
        selectionContainer.classList.add("hide");
        for(var i = 0; i< this.options.length; i++){
            var selection = document.createElement('div');
            var selectionText = document.createElement("span");
            var selectionCheck = document.createElement("input");
            var checkboxContainer = document.createElement("label");
            var checkboxSpan = document.createElement("span");
            selectionText.innerHTML = this.options[i].text;
            selectionText.classList.add("selectionText");
            
            checkboxContainer.classList.add("checkboxContainer");
            selectionCheck.setAttribute("type", "checkbox");
            // selectionCheck.classList.add("selectionCheck");
            selectionCheck.addEventListener("change", this.selectionOnChange.bind(this));
            checkboxContainer.appendChild(selectionCheck);
            checkboxContainer.appendChild(checkboxSpan);

            selection.classList.add("selection");
            selection.setAttribute("data-selection-value", this.options[i].value);
            selection.appendChild(selectionText);
            selection.appendChild(checkboxContainer);
            selectionContainer.appendChild(selection);

        }
        var selectionFooter = document.createElement("div");
        selectionFooter.classList.add("selectionFooter");
        var buttonContainer = document.createElement("span");
        buttonContainer.classList.add("buttonContainer");


        //Confirm and Cancel
        // var selectionConfirm = document.createElement("button");
        // selectionConfirm.innerHTML = "Confirm";
        // selectionConfirm.classList.add("selectionConfirm");
        // var selectionCancel = document.createElement("button");
        // selectionCancel.innerHTML = "Cancel";
        // selectionCancel.classList.add("selectionCancel");
        // selectionCancel.addEventListener("click", this.toggleSelection.bind(this))
        // buttonContainer.appendChild(selectionConfirm);
        // buttonContainer.appendChild(selectionCancel);


        selectionFooter.appendChild(buttonContainer);
        selectionContainer.appendChild(selectionFooter);

        this.selectionContainer = selectionContainer;
        this.target.parentNode.insertBefore(this.selectionContainer, this.target.nextSibling);
        this.target.parentNode.insertBefore(this.select, this.target.nextSibling);

        this.updateSelection();
    }

    this.toggleSelection = function(e){
        e.stopPropagation();
        this.selectionContainer.classList.toggle("hide");
    }
    this.selectionOnClick = function(e){
        e.stopPropagation();
    }
    this.hideSelection = function(){
        this.selectionContainer.classList.add("hide");
    }

    this.getSelectedValue = function(){
        var selectedValue = [];
        var options =  this.target.selectedOptions ? this.target.selectedOptions : [];

        for(var i = 0; i < options.length; i++){
            selectedValue.push(options[i].value);
        }
        return selectedValue;
    }
    this.getSelectedText = function(){
        var selectedText = []
        var options =  this.target.selectedOptions ? this.target.selectedOptions : [];

        for(var i = 0; i< options.length; i++){
            selectedText.push(options[i].text);
        }
        return selectedText;
    }
    this.getSelectedOptions = function(){
        return this.target.selectedOptions;
    }

    this.getOptions = function(){
        var retOptions = [];
        for(var i = 0; i < this.target.options.length; i++){
            retOptions.push(this.target.options[i]);
        }       
        return retOptions;
    }
    this.updateSelect = function(){
        //update selected option
        this.select.innerHTML = "";
        this.selectedOptions = [];
        var selections = this.selectionContainer.getElementsByClassName("selection");
        for(var i=0; i< selections.length; i++){
            var selectionText = selections[i].getElementsByClassName("selectionText")[0];
            var checkboxContainer = selections[i].getElementsByClassName("checkboxContainer")[0];
            var checkBox = checkboxContainer.getElementsByTagName("input")[0];
            if(checkBox.checked){
                this.select.appendChild(this.createSelectedItem(selectionText.innerHTML));
            }
        }
    }
    this.updateSelection = function(){
        var selections = this.selectionContainer.getElementsByClassName("selection");
        //var selectedOptions = this.selectedOptions ? this.selectedOptions : [];
        var selectedText = this.selectedText ? this.selectedText :[];

        for(var i=0; i< selections.length; i++){
            var selectionText = selections[i].getElementsByClassName("selectionText")[0];
            var checkboxContainer = selections[i].getElementsByClassName("checkboxContainer")[0];
            var checkBox = checkboxContainer.getElementsByTagName("input")[0];
            if(selectedText.includes(selectionText.innerHTML)){
                checkBox.checked = true;
            }
        }

        
    }
    this.createSelectedItem = function(text){
        var span = document.createElement("span");
        span.innerHTML = text;
        span.classList.add("selectedItem");
        return span;
    }
    this.updateTargetFromSelection = function(){

        var selections = this.selectionContainer.getElementsByClassName("selection");
        var selectedOptions = [];
        var selectedText = [];
        var selectedValue = [];
        //clear options
        this.target.innerHTML = "";
        for(var i=0; i< selections.length; i++){
            var selectionText = selections[i].getElementsByClassName("selectionText")[0];
            //var selectionCheck = selections[i].getElementsByClassName("selectionCheck")[0];
            var checkboxContainer = selections[i].getElementsByClassName("checkboxContainer")[0];
            var checkBox = checkboxContainer.getElementsByTagName("input")[0];
            var selectionValue = selections[i].getAttribute("data-selection-value");
            var option = this.findOptionByValue(selectionValue);

            if(checkBox.checked){
                option.selected = true;
                this.target.appendChild(option);
                selectedOptions.push(option);
                selectedText.push(option.innerHTML);
                selectedValue.push(option.value);
            } else {
                option.selected = false;
                this.target.appendChild(option);
            }
        }
        
        //update selected options text and value
        this.selectedOptions = selectedOptions;
        this.selectedText = selectedText;
        this.selectedValue = selectedValue;
    }
    this.findOptionByValue = function(input){
        for(var i = 0; i < this.options.length; i++){
            if(this.options[i].value == input){
                return this.options[i];
            }
        }
    }
    this.selectionOnChange = function(){
        this.updateTargetFromSelection();
        this.updateSelect();
    }
    this.init();
}