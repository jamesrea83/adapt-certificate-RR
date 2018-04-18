# adapt-certificate
    
**Certificate** is an *extension* for with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  
It provides the user with a certificate on completing the assessment.

## Installation

Copy the folder into src/extentions. Make sure the details shown in example.json are applied in your config.json. 

Please note that the [**Spoor**](https://github.com/adaptlearning/adapt-contrib-spoor) extension must be installed for this extension to work correctly.

## Settings  

**Certificate** has several attributes to be set in the config.json. These provide a pathway to the template certificate image, as well as dimensions for adding text in the correct positions.  

To trigger the certificate, you must include a button with `class="generate-certificate"`. Please note, this button can trigger a certificate at any stage of the assessment. Hiding the button until the assessment is complete is left at the developer's discretion.

## Limitations
 
No known limitations.  

----------------------------

