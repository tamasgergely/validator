# Basic javascript form Validator

## Supported validation types
- required
- email
- number
- required checkbox
- file size
- file extension
- password, password again
- minlength

## Getting Started

### 1. Include required files
Put validator.css at the top of your markup:
Put validator.js at the bottom of your markup:

### 2. Html structure
1. Wrap your input elements with a container element call input-item.
2. Add data-rules property to the input.
3. Optionally add data-message to the input.

```html
    <form id="contact-form">
        <div class="input-item">
            <label for="name">Name</label>
            <input type="text" 
                   name="name" 
                   id="name" 
                   data-rules="required" />
        </div>
        <div class="input-item">
            <label for="email">Email</label>
            <input type="text" 
                   name="email" 
                   id="email" 
                   data-rules="email" />
        </div>
        <div class="input-item">
            <label for="password">Pasword</label>
            <input type="text" 
                   name="password" 
                   id="password" 
                   data-rules="required|password|minlength"
                   data-length="6" />
        </div>
        <div class="input-item">
            <label for="password-again">Pasword again</label>
            <input type="text" 
                   name="password_again" 
                   id="password-again" 
                   data-rules="required|password|minlength"
                   data-length="6" />
        </div>
        <div class="input-item">
            <label for="zip">Zip</label>
            <input type="text" 
                   name="zip" 
                   id="zip" 
                   data-rules="required|number"
                   data-messages="Zip is required|Zip must be a number!" />
        </div>
        <div class="input-item file-upload">
            <div class="right flex">
                <div class="upload-wrapper">
                    <span>File upload</span>
                    <input type="file" 
                           name="file" 
                           id="file-upload" 
                           class="upload" 
                           data-rules="required|file",
                           data-size="26214400",
                           data-extension="jpg|png">
                </div>
                <div class="text">
                    <p>
                        Lorem ipsum dolores sit amet
                    </p>

                    <div class="choosed">
                        <ul></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-item">
            <input type="checkbox" 
                   name="privacy" 
                   id="privacy" 
                   value="1" 
                   data-rules="required_cb" 
                   data-messages="You must accept the Privacy Policy!">
            <label for="privacy">I have read and accept the Privacy Policy</label>
        </div>
        <div class="input-item">
            <input type="submit" name="contact_submit" id="contact-submit" value="Send" />
        </div>
    </form>

```

### 3. Call validator constructor
const contactFormValidator = new Validator('contact-form');

## Validation types
### 1.Required
Check if input field value is empty
- Add data-rules="required" to input

### 2. email
Check if input field value is valid email address
- Add data-rules="email" to input

### 3. number
Check if input field value is a number
- Add data-rules="number" to input

### 4. required checkbox
Check if checkbox is checked
- Add data-rules="required_cb" to input

### 5. file size
Check if choosen file size is lover then the limit
- File input id must be 'file-upload'
- Add data-rules="file" to input
- Add data-size="26214400" (size is in KB)

### 6. data extension
Check if choosen file size is lover then the limit
- File input id must be 'file-upload'
- Add data-rules="file" to input
- Add data-extension="jpg|png (extensions separated by |)

### 7. password, password again
Two input fiels is required.
One password field with id 'password', and an other with id 'password-again'
Add data-rules="password" to both fields.

### 8. minlength
Check if input field value is less then the min length
- Add data-rules="min-length" to input
- Add data-lengt="2" to input (integer)

### 9. Multiple rules
You can use multiple rules concatented with pipes.
data-rules="required|password|minlength"
If some rules has other settings, you have to set them to.

### 10. Custom messages
You can add custom error messages with the data-messages="" attribute.
data-messages="You must accept the Privacy Policy!
Not if you have multiple rules, and you define custom messages, you have to add custom message to each rule, separeted by pipe.
data-messages="Zip is required|Zip must be a number!"

