/*Question 3: Write a function that converts HEX to RGB.
Then Make that function auto-dect the formats so that if you enter HEX color format
it returns RGB and if you enter RGB color format it returns HEX.*/

//RGB and HEX will both be input as Strings
//Follow this format:
//HEX: #XXXXXX with X ranging from 0-F.
//RGB: XXX,XXX,XXX with XXX ranging from 0-255.

//Constants
const HEX_ARGS= ["#", "0", "1", "2", "3", "4", "5", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const HEX = "HEX";
const RGB = "RGB";
const NA = "NA";

//Array and character functions

const breakdownIntoChars = (array) => {
	inputChars = [];
	for (let i = 0; i < array.length; i++){
		inputChars.push(array.charAt(i));
	}
	return inputChars;
}

const capitalizeLetters = (array) => {
	for (let i = 0; i < array.length; i++){
		if (typeof array[i] === "string"){
			array[i] = array[i].toUpperCase();
		}
	}
	return array;
}

//Identify Type

const identifyType = (input) => {
	let inputChars = capitalizeLetters(breakdownIntoChars(input));
	if (isHEX(inputChars)){
		return HEX;
	}
	else if(isRGB(inputChars)){
		return RGB;
	}
	return "Not a valid type";
}

//Booleans
//HEX
const isHEX = (array) => {
	let validity = true;
	for (let i = 0; i < array.length; i++){
		if (array.length === 7 && array[0] === "#" && HEX_ARGS.includes(array[i])){
			validity = true;
		}
		else{
			return false;
		}
	}
	return validity;
}

//RGB
const isRGB = (array) => {
	array = array.join("");
	array = array.split(",");
	for (let i = 0; i < array.length; i++){
		array[i] = parseInt(array[i]);
	}
	if (validRGBValue(array[0]) && validRGBValue(array[1]) && validRGBValue(array[2])){
		return true;
	}
	else{
		return false;
	}
}

const validRGBValue = (int) => {
	if (int < 256 && int >-1){
		return true;
	}
	return false;
}

//Conversion
const convert = (type, value) => {
	let convertedVal;
	switch(type){
		case HEX:
			convertedVal = convertHEXtoRGB(value);
			break;
		case RGB:
		    convertedVal = convertRGBtoHEX(value);
		    break;
	}
	if (value === NA){
		return "Incorrect format. Try inputting something like this: 0,123,255 or #FAC023";
	}
	else{
		return convertedVal;
	}
}

const convertHEXtoRGB = (h) =>{
	h = convLetters(h);
	let hexValue = [[], [], []];
	for (let i = 0; i < 3; i++){
		let ticker = 2*(i+1);
		for (let j = ticker-1; j < ticker+1; j++){
			hexValue[i].push(parseInt(h[j]));
		}
	}
	let rgb = [];
	let rbgValue = 0;
	for (let i = 0; i < 3; i++){
		rgbValue = hexValue[i][1] + hexValue[i][0]*16;
		rgb[i] = rgbValue;
	}
	rgb = rgb[0] + "," + rgb[1] + "," + rgb[2]; 
	return rgb;
}

const convLetters = (array) => {
	for (let i = 0; i < array.length; i++){
		switch(array[i]){
			case "A":
				array[i] = "10";
				break;
			case "B":
				array[i] = "11";
				break;
			case "C":
				array[i] = "12";
				break;
			case "D":
				array[i] = "13";
				break;
			case "E":
				array[i] = "14";
				break;
			case "F":
				array[i] = "15";
				break;
			case 10:
				array[i] = "A";
				break;
			case 11:
				array[i] = "B";
				break;
			case 12:
				array[i] = "C"
				break;
			case 13:
				array[i] = "D";
				break;
			case 14:
				array[i] = "E";
				break;
			case 15:
				array[i] = "F"
				break;
		}
	}
	return array;
}

const convertRGBtoHEX = (r) =>{
	r = r.join("");
	r = r.split(",");
	for (let i = 0; i < r.length; i++){
		r[i] = parseInt(r[i]);
	}
	let hexValue = [[], [], []];
	for (let i = 0; i < 3; i++){
		hexValue[i][0] = parseInt(r[i]/16);
		hexValue[i][1] = ( (r[i]/16)-parseInt(r[i]/16) ) *16;
		hexValue[i] = convLetters(hexValue[i]);
	}
	hex = "#" + hexValue.flat().join("");
	return hex;
}

//Main
//Variables
let invalidInput = true;
do{
	let value = prompt("Enter your color code of the type RGB: XXX,XXX,XXX; or of the type HEX: #XXXXXX: ");
	let type = identifyType(value);
	let convertedValue = convert(type, capitalizeLetters(breakdownIntoChars(value)));
	prompt(convertedValue);
	console.log(convertedValue);
	if(!(convertedValue === "Incorrect format. Try inputting something like this: 0,123,255 or #FAC023")){
		invalidInput = false;
	}
}while(invalidInput);