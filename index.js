
function Validator (options) {

    // hàm thực hiện
    function validate (inputElement, rule) {

        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }

    }

    var formElement = document.querySelector(options.form);
    
    if (formElement) {

        options.rules.forEach(rule => {

            var inputElement = formElement.querySelector(rule.selector);
            
            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    
                    validate(inputElement, rule);

                }

                // Xử lý khi người dùng nhập
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
           }


        });

    }

}

// Nguyên tác của các rule
// 1. khi có lỗi => báp lỗi
// 2. hợp lệ => k trả ra gì
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này!';
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email!';
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự!`;
        }
    }
}

Validator.isConfirmed = function (selector, getCofirmValue(), message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getCofirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác!';
        }
    };
}