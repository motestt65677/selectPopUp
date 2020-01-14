var SelectPopUP = function(target, settings){
    this.target      = null;
    this.selectedValue = [];
    this.selections = [];
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
        
        this.selectedValue = this.getSelectedValue();
        this.selections = this.getSelections();

		this.settings = this.getSettings(settings);
        this.buildSelect();

        // this.target.
		//this.target.parentNode.replaceChild(this.select, this.target);
		//this.target.style.display = 'none';
		//this.select.appendChild(this.target);

		//document.addEventListener('click', this.handleClickOff.bind(this));
		//this.positionList();
    };
    this.getSettings = function(settings) {
		var defaults = {
			filtered: 'auto',
			filter_threshold: 8,
			filter_placeholder: 'Filter options...'
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
        for(var i = 0; i< this.selectedValue.length; i++){
            select.appendChild(this.createSelectedItem(this.selectedValue[i]));
        }
        this.select = select;
        this.select.addEventListener("click", this.showSelection.bind(this));

        //create selectionList
        var selectionContainer = document.createElement('span');
        var selectionTitle = document.createElement("div");
        selectionTitle.innerHTML = "Title";
        selectionTitle.classList.add("selectionTitle");
        selectionContainer.appendChild(selectionTitle);

        selectionContainer.classList.add("selectionContainer");
        selectionContainer.classList.add("hide");
        for(var i = 0; i< this.selections.length; i++){
            var selection = document.createElement('div');
            var selectionText = document.createElement("span");
            var selectionCheck = document.createElement("input");
            selectionText.innerHTML = this.selections[i];
            selectionText.classList.add("selectionText");

            selectionCheck.setAttribute("type", "checkbox");
            selectionCheck.classList.add("selectionCheck");
            selectionCheck.addEventListener("change", this.updateSelect.bind(this))
            selection.classList.add("selection");
            selection.appendChild(selectionText);
            selection.appendChild(selectionCheck);
            selectionContainer.appendChild(selection);

        }
        var selectionFooter = document.createElement("div");
        selectionFooter.classList.add("selectionFooter");
        var buttonContainer = document.createElement("span");
        buttonContainer.classList.add("buttonContainer");


        var selectionConfirm = document.createElement("button");
        selectionConfirm.innerHTML = "Confirm";
        selectionConfirm.classList.add("selectionConfirm");
        var selectionCancel = document.createElement("button");
        selectionCancel.innerHTML = "Cancel";
        selectionCancel.classList.add("selectionCancel");

        buttonContainer.appendChild(selectionConfirm);
        buttonContainer.appendChild(selectionCancel);
        selectionFooter.appendChild(buttonContainer);
        selectionContainer.appendChild(selectionFooter);

        this.selectionContainer = selectionContainer;
        this.target.parentNode.appendChild(this.selectionContainer);
        this.target.parentNode.appendChild(this.select);


		// this.select.classList.add('select');
		// this.select.setAttribute('tabindex', this.target.tabIndex);
		// this.select.addEventListener('keydown', this.handleSelectKeydown.bind(this));

		// this.display = document.createElement('span');
		// this.display.classList.add('value');
		// this.display.addEventListener('click', this.handleDisplayClick.bind(this));
		// this.select.appendChild(this.display);

		// this.buildList();

		// if(this.options.length) {
		// 	this.value = this.options[this.target.selectedIndex].getAttribute('data-value');
		// 	this.selected = this.options[this.target.selectedIndex];
		// 	this.display.innerHTML = this.selected.innerHTML;
		// }

		// if(
		// 	(this.settings.filtered === 'auto' && this.options.length >= this.settings.filter_threshold) ||
		// 	this.settings.filtered === true
		// ) {
		// 	this.isLarge = true;
		// 	this.select.classList.add('large');
		// }
    }
    // this.buildList = function() {
	// 	this.list = document.createElement('div');
	// 	this.list.classList.add('list');
	// 	this.list.setAttribute('tabindex', '-1');
	// 	// this.list.addEventListener('keydown', this.handleListKeydown.bind(this));
	// 	// this.list.addEventListener('mouseenter', function() {
	// 	// 	this.options[this.highlighted].classList.remove('hovered');
	// 	// }.bind(this));

	// 	this.highlighted = this.target.selectedIndex;

	// 	//this.buildFilter();
	// 	this.buildOptions();

	// 	this.select.appendChild(this.list);
    // };
    // this.buildOptions = function() {
	// 	var ul = document.createElement('ul');

	// 	var options = this.target.querySelectorAll('option');

	// 	for(var i = 0; i < options.length; i++) {
	// 		var li = document.createElement('li');
	// 		    li.setAttribute('data-value', options[i].value);
	// 		    li.innerHTML = options[i].innerHTML;
	// 		    li.addEventListener('click', this.handleOptionClick.bind(this));

	// 		ul.appendChild(li);
	// 		this.options.push(li);
	// 	}

	// 	this.list.appendChild(ul);
    // };
    this.showSelection = function(){
        this.selectionContainer.classList.toggle("hide");
    }
    this.create
    this.getSelectedValue = function(){
        var selectedValue = [];
        var options =  this.target.children;
        for(var i = 0; i < options.length; i++){
            if(options[i].getAttribute("selected")){
                selectedValue.push(options[i].value);
            }
        }
        return selectedValue;
    }
    this.getSelections = function(){
        var selections = [];
        var options =  this.target.children;
        for(var i = 0; i < options.length; i++){
            selections.push(options[i].value);
        }       
        return selections;
    }
    this.updateSelect = function(){
        this.select.innerHTML = "";
        this.selectedValue = [];
        var selections = this.selectionContainer.getElementsByClassName("selection");
        for(var i=0; i< selections.length; i++){
            var selectionText = selections[i].getElementsByClassName("selectionText")[0];
            var selectionCheck = selections[i].getElementsByClassName("selectionCheck")[0];
            if(selectionCheck.checked){
                this.select.appendChild(this.createSelectedItem(selectionText.innerHTML));
                this.selectedValue.push(selectionText.innerHTML)
            }
        }
    }
    this.updateSelection
    this.createSelectedItem = function(text){
        var span = document.createElement("span");
        span.innerHTML = text;
        span.classList.add("selectedItem");
        return span;
    }
    this.init();
}