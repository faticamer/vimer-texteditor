const textContainer = document.querySelector(".notepad-area");
const tools = document.querySelector(".button-dark-mode");
const fileButton = document.getElementById("file-button");
const fileInput = document.getElementById("file-input");
const clearButton = document.querySelector(".clear-btn");
const colorPickerButton = document.getElementById("color-picker-button");
const colorPicker = document.getElementById("color-picker");
let timeoutId;
let initialLineHeightValue = 1.1;
const fontColorData = {
    isColoredForAllSpans : false,
    rgbValue : ""
};
let finalFont = '';

/*Commit test*/

// Close the dropdown menu for line-spacing if the user clicks outside of it
window.onclick = function(event) {  
    if(!event.target.matches('.dropbtn')) {
        var dropdown = document.getElementById('lineSpacingDropdown');
        if(dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}

window.addEventListener('scroll', function() {
    // Select all elements with class 'card'
    const cards = this.document.querySelectorAll(".card");

    // Clear previous timers
    this.clearTimeout(timeoutId);

    // Apply no-transition class to all cards
    cards.forEach(card => {
        card.classList.add("no-transition");
    })    

    // When scrolling stops, remove all no-transition classes
    timeoutId = setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove("no-transition");
        })
    }, 350);
});

tools.addEventListener("click", function () {    
    textContainer.focus();
})

fileButton.addEventListener("click", () => {
    fileInput.click();
})

fileInput.addEventListener("change", async () => {
    const [file] = fileInput.files;
    
    if(file) {
        textContainer.innerText = await file.text();
    }
})

textContainer.addEventListener("input", function () {
    const charField = document.querySelector(".character-count p:nth-child(2)");
    const text = textContainer.textContent;
    const textWithoutWhitespace = text.replace(/\s/g, '');
    const characterCount = textWithoutWhitespace.length;

    // Update the <p> element's content with the character count
    charField.textContent = `Char count: ${characterCount}`;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {        
        wrapNewText();
        placeCursorAtEnd(); // Place the cursor at the end of the text after the delay
        clearEmptySpans();  // If there are any empty spans this function call will handle them.
    }, 1000);
});

textContainer.addEventListener('click', function(event) {
    if(event.target.tagName === 'A') {
        event.preventDefault();

        // Get the href attribute of the clicked link
        const href = event.target.getAttribute('href');

        window.open(href, "_blank");
    }
})

clearButton.addEventListener("mouseover", function() {
    const svg = document.querySelector(".clear-btn svg");

    if(clearButton.classList.contains("clear-btn-light")) {        
        clearButton.classList.add("clear-btn-hover-light");
        svg.classList.add("clear-btn-svg-light");
    } else {        
        clearButton.classList.add("clear-btn-hover");
        svg.classList.add("clear-btn-svg");
    }
});

clearButton.addEventListener("mouseout", function() {
    const svg = document.querySelector(".clear-btn svg");

    if(clearButton.classList.contains("clear-btn-light")) {        
        clearButton.classList.remove("clear-btn-hover-light");
        svg.classList.remove("clear-btn-svg-light");
    } else {        
        clearButton.classList.remove("clear-btn-hover");
        svg.classList.remove("clear-btn-svg");
    }
})

clearButton.addEventListener("click", function() {
    textContainer.textContent = "";
});

colorPickerButton.addEventListener("click", function() {    
    colorPicker.click();    
})

colorPicker.addEventListener("input", changeFontColor, "false");

// Function that handles light/night mode mode
function toggleLightMode () {
    let isNightMode = false;

    // Define properties for svg that will be inserted when light mode is toggled
    const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newSvg.setAttribute('class', 'lightmode-button-svg');
    newSvg.setAttribute('height', '1em');
    newSvg.setAttribute('viewBox', '0 0 384 512');
    newSvg.innerHTML = '<path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4.0-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4.0 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/>';    

    const nightmodeSvg = document.querySelector(".nightmode-button-svg");
    const toggleLightButton = document.querySelector(".nightmode-button");    
    const buttons = document.querySelectorAll(".button-row button");
    const navHeader = document.querySelector(".nav-header");
    const navh2 = document.querySelector(".nav-h2");
    const time = document.querySelector(".time");
    const navLinks = document.querySelectorAll(".nav-links-a");
    const logo = document.querySelector(".logo img");
    const cards = document.querySelectorAll(".card");
    const cardHeader = document.querySelector(".card-h1");
    const sectionTwoContent = document.querySelector(".section-two-content");
    const sectionTwoParagraph = document.querySelector(".section-two-paragraph");
    const characterCount = document.querySelector(".character-count");    
    const svgDarkElements = document.querySelectorAll(".svg-dark");    
    const vimerDark = document.querySelector(".vimer");
    const sectionTwoH2 = document.querySelector(".section-two-h2"); 
    const sectionTwoH1 = document.querySelector(".section-two-h1"); 
    const spanh2 = document.querySelector(".span-h2");
    const checkVimerButton = document.querySelector(".check-vimer-button");
    const gitButtonText = document.querySelector(".git-button-text");
    const cardsH2 = document.querySelectorAll(".card-h2");
    const cardsSvg = document.querySelectorAll(".card-svg");
    const authorNamePrefix = document.querySelectorAll(".author-name-prefix");
    const halfCircles = document.querySelectorAll(".half-circle");
    const goUpBtn = document.querySelectorAll(".go-up-button");
    const vimerDarkArea = document.querySelector(".main-container-2-img");
    const body = document.body;

    toggleLightButton.addEventListener("click", () => {
        isNightMode = !isNightMode;

        if(isNightMode) {
            nightmodeSvg.replaceWith(newSvg);
            logo.setAttribute('src', './public/images/vimer-light.png');
            vimerDarkArea.setAttribute('src', './public/images/vimer-light-mode.png');
        } else {
            newSvg.replaceWith(nightmodeSvg);
            logo.setAttribute('src', './public/images/vimer2.png');
            vimerDarkArea.setAttribute('src', './public/images/vimer-dark.png');
        }

        // Toggle the necessary classes that simulate the light mode
        body.classList.toggle("active");
        textContainer.classList.toggle("light-mode");
        navHeader.classList.toggle("nav-header-light");
        navh2.classList.toggle("nav-h2-light");
        time.classList.toggle("time-light");
        toggleLightButton.classList.toggle("lightmode-button");  
        cardHeader.classList.toggle("card-h1-light");
        sectionTwoContent.classList.toggle("section-two-content-light");
        sectionTwoParagraph.classList.toggle("section-two-paragraph-light");
        characterCount.classList.toggle("character-count-light");
        clearButton.classList.toggle("clear-btn-light");
        vimerDark.classList.toggle("vimer-light");
        sectionTwoH2.classList.toggle("section-two-h2-light");
        sectionTwoH1.classList.toggle("section-two-h1-light");
        spanh2.classList.toggle("span-h2-light");
        checkVimerButton.classList.toggle("check-vimer-button-light");
        gitButtonText.classList.toggle("git-button-text-light");  
        vimerDarkArea.classList.toggle("main-container-2-img-light");    


        cards.forEach(card => {
            card.classList.toggle("card-light");
        });
        buttons.forEach(button => {
            button.classList.toggle("button-light-mode");
        });
        navLinks.forEach(navLink => {
            navLink.classList.toggle("nav-links-a-light");
        });
        svgDarkElements.forEach(svgDarkElement => {
            svgDarkElement.classList.toggle("svg-light");
        });
        cardsH2.forEach(card => {
            card.classList.toggle("card-h2-light");
        });
        cardsSvg.forEach(card => {
            card.classList.toggle("card-svg-light");
        });
        authorNamePrefix.forEach(author => {
            author.classList.toggle("author-name-prefix-light");
        });
        halfCircles.forEach(halfCircle => {
            halfCircle.classList.toggle("half-circle-light");
        });
        goUpBtn.forEach(btn => {
            btn.classList.toggle("go-up-button-light");
        })
    });
};

// Function that toggles the tooltip menu
function toggleTooltips () {

    // Obtain all tooltips buttons
    const toggleButton = document.querySelector(".toggle-tooltips");
    const leftTooltips = document.querySelectorAll(".tooltip-container-button");
    const rightTooltips = document.querySelectorAll(".tooltip-container-button-last");

    // Apply / Remove class for each button in sequence depending on the current mode
    toggleButton.addEventListener("click", () => {        
        leftTooltips.forEach(tooltip => {
            if(tooltip.classList.contains("tooltip-container-button"))
                tooltip.classList.remove("tooltip-container-button")
            else
                tooltip.classList.add("tooltip-container-button")
            tooltip.classList.toggle("disable");                       
        })

        rightTooltips.forEach(tooltip => {
            if(tooltip.classList.contains("tooltip-container-button-last"))
                tooltip.classList.remove("tooltip-container-button-last");
            else
                tooltip.classList.add("tooltip-container-button-last");
            tooltip.classList.toggle("disable");
        });
    });
};

// Function that handles the scroll-to-top button behavior
function scrollToTop () {
    const arrowUpButtons = document.querySelectorAll(".go-up-button");

    arrowUpButtons.forEach(arrowUpButton => {
        arrowUpButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
};

function selectFontStyle() {
    const note = "NOTE: Generic Font-family set to sans-serif";
    const query = "\n\nSpecify Font-family, make sure the family exists:";
    const defaultFont = "Poppins, sans-serif";

    const selection = window.getSelection();    
    if(selection.toString().trim('') !== '') {
        alert("Font Family cannot be applied to phrases/single words, only on the whole text.");
        return;
    } else {
        const inputFont = prompt(note + query);
        if(inputFont === null) {
            textContainer.style.fontFamily = defaultFont;
        } else {
            finalFont = inputFont + ", sans-serif";            
            // There will be no checks done for the input
            textContainer.style.fontFamily = finalFont;
            const spanElements = textContainer.querySelectorAll('span')
            spanElements.forEach(spanElement => {
                spanElement.style.fontFamily = finalFont;
            })
        }
    }
}

function changeFontColor(event) {
    /**
     * Check if any text is selected, if not apply color change to the whole text
     */

    // Does not work when more than one word is selected
    const selection = window.getSelection();    
    const range = selection.getRangeAt(0);
    if(
        range.startContainer === range.endContainer &&
        range.startOffset < range.endOffset &&
        range.startContainer.nodeType === Node.TEXT_NODE
    ) {
        // Condition satisfied - User selected a single word
        const spanElement = range.startContainer.parentNode;

        // Apply font color if no font color is present
        spanElement.style.color = event.target.value;
    }

    // Condition that checks if more than one word has been selected
    // Also covers the case where whole text is selected
    if(selection.toString().split(/\s+/).length > 1) {        
        // Clone the content within the range
        const clonedContent = range.cloneContents();

        // Create a temporary div to manipulate cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');

        // Apply the color to each span
        spanElements.forEach(spanElement => {
            spanElement.style.color = event.target.value;
        })
        
        // Set the object's value so wrapNewText() method can track the changes
        fontColorData.isColoredForAllSpans = true;
        fontColorData.rgbValue = event.target.value;

        range.deleteContents();
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // Clear any empty spans

    } 

    // Focus on container
    textContainer.focus();

    // Place the cursor at the end of the selection
    placeCursor();
}

function increaseFontSize () {
    /* Get an object containing all values of CSS properties of some element - editing area
     in this particular case */
    const computedStyle = window.getComputedStyle(textContainer);
    
    // Define maximum size
    let maximumSize = 48;
    
    // Obtain default font-size
    const defaultFontSize = computedStyle.getPropertyValue('font-size');    

    // Assign the starting value to the variable and start incrementing from there    
    let incrementedValue = parseFloat(defaultFontSize);
    incrementedValue += 2;

    // Assign newly created value to a variable and append 'px'
    let newSize = incrementedValue + 'px';
    
    // Condition for maximum size - 48px is the maximum
    if(incrementedValue <= maximumSize) {
        textContainer.style.fontSize = newSize;
    } else {
        alert("Maximum size reached.");
        return;
    }

    // Focus on container
    textContainer.focus();
}

function decreaseFontSize () {
    /* Get an object containing all values of CSS properties of some element - editing area
     in this particular case */
    const computedStyle = window.getComputedStyle(textContainer);

    // Define minimum size
    let minimumSize = 6;

    // Obtain default font-size
    const defaultFontSize = computedStyle.getPropertyValue('font-size');

    // Assign the starting value to the variable and start incrementing from there
    let decrementedValue = parseFloat(defaultFontSize);
    decrementedValue -= 2;

    // Assign newly created value to a variable and append 'px'
    let newSize = decrementedValue + 'px';

    // Condition for minimum size - 4px
    if(decrementedValue >= minimumSize) {
        textContainer.style.fontSize = newSize;
    } else {
        alert("Minimum size reached.");
        return;
    }
    // Focus on container
    textContainer.focus();
}

// Functions that handle text-decoration - Bold, Italic, Underline
function applyBold () {
    checkAndApplySelectionBoldV2();    
}

function applyItalic () {
    checkAndApplySelectionItalicV2();
}

function applyUnderline () {
    checkAndApplySelectionUnderlineV2();
}

function capitalizeWord () {
    checkAndApplySelectionCapitalizeV2();
}

// This function will only toggle the dropdown menu
function setLineSpacing() {    
    var dropdown = document.getElementById("lineSpacingDropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

// This function is closely related to the function above. When the dropdown menu appears,
// anchor tags within it are responsible for handling the values, this function picks up the value
// and sets the line-height property on the textContainer's text.
function setLineHeight(value) {
    textContainer.style.lineHeight = value;
}

// Functions that control the alignment of a text within textContainer
function alignLeft () {    
    textContainer.style.textAlign = 'left';

    // Focus on container
    textContainer.focus();
}

function alignRight () {    
    textContainer.style.textAlign = 'right';

    // Focus on container
    textContainer.focus();
}

function alignCenter () {    
    textContainer.style.textAlign = 'center';

    // Focus on container
    textContainer.focus();
}

function alignJustify () {    
    textContainer.style.textAlign = 'justify';

    // Focus on container
    textContainer.focus();
}

function addHyperlink() {
    // Obtain user-selected text
    const selectedText = window.getSelection();     
    
    // Defined regexPattern variable to ensure user included some of the necessary components of every URL.
    const regexPattern = /^(http|https|www|com)/;

    if(selectedText.rangeCount > 0) {
        const range = selectedText.getRangeAt(0);

        // Checks multiple selection, but not single word
        const clonedContents = range.cloneContents();
        var isPresent = false; // Used to determine whether the block below will be executed or not        

        // Creating a temporary div to test all selected spans and look for anchor tags
        // This block will cover the removal of anchor tags
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContents);        
        const spans = tempDiv.querySelectorAll('span');
        spans.forEach(span => {            
            const spanAnchorTag = span.querySelector('a');
            if(spanAnchorTag) {  
                isPresent = true;            
                // Anchor tag found within the span
                // Replace the anchor tag with its text content
                const text = document.createTextNode(spanAnchorTag.textContent);
                span.replaceChild(text, spanAnchorTag);             
            }
        })
        
        // If the condition above was satisfied (meaning anchor tag was found)
        // it switched the boolean var to true, therefore code below is executed
        if(isPresent) {
            range.deleteContents();
            insertChildren(tempDiv, range); // Insert the temporary div instead previous content
            clearEmptyAnchors(); // Call the function to remove any blank anchor tags
            placeCursor();  // Place the cursor at the end of the selection
            return;
        }

        // Check the single word case now
        if(
            range.startContainer === range.endContainer &&          // Start and end containers are the same
            range.startOffset < range.endOffset &&                  // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE &&     // Start container is a text node
            range.startContainer.parentNode.nodeName.toLowerCase() === 'a'
        ) {            
            const anchor = range.startContainer.parentNode;
            const span = anchor.parentElement;                     
            if(anchor) {
                const text = document.createTextNode(anchor.textContent); // Extracted text from <a>                
                span.replaceChild(text, anchor);
                clearEmptyAnchors(); // Call the function to remove any blank anchor tags
                placeCursor();  // Place the cursor at the end of the selection
                return;
            }
        }

        const URL = prompt("Enter a valid URL: ");
        if(URL === null) {
            alert("Prompt was canceled.");
            placeCursor();
            return;
        } else if(URL.trim() === '') {
            alert("You have to provide a valid URL. Try again.");
            placeCursor();
            return;
        }
        // Convert to lowercase if user decided to type in UPPERCASE
        let newURL = URL.toLowerCase();

        // Testing the regexPattern against user-prompted URL
        if(regexPattern.test(newURL)) {
            if (
                range.startContainer === range.endContainer &&   // Start and end containers are the same
                range.startOffset < range.endOffset &&           // Start offset is before the end offset
                range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
            ) {
                /**
                 * IF THERE IS ANCHOR TAG ALREADY, REMOVE WITH SPAN
                 */
                // Clone the contents within the range                
                const clonedContent = range.cloneContents();                
                let extractedContent = ''; // Used to extract the text content within child nodes in a range
                                            // Reusable for multi-word selection                                          
                clonedContent.childNodes.forEach(childNode => {
                    if(childNode.nodeType === Node.TEXT_NODE) {
                        extractedContent += childNode.textContent;
                    }
                })
                // Create anchor element to handle redirection
                const link = document.createElement('a');
                link.setAttribute("class", "highlighted");          
                link.href = newURL;
                link.target = "_blank";
                link.textContent = extractedContent;
    
                range.deleteContents();
                range.insertNode(link);                
            } else {                
                // Clone the contents within the range                                          
                const clonedContent = range.cloneContents();                        

                const tempDiv = document.createElement('div');
                tempDiv.appendChild(clonedContent);                          

                // Get all the spans within temp div
                const spanElements = tempDiv.querySelectorAll('span');            
        
                spanElements.forEach(spanElement => {                    
                    let extractedText = '';
                    const generatedLink = document.createElement('a');
                    extractedText += spanElement.textContent;

                    // Generate one time anchor tag
                    generatedLink.textContent = extractedText;
                    generatedLink.href = newURL;
                    generatedLink.target = "_blank";     
                    generatedLink.classList.add('highlighted');              

                    spanElement.textContent="";                    
                    spanElement.appendChild(generatedLink);                
                })

                range.deleteContents(); // Works in pair with clearEmptySpans
                                        // Ensures that the span contents gets cleared
                insertChildren(tempDiv, range);
            }
        }
        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // Clear any empty spans
        clearEmptyAnchors(); // Clear any empty anchor tags
    }    

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on textContainer
    textContainer.focus();
}

// New functionality : Remove all pre-defined styles for pasted text
function purifyContent() {
    const range = document.createRange();    
    range.selectNodeContents(textContainer);    
    const childSpan = range.extractContents(); // This is a document fragment

    // Replace child node's content (span) with the plain text to remove predefined styling
    textContainer.textContent = childSpan.textContent;

    textContainer.focus();
}

function exportAsTxt () {    
    const range = document.createRange();
    range.selectNodeContents(textContainer);
    const fragment = range.extractContents(); // Removes content and creates Document Fragment

    var regexPattern = /[!"#$%&\/=?*,.¸~ˇ^˘°˛`˙´˝¨]+/;
    const nameOfTheFile = prompt("Enter the name of the file:");

    if(nameOfTheFile.length === 0) {
        alert("Name cannot be empty.");
        return;
    }

    if (regexPattern.test(nameOfTheFile)) {
        alert("Invalid File Name.");
        return;
    } else {
        // Retrieve the text from the textContainer        
        const text = fragment.textContent;
        // console.log(text);

        if (text) {
            // Creating a Blob object - Binary Large Object
            const blob = new Blob([text], { type : 'text/plain'});
            
            // Creating a temporary link to download the Blob
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = nameOfTheFile + ".txt";

            a.click();   
        } else {
            alert("No text entered.");
        }
    } 
    // Reset styles in the container since extractContents() removes everything within range
    textContainer.appendChild(fragment);

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionBoldV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('bolded')) {
                spanElement.classList.remove('bolded');
            } else {
                spanElement.classList.add('bolded');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();        

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');        
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('bolded');            
        });
                
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    } else 
        return;

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionItalicV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('italic')) {
                spanElement.classList.remove('italic');
            } else {
                spanElement.classList.add('italic');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();               

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');        
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('italic');            
        });
        
        // Extract into function - but first modify for single word
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    } else
        return;

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on container
    textContainer.focus();
}

function checkAndApplySelectionUnderlineV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('underlined')) {
                spanElement.classList.remove('underlined');
            } else {
                spanElement.classList.add('underlined');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();             

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');        
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('underlined');            
        });
                
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    } else 
        return;

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on container
    textContainer.focus();
}


function checkAndApplySelectionCapitalizeV2() {
    // Get user selection
    const selection = window.getSelection();

    if (selection) {
        const range = selection.getRangeAt(0);        
        if (
            range.startContainer === range.endContainer &&  // Start and end containers are the same
            range.startOffset < range.endOffset &&           // Start offset is before the end offset
            range.startContainer.nodeType === Node.TEXT_NODE // Start container is a text node
          ) {
            // User selected a single word
            const spanElement = range.startContainer.parentNode;            

            // Apply a class if there isn't one, deactivate if there is one
            if(spanElement.classList.contains('word-capitalize')) {
                spanElement.classList.remove('word-capitalize');
            } else {
                spanElement.classList.add('word-capitalize');
            }
          }
  
        // Clone the content within the range
        const clonedContent = range.cloneContents();

        // Crate a temporary div to manipulate the cloned content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(clonedContent);        

        // Get all the spans within temp div
        const spanElements = tempDiv.querySelectorAll('span');
  
        // Apply the specified class to each span
        spanElements.forEach(spanElement => {            
            spanElement.classList.toggle('word-capitalize');
        });
                
        range.deleteContents(); // works in pair with clearEmptySpans
                                // Ensures that the span content gets cleared
        insertChildren(tempDiv, range);

        range.commonAncestorContainer.normalize();
        clearEmptySpans(); // clear any empty spans        
    } else 
        return;

    // Place the cursor at the end of the selection - deactivate selection
    placeCursor();

    // Focus on container
    textContainer.focus();
}


// Redirect functions for html cards
function redirect(id) {
    if(id === "calculators")
        window.open("https://github.com/faticamer/advanced-console-calculators", "_blank");
    else if (id === "canteenSystem")
        window.open("https://github.com/faticamer/canteen-system", "_blank");
    else if (id === "wifiGenerator")
        window.open("https://github.com/faticamer/wifi-qr-code", "_blank");
    else if (id === "capstone")
        window.open("https://github.com/faticamer/capstone-project", "_blank");
    else {
        alert("Error");
        return;
    }    
}

function dropHandler(ev) {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
            const file = item.getAsFile();
            // console.log(`… file[${i}].name = ${file.name}`);

            const reader = new FileReader();
            reader.onload = function (event) {
                const fileContent = event.target.result;

                // Insert the file content in notepad area
                textContainer.innerHTML += fileContent;
            };

            // Read the file as text
            reader.readAsText(file);
        }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
        });
    }
}

function clear() {
    textContainer.textContent = "";
}
  
function dragOverHandler(ev) {
    // console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function hasListElements(selection) {
    const range = selection.getRangeAt(0); // Assuming it's the first range

    // Iterate through nodes in the range
    const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
        if (walker.currentNode.tagName.toLowerCase() === 'li') {
            return true; // Found an <li> element
        }
    }

    return false; // No <li> elements found in the selection
}

/**
 * TECHNICAL FUNCTIONS
 * 
 * placeCursor()
 * 
 * wrapNewText();
 * 
 * hasClasses(element)
 * 
 * containsTextNode(container)
 * 
 * updateClock()
 * 
 * redirectToVimer()
 * 
 * clearEmptySpans()
 * 
 * clearEmptyAnchors()
 * 
 * insertChildren()
 * 
 * placeCursorAtEnd()
 * 
 */


function placeCursor() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const endContainer = range.endContainer;
    const endOffset = range.endOffset;

    // Set the range to the end of the selection
    range.setStart(endContainer, endOffset);
    range.setEnd(endContainer, endOffset);
    
    // Remove the selection
    window.getSelection().removeAllRanges();

    // Place the cursor at the end of the selection
    const cursorRange = document.createRange();
    cursorRange.setStart(endContainer, endOffset);
    cursorRange.setEnd(endContainer, endOffset);

    const cursorSelection = window.getSelection();
    cursorSelection.removeAllRanges();
    cursorSelection.addRange(cursorRange);
}

function wrapNewText() {
    // UPDATE: Walk through all nodes and check if all nodes have the same font color value
    const spans = textContainer.querySelectorAll('span');
    let firstChildSpan = textContainer.querySelector('span:first-child');    
    for(let i = 0; i < spans.length; i++) {
        if(spans[i].style.color !== firstChildSpan.style.color) {
            console.log("Loop broken.");
            break;
        }            
        fontColorData.isColoredForAllSpans = true;
    }    

    // Get the textContent of textContainer
    const textContent = textContainer.textContent;    

    // Split the text into words using regex
    const words = textContent.split(/\s+/);

    // Store the last span in a textContent area in a variable
    const lastSpan = textContainer.querySelector('span:last-child');

    if(containsTextNode(textContainer)) {        
        // Create and append span element for each word, preserving white spaces
        textContainer.innerHTML = '';
        for(const word of words) {
            const span = document.createElement('span');            
            span.textContent = word;
            textContainer.appendChild(span);

            // Append white space character after each word
            const space = document.createTextNode(' ');
            textContainer.appendChild(space);
        }
    } else if(
        (!containsTextNode(textContainer)) && 
        (!hasClasses(textContainer.querySelector('span:last-child'))) &&
        (!hasStyleAttribute(textContainer.querySelector('span:last-child')))
        ) {            
        // Condition satisfied when there already exists some content in a textContent area
        /**
         * Explanation for the condition above:
         * After the initial text has been added, spans will be assigned to it. This is performed after the first 
         * check (which is in the if block above). If block only checks if textContent area is empty. This condition
         * however makes sure that the nodes within input indeed have spans wrapped around them, but also checks if
         * the last span has or does not have a class applied. If it does have some class, else block will be 
         * executed, otherwise, code below is executed.
         *  
         * */ 
        
        const words = lastSpan.textContent.split(/\s+/);
        textContainer.removeChild(lastSpan); // Remove the last span
        
        for (const word of words) {
            const span = document.createElement('span');
            span.textContent = word;                
            textContainer.appendChild(span);

            // Append white space character after each word
            const space = document.createTextNode(' ');
            textContainer.appendChild(space);
        }                        
    } else {
        // Store the last span in a variable                        
        const lastSpan = textContainer.querySelector('span:last-child');

        // If last span has some class, but has no style attribute
        if(hasClasses(lastSpan) && !hasStyleAttribute(lastSpan)) {
            const spanClass = lastSpan.classList.value;
            console.log(spanClass);
            const words = lastSpan.textContent.split(/\s+/);            
            textContainer.removeChild(lastSpan); // Remove the last span          
            
            for(let i = 0; i < words.length; i++) {
                const span = document.createElement('span');
                span.textContent = words[i];
                if(i == 0) {
                    // If there was any class within the last span, we need to save the class
                    // and apply it to the first word, when new sequence of spans is to be generated 
                    // We also need to handle when there is a font color applied to the last word
                    // since it isn't applied in form of class, but rather using style attribute.
                    
                    // We need to check if there are multiple classes applied to a span, if there are, 
                    // JS won't allow us to add them because there is a whitespace separating them. Because
                    // of that, we need to check if whitespace present, and use the return value as a confirmation
                    // that there are multiple classes. Later on, each class will be a separate word, when whitespace
                    // gets removed. Afterwards, we will add those classes to the span.
                    if((/\s+/).test(spanClass)) {
                        const classes = spanClass.split(/\s+/);
                        for(let i = 0; i < classes.length; i++) {
                            span.classList.add(classes[i]);
                        }
                    } else {
                        span.classList.add(spanClass);
                    }
                }                
                textContainer.appendChild(span);

                // Append white space character after each word
                const space = document.createTextNode(' ');
                textContainer.appendChild(space);
            }
        }
        // If last span does not have any class, but has a style attribute
        else if(!hasClasses(lastSpan) && hasStyleAttribute(lastSpan)) {            
            const spanStyle = lastSpan.style.cssText.trim();
            const words = lastSpan.textContent.split(/\s+/);
            textContainer.removeChild(lastSpan);

            for(let i = 0; i < words.length; i++) {
                const span = document.createElement('span');
                span.textContent = words[i];
                if(i == 0) {
                    span.style.cssText = spanStyle;
                }
                if(fontColorData.isColoredForAllSpans === true && i != 0) {                            
                    span.style.color = fontColorData.rgbValue;
                    span.style.fontFamily = finalFont;     
                }    
                textContainer.appendChild(span);

                // Append a white space character after each word
                const space = document.createTextNode(' ');
                textContainer.appendChild(space);
            }
            fontColorData.isColoredForAllSpans = false;
        }
        // Case where both style and class are present
        else {
            const spanStyle = lastSpan.style.cssText.trim();
            const spanClass = lastSpan.classList.value;
            const words = lastSpan.textContent.split(/\s+/);
            textContainer.removeChild(lastSpan);

            for(let i = 0; i < words.length; i++) {
                const span = document.createElement('span');
                span.textContent = words[i];
                if(i == 0) {
                    // Condition to determine if there are multiple classes applied to span
                    if((/\s+/).test(spanClass)) {
                        const classes = spanClass.split(/\s+/);
                        for(let i = 0; i < classes.length; i++) {
                            span.classList.add(classes[i]);
                        }
                    } else {
                        span.classList.add(spanClass);
                    }

                    // Add style, if any
                    span.style.cssText = spanStyle;
                    span.style.fontFamily = finalFont;
                }
                
                if(fontColorData.isColoredForAllSpans === true) {
                    console.log("Color data: ", fontColorData.rgbValue);                    
                    span.style.color = fontColorData.rgbValue;               
                }

                textContainer.appendChild(span);

                // Append a white space character after each word
                const space = document.createTextNode(' ');
                textContainer.appendChild(space);
            }
            fontColorData.isColoredForAllSpans = false;
        }
    }
}

function hasClasses(element) {
    if (element) {
      return element.classList.length > 0;
    }
    return false;
}

function hasStyleAttribute(element) {
    if (element.tagName === 'SPAN') {
      return element.style.cssText.trim() !== '';
    }
    return false;
}

function containsTextNode(container) {
    for(let i = 0; i < container.childNodes.length; i++) {
        const node = container.childNodes[i];        
        if(node.nodeType !== Node.TEXT_NODE) {
            return false;
        }
    }
    return true;
}

function redirectToVimer() {
    window.open("https://github.com/faticamer/vimer-texteditor", "_blank");
}

function clearEmptySpans() {
    const spans = textContainer.querySelectorAll('span');

    spans.forEach(span => {
        if(span.textContent.trim() === '') {
            // Remove the empty <span> element
            span.parentNode.removeChild(span);
        }
    })
}

function clearEmptyAnchors() {
    const spans = textContainer.querySelectorAll('span');    

    spans.forEach(span => {
        const anchor = span.querySelector('a');
        if(anchor && anchor.textContent.trim() === '') {
            // Remove the empty <a> tag
            anchor.parentNode.removeChild(anchor);
        }

        // If the span is empty, remove it as well
        if(span.textContent.trim() === '') {
            span.parentNode.removeChild(span);
        }
    })
}

function insertChildren(tempDiv, range) {
    const nodes = [];
    for ( let i = 0; i < tempDiv.childNodes.length; i++ ) {
        const child = tempDiv.childNodes[i];
        nodes.push(child);
    }
    /**
     * I couldn't figure out why, but if the counter started from 0, each inserted node would be in reverse
     * If there was a sentence "This was a sample text" and user chose to apply Bold style to "sample text"
     * the end result would be something like this "This was textsample". It would insert it the other way around, which
     * would probably happen with all other cases. Also, one might notice that one for loop could've been used to insert 
     * all the nodes, however, there was a bug in that case as well, where spans (individual words) were not separated 
     * from each other. So the end result in this case was something like "This was a sampletext." The style would be
     * applied, but the press of any button would merge the words together. I could not figure out why but noticed that two
     * loops solved this issue without any complex logic.
     */
    for ( let i = nodes.length - 1; i >= 0; i--) {
        range.insertNode(nodes[i]);
    }
}

function placeCursorAtEnd() {
  
    // Create a new text node for the newly added text
    const newNode = document.createTextNode(' '); // You can set the text content if needed

    // Insert the new text node after the last <span> element or at the end of the content
    const lastSpan = textContainer.querySelector('span:last-child');    
    if (lastSpan) {
        textContainer.appendChild(newNode);
    }

    // Create a range
    const range = document.createRange();

    // Set the range to the end of the content within the div
    range.selectNodeContents(textContainer);
    range.collapse(false); // Collapse the range to the end

    // Create a selection and set the range
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);   
}
  

// updateClock();
toggleLightMode();
toggleTooltips();
scrollToTop();