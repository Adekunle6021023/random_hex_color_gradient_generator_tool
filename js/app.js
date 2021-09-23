/** Color/Gradient Selectors */

let dropDown = document.querySelector('.color_gradient_selector')
let optionColor = document.querySelector('.option_color');
let optionGradient = document.querySelector('.option_gradient');
let buttons = document.querySelectorAll('button');
let modal = document.querySelector('.modal');
let currentColor = document.querySelector('.current');
let mainArea = document.querySelector('.main');

/**HEADER TEMPLATES */

//Gradient Template(Changes the header features to suit gradient option)

let headerColorOptionTemplate = `
<div class="current_color current_color_one">
                    <div class="color_box color_box_one"></div>
                    <div class="color_name color_name_one">White</div>
                </div>`;

let headerGradientOptionTemplate = `
    <div class="current_color current_color_one">
        <div class="color_box color_box_one"></div>
        <div class="color_name color_name_one"></div>
    </div>
    <div class="arrow">
        <img src="svg/long-arrow-alt-right.svg" alt="arrow_right">
    </div>
    <div class="current_color curent_color_two">
        <div class="color_box color_box_two"></div>
        <div class="color_name color_name_two"></div>
    </div>
    <div class='copy_css'>
        <img src="svg/code.svg" alt="copy_css">
    </div>
`;

/**PAGE INIT FUNCTION(For Selecting options in the modal)**/
buttons.forEach(item => {
    //Add event listener to each button
    item.addEventListener('click', () => {
        //Check if it contains the specified class
        if (item.classList.contains('option_color')) {
            //Remove modal
            modal.remove();
            //Dynamically select option from dropdown
            dropDown.value = 'option_color';
            //Change current state tab to fit option in dropdown
            currentColor.innerHTML = headerColorOptionTemplate;
        } else if (item.classList.contains('option_gradient')) {
            //Remove modal
            modal.remove();
            //Dynamically select option from dropdown
            dropDown.value = 'option_gradient';
            //Change current state tab to fit option in dropdown
            currentColor.innerHTML = headerGradientOptionTemplate;
        }
    })
})

//MAIN EVENT
mainArea.addEventListener('click', () => {

    //Main Randomizer Logic(Hex Color Logic)
    let hexArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

    function colorGen() {
        let hexCode = '#';
        for (let i = 0; i < 6; i++) {
            let randomChar = Math.floor(Math.random() * hexArray.length)
            hexCode += hexArray[randomChar]
        }
        return hexCode
    }

    // Other Randomizer Logic

    let hexCode1 = colorGen();
    let hexCode2 = colorGen()
    let gradientDirection = Math.floor(Math.random() * 360);
    let radialGradientDirection1 = Math.floor(Math.random() * 100);
    let radialGradientDirection2 = Math.floor(Math.random() * 100);
    let radialGradient = `radial-gradient(at ${radialGradientDirection1}px ${radialGradientDirection2}%, ${hexCode1}, ${hexCode2})`;
    let linearGradient = `linear-gradient(${gradientDirection}deg, ${hexCode1}, ${hexCode2})`;
    let gradientArray = [linearGradient, radialGradient];
    let randomGradientType = gradientArray[Math.floor(Math.random() * gradientArray.length)];

    //Check for selected option and perform associated functionalities
    let colorName1 = document.querySelector('.color_name_one');
    let colorBox1 = document.querySelector('.color_box_one');
    let colorName2 = document.querySelector('.color_name_two');
    let colorBox2 = document.querySelector('.color_box_two');
    if (dropDown.value == 'option_color') {
        //Change background color
        mainArea.style.backgroundColor = hexCode1;
        //Change text in current_color area
        colorName1.textContent = hexCode1;
        //Change background color of color box in current_color area
        colorBox1.style.backgroundColor = hexCode1;
    } else if (dropDown.value == 'option_gradient') {
        //Change background image to gradient
        mainArea.style.background = randomGradientType;
        //Change text in current_color area
        colorName1.textContent = hexCode1;
        colorName2.textContent = hexCode2;
        //Change background color of color box in current_color area
        colorBox1.style.backgroundColor = hexCode1;
        colorBox2.style.backgroundColor = hexCode2;

        /**TO COPY THE CSS */

        let copyButton = document.querySelector('.copy_css');;
        //COPY_CSS MODAL TEMPLATE

        let cssModalTemplate = `
    <div class="modal css_modal">
        <div class='title'>CSS:</div>
        <code>background: ${randomGradientType};</code>
    </div>`;
        let cssModal = document.querySelector('.css_modal');


        //Add Event listener to add insert modal into DOM

        copyButton.addEventListener('click', () => {
            //Insert modal into DOM
            mainArea.innerHTML = cssModalTemplate;
            //Add a tracker to the mainArea
            mainArea.classList.add('is_present');

        })

        //To remove css_copy modal if in the DOM
        mainArea.addEventListener('click', () => {
            //Check if css_copy modal is in the DOM
            if (mainArea.classList.contains('is_present') && dropDown.value == 'option_gradient') {
                //Remove css_copy modal
                mainArea.innerHTML = '';
                //remove tracker from mainArea
                mainArea.classList.remove('is_present');
            }
        });
    }

    /**DROPDOWN OPTION SWITCH(when options are manually selected) */
    dropDown.addEventListener('change', () => {
        if (dropDown.value == 'option_color') {
            //Set innerHtml property to empty string to get rid of previos state
            currentColor.innerHTML = '';
            //Set to selected template
            currentColor.innerHTML = headerColorOptionTemplate;
            //Remove background property(case-specific use)
            mainArea.style.removeProperty('background');
        } else if (dropDown.value == 'option_gradient') {
            //Set innerHtml property to empty string to get rid of previos state
            currentColor.innerHTML = '';
            //Set to selected template
            currentColor.innerHTML = headerGradientOptionTemplate;
            //Set mainArea background(general use-case)
            mainArea.style.background = randomGradientType;
        }
    })

})