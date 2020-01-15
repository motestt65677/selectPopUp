# Select Pop Up - select but with pop up check box


Vanilla JavaScript replacement for `<select>` make use of check box to select multiple items. 


## How it works

Reads original `<select>` and hide it. Create a `<div>` that holds all the selected value along with a pop up screen that will toggle when the `div` is clicked on. The pop up screen includes all the selections and checkbox that indicates which options are being selected. 

It updates the original `<select>`, so when you submit your form the value will be there.


<!-- ## Methods

| Method    | Description                               |
| --------- | ----------------------------------------- |
| .toggle() | Opens the select if closed and vice-versa |
| .close()  | Closes the select                         |
| .open()   | Opens the select                          | -->

## Usage example
Javascript
```javascript
    var el     = document.querySelector('#mainSelect');
    var select = new SelectPopUP(el, {title:"Main Select"});
```
## To get the value of select
Either use jquery or an built-in function supported when you initiate a SelectPopUp.

#### Jquery

```javascript
$("#mainSelect").val();
```
or
#### Javascript

```javascript
    var el     = document.querySelector('#mainSelect');
    var select = new SelectPopUP(el, {title:"Main Select"});
    select.getSelectedValue();
```
## License

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

See [Unlicense](http://unlicense.org) for full details.

